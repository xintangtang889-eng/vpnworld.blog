/**
 * VPNWorld.blog - Content & Data Validation Script
 * Verifies that:
 * 1. No unreplaced template variables exist ({{...}}).
 * 2. All airports in js/airports.js have matching airport/ and review/ pages.
 * 3. Sitemap entries exist and match files on disk.
 */

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
let errors = [];

// 1. Check Unreplaced Template Variables
function checkVariables(dir) {
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    if (file === "node_modules" || file === ".git" || file === "scripts" || file === "docs") return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      checkVariables(fullPath);
    } else if (file.endsWith(".html") || file.endsWith(".js") || file.endsWith(".css")) {
      const content = fs.readFileSync(fullPath, "utf-8");
      const varMatches = content.match(/\{\{[^}]+\}\}/g);
      if (varMatches) {
        errors.push(`[${path.relative(ROOT_DIR, fullPath)}] 存在未替换的模板变量: ${varMatches.join(", ")}`);
      }
    }
  });
}
checkVariables(ROOT_DIR);

// 2. Validate Airport Database Sync
const { AIRPORTS_DATA } = require("../js/airports.js");
AIRPORTS_DATA.forEach((airport) => {
  const airportPage = path.join(ROOT_DIR, "airport", airport.slug, "index.html");
  const reviewPage = path.join(ROOT_DIR, "review", airport.slug, "index.html");

  if (!fs.existsSync(airportPage)) {
    errors.push(`数据库机场 [${airport.name}] 缺少品牌档案页: airport/${airport.slug}/index.html`);
  }
  if (!fs.existsSync(reviewPage)) {
    errors.push(`数据库机场 [${airport.name}] 缺少深度评测页: review/${airport.slug}/index.html`);
  }
});

// 3. Check Sitemap vs Disk
const sitemapContent = fs.readFileSync(path.join(ROOT_DIR, "sitemap.xml"), "utf-8");
const locMatches = sitemapContent.match(/<loc>https:\/\/vpnworld\.blog\/([^<]*)<\/loc>/g);
if (!locMatches || locMatches.length === 0) {
  errors.push("sitemap.xml 中未找到任何有效的 <loc> URL");
} else {
  locMatches.forEach((locTag) => {
    const rawPath = locTag.replace(/<loc>https:\/\/vpnworld\.blog\/?/, "").replace("</loc>", "");
    let expectedFile = path.join(ROOT_DIR, rawPath, "index.html");
    if (rawPath === "" || rawPath === "/") {
      expectedFile = path.join(ROOT_DIR, "index.html");
    }
    if (!fs.existsSync(expectedFile) && !fs.existsSync(path.join(ROOT_DIR, rawPath))) {
      errors.push(`Sitemap 中的 URL [https://vpnworld.blog/${rawPath}] 对应本地文件不存在: ${expectedFile}`);
    }
  });
}

// 4. Check IndexNow Key file
const keyFile = path.join(ROOT_DIR, "c7e2b1093f4848d5b4a9238e8316c02a.txt");
if (!fs.existsSync(keyFile)) {
  errors.push("缺少 IndexNow Key 验证文件 c7e2b1093f4848d5b4a9238e8316c02a.txt");
}

console.log(`\n=================== 内容与数据一致性验证结果 ===================`);
console.log(`数据库收录机场总数: ${AIRPORTS_DATA.length}`);
console.log(`Sitemap 抓取条目数: ${locMatches ? locMatches.length : 0}`);

if (errors.length === 0) {
  console.log(`✅ [PASS] 内容完整、无遗留未替换模板变量、数据库与评测页面100%对应！`);
  process.exit(0);
} else {
  console.error(`❌ [FAIL] 发现 ${errors.length} 处内容一致性错误:`);
  errors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}
