/**
 * VPNWorld.blog - SSG Local & Web Dual-Compatibility Post-Processor
 * 
 * 1. Takes the Astro build output in dist/
 * 2. Converts all root-relative paths (/_astro, /blog/..., /) to strict relative paths (./, ../, ../../)
 *    so the entire site works 100% under file:// protocol (local double-click)
 * 3. Keeps absolute canonical/OG/Schema URLs intact for Bing SEO
 * 4. Syncs the processed files to root so C:/Users/USER/Desktop/博客/vpnworld.blog/index.html exists and works!
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(__dirname, '../dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('[Error] dist 目录不存在，请先执行 npx astro build');
  process.exit(1);
}

function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

const allDistFiles = getAllFiles(DIST_DIR);
let processedCount = 0;

allDistFiles.forEach(distFilePath => {
  const relPath = path.relative(DIST_DIR, distFilePath).replace(/\\/g, '/');
  const targetRootPath = path.join(ROOT_DIR, relPath);

  // If it's not HTML, just copy to root if it changed
  if (!distFilePath.endsWith('.html')) {
    fs.mkdirSync(path.dirname(targetRootPath), { recursive: true });
    fs.copyFileSync(distFilePath, targetRootPath);
    return;
  }

  // Calculate depth
  const depth = relPath.split('/').length - 1;
  const prefix = depth === 0 ? './' : '../'.repeat(depth);

  let html = fs.readFileSync(distFilePath, 'utf-8');

  // 1. Relativize CSS, JS and Asset links
  html = html.replace(/(?:href|src)=["']\/_astro\/([^"']+)["']/g, (m, p1) => `href="${prefix}_astro/${p1}"`);
  html = html.replace(/src=["']\/_astro\/([^"']+)["']/g, (m, p1) => `src="${prefix}_astro/${p1}"`);
  html = html.replace(/(?:href|src)=["']\/favicon\.svg["']/g, `href="${prefix}favicon.svg"`);

  // 2. Relativize Home link "/"
  // Match href="/" but not href="/something"
  html = html.replace(/href=["']\/["']/g, `href="${prefix}index.html"`);

  // 3. Relativize internal navigation links: href="/path/" -> href="prefix+path/index.html"
  html = html.replace(/href=["']\/([a-zA-Z0-9_\-\/]+)\/["']/g, (m, p1) => {
    return `href="${prefix}${p1}/index.html"`;
  });

  // 4. Relativize 404 & sitemap links
  html = html.replace(/href=["']\/404\.html["']/g, `href="${prefix}404.html"`);
  html = html.replace(/href=["']\/sitemap-index\.xml["']/g, `href="${prefix}sitemap-index.xml"`);
  html = html.replace(/href=["']\/sitemap-0\.xml["']/g, `href="${prefix}sitemap-0.xml"`);

  // 5. Handle JS template literal in compare.astro if present
  html = html.replace(/href=["']\/review\/\$\{([^}]+)\}\/["']/g, (m, p1) => {
    return `href="${prefix}review/\${${p1}}/index.html"`;
  });

  // Write back to dist/ for Cloudflare Pages (works both ways)
  fs.writeFileSync(distFilePath, html, 'utf-8');

  // Also write to root directory so double-clicking root index.html works!
  fs.mkdirSync(path.dirname(targetRootPath), { recursive: true });
  fs.writeFileSync(targetRootPath, html, 'utf-8');
  processedCount++;
});

console.log(`[Dual-Compatibility] 已成功转换并同步 ${processedCount} 个 HTML 文件到根目录！`);
console.log(`[Dual-Compatibility] 本地双击 index.html 与线上部署现已双向完美兼容！`);
