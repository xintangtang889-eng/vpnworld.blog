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

// 1. In-article specific replacements
const howToChoose = 'blog/how-to-choose-airport/index.html';
if (fs.existsSync(howToChoose)) {
  let c = fs.readFileSync(howToChoose, 'utf8');
  c = c.replace(/<a href="\.\.\/\.\.\/review\/kuaigou\/index\.html">快狗云<\/a>/g, '<a href="../../review/feiv/index.html">飞V</a>');
  c = c.replace(/<a href="\.\.\/\.\.\/review\/flowercloud\/index\.html">花云<\/a> 与 <a href="\.\.\/\.\.\/review\/tag-vpn\/index\.html">TAG VPN<\/a>/g, '<a href="../../review/yinxingren/index.html">隐形人</a> 与 <a href="../../review/breezenet/index.html">微风网络</a>');
  fs.writeFileSync(howToChoose, c, 'utf8');
  console.log('Updated', howToChoose);
}

const iplcPath = 'blog/iplc-iepl-transit-explained/index.html';
if (fs.existsSync(iplcPath)) {
  let c = fs.readFileSync(iplcPath, 'utf8');
  c = c.replace(/<a href="\.\.\/\.\.\/review\/flowercloud\/index\.html">花云<\/a> 与 <a href="\.\.\/\.\.\/review\/tag-vpn\/index\.html">TAG VPN<\/a>/g, '<a href="../../review/yinxingren/index.html">隐形人</a> 与 <a href="../../review/flashleap/index.html">闪跃 FlashLeap</a>');
  fs.writeFileSync(iplcPath, c, 'utf8');
  console.log('Updated', iplcPath);
}

const vpnVsAirport = 'blog/vpn-vs-airport/index.html';
if (fs.existsSync(vpnVsAirport)) {
  let c = fs.readFileSync(vpnVsAirport, 'utf8');
  c = c.replace(/<a href="\.\.\/\.\.\/review\/flowercloud\/index\.html">花云<\/a> 或 <a href="\.\.\/\.\.\/review\/just-my-socks\/index\.html">Just My Socks<\/a>/g, '<a href="../../review/yinxingren/index.html">隐形人</a> 或 <a href="../../review/breezenet/index.html">微风网络</a>');
  fs.writeFileSync(vpnVsAirport, c, 'utf8');
  console.log('Updated', vpnVsAirport);
}

const guidesWin = 'guides/windows/index.html';
if (fs.existsSync(guidesWin)) {
  let c = fs.readFileSync(guidesWin, 'utf8');
  c = c.replace(/<a href="\.\.\/\.\.\/review\/flyingbird\/index\.html">飞鸟机场<\/a> 或 <a href="\.\.\/\.\.\/review\/flowercloud\/index\.html">花云<\/a>/g, '<a href="../../review/breezenet/index.html">微风网络</a> 或 <a href="../../review/yinxingren/index.html">隐形人</a>');
  fs.writeFileSync(guidesWin, c, 'utf8');
  console.log('Updated', guidesWin);
}

// 2. Navbar & remaining references replacement across all HTML files
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;
  if (content.includes('../review/tag-vpn/index.html')) {
    content = content.replace(/\.\.\/review\/tag-vpn\/index\.html/g, '../review/yinxingren/index.html');
    changed = true;
  }
  if (content.includes('../../review/tag-vpn/index.html')) {
    content = content.replace(/\.\.\/\.\.\/review\/tag-vpn\/index\.html/g, '../../review/yinxingren/index.html');
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Navbar updated in:', f);
  }
});

console.log('Fix script complete.');
