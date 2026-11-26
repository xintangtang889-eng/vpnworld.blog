/**
 * VPNWorld.blog - Markdown Content Sanitizer
 * Strips legacy card markup, converts code blocks to standard markdown,
 * upgrades legacy relative links to root-relative Astro paths,
 * eliminates accidental 4+ space line indentations that trigger CommonMark code blocks,
 * and cleans up undefined paragraph tags.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const contentDirs = [
  path.join(ROOT_DIR, 'src/content/blog'),
  path.join(ROOT_DIR, 'src/content/guides'),
  path.join(ROOT_DIR, 'src/content/glossary')
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
    const cardIdx = content.indexOf('<div style="background: var(--bg-alt);');
    if (cardIdx !== -1) {
      content = content.substring(0, cardIdx).trim();
    }
    const ctaIdx = content.indexOf('<div style="display: flex; gap: 0.5rem;');
    if (ctaIdx !== -1) {
      content = content.substring(0, ctaIdx).trim();
    }
    content = content.replace(/<\/div>\s*<\/div>\s*$/g, '').trim();

    // 3. Convert <pre ...><code> ... </code></pre> to markdown fenced code blocks
    content = content.replace(/<pre[^>]*><code>([\s\S]*?)<\/code><\/pre>/gi, (match, code) => {
      const cleanCode = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .trim();
      return `\n\`\`\`bash\n${cleanCode}\n\`\`\`\n`;
    });

    // 4. Split frontmatter & process body line by line
    const parts = content.split('---');
    if (parts.length >= 3) {
      const frontmatter = parts[1];
      let body = parts.slice(2).join('---');

      // In body, change any # Heading to ## Heading (no double H1)
      body = body.replace(/^#\s+(.+)$/gm, '## $1');

      // Remove undefined paragraph tags
      body = body.replace(/<p>\s*undefined\s*<\/p>/gi, '');

      // Line-by-line unindenting:
      // Preserve fenced code block indentation (``` ... ```)
      // For all lines outside fenced code blocks, trim leading and trailing spaces
      // so CommonMark does not mistakenly parse 4+ leading spaces as code blocks
      const lines = body.split('\n');
      let inFenced = false;
      const cleanLines = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/^\s*```/.test(line)) {
          inFenced = !inFenced;
          cleanLines.push(line);
          continue;
        }

        if (inFenced) {
          cleanLines.push(line);
          continue;
        }

        // Outside fenced code blocks: trim leading/trailing spaces
        const trimmed = line.trim();
        cleanLines.push(trimmed);
      }

      let cleanBody = cleanLines.join('\n');
      // Collapse 3 or more consecutive empty lines down to a clean blank line
      cleanBody = cleanBody.replace(/\n{3,}/g, '\n\n').trim();

      content = `---${frontmatter}---\n\n${cleanBody}\n`;
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      totalCleaned++;
    }
  });
});

console.log(`Markdown 内容清理完成，已优化 ${totalCleaned} 篇文档！`);
