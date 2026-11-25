const fs = require('fs');
const path = require('path');

// 1. Load airports data
const airportsCode = fs.readFileSync(path.join(__dirname, '../js/airports.js'), 'utf8');
let AIRPORTS_DATA = [];
const sandbox = {
  window: {},
  document: {},
  navigator: {}
};
// Simple extraction of AIRPORTS_DATA
const matchData = airportsCode.match(/const AIRPORTS_DATA = (\[[\s\S]*?\]);\s*if \(typeof window/);
if (matchData) {
  AIRPORTS_DATA = eval(matchData[1]);
} else {
  // fallback eval
  eval(airportsCode.replace(/if \(typeof window[\s\S]*/, ''));
}
console.log('Successfully loaded airports count:', AIRPORTS_DATA.length);

const airportsMap = {};
AIRPORTS_DATA.forEach(a => { airportsMap[a.id] = a; });

// 2. Load Guide and Blog data
const guidesData = require('./data/guides-data.js');
const blogDataPart1 = require('./data/blog-data-part1.js');
const blogDataPart2 = require('./data/blog-data-part2.js');
const blogDataPart3 = require('./data/blog-data-part3.js');

const allNewBlogs = [...blogDataPart1, ...blogDataPart2, ...blogDataPart3];
console.log(`Loaded ${guidesData.length} new guides and ${allNewBlogs.length} new blog articles.`);

// Function to generate commercial CTA box with 3 recommended brands
function renderCtaBox(brandIds, relativePrefix) {
  const selectedBrands = (brandIds || ['yinxingren', 'breezenet', 'feimaoyun'])
    .map(id => airportsMap[id] || airportsMap['yinxingren'])
    .filter(Boolean);

  let cardsHtml = selectedBrands.map(b => `
    <div style="background: var(--bg-alt); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <strong style="font-size: 1.1rem; color: var(--text-color);">${b.name}</strong>
          <span style="font-size: 0.8rem; background: var(--primary-light); color: var(--primary); padding: 2px 6px; border-radius: 4px;">${b.lineType || '优质线路'}</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem; line-height: 1.4;">${b.description.slice(0, 48)}...</p>
        <div style="font-size: 1.1rem; font-weight: 700; color: #dc2626; margin-bottom: 0.5rem;">${b.startingPrice}元<span style="font-size: 0.8rem; font-weight: normal; color: var(--text-muted);">/月起 (${b.traffic})</span></div>
        ${b.coupon ? `<div style="font-size: 0.8rem; color: var(--primary); margin-bottom: 0.75rem;">优惠码：<code>${b.coupon}</code></div>` : ''}
      </div>
      <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
        <a href="${b.affiliateUrl || b.officialUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-primary btn-sm" style="flex: 1; text-align: center;">直达官网 →</a>
        <a href="${relativePrefix}review/${b.slug}/index.html" class="btn btn-secondary btn-sm" style="flex: 1; text-align: center;">评测报告</a>
      </div>
    </div>
  `).join('');

  return `
    <div class="card" style="margin: 2.5rem 0; padding: 1.5rem; background: var(--bg-card); border: 2px solid var(--primary-light); border-radius: 10px;">
      <h3 style="margin-top: 0; display: flex; align-items: center; gap: 0.5rem; color: var(--primary-dark);">🎯 推荐高适配专线机场节点（已核验实测）</h3>
      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.25rem;">针对本场景，我们严选了以下具备高稳定性、独立流媒体解锁与抗封锁专线的服务商：</p>
      <div class="grid grid-3" style="gap: 1rem;">
        ${cardsHtml}
      </div>
    </div>
  `;
}

// Function to render complete page
function renderPage({
  folder,
  slug,
  title,
  description,
  keywords,
  category,
  date,
  readTime,
  h1,
  intro,
  sections,
  recommendedBrands
}) {
  const relativePrefix = '../../';
  const ctaBoxHtml = renderCtaBox(recommendedBrands, relativePrefix);

  let sectionsHtml = (sections || []).map(sec => {
    let extra = '';
    if (sec.tips) {
      extra += `<div class="alert alert-warning" style="margin: 1rem 0;"><strong>提示：</strong>${sec.tips}</div>`;
    }
    if (sec.steps && sec.steps.length) {
      extra += `<ol style="margin: 1rem 0; padding-left: 1.5rem; line-height: 1.8;">${sec.steps.map(s => `<li style="margin-bottom: 0.5rem;">${s}</li>`).join('')}</ol>`;
    }
    if (sec.code) {
      extra += `<pre style="background: #1e293b; color: #f8fafc; padding: 1rem; border-radius: 6px; overflow-x: auto; margin: 1rem 0;"><code>${sec.code}</code></pre>`;
    }
    return `
      <h2>${sec.h2}</h2>
      <p>${sec.p}</p>
      ${extra}
    `;
  }).join('');

  const folderName = folder === 'guides' ? '使用教程' : '博客文章';
  const folderIndexLink = folder === 'guides' ? '../index.html' : '../index.html';

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://vpnworld.blog/${folder}/${slug}/">
  <link rel="stylesheet" href="${relativePrefix}css/style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${h1.replace(/"/g, '\\"')}",
    "description": "${description.replace(/"/g, '\\"')}",
    "mainEntityOfPage": "https://vpnworld.blog/${folder}/${slug}/",
    "datePublished": "${date}",
    "dateModified": "${date}",
    "author": { "@type": "Organization", "name": "VPNWorld 资深评测团队" },
    "publisher": { "@type": "Organization", "name": "VPNWorld" }
  }
  </script>
</head>
<body data-root="${relativePrefix}">
  <header class="site-header">
    <div class="container header-inner">
      <a href="${relativePrefix}index.html" class="site-logo"><span class="logo-badge">VPN</span>World</a>
      <nav class="site-nav" id="site-nav">
        <a href="${relativePrefix}index.html" class="nav-link">首页</a>
        <a href="${relativePrefix}recommend/budget/index.html" class="nav-link">机场推荐</a>
        <a href="${relativePrefix}ranking/overall/index.html" class="nav-link">机场排行</a>
        <a href="${relativePrefix}review/yinxingren/index.html" class="nav-link">机场评测</a>
        <a href="${relativePrefix}compare/index.html" class="nav-link">机场对比</a>
        <a href="${relativePrefix}guides/index.html" class="nav-link ${folder === 'guides' ? 'active' : ''}">使用教程</a>
        <a href="${relativePrefix}blog/index.html" class="nav-link ${folder === 'blog' ? 'active' : ''}">博客文章</a>
      </nav>
      <div class="header-actions">
        <button type="button" class="search-trigger-btn"><span>搜索</span></button>
        <button type="button" class="mobile-menu-btn">☰</button>
      </div>
    </div>
  </header>
  <main class="main-content">
    <div class="container">
      <nav class="breadcrumb">
        <a href="${relativePrefix}index.html">首页</a>
        <span class="breadcrumb-separator">/</span>
        <a href="${folderIndexLink}">${folderName}</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">${h1.slice(0, 20)}...</span>
      </nav>
      <div class="article-header">
        <h1 class="hero-title" style="text-align: left; font-size: 2.2rem; margin-bottom: 0.5rem;">${h1}</h1>
        <div class="article-meta">
          <span>作者：VPNWorld 资深评测团队</span>
          <span>更新时间：${date}</span>
          <span>分类：${category}</span>
          <span>预计阅读：${readTime}</span>
        </div>
      </div>
      <div class="article-content">
        <div class="alert alert-tip" style="margin-bottom: 2rem;"><strong>核心导读：</strong>${intro}</div>

        ${sectionsHtml}

        ${ctaBoxHtml}

        <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <a href="${relativePrefix}${folder}/index.html" class="btn btn-secondary btn-sm">← 返回${folderName}中心</a>
          <a href="${relativePrefix}ranking/overall/index.html" class="btn btn-primary btn-sm">查看2026综合实力排行榜 →</a>
        </div>
      </div>
    </div>
  </main>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-bottom">
        <div>© 2026 VPNWorld.blog · 专业中文机场与VPN节点评测中心</div>
        <div><a href="${relativePrefix}sitemap.xml">Sitemap 网站地图</a></div>
      </div>
    </div>
  </footer>
  <script src="${relativePrefix}js/airports.js"></script>
  <script src="${relativePrefix}js/main.js"></script>
</body>
</html>`;
}

// 3. Generate Guides
console.log('Generating 26 new guide pages...');
guidesData.forEach(g => {
  const dir = path.join(__dirname, '../guides', g.slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const html = renderPage({
    folder: 'guides',
    slug: g.slug,
    title: g.title,
    description: g.description,
    keywords: g.keywords,
    category: g.platform,
    date: g.date,
    readTime: g.readTime,
    h1: g.h1,
    intro: g.intro,
    sections: g.sections,
    recommendedBrands: g.recommendedBrands
  });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
});
console.log('Finished generating guide pages.');

// 4. Generate Blog Articles
console.log('Generating 95 new blog pages...');
allNewBlogs.forEach(b => {
  const dir = path.join(__dirname, '../blog', b.slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const html = renderPage({
    folder: 'blog',
    slug: b.slug,
    title: b.title,
    description: b.description,
    keywords: b.keywords,
    category: b.category,
    date: b.date,
    readTime: b.readTime,
    h1: b.h1,
    intro: b.intro,
    sections: b.sections,
    recommendedBrands: b.recommendedBrands
  });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
});
console.log('Finished generating blog pages.');

console.log('All individual pages written successfully.');
