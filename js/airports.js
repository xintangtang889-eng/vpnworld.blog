/**
 * VPNWorld.blog - Central Airports Database
 * Unified structured data source for recommendations, rankings, comparisons, and reviews.
 */

const AIRPORTS_DATA = [
  {
    id: "tag-vpn",
    name: "TAG VPN",
    slug: "tag-vpn",
    description: "老牌高端专线机场，节点覆盖全球90多个国家与冷门小众地区，全原生IP与IPLC专线保障，流媒体与AI工具极速解锁。",
    officialUrl: "https://tag-vpn.com",
    startingPrice: 53.3,
    currency: "¥",
    billingCycle: "季付起 (¥160/季)",
    plans: [
      { name: "特权个人版 (季付)", price: 160, traffic: 250, period: "quarterly", perGbCost: 0.21, unitPriceMonthly: 53.3 },
      { name: "特权标准版 (月付)", price: 99, traffic: 500, period: "monthly", perGbCost: 0.198, unitPriceMonthly: 99.0 },
      { name: "家庭分享版 (月付)", price: 199, traffic: 1000, period: "monthly", perGbCost: 0.199, unitPriceMonthly: 199.0 }
    ],
    protocols: ["Shadowsocks"],
    regions: ["香港", "台湾", "日本", "新加坡", "美国", "英国", "德国", "土耳其", "阿根廷", "及全球90+地区"],
    deviceLimit: "5~10 台在线设备",
    aiSupport: ["ChatGPT", "Claude", "Midjourney", "OpenAI API"],
    streamingSupport: ["Netflix", "Disney+", "YouTube Premium", "HBO Max", "BBC iPlayer"],
    advantages: [
      "全球节点地区最丰富（90+国家），包含冷门地区与原生住宅IP",
      "全专线内网传输（IPLC），晚高峰无丢包、低延迟",
      "AI生产力与4K/8K流媒体解锁能力强劲稳定",
      "运营超6年无跑路风险，技术支持响应迅速"
    ],
    disadvantages: [
      "门槛较高，无月付低价体验包（需季付起）",
      "价格偏高，不适合纯轻度刷网页用户"
    ],
    suitableFor: ["跨国外贸与跨境电商", "AI深度从业者", "多国流媒体与游戏玩家", "对稳定要求极高的商业用户"],
    sources: ["官方官网公开套餐公示", "2026年Q1实际测速与节点连通率统计"],
    lastVerified: "2026-03-01",
    testStatus: "tested",
    overallScore: 9.4,
    stabilityScore: 9.6,
    valueScore: 8.5
  },
  {
    id: "just-my-socks",
    name: "Just My Socks",
    slug: "just-my-socks",
    description: "知名VPS主机商搬瓦工（BandwagonHost）官方出品的翻墙代理服务，官方承诺IP被墙自动无感轮换，CN2 GIA与国际企业专线加持。",
    officialUrl: "https://justmysocks.net",
    startingPrice: 42.0,
    currency: "¥",
    billingCycle: "月付 ($5.88/月起)",
    plans: [
      { name: "JMS 500 Plan", price: 42.0, traffic: 500, period: "monthly", perGbCost: 0.084, unitPriceMonthly: 42.0 },
      { name: "JMS 1000 Plan", price: 71.0, traffic: 1000, period: "monthly", perGbCost: 0.071, unitPriceMonthly: 71.0 },
      { name: "JMS Tokyo 100", price: 215.0, traffic: 100, period: "monthly", perGbCost: 2.15, unitPriceMonthly: 215.0 }
    ],
    protocols: ["Shadowsocks", "V2Ray (Vmess)"],
    regions: ["美国洛杉矶", "日本东京", "英国伦敦", "香港", "荷兰阿姆斯特丹"],
    deviceLimit: "根据套餐限制 (3台设备起至不限)",
    aiSupport: ["ChatGPT", "Claude", "OpenAI API"],
    streamingSupport: ["YouTube Premium", "Netflix (部分节点支持)"],
    advantages: [
      "搬瓦工官方运营，老牌美资IT7企业背书，绝对零跑路风险",
      "核心杀手锏：IP被GFW封锁后后台自动秒换可用IP，省心省事",
      "支持双向CN2 GIA极速回程路由，晚高峰抗波动能力强",
      "支持支付宝与PayPal安全付款，支持全额退款保障期"
    ],
    disadvantages: [
      "仅提供少量主流节点，无冷门国家节点",
      "不支持一键节点规则转换，初学者需按教程配置",
      "香港和日本专线方案价格昂贵"
    ],
    suitableFor: ["追求绝对省心不折腾的用户", "极度担心机场跑路的稳健派", "外贸办公与学术科研人群"],
    sources: ["BandwagonHost IT7 官方公开服务协议", "客服工单及节点自动化IP更换实测"],
    lastVerified: "2026-02-28",
    testStatus: "official-data",
    overallScore: 9.2,
    stabilityScore: 9.8,
    valueScore: 8.8
  },
  {
    id: "flyingbird",
    name: "飞鸟机场 (FlyingBird)",
    slug: "flyingbird",
    description: "高速IEPL内网专线全中继机场，高性价比大流量梯子代表，提供完善的流媒体解锁与全天候晚高峰速率保障。",
    officialUrl: "https://flyingbird.com",
    startingPrice: 15.0,
    currency: "¥",
    billingCycle: "月付 (¥15.0/月起)",
    plans: [
      { name: "入门月付套餐", price: 15.0, traffic: 100, period: "monthly", perGbCost: 0.15, unitPriceMonthly: 15.0 },
      { name: "进阶超值套餐", price: 30.0, traffic: 250, period: "monthly", perGbCost: 0.12, unitPriceMonthly: 30.0 },
      { name: "高配旗舰套餐", price: 60.0, traffic: 600, period: "monthly", perGbCost: 0.10, unitPriceMonthly: 60.0 }
    ],
    protocols: ["Shadowsocks", "Trojan"],
    regions: ["香港", "台湾", "日本", "新加坡", "美国", "韩国", "英国", "澳大利亚"],
    deviceLimit: "不限在线设备数（合理使用原则）",
    aiSupport: ["ChatGPT", "Claude", "Perplexity", "Midjourney"],
    streamingSupport: ["Netflix", "Disney+", "YouTube 4K", "Bilibili港澳台"],
    advantages: [
      "入门价格亲民，低至15元/月起，支持按月续费试错成本低",
      "全IEPL企业内网专线过境，敏感时期断流概率极低",
      "节点倍率清晰，绝大部分为1.0x真实倍率无套路",
      "全节点解锁奈飞4K与ChatGPT，晚高峰8K视频秒开无缓冲"
    ],
    disadvantages: [
      "无小众冷门国家节点覆盖",
      "高峰期在线客服工单需排队处理"
    ],
    suitableFor: ["大学生与刚工作的年轻白领", "追剧看4K高清视频爱好者", "对性价比要求高的通用翻墙用户"],
    sources: ["飞鸟机场官方购买面板", "全国多地电信/联通/移动晚高峰实测日志"],
    lastVerified: "2026-03-01",
    testStatus: "tested",
    overallScore: 9.1,
    stabilityScore: 9.1,
    valueScore: 9.6
  },
  {
    id: "kuaigou",
    name: "快狗云 (KuaiGou)",
    slug: "kuaigou",
    description: "百兆BGP优质隧道中继平民平价机场，主打轻量平价与学生预算，百GB流量低至10元以内，低成本翻墙首选。",
    officialUrl: "https://kuaigou.io",
    startingPrice: 9.9,
    currency: "¥",
    billingCycle: "月付 (¥9.9/月起)",
    plans: [
      { name: "基础轻量套餐", price: 9.9, traffic: 80, period: "monthly", perGbCost: 0.123, unitPriceMonthly: 9.9 },
      { name: "标准实用套餐", price: 18.0, traffic: 200, period: "monthly", perGbCost: 0.09, unitPriceMonthly: 18.0 },
      { name: "大流量年付特惠", price: 108.0, traffic: 1500, period: "yearly", perGbCost: 0.072, unitPriceMonthly: 9.0 }
    ],
    protocols: ["Shadowsocks", "Vmess"],
    regions: ["香港", "台湾", "日本", "新加坡", "美国"],
    deviceLimit: "限制 3 台设备",
    aiSupport: ["ChatGPT (部分指定节点支持)"],
    streamingSupport: ["YouTube 1080P/4K", "Netflix (部分非自制剧解锁)"],
    advantages: [
      "价格极致便宜，百元即可包年，学生党零负担",
      "多入口智能BGP解析，不同宽带运营商自动选择最优入口",
      "支持主流订阅转换，一键导入Clash与v2rayNG"
    ],
    disadvantages: [
      "突发网络敏感期偶有线路维护抖动",
      "冷门流媒体如Disney+解锁不稳定",
      "客服回复时间通常仅在日间工作时段"
    ],
    suitableFor: ["预算极低的学生与备用梯子需求者", "仅需Google搜索与查阅资料的轻度用户"],
    sources: ["快狗云用户中心价目表", "节点连通率监控记录"],
    lastVerified: "2026-02-25",
    testStatus: "official-data",
    overallScore: 8.6,
    stabilityScore: 8.4,
    valueScore: 9.7
  },
  {
    id: "flowercloud",
    name: "花云 (FlowerCloud)",
    slug: "flowercloud",
    description: "行业标杆级高品质BGP入口+企业级专线机场，原生住宅落地节点，超低网络抖动与极佳游戏/外贸加速体验。",
    officialUrl: "https://flowercloud.net",
    startingPrice: 38.0,
    currency: "¥",
    billingCycle: "月付 (¥38.0/月起)",
    plans: [
      { name: "AIR 体验版", price: 38.0, traffic: 150, period: "monthly", perGbCost: 0.253, unitPriceMonthly: 38.0 },
      { name: "PRO 专业版", price: 68.0, traffic: 350, period: "monthly", perGbCost: 0.194, unitPriceMonthly: 68.0 },
      { name: "MAX 旗舰版", price: 118.0, traffic: 800, period: "monthly", perGbCost: 0.147, unitPriceMonthly: 118.0 }
    ],
    protocols: ["Shadowsocks", "Trojan"],
    regions: ["香港", "台湾", "日本", "新加坡", "美国", "英国", "德国", "法国", "韩国"],
    deviceLimit: "5 台在线设备",
    aiSupport: ["ChatGPT Plus", "Claude 3.5 Sonnet", "Midjourney", "Sora"],
    streamingSupport: ["Netflix 4K", "Disney+", "Hulu", "DAZN", "YouTube Premium"],
    advantages: [
      "顶级BGP三网优化入口，全IEPL专用金融级专线，丢包率趋近于0",
      "极速4K/8K视频秒开，拖拽进度条无任何卡顿等待",
      "对ChatGPT防封控检测极为出色，住宅原生IP保证账号安全",
      "技术团队专业度极高，维护预告透明及时"
    ],
    disadvantages: [
      "定价属于中高端水平，轻度用户性价比不高",
      "常年限量注册，偶尔出现缺货无法立即购买"
    ],
    suitableFor: ["对网络品质有极致苛求的专业用户", "外贸跨境电商店铺防封管理", "重度外服游戏与4K影音爱好者"],
    sources: ["花云官方通知公告与套餐列表", "跨ISP网络丢包率与TCP延迟实测"],
    lastVerified: "2026-03-01",
    testStatus: "tested",
    overallScore: 9.5,
    stabilityScore: 9.7,
    valueScore: 8.7
  }
];

if (typeof window !== "undefined") {
  window.AIRPORTS_DATA = AIRPORTS_DATA;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { AIRPORTS_DATA };
}
