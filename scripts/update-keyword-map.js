const fs = require('fs');
const path = require('path');

const airportsCode = fs.readFileSync(path.join(__dirname, '../js/airports.js'), 'utf8');
const matchData = airportsCode.match(/const AIRPORTS_DATA = (\[[\s\S]*?\]);\s*if \(typeof window/);
let AIRPORTS_DATA = [];
if (matchData) {
  AIRPORTS_DATA = eval(matchData[1]);
} else {
  eval(airportsCode.replace(/if \(typeof window[\s\S]*/, ''));
}

let csvLines = [
  'Keyword,Intent,Target URL,Page Type,Priority,Title,H1',
  '机场推荐,Transactional / Commercial,https://vpnworld.blog/,Homepage,P0,机场推荐2026 - 稳定高性价比VPN机场节点与梯子推荐网 | VPNWorld,2026 稳定机场推荐与VPN节点测评中心',
  'vpn推荐,Transactional / Commercial,https://vpnworld.blog/,Homepage,P0,机场推荐2026 - 稳定高性价比VPN机场节点与梯子推荐网 | VPNWorld,2026 稳定机场推荐与VPN节点测评中心',
  '梯子推荐,Transactional / Commercial,https://vpnworld.blog/,Homepage,P0,机场推荐2026 - 稳定高性价比VPN机场节点与梯子推荐网 | VPNWorld,2026 稳定机场推荐与VPN节点测评中心',
  'vpn机场,Informational / Commercial,https://vpnworld.blog/,Homepage,P1,机场推荐2026 - 稳定高性价比VPN机场节点与梯子推荐网 | VPNWorld,2026 稳定机场推荐与VPN节点测评中心',
  '性价比机场,Commercial Investigation,https://vpnworld.blog/recommend/budget/,Category / Pillar,P0,性价比机场推荐 - 便宜好用的高性价比VPN节点梯子合集 | VPNWorld,2026 高性价比与便宜机场节点推荐清单',
  '性价比机场排行,Commercial Investigation,https://vpnworld.blog/ranking/value/,Ranking,P0,性价比机场排行榜 - 每GB单价与套餐流量实测对比榜单 | VPNWorld,真实性价比机场排行榜',
  '机场节点,Informational / Commercial,https://vpnworld.blog/ranking/overall/,Ranking,P0,2026 综合机场排行榜 - 翻墙梯子与VPN节点多维度综合测评 | VPNWorld,2026年中文机场综合实力排行榜',
  'vpn节点,Informational / Commercial,https://vpnworld.blog/ranking/overall/,Ranking,P1,2026 综合机场排行榜 - 翻墙梯子与VPN节点多维度综合测评 | VPNWorld,2026年中文机场综合实力排行榜',
  '高端专线机场,Commercial,https://vpnworld.blog/recommend/premium/,Category,P1,高端专线机场推荐 - 原生IPLC/IEPL企业级高速VPN节点 | VPNWorld,高端企业级 IPLC/IEPL 专线机场推荐',
  '新手翻墙梯子,Informational / Commercial,https://vpnworld.blog/recommend/beginner/,Category,P1,新手入门机场推荐 - 一键连接、中文客服与零基础翻墙教程 | VPNWorld,新手友好型翻墙梯子与机场推荐',
  '稳定防封机场,Commercial,https://vpnworld.blog/recommend/stable/,Category,P1,稳定防封机场推荐 - 晚高峰不卡顿的高可用VPN节点盘点 | VPNWorld,2026 稳定优先防封机场推荐',
  'ChatGPT机场,Commercial,https://vpnworld.blog/recommend/ai/,Category,P1,ChatGPT与AI专用机场推荐 - 原生纯净住宅IP不封号节点 | VPNWorld,ChatGPT / Claude / OpenAI 专用机场推荐',
  '流媒体机场节点,Commercial,https://vpnworld.blog/recommend/streaming/,Category,P1,流媒体解锁机场推荐 - 4K秒开奈飞Netflix/Disney+/YouTube节点 | VPNWorld,4K流媒体解锁专线机场推荐',
  '平民便宜机场,Commercial,https://vpnworld.blog/ranking/budget/,Ranking,P1,低预算平民机场排行榜 - 10元内月付与平价VPN节点盘点 | VPNWorld,低预算平价机场排行榜',
  '节点稳定性排行,Commercial Investigation,https://vpnworld.blog/ranking/stable/,Ranking,P1,节点稳定性排行榜 - SLA在线率与晚高峰丢包率实测排行榜 | VPNWorld,节点稳定性与在线率排行榜',
  '机场对比,Commercial Investigation,https://vpnworld.blog/compare/,Tool,P0,机场横向对比工具 - 2~4家VPN机场节点参数/价格/协议在线对比 | VPNWorld,机场与VPN节点在线多维横向对比工具',
  '使用教程中心,Informational,https://vpnworld.blog/guides/,Hub,P0,翻墙客户端与节点配置教程中心 (共30篇) - Clash / Sing-box / Surge 全平台实操 | VPNWorld,翻墙客户端与节点配置使用教程中心',
  '博客文章知识库,Informational,https://vpnworld.blog/blog/,Hub,P0,机场与VPN节点深度技术博客 (共100篇精选) - 选购避坑 / 协议解密 / AI与流媒体全景 | VPNWorld,机场与 VPN 节点技术博客与选购决策知识库'
];

AIRPORTS_DATA.forEach(b => {
  csvLines.push(`${b.name}如何,Commercial Investigation,https://vpnworld.blog/review/${b.slug}/,Review,P1,${b.name}如何？2026最新套餐价格/月付流量/节点线路与晚高峰测速实测报告 | VPNWorld,${b.name}如何？2026最新套餐价格、流量档位、节点线路与测速实测全解析`);
  csvLines.push(`${b.name}怎么样,Commercial Investigation,https://vpnworld.blog/airport/${b.slug}/,Profile,P1,${b.name}怎么样？官方套餐价格/流量配置/节点线路与测速参数档案 | VPNWorld,${b.name}如何？官方套餐价格、流量规格、节点线路与测速档案`);
});

fs.writeFileSync(path.join(__dirname, '../docs/keyword-map.csv'), csvLines.join('\n'), 'utf8');
console.log('Successfully updated docs/keyword-map.csv with', csvLines.length, 'entries.');
