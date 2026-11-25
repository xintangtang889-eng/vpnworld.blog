/**
 * VPNWorld.blog - Link Integrity & Relative Path Checker
 * Verifies that:
 * 1. ZERO root-absolute paths starting with "/" exist in href and src.
 * 2. Every relative link accurately resolves to an existing file on disk.
 */

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
let filesChecked = 0;
let linksChecked = 0;
let errors = [];

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    if (file === "node_modules" || file === ".git" || file === "scripts" || file === "docs") return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (file.endsWith(".html")) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = findHtmlFiles(ROOT_DIR);

htmlFiles.forEach((filePath) => {
  filesChecked++;
  const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, "/");
  const fileDir = path.dirname(filePath);
  const content = fs.readFileSync(filePath, "utf-8");

  // Regex to match href="..." and src="..."
  const linkRegex = /(?:href|src)=["']([^"']+)["']/gi;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const rawUrl = match[1].trim();
    linksChecked++;

    // Ignore anchors, javascript, external links, data URIs, mailto
    if (rawUrl.startsWith("#") || rawUrl.startsWith("javascript:") || rawUrl.startsWith("mailto:") || rawUrl.startsWith("data:")) {
      continue;
    }
    if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
      continue;
    }

    // STRICT CHECK: Disallow root absolute paths starting with "/" (e.g. /css/style.css)
    if (rawUrl.startsWith("/")) {
      errors.push(`[${relPath}] 违规使用了根绝对路径: "${rawUrl}" (必须使用标准相对路径如 css/ 或 ../)`);
      continue;
    }

    // Resolve relative path to local disk
    const cleanUrl = rawUrl.split("?")[0].split("#")[0];
    if (!cleanUrl) continue;

    const targetDiskPath = path.resolve(fileDir, cleanUrl);

    if (!fs.existsSync(targetDiskPath)) {
      errors.push(`[${relPath}] 失效内链: "${rawUrl}" -> 本地目标文件不存在 (${targetDiskPath})`);
    }
  }
});

console.log(`\n=================== 链接完整性检查结果 ===================`);
console.log(`已检查 HTML 文件数: ${filesChecked}`);
console.log(`已检查站内链接数: ${linksChecked}`);

if (errors.length === 0) {
  console.log(`✅ [PASS] 所有链接均严格使用相对路径且本地目标完全存在！支持 file:// 协议本地双击直接访问！`);
  process.exit(0);
} else {
  console.error(`❌ [FAIL] 发现 ${errors.length} 处链接错误:`);
  errors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}
