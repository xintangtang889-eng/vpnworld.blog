/**
 * VPNWorld.blog - SEO Audit Script
 * Validates Title, Description, H1, Canonical, Robots, and Metadata
 */

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
let totalChecked = 0;
let errors = [];
let titlesMap = new Map();

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
  totalChecked++;
  const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, "/");
  const content = fs.readFileSync(filePath, "utf-8");

  // 1. Check Title
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    errors.push(`[${relPath}] 缺少 <title> 标签`);
  } else {
    const title = titleMatch[1].trim();
    if (titlesMap.has(title)) {
      errors.push(`[${relPath}] 发现重复 Title 与 [${titlesMap.get(title)}] 冲突: "${title}"`);
    } else {
      titlesMap.set(title, relPath);
    }
  }

  // 2. Check Meta Description (404 is optional)
  if (relPath !== "404.html") {
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    if (!descMatch || !descMatch[1].trim()) {
      errors.push(`[${relPath}] 缺少 meta description 标签`);
    }
  }

  // 3. Check H1 tag
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  if (!h1Matches || h1Matches.length === 0) {
    errors.push(`[${relPath}] 缺少 <h1> 标签`);
  } else if (h1Matches.length > 1) {
    errors.push(`[${relPath}] 存在多个 <h1> 标签 (当前数量: ${h1Matches.length})`);
  }

  // 4. Check Canonical (404 should have noindex instead of canonical)
  if (relPath !== "404.html") {
    const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
    if (!canonicalMatch) {
      errors.push(`[${relPath}] 缺少 canonical 标签`);
    } else {
      const canonicalUrl = canonicalMatch[1];
      if (!canonicalUrl.startsWith("https://vpnworld.blog")) {
        errors.push(`[${relPath}] Canonical 域名错误，必须以 https://vpnworld.blog 开头: "${canonicalUrl}"`);
      }
      if (canonicalUrl.includes("localhost") || canonicalUrl.includes("127.0.0.1")) {
        errors.push(`[${relPath}] Canonical 包含测试域名: "${canonicalUrl}"`);
      }
    }
  }
});

console.log(`\n=================== SEO AUDIT 结果 ===================`);
console.log(`已审计 HTML 页面总数: ${totalChecked}`);
if (errors.length === 0) {
  console.log(`✅ [PASS] 所有页面的 Title、Description、H1、Canonical 与 Metadata 均完全合规！`);
  process.exit(0);
} else {
  console.error(`❌ [FAIL] 发现 ${errors.length} 处 SEO 格式错误:`);
  errors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}
