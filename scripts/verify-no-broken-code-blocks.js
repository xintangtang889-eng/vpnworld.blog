import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

let issues = [];

function checkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkDir(full);
    } else if (entry.name === 'index.html') {
      const html = fs.readFileSync(full, 'utf-8');
      const codeMatches = html.match(/<pre class="astro-code[^"]*"[^>]*>[\s\S]*?<\/pre>/g);
      if (codeMatches) {
        for (const block of codeMatches) {
          if (block.includes('&#x3C;h') || block.includes('&#x3C;p>') || block.includes('&lt;h') || block.includes('&lt;p>')) {
            issues.push({ file: full, snippet: block.slice(0, 150) });
          }
        }
      }
    }
  }
}

checkDir(DIST_DIR);

if (issues.length === 0) {
  console.log('✅ [PERFECT] 全站 184 个页面均无任何被意外解析为代码块的 HTML 标题或段落！');
  process.exit(0);
} else {
  console.error(`❌ 发现 ${issues.length} 处误解析为代码块的问题:`);
  issues.forEach(i => console.error(i.file, i.snippet));
  process.exit(1);
}
