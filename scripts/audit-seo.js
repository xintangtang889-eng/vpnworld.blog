/**
 * VPNWorld.blog - Astro SEO Audit Script
 * Validates Title, Description, H1, Canonical, Robots, and Metadata across static build in dist/
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error(`[Error] dist 目录不存在，请先执行 npm run build`);
  process.exit(1);
}

let totalChecked = 0;
let errors = [];
let titlesMap = new Map();

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = findHtmlFiles(DIST_DIR);

htmlFiles.forEach((filePath) => {
  totalChecked++;
  const relPath = path.relative(DIST_DIR, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf-8');

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
  if (!relPath.includes('404')) {
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    if (!descMatch || !descMatch[1].trim()) {
      errors.push(`[${relPath}] 缺少或未填写 <meta name="description">`);
    }
  }

  // 3. Check H1
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1Match || !h1Match[1].trim()) {
    errors.push(`[${relPath}] 页面缺失 <h1> 标签`);
  } else {
    const allH1s = content.match(/<h1[^>]*>/gi);
    if (allH1s && allH1s.length > 1) {
      errors.push(`[${relPath}] 存在多个 <h1> 标签 (${allH1s.length} 个)`);
    }
  }

  // 4. Check Canonical
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    errors.push(`[${relPath}] 缺失 canonical 标签`);
  } else {
    const href = canonicalMatch[1];
    if (!href.startsWith('https://vpnworld.blog')) {
      errors.push(`[${relPath}] canonical URL 非正式域名: ${href}`);
    }
  }

  // 5. Check Robots Meta
  const robotsMatch = content.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
  if (!robotsMatch && !relPath.includes('404')) {
    errors.push(`[${relPath}] 缺失 robots meta 标签`);
  }
});

console.log(`\n=================== Astro SSG SEO 审计结果 ===================`);
console.log(`已审计 HTML 文件数: ${totalChecked}`);

if (errors.length === 0) {
  console.log(`✅ [PASS] 100% 页面通过 SEO 审计：Title/Description/H1/Canonical/Robots 齐全且全站零重复 Title！`);
  process.exit(0);
} else {
  console.error(`❌ [FAIL] 发现 ${errors.length} 项 SEO 规范问题:`);
  errors.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}
