const fs = require('fs');
const path = require('path');

// 1. Load airports data from js/airports.js
const airportsCode = fs.readFileSync(path.join(__dirname, '../js/airports.js'), 'utf8');
const matchData = airportsCode.match(/const AIRPORTS_DATA = (\[[\s\S]*?\]);\s*if \(typeof window/);
let AIRPORTS_DATA = [];
if (matchData) {
  AIRPORTS_DATA = eval(matchData[1]);
} else {
  eval(airportsCode.replace(/if \(typeof window[\s\S]*/, ''));
}

console.log(`Loaded ${AIRPORTS_DATA.length} airport brands for TDK update.`);

let updatedCount = 0;

AIRPORTS_DATA.forEach(b => {
  const brandName = b.name;
  const startingPrice = b.startingPrice;
  const traffic = b.traffic || '充沛流量';
  const lineType = b.lineType || '优质线路';
  const coupon = b.coupon;

  // ================= 1. Update review/[slug]/index.html =================
  const reviewFile = path.join(__dirname, '../review', b.slug, 'index.html');
  if (fs.existsSync(reviewFile)) {
    let content = fs.readFileSync(reviewFile, 'utf8');

    // Title: 品牌如何？套餐价格/月付流量/节点线路与晚高峰测速实测报告 | VPNWorld
    const reviewTitle = `${brandName}如何？2026最新套餐价格/月付流量/节点线路与晚高峰测速实测报告 | VPNWorld`;
    
    // Description: 专业、详尽、涵盖所有要求参数
    const couponDesc = coupon ? `专属优惠码【${coupon}】、` : '';
    const reviewDesc = `【2026权威实测】${brandName}到底如何、好不好用？本文深度评测${brandName}最新套餐价格（${startingPrice}元/月起）、月度可用流量（${traffic}）、节点线路架构（${lineType}）与晚高峰真连接测速表现，包含${couponDesc}流媒体与ChatGPT解锁及避坑选购建议。`;

    // Keywords: 完整覆盖搜索意图
    const reviewKeywords = `${brandName}, ${brandName}如何, ${brandName}怎么样, ${brandName}套餐价格, ${brandName}流量, ${brandName}节点测速, ${brandName}官网, 机场推荐, 性价比机场, 梯子推荐, vpn节点`;

    // H1
    const reviewH1 = `${brandName}如何？2026最新套餐价格、流量档位、节点线路与测速实测全解析`;

    // Replace Title
    content = content.replace(/<title>[\s\S]*?<\/title>/, `<title>${reviewTitle}</title>`);
    // Replace Meta Description
    content = content.replace(/<meta name="description" content="[\s\S]*?">/, `<meta name="description" content="${reviewDesc}">`);
    // Replace Meta Keywords
    if (content.includes('<meta name="keywords"')) {
      content = content.replace(/<meta name="keywords" content="[\s\S]*?">/, `<meta name="keywords" content="${reviewKeywords}">`);
    } else {
      content = content.replace(/<meta name="description"[^>]*>/, `$& \n  <meta name="keywords" content="${reviewKeywords}">`);
    }
    // Replace H1
    content = content.replace(/<h1 class="hero-title"[^>]*>[\s\S]*?<\/h1>/, `<h1 class="hero-title" style="text-align: left; font-size: 2.2rem; margin-bottom: 0.5rem;">${reviewH1}</h1>`);

    fs.writeFileSync(reviewFile, content, 'utf8');
    updatedCount++;
    console.log(`[Review] Updated TDK for ${b.slug} (${brandName})`);
  } else {
    console.warn(`Review file not found: ${reviewFile}`);
  }

  // ================= 2. Update airport/[slug]/index.html =================
  const airportFile = path.join(__dirname, '../airport', b.slug, 'index.html');
  if (fs.existsSync(airportFile)) {
    let content = fs.readFileSync(airportFile, 'utf8');

    // Title: 品牌怎么样？官方套餐价格/流量配置/节点线路与测速参数档案 | VPNWorld
    const airportTitle = `${brandName}怎么样？官方套餐价格/流量配置/节点线路与测速参数档案 | VPNWorld`;

    // Description
    const couponDesc = coupon ? `凭优惠码【${coupon}】享折扣，` : '';
    const airportDesc = `【官方参数档案】${brandName}到底怎么样、如何选择？收录${brandName}2026年最新官方套餐价格（${startingPrice}元/月起）、月度流量（${traffic}）、节点线路架构（${lineType}）与测速参数信息，${couponDesc}助您全方位核验官方真实资质。`;

    // Keywords
    const airportKeywords = `${brandName}, ${brandName}怎么样, ${brandName}如何, ${brandName}套餐价格, ${brandName}流量, ${brandName}节点, ${brandName}官网, 机场推荐, vpn节点`;

    // H1
    const airportH1 = `${brandName}如何？官方套餐价格、流量规格、节点线路与测速档案`;

    // Replace Title
    content = content.replace(/<title>[\s\S]*?<\/title>/, `<title>${airportTitle}</title>`);
    // Replace Meta Description
    content = content.replace(/<meta name="description" content="[\s\S]*?">/, `<meta name="description" content="${airportDesc}">`);
    // Replace Meta Keywords
    if (content.includes('<meta name="keywords"')) {
      content = content.replace(/<meta name="keywords" content="[\s\S]*?">/, `<meta name="keywords" content="${airportKeywords}">`);
    } else {
      content = content.replace(/<meta name="description"[^>]*>/, `$& \n  <meta name="keywords" content="${airportKeywords}">`);
    }
    // Replace H1
    content = content.replace(/<h1 class="hero-title"[^>]*>[\s\S]*?<\/h1>/, `<h1 class="hero-title" style="text-align: left; font-size: 2.2rem; margin-bottom: 0.5rem;">${airportH1}</h1>`);

    fs.writeFileSync(airportFile, content, 'utf8');
    updatedCount++;
    console.log(`[Airport] Updated TDK for ${b.slug} (${brandName})`);
  } else {
    console.warn(`Airport file not found: ${airportFile}`);
  }
});

console.log(`TDK update completed for ${updatedCount} pages.`);
