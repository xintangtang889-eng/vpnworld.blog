const fs = require('fs');
const path = require('path');

// 1. Gather all 30 guides
const guideDirs = fs.readdirSync('guides').filter(f => fs.statSync('guides/' + f).isDirectory());
const allGuides = [];

guideDirs.forEach(dir => {
  const file = path.join('guides', dir, 'index.html');
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const descMatch = content.match(/<meta name="description" content="(.*?)">/);
    const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/);
    const metaMatch = content.match(/<span>分类：(.*?)<\/span>/) || content.match(/<span>推荐主力客户端：<strong>(.*?)<\/strong><\/span>/);
    
    allGuides.push({
      slug: dir,
      title: titleMatch ? titleMatch[1].replace(/ \| VPNWorld$/, '') : dir,
      h1: h1Match ? h1Match[1] : dir,
      desc: descMatch ? descMatch[1] : '',
      category: metaMatch ? metaMatch[1] : '全平台教程',
      url: `${dir}/index.html`
    });
  }
});

// Sort guides: platform order
allGuides.sort((a, b) => a.slug.localeCompare(b.slug));

// 2. Gather all 100 blog articles
const blogDirs = fs.readdirSync('blog').filter(f => fs.statSync('blog/' + f).isDirectory());
const allBlogs = [];

blogDirs.forEach(dir => {
  const file = path.join('blog', dir, 'index.html');
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const descMatch = content.match(/<meta name="description" content="(.*?)">/);
    const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/);
    const metaMatch = content.match(/<span>分类：(.*?)<\/span>/);

    allBlogs.push({
      slug: dir,
      title: titleMatch ? titleMatch[1].replace(/ \| VPNWorld$/, '') : dir,
      h1: h1Match ? h1Match[1] : dir,
      desc: descMatch ? descMatch[1] : '',
      category: metaMatch ? metaMatch[1] : '深度评测',
      url: `${dir}/index.html`
    });
  }
});

allBlogs.sort((a, b) => a.slug.localeCompare(b.slug));

console.log(`Found ${allGuides.length} guides and ${allBlogs.length} blogs.`);

// 3. Build guides/index.html
const guideCardsHtml = allGuides.map((g, idx) => `
  <article class="card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 1.5rem; transition: transform 0.2s, box-shadow 0.2s;" data-category="${g.category}">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span style="font-size: 0.8rem; font-weight: 600; background: var(--primary-light); color: var(--primary); padding: 3px 8px; border-radius: 4px;">${g.category}</span>
        <span style="font-size: 0.8rem; color: var(--text-muted);">教程 #${idx + 1}</span>
      </div>
      <h2 style="font-size: 1.15rem; margin-top: 0; margin-bottom: 0.75rem; line-height: 1.4;">
        <a href="${g.url}" style="color: var(--text-color); text-decoration: none;">${g.h1}</a>
      </h2>
      <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1rem;">${g.desc.slice(0, 85)}...</p>
    </div>
    <div>
      <a href="${g.url}" class="btn btn-secondary btn-sm" style="width: 100%; text-align: center;">阅读完整教程 →</a>
    </div>
  </article>
`).join('');

const guidesIndexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>翻墙客户端与节点配置教程中心 (共30篇) - Clash / Sing-box / Surge 全平台实操 | VPNWorld</title>
  <meta name="description" content="2026最全科学上网翻墙客户端安装与节点配置教程中心。收录 30 篇涵盖 Windows、macOS、iOS、Android、软路由与游戏主机的保姆级图文教程。">
  <meta name="keywords" content="翻墙教程, 梯子配置, Clash教程, Sing-box教程, Shadowrocket设置, 软路由翻墙, 苹果翻墙教程">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://vpnworld.blog/guides/">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body data-root="../">
  <header class="site-header">
    <div class="container header-inner">
      <a href="../index.html" class="site-logo"><span class="logo-badge">VPN</span>World</a>
      <nav class="site-nav" id="site-nav">
        <a href="../index.html" class="nav-link">首页</a>
        <a href="../recommend/budget/index.html" class="nav-link">机场推荐</a>
        <a href="../ranking/overall/index.html" class="nav-link">机场排行</a>
        <a href="../review/yinxingren/index.html" class="nav-link">机场评测</a>
        <a href="../compare/index.html" class="nav-link">机场对比</a>
        <a href="index.html" class="nav-link active">使用教程</a>
        <a href="../blog/index.html" class="nav-link">博客文章</a>
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
        <a href="../index.html">首页</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">使用教程中心</span>
      </nav>
      <section class="hero-section" style="padding: 2rem 0; text-align: left;">
        <h1 class="hero-title" style="font-size: 2.2rem; margin-bottom: 0.75rem;">翻墙客户端与节点配置使用教程中心</h1>
        <p class="hero-desc" style="max-width: 800px; margin: 0 0 1.5rem 0;">汇集 30 篇针对全平台（Windows / Mac / iPhone / Android / 软路由 / 电视与游戏机）的保姆级实战指南。涵盖订阅导入、Tun 模式、分流策略组与防封锁抗干扰技巧，帮您彻底解决上网门槛。</p>
        <div style="background: var(--bg-alt); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;">
          <strong style="color: var(--primary);">常用分类导航：</strong>
          <a href="windows/index.html" class="btn btn-secondary btn-sm">Windows 电脑</a>
          <a href="macos/index.html" class="btn btn-secondary btn-sm">macOS 苹果电脑</a>
          <a href="ios/index.html" class="btn btn-secondary btn-sm">iOS 苹果手机</a>
          <a href="android/index.html" class="btn btn-secondary btn-sm">Android 安卓手机</a>
          <a href="router-openwrt/index.html" class="btn btn-secondary btn-sm">软路由 OpenWrt</a>
          <a href="apple-tv/index.html" class="btn btn-secondary btn-sm">Apple TV</a>
          <a href="chatgpt-unblock/index.html" class="btn btn-secondary btn-sm">ChatGPT 解锁</a>
        </div>
      </section>

      <section style="margin-top: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <h2 style="margin: 0; font-size: 1.4rem;">全部实战教程清单 (共 30 篇)</h2>
          <span style="font-size: 0.9rem; color: var(--text-muted);">已完成 2026 最新内核兼容性验证</span>
        </div>
        <div class="grid grid-3" style="gap: 1.25rem;">
          ${guideCardsHtml}
        </div>
      </section>
    </div>
  </main>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-bottom">
        <div>© 2026 VPNWorld.blog · 翻墙客户端教程中心</div>
        <div><a href="../sitemap.xml">Sitemap 网站地图</a></div>
      </div>
    </div>
  </footer>
  <script src="../js/airports.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>`;

fs.writeFileSync('guides/index.html', guidesIndexHtml, 'utf8');
console.log('Successfully written guides/index.html');

// 4. Build blog/index.html
const blogCardsHtml = allBlogs.map((b, idx) => `
  <article class="card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 1.5rem; transition: transform 0.2s, box-shadow 0.2s;" data-category="${b.category}">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span style="font-size: 0.8rem; font-weight: 600; background: var(--primary-light); color: var(--primary); padding: 3px 8px; border-radius: 4px;">${b.category}</span>
        <span style="font-size: 0.8rem; color: var(--text-muted);">文章 #${idx + 1}</span>
      </div>
      <h2 style="font-size: 1.15rem; margin-top: 0; margin-bottom: 0.75rem; line-height: 1.4;">
        <a href="${b.url}" style="color: var(--text-color); text-decoration: none;">${b.h1}</a>
      </h2>
      <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1rem;">${b.desc.slice(0, 85)}...</p>
    </div>
    <div>
      <a href="${b.url}" class="btn btn-secondary btn-sm" style="width: 100%; text-align: center;">阅读深度分析 →</a>
    </div>
  </article>
`).join('');

const blogIndexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>机场与VPN节点深度技术博客 (共100篇精选) - 选购避坑 / 协议解密 / AI与流媒体全景 | VPNWorld</title>
  <meta name="description" content="2026专业中文机场与VPN节点技术博客中心。收录 100 篇涵盖机场选购防跑路、IPLC/IEPL专线解析、ChatGPT/Claude解锁、Netflix奈飞跨区与联机游戏低延迟的深度干货文章。">
  <meta name="keywords" content="机场推荐, 梯子推荐, 性价比机场, 机场节点, vpn推荐, 选购机场避坑, 流媒体解锁, 专线技术">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://vpnworld.blog/blog/">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body data-root="../">
  <header class="site-header">
    <div class="container header-inner">
      <a href="../index.html" class="site-logo"><span class="logo-badge">VPN</span>World</a>
      <nav class="site-nav" id="site-nav">
        <a href="../index.html" class="nav-link">首页</a>
        <a href="../recommend/budget/index.html" class="nav-link">机场推荐</a>
        <a href="../ranking/overall/index.html" class="nav-link">机场排行</a>
        <a href="../review/yinxingren/index.html" class="nav-link">机场评测</a>
        <a href="../compare/index.html" class="nav-link">机场对比</a>
        <a href="../guides/index.html" class="nav-link">使用教程</a>
        <a href="index.html" class="nav-link active">博客文章</a>
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
        <a href="../index.html">首页</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">博客文章知识库</span>
      </nav>
      <section class="hero-section" style="padding: 2rem 0; text-align: left;">
        <h1 class="hero-title" style="font-size: 2.2rem; margin-bottom: 0.75rem;">机场与 VPN 节点技术博客与选购决策知识库</h1>
        <p class="hero-desc" style="max-width: 800px; margin: 0 0 1.5rem 0;">收录 100 篇原创技术干货与选购决策指南。从套餐资费暗坑、倍率猫腻、三网跨境路由适配，到 VLESS Reality 协议、AI 住宅 IP 纯净度与 Netflix 4K 原生解锁，全方位赋能您的网络决策。</p>
        <div style="background: var(--bg-alt); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;">
          <strong style="color: var(--primary);">热门专题速达：</strong>
          <a href="how-to-choose-airport/index.html" class="btn btn-secondary btn-sm">新手选购防坑</a>
          <a href="monthly-vs-annual-plan/index.html" class="btn btn-secondary btn-sm">月付 vs 年付</a>
          <a href="iplc-iepl-transit-explained/index.html" class="btn btn-secondary btn-sm">IPLC专线解析</a>
          <a href="chatgpt-plus-payment-and-ip-cleanliness/index.html" class="btn btn-secondary btn-sm">ChatGPT纯净IP</a>
          <a href="netflix-region-library-and-ranking/index.html" class="btn btn-secondary btn-sm">奈飞全球片库</a>
          <a href="steam-cross-region-purchase-ban-risk/index.html" class="btn btn-secondary btn-sm">Steam跨区防封</a>
        </div>
      </section>

      <section style="margin-top: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <h2 style="margin: 0; font-size: 1.4rem;">全部深度博文精选 (共 100 篇)</h2>
          <span style="font-size: 0.9rem; color: var(--text-muted);">持续同步更新 2026 行业最新评测标准</span>
        </div>
        <div class="grid grid-3" style="gap: 1.25rem;">
          ${blogCardsHtml}
        </div>
      </section>
    </div>
  </main>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-bottom">
        <div>© 2026 VPNWorld.blog · 博客文章系统</div>
        <div><a href="../sitemap.xml">Sitemap 网站地图</a></div>
      </div>
    </div>
  </footer>
  <script src="../js/airports.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>`;

fs.writeFileSync('blog/index.html', blogIndexHtml, 'utf8');
console.log('Successfully written blog/index.html');

// 5. Update sitemap.xml
// Collect all HTML files in project except 404
function walkHtml(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        results = results.concat(walkHtml(full));
      }
    } else if (file.endsWith('.html') && !file.includes('404')) {
      results.push(full);
    }
  });
  return results;
}

const allHtmlFiles = walkHtml('.');
const sitemapUrls = allHtmlFiles.map(f => {
  let relative = f.replace(/\\/g, '/');
  if (relative.startsWith('./')) relative = relative.slice(2);
  let cleanUrl = relative.replace(/index\.html$/, '');
  if (!cleanUrl.endsWith('/')) cleanUrl += '/';
  if (cleanUrl === '/') cleanUrl = '';
  return `https://vpnworld.blog/${cleanUrl}`;
});

// Remove duplicates and sort
const uniqueUrls = Array.from(new Set(sitemapUrls)).sort();

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>2026-03-01</lastmod>
    <changefreq>${url === 'https://vpnworld.blog/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === 'https://vpnworld.blog/' ? '1.0' : url.includes('/ranking/') || url.includes('/recommend/') ? '0.9' : url.includes('/review/') ? '0.85' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemapContent, 'utf8');
console.log(`Successfully updated sitemap.xml with ${uniqueUrls.length} URLs!`);
