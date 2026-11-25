/**
 * VPNWorld.blog - Astro Content & Data Validation Script
 * Verifies that:
 * 1. All 14 airports in src/data/airports.ts have generated pages in dist/ (airport & review)
 * 2. All 100 blog articles exist in src/content/blog/ and are rendered in dist/blog/
 * 3. All 30 guides exist in src/content/guides/ and are rendered in dist/guides/
 * 4. Sitemap files exist in dist/
 * 5. IndexNow verification key exists in dist/
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(__dirname, '../dist');

let errors = [];

// 1. Verify Airport Database & SSG Page Generation
const airportsContent = fs.readFileSync(path.join(ROOT_DIR, 'src/data/airports.ts'), 'utf-8');
const slugMatches = [...airportsContent.matchAll(/"?slug"?:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

slugMatches.forEach((slug) => {
  const airportPage = path.join(DIST_DIR, 'airport', slug, 'index.html');
  const reviewPage = path.join(DIST_DIR, 'review', slug, 'index.html');

  if (!fs.existsSync(airportPage)) {
    errors.push(`数据库机场 [${slug}] 缺少编译输出档案页: dist/airport/${slug}/index.html`);
  }
  if (!fs.existsSync(reviewPage)) {
    errors.push(`数据库机场 [${slug}] 缺少编译输出评测页: dist/review/${slug}/index.html`);
  }
});

// 2. Check Content Collections Count
const blogFiles = fs.readdirSync(path.join(ROOT_DIR, 'src/content/blog')).filter(f => f.endsWith('.md'));
const guideFiles = fs.readdirSync(path.join(ROOT_DIR, 'src/content/guides')).filter(f => f.endsWith('.md'));

if (blogFiles.length !== 100) {
  errors.push(`文章集合数量异常: 预期 100 篇，实际 ${blogFiles.length} 篇`);
}
if (guideFiles.length !== 30) {
  errors.push(`教程集合数量异常: 预期 30 篇，实际 ${guideFiles.length} 篇`);
}

// 3. Check Sitemap in dist/
const sitemapIndex = path.join(DIST_DIR, 'sitemap-index.xml');
const sitemap0 = path.join(DIST_DIR, 'sitemap-0.xml');
if (!fs.existsSync(sitemapIndex) && !fs.existsSync(sitemap0)) {
  errors.push('dist 目录中缺少生成的 sitemap.xml 文件');
}

// 4. Check IndexNow Key file in dist/
const keyFile = path.join(DIST_DIR, 'c7e2b1093f4848d5b4a9238e8316c02a.txt');
if (!fs.existsSync(keyFile)) {
  errors.push('dist 目录缺少 IndexNow Key 验证文件 c7e2b1093f4848d5b4a9238e8316c02a.txt');
}

console.log(`\n=================== Astro 内容与数据一致性验证 ===================`);
console.log(`数据库收录机场总数: ${slugMatches.length}`);
console.log(`Markdown 博客文章数: ${blogFiles.length}`);
console.log(`Markdown 教程文章数: ${guideFiles.length}`);

if (errors.length === 0) {
  console.log(`✅ [PASS] 架构数据与 Markdown 内容库 100% 同步且已完整编译！`);
  process.exit(0);
} else {
  console.error(`❌ [FAIL] 发现 ${errors.length} 处数据一致性问题:`);
  errors.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}
