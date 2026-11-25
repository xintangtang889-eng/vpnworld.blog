const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') results = results.concat(walk(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const files = walk('.');
let updatedCount = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  // root level
  if (content.includes('href="guides/windows/index.html"')) {
    content = content.replace(/href="guides\/windows\/index\.html"/g, 'href="guides/index.html"');
    changed = true;
  }
  if (content.includes('href="blog/how-to-choose-airport/index.html"')) {
    content = content.replace(/href="blog\/how-to-choose-airport\/index\.html"/g, 'href="blog/index.html"');
    changed = true;
  }

  // 1-level
  if (content.includes('href="../guides/windows/index.html"')) {
    content = content.replace(/href="\.\.\/guides\/windows\/index\.html"/g, 'href="../guides/index.html"');
    changed = true;
  }
  if (content.includes('href="../blog/how-to-choose-airport/index.html"')) {
    content = content.replace(/href="\.\.\/blog\/how-to-choose-airport\/index\.html"/g, 'href="../blog/index.html"');
    changed = true;
  }

  // 2-level
  if (content.includes('href="../../guides/windows/index.html"')) {
    content = content.replace(/href="\.\.\/\.\.\/guides\/windows\/index\.html"/g, 'href="../../guides/index.html"');
    changed = true;
  }
  if (content.includes('href="../../blog/how-to-choose-airport/index.html"')) {
    content = content.replace(/href="\.\.\/\.\.\/blog\/how-to-choose-airport\/index\.html"/g, 'href="../../blog/index.html"');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
    updatedCount++;
  }
});

console.log('Navbars updated in files:', updatedCount);
