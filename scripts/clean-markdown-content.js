/**
 * VPNWorld.blog - Markdown Content Sanitizer
 * Strips legacy card markup, converts code blocks to standard markdown,
 * and upgrades legacy relative links to root-relative Astro paths.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const contentDirs = [
  path.join(ROOT_DIR, 'src/content/blog'),
  path.join(ROOT_DIR, 'src/content/guides')
];

let totalCleaned = 0;

contentDirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

  files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    const original = content;

    // 1. Replace legacy relative links to clean Astro URLs
    content = content.replace(/\.\.\/\.\.\/review\/([a-z0-9_-]+)(?:\/index\.html|\/)?/g, '/review/$1/');
    content = content.replace(/\.\.\/\.\.\/airport\/([a-z0-9_-]+)(?:\/index\.html|\/)?/g, '/airport/$1/');
    content = content.replace(/\.\.\/\.\.\/glossary\/([a-z0-9_-]+)(?:\/index\.html|\/)?/g, '/glossary/$1/');
    content = content.replace(/\.\.\/\.\.\/guides\/([a-z0-9_-]+)(?:\/index\.html|\/)?/g, '/guides/$1/');
    content = content.replace(/\.\.\/\.\.\/blog\/([a-z0-9_-]+)(?:\/index\.html|\/)?/g, '/blog/$1/');
    content = content.replace(/\.\.\/\.\.\/recommend\/([a-z0-9_-]+)(?:\/index\.html|\/)?/g, '/recommend/$1/');
    content = content.replace(/\.\.\/\.\.\/ranking\/([a-z0-9_-]+)(?:\/index\.html|\/)?/g, '/ranking/$1/');
    content = content.replace(/\.\.\/\.\.\/compare(?:\/index\.html|\/)?/g, '/compare/');

    // 2. Strip leftover card markup at the end of articles
    // Pattern matches legacy card grids or orphan CTA divs
    const cardIdx = content.indexOf('<div style="background: var(--bg-alt);');
    if (cardIdx !== -1) {
      content = content.substring(0, cardIdx).trim();
    }
    const ctaIdx = content.indexOf('<div style="display: flex; gap: 0.5rem;');
    if (ctaIdx !== -1) {
      content = content.substring(0, ctaIdx).trim();
    }
    // Clean trailing unclosed tags if any
    content = content.replace(/<\/div>\s*<\/div>\s*$/g, '').trim();

    // 3. Convert <pre ...><code> ... </code></pre> to markdown code blocks
    content = content.replace(/<pre[^>]*><code>([\s\S]*?)<\/code><\/pre>/gi, (match, code) => {
      // Decode HTML entities if any
      const cleanCode = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .trim();
      return `\n\`\`\`bash\n${cleanCode}\n\`\`\`\n`;
    });

    // 4. Ensure no double H1 in markdown body (e.g. # Heading in body)
    // Separate frontmatter from body
    const parts = content.split('---');
    if (parts.length >= 3) {
      const frontmatter = parts[1];
      let body = parts.slice(2).join('---');

      // In body, change any # Heading to ## Heading
      body = body.replace(/^#\s+(.+)$/gm, '## $1');

      content = `---${frontmatter}---${body}`;
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      totalCleaned++;
    }
  });
});

console.log(`Markdown 内容清理完成，已优化 ${totalCleaned} 篇文档！`);
