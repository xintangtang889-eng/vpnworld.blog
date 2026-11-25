/**
 * VPNWorld.blog - Astro SSG Internal Link Integrity Checker
 * Verifies that:
 * 1. Every internal root-relative link (e.g. /guides/xxx/, /blog/xxx/) resolves to an actual generated file in dist/
 * 2. External links, anchors, and protocols are safely handled.
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

let filesChecked = 0;
let linksChecked = 0;
let errors = [];

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
  filesChecked++;
  const relPath = path.relative(DIST_DIR, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf-8');

  // Regex to match href="..."
  const linkRegex = /href=["']([^"']+)["']/gi;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const rawUrl = match[1].trim();
    linksChecked++;

    // Ignore client-side script template literals (e.g. ${...})
    if (rawUrl.includes('${')) {
      continue;
    }

    // Ignore anchors, javascript, external links, data URIs, mailto, tel
    if (
      rawUrl.startsWith('#') ||
      rawUrl.startsWith('javascript:') ||
      rawUrl.startsWith('mailto:') ||
      rawUrl.startsWith('tel:') ||
      rawUrl.startsWith('data:') ||
      rawUrl.startsWith('http://') ||
      rawUrl.startsWith('https://')
    ) {
      continue;
    }

    // Process internal links (starts with / or relative)
    const cleanUrl = rawUrl.split('?')[0].split('#')[0];
    if (!cleanUrl) continue;

    let targetDiskPath;
    if (cleanUrl.startsWith('/')) {
      // Root-relative path
      const stripped = cleanUrl.replace(/^\//, '');
      if (stripped === '' || stripped.endsWith('/')) {
        targetDiskPath = path.join(DIST_DIR, stripped, 'index.html');
      } else {
        // Try file itself or folder/index.html
        const directFile = path.join(DIST_DIR, stripped);
        const folderIndex = path.join(DIST_DIR, stripped, 'index.html');
        if (fs.existsSync(directFile)) {
          targetDiskPath = directFile;
        } else {
          targetDiskPath = folderIndex;
        }
      }
    } else {
      // Relative path
      const fileDir = path.dirname(filePath);
      targetDiskPath = path.resolve(fileDir, cleanUrl);
    }

    if (!fs.existsSync(targetDiskPath)) {
      errors.push(`[${relPath}] 失效内链: "${rawUrl}" -> 本地目标文件不存在 (${path.relative(DIST_DIR, targetDiskPath)})`);
    }
  }
});

console.log(`\n=================== Astro SSG 站内链接完整性检查 ===================`);
console.log(`已检查 HTML 文件数: ${filesChecked}`);
console.log(`已检查站内链接数: ${linksChecked}`);

if (errors.length === 0) {
  console.log(`✅ [PASS] 所有站内链接均完美有效，无任何 404 死链！`);
  process.exit(0);
} else {
  console.error(`❌ [FAIL] 发现 ${errors.length} 处链接失效问题:`);
  errors.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}
