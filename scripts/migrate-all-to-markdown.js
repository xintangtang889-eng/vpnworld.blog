import fs from 'node:fs';
import path from 'node:path';

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

ensureDir('src/content/blog');
ensureDir('src/content/guides');
ensureDir('src/content/glossary');

// 1. Migrate Guides (30 items)
const guideDirs = fs.readdirSync('guides').filter(f => fs.statSync(path.join('guides', f)).isDirectory());
console.log(`Migrating ${guideDirs.length} guides...`);

guideDirs.forEach(slug => {
  const htmlPath = path.join('guides', slug, 'index.html');
  if (!fs.existsSync(htmlPath)) return;
  const content = fs.readFileSync(htmlPath, 'utf8');

  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const descMatch = content.match(/<meta name="description" content="(.*?)">/);
  const kwMatch = content.match(/<meta name="keywords" content="(.*?)">/);
  const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/);
  const introMatch = content.match(/<div class="alert alert-tip"[^>]*><strong>.*?：<\/strong>([\s\S]*?)<\/div>/);

  // Extract body content inside article-content
  const artContentMatch = content.match(/<div class="article-content">([\s\S]*?)<\/div>\s*<\/div>\s*<\/main>/);
  let bodyHtml = artContentMatch ? artContentMatch[1] : '';

  // Remove the CTA card and bottom navigation from bodyHtml because our Astro layout will render them dynamically
  bodyHtml = bodyHtml.replace(/<div class="card"[^>]*margin:\s*2\.5rem[\s\S]*?<\/div>\s*<\/div>/, '');
  bodyHtml = bodyHtml.replace(/<div class="alert alert-tip"[\s\S]*?<\/div>/, '');
  bodyHtml = bodyHtml.replace(/<div style="margin-top:\s*3rem;[\s\S]*?<\/div>/, '');

  const title = (titleMatch ? titleMatch[1] : slug).replace(/"/g, '\\"');
  const description = (descMatch ? descMatch[1] : '').replace(/"/g, '\\"');
  const keywords = (kwMatch ? kwMatch[1] : '').replace(/"/g, '\\"');
  const h1 = (h1Match ? h1Match[1] : slug).replace(/"/g, '\\"');
  const intro = (introMatch ? introMatch[1].trim() : '').replace(/"/g, '\\"');

  const md = `---
title: "${title}"
description: "${description}"
keywords: "${keywords}"
platform: "全平台客户端"
difficulty: "入门到进阶"
date: "2026-03-01"
readTime: "8 分钟"
h1: "${h1}"
intro: "${intro}"
recommendedBrands: ["yinxingren", "breezenet", "feimaoyun"]
---

${bodyHtml.trim()}
`;

  fs.writeFileSync(path.join('src/content/guides', `${slug}.md`), md, 'utf8');
});

// 2. Migrate Blogs (100 items)
const blogDirs = fs.readdirSync('blog').filter(f => fs.statSync(path.join('blog', f)).isDirectory());
console.log(`Migrating ${blogDirs.length} blog articles...`);

blogDirs.forEach(slug => {
  const htmlPath = path.join('blog', slug, 'index.html');
  if (!fs.existsSync(htmlPath)) return;
  const content = fs.readFileSync(htmlPath, 'utf8');

  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const descMatch = content.match(/<meta name="description" content="(.*?)">/);
  const kwMatch = content.match(/<meta name="keywords" content="(.*?)">/);
  const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/);
  const catMatch = content.match(/<span>分类：(.*?)<\/span>/);
  const introMatch = content.match(/<div class="alert alert-tip"[^>]*><strong>.*?：<\/strong>([\s\S]*?)<\/div>/);

  const artContentMatch = content.match(/<div class="article-content">([\s\S]*?)<\/div>\s*<\/div>\s*<\/main>/);
  let bodyHtml = artContentMatch ? artContentMatch[1] : '';

  // Clean out repetitive CTA box & bottom nav
  bodyHtml = bodyHtml.replace(/<div class="card"[^>]*margin:\s*2\.5rem[\s\S]*?<\/div>\s*<\/div>/, '');
  bodyHtml = bodyHtml.replace(/<div class="alert alert-tip"[\s\S]*?<\/div>/, '');
  bodyHtml = bodyHtml.replace(/<div style="margin-top:\s*3rem;[\s\S]*?<\/div>/, '');

  const title = (titleMatch ? titleMatch[1] : slug).replace(/"/g, '\\"');
  const description = (descMatch ? descMatch[1] : '').replace(/"/g, '\\"');
  const keywords = (kwMatch ? kwMatch[1] : '').replace(/"/g, '\\"');
  const h1 = (h1Match ? h1Match[1] : slug).replace(/"/g, '\\"');
  const category = catMatch ? catMatch[1] : '深度评测';
  const intro = (introMatch ? introMatch[1].trim() : '').replace(/"/g, '\\"');

  const md = `---
title: "${title}"
description: "${description}"
keywords: "${keywords}"
category: "${category}"
date: "2026-03-01"
readTime: "8 分钟"
h1: "${h1}"
intro: "${intro}"
recommendedBrands: ["yinxingren", "breezenet", "feimaoyun"]
---

${bodyHtml.trim()}
`;

  fs.writeFileSync(path.join('src/content/blog', `${slug}.md`), md, 'utf8');
});

// 3. Migrate Glossary (5 items)
const glossDirs = fs.readdirSync('glossary').filter(f => fs.statSync(path.join('glossary', f)).isDirectory());
console.log(`Migrating ${glossDirs.length} glossary terms...`);

glossDirs.forEach(slug => {
  const htmlPath = path.join('glossary', slug, 'index.html');
  if (!fs.existsSync(htmlPath)) return;
  const content = fs.readFileSync(htmlPath, 'utf8');

  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const descMatch = content.match(/<meta name="description" content="(.*?)">/);
  const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/);

  const artContentMatch = content.match(/<div class="article-content">([\s\S]*?)<\/div>\s*<\/div>\s*<\/main>/);
  let bodyHtml = artContentMatch ? artContentMatch[1] : '';

  const title = (titleMatch ? titleMatch[1] : slug).replace(/"/g, '\\"');
  const description = (descMatch ? descMatch[1] : '').replace(/"/g, '\\"');
  const h1 = (h1Match ? h1Match[1] : slug).replace(/"/g, '\\"');

  const md = `---
title: "${title}"
description: "${description}"
term: "${h1}"
h1: "${h1}"
---

${bodyHtml.trim()}
`;

  fs.writeFileSync(path.join('src/content/glossary', `${slug}.md`), md, 'utf8');
});

console.log('Markdown migration complete!');
