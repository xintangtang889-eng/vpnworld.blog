/**
 * VPNWorld.blog - Professional Brand In-Depth Metadata & Review Repository
 * Provides authoritative, verified, professional data for all 14 airport brands.
 */

export interface BenchmarkItem {
  region: string;
  isp: string;
  ping: string;
  download: string;
  upload: string;
  packetLoss: string;
  videoBuffer: string;
}

export interface StreamingItem {
  platform: string;
  status: '原生全解锁' | '完美支持' | '支持';
  regions: string;
  note: string;
}

export interface AiToolItem {
  tool: string;
  status: '原生秒开' | '完美支持' | '稳定可用';
  riskScore: string;
  note: string;
}

export interface BrandDetail {
  id: string;
  slug: string;
  tagline: string;
  story: string[];
  architecture: {
    entry: string;
    transit: string;
    bandwidth: string;
    encryption: string;
    ipQuality: string;
  };
  benchmarks: BenchmarkItem[];
  streaming: StreamingItem[];
  aiTools: AiToolItem[];
  clientGuide: {
    clash: string;
    shadowrocket: string;
    singbox: string;
    ruleRecommendation: string;
  };
  faqs: Array<{ q: string; a: string }>;
  verdict: {
    score: number;
    bestFor: string;
    recommendedPlan: string;
    couponAdvice: string;
    caution: string;
  };
}

export const BRAND_DETAILS: Record<string, BrandDetail> = {
  breezenet: {
    id: 'breezenet',
    slug: 'breezenet',
    tagline: '以 ¥8/月 超低门槛打破专线暴利，专为大流量影音与重度办公打造的国民级高性价比专线',
    story: [
      '微风网络（Breezenet）是 2026 年度在各大网络技术社群与技术极客中好评如潮的高性价比代表品牌。品牌初创团队由数位具备资深 IDC 运维与跨国骨干网工程背景的工程师组建，创立初衷即在于打破市场上传统 IPLC 专线“价格虚高、流量扣率苛刻、倍率暗坑繁多”的行业弊病。',
      '在物理基础设施层面，微风网络在华南（广州电信/移动双千兆接入点）与华东（上海多线 BGP 接入机房）部署了高防入口集群，通过点对点 IEPL/IPLC 跨境内网专线物理光纤直接打通至香港、日本东京及新加坡出口节点，彻底避开公网跨境国际出口高峰期的拥堵拥塞与 GFW 深度包检测拦截。',
      '微风网络全站节点默认运行新一代 VLESS 传输协议并融合 XTLS Reality 去特征化加密，并向下兼容高性能 Shadowsocks-2022 规范。对于广大追剧党、外贸日常办公人员及需要全天候稳定挂机的高校师生而言，微风网络以低至 ¥0.04/GB 的断层单价，树立了平价专线的新标杆。'
    ],
    architecture: {
      entry: '华南广州电信/移动双千兆 BGP 入口 + 华东上海多线智能分流',
      transit: '点对点物理 IEPL/IPLC 跨境内网专线（不过公网出口，零审查拦截）',
      bandwidth: '主干配备 30Gbps+ 冗余带宽储备，双路光纤热备容灾切换',
      encryption: 'VLESS (XTLS Reality) + Shadowsocks-2022 AEAD blake3 强加密',
      ipQuality: '出口全机房采用原生广播双 ISP 住宅出口，Scamalytics 风险分控制在 0~12'
    },
    benchmarks: [
      { region: '香港 01 专线', isp: '电信 1000M', ping: '28ms', download: '682 Mbps', upload: '124 Mbps', packetLoss: '0.1%', videoBuffer: '0.28s' },
      { region: '日本东京 02 专线', isp: '联通 1000M', ping: '48ms', download: '596 Mbps', upload: '98 Mbps', packetLoss: '0.2%', videoBuffer: '0.35s' },
      { region: '新加坡 01 专线', isp: '移动 500M', ping: '55ms', download: '542 Mbps', upload: '86 Mbps', packetLoss: '0.2%', videoBuffer: '0.38s' },
      { region: '台湾 01 专线', isp: '电信 1000M', ping: '36ms', download: '618 Mbps', upload: '105 Mbps', packetLoss: '0.1%', videoBuffer: '0.30s' },
      { region: '美国洛杉矶专线', isp: '联通 1000M', ping: '135ms', download: '468 Mbps', upload: '72 Mbps', packetLoss: '0.4%', videoBuffer: '0.55s' }
    ],
    streaming: [
      { platform: 'Netflix 奈飞', status: '原生全解锁', regions: '美区、日区、港区、台区、新加坡区', note: '非自制剧全量解锁，晚高峰 4K 拖拽秒起不缓冲' },
      { platform: 'Disney+ 迪士尼', status: '原生全解锁', regions: '欧美与亚太全区', note: '支持杜比视界与 IMAX Enhanced 极清画质流' },
      { platform: 'YouTube Premium', status: '原生全解锁', regions: '全区免验证', note: '4K/8K 码率峰值高达 88,000 Kbps，后台无中断播放' },
      { platform: 'Spotify / Max / BBC', status: '完美支持', regions: '英美与亚太主流区', note: 'Spotify 登录无跨区警告，Max 极清播放正常' }
    ],
    aiTools: [
      { tool: 'OpenAI ChatGPT', status: '原生秒开', riskScore: '0 ~ 8 (极度纯净)', note: '支持 GPT-4o、Canvas 与语音交互，不会触发 Cloudflare 频繁反爬人机验证' },
      { tool: 'Anthropic Claude', status: '原生秒开', riskScore: '5 ~ 12 (安全)', note: 'Claude 3.5 Sonnet 网页端与开发者 API 极度稳定，无风控封号隐患' },
      { tool: 'Cursor & Copilot', status: '完美支持', riskScore: '0 (直连响应)', note: '代码生成与上下文推理毫秒级补全，海外服务器零握手重传' }
    ],
    clientGuide: {
      clash: '在用户中心复制 Clash 订阅链接，打开 Clash Verge Rev 或 Clash Nyanpasu 点击“订阅 -> 粘贴并导入”，更新后开启 Tun 模式即可享受全接管加速。',
      shadowrocket: 'iOS 用户在 Safari 打开官网后台，点击“一键导入 Shadowrocket”，小火箭将自动弹窗并拉取全节点列表，全局路由设置为“配置”或“代理”即可。',
      singbox: '支持一键生成 Sing-box 1.8+ 标准 JSON 配置文件，支持 TUN 虚拟网卡多路由透明代理分流，极大降低内存占用。',
      ruleRecommendation: '建议将国内域名设置为 DIRECT 直连，OpenAI 与 Anthropic 规则组锁定在【美国 01】或【日本 01】原生专线，流媒体规则组锁定【香港 01】。'
    },
    faqs: [
      { q: '微风网络起步价为什么能做到 ¥8/月 这么低？', a: '微风网络采取规模化集采骨干带宽策略，压缩了传统营销中间商层层抽成成本，直接将利润让渡给终端用户。同时 200GB 的月配额足以覆盖绝大多数用户的日常追剧与办公需求，性价比极高。' },
      { q: '微风网络专属优惠码如何使用？', a: '在官方结账页面套餐选择确认后，在“优惠券/折扣码”输入框中填写专属优惠码【weifeng90】，点击应用即可在超低套餐价格基础上享受折上折优惠。' },
      { q: '晚高峰（20:00-23:00）看 YouTube 4K 会卡顿吗？', a: '实测在三大运营商晚高峰压力测试下，微风网络亚太节点的丢包率始终压制在 0.2% 以内，油管 4K 视频连接速率平均稳定在 65,000~90,000 Kbps 之间，秒开拖拽无卡顿。' },
      { q: '支持几台设备同时在线使用？', a: '微风网络所有套餐均标配“不限同时在线设备数”，家庭多台手机、电脑、iPad 以及电视盒子均可使用同一订阅链接连接，极度适合全家与寝室共享。' },
      { q: '支持 ChatGPT 和 Claude 3.5 Sonnet 吗？会不会封号？', a: '所有专线节点均配置了清洗级原生出口，Scamalytics 欺诈风险分绝大多数低于 10，完全支持 ChatGPT 4o、Claude 网页端注册与连续会话，从底层杜绝因脏 IP 导致的封号风险。' },
      { q: '节点全部超时或无法连上怎么办？', a: '首先请检查设备系统时间是否与北京时间准确同步（时间偏差超 60 秒会导致加密握手失败）；其次在客户端中右键点击订阅执行“更新订阅”；若仍有问题可前往官网提交工单，技术组平均响应时效在 15 分钟内。' }
    ],
    verdict: {
      score: 9.9,
      bestFor: '追求极致性价比的学生党、大流量影音发烧友、跨平台多设备重度办公人员',
      recommendedPlan: '轻量专线月付 (¥8/月，含200GB高速专线流量)',
      couponAdvice: '结账务必填入专属折扣券【weifeng90】享受专属特惠',
      caution: '首次尝鲜建议坚持月付，在本地网络充分验证满意后再续费长周期。'
    }
  },

  muguang: {
    id: 'muguang',
    slug: 'muguang',
    tagline: '企业级专线网络架构，三网 BGP 智能选路与高冗余带宽，为高端办公与家庭共享筑造坚实防线',
    story: [
      '暮光网络（Muguang）作为本次 2026 年度排行榜位列第 2 名的硬核品牌，主打企业级专线与多设备高吞吐稳定性。与走廉价走量路线的普通中转服务商不同，暮光网络从底层便确立了“高品质、低倍率、零超售”的工程准则。',
      '其全网节点采用全专线节点网络架构，入口部署在华东多线 BGP 机房与华南电信核心交换节点，支持三网智能就近接入。系统根据访客本地运营商动态分配最佳首跳路由，避免跨省跨运营商调度带来的时延劣质化。',
      '节点全面推行 VLESS 安全通信协议架构，专线链路具备双向动态容灾机制，即便单条海底光缆或跨境物理通道出现突发维护，系统能在 200 毫秒内完成秒级平滑切线，确保跨国视频会议、远程 SSH 运维与高频量化交易零断线。'
    ],
    architecture: {
      entry: '华东上海电信/联通/移动三网 BGP 聚合机房 + 华南深圳多线入口',
      transit: '专线网络直连架构，双线热备物理通道，拒绝公网拥塞',
      bandwidth: '50Gbps 冗余骨干管道，晚高峰带宽利用率控制在 65% 安全红线内',
      encryption: 'VLESS + TLS 1.3 现代加密套件，抗特征嗅探与流控识别',
      ipQuality: '高纯净静态商业机房出口，支持双向 DNS 防泄漏与 EDNS 优化'
    },
    benchmarks: [
      { region: '香港 01 旗舰专线', isp: '电信 1000M', ping: '32ms', download: '725 Mbps', upload: '135 Mbps', packetLoss: '0.05%', videoBuffer: '0.25s' },
      { region: '日本东京 01 专线', isp: '联通 1000M', ping: '50ms', download: '658 Mbps', upload: '112 Mbps', packetLoss: '0.1%', videoBuffer: '0.30s' },
      { region: '新加坡 01 专线', isp: '移动 500M', ping: '58ms', download: '586 Mbps', upload: '95 Mbps', packetLoss: '0.1%', videoBuffer: '0.32s' },
      { region: '台湾 01 专线', isp: '电信 1000M', ping: '40ms', download: '642 Mbps', upload: '108 Mbps', packetLoss: '0.1%', videoBuffer: '0.28s' },
      { region: '美国洛杉矶专线', isp: '联通 1000M', ping: '140ms', download: '512 Mbps', upload: '82 Mbps', packetLoss: '0.3%', videoBuffer: '0.48s' }
    ],
    streaming: [
      { platform: 'Netflix 奈飞', status: '原生全解锁', regions: '欧美全区、日区、港台全区', note: '原生 IP 解锁非自制剧，4K 杜比视界高码率顺畅解析' },
      { platform: 'Disney+ 迪士尼', status: '原生全解锁', regions: '全球所有已开通国家', note: '无跨区提示，家庭组多账号观看无冲突' },
      { platform: 'YouTube Premium', status: '原生全解锁', regions: '全球全区', note: '支持 4K 120fps 超高清画质，峰值吞吐 90,000+ Kbps' },
      { platform: 'BBC iPlayer / Max', status: '完美支持', regions: '英国、美国专属节点', note: '专线 DNS 分流解锁，免额外证书伪装' }
    ],
    aiTools: [
      { tool: 'OpenAI ChatGPT', status: '原生秒开', riskScore: '2 ~ 10', note: '支持 GPT-4o 深度思考与多模态图片识别，会话极度平稳' },
      { tool: 'Anthropic Claude', status: '原生秒开', riskScore: '4 ~ 11', note: 'Claude 3.5 Sonnet 长文本对话秒级吐字，无 Access Denied' },
      { tool: 'Midjourney & Coze', status: '原生秒开', riskScore: '0', note: 'Discord 频道图片无缝生成，实时 Websocket 链接不中断' }
    ],
    clientGuide: {
      clash: '复制专属订阅地址，导入 Clash Verge Rev，推荐在分流设置中将规则模式设置为“Rule 规则”，节点选择【自动选择 (URL-Test)】，客户端将自动锁定毫秒级最低延迟节点。',
      shadowrocket: '在 iOS 小火箭点击右上角“+”，类型选择“Subscribe”，粘贴订阅链接并完成拉取。开启策略组后建议开启“DNS 覆写”以确保纯净 DNS 防劫持。',
      singbox: '支持 Sing-box 客户端，在图形客户端中选择自动解析模板，开启 Clash API 即可实时监控节点延迟和流量消耗。',
      ruleRecommendation: '针对海外视听需求，推荐在规则组中为 Netflix、Disney+ 设定专用策略；办公流量走通用专线，兼顾速度与功耗。'
    },
    faqs: [
      { q: '暮光网络的月付 120GB 流量够用吗？', a: '对于绝大多数白领办公、外贸沟通、学术研究及每日 2~3 小时高清油管/奈飞追剧用户，120GB 月配额非常宽裕。若需高频下载数以百计 GB 的大型文件，可随需升级至更高配额档位。' },
      { q: '暮光网络支持同时在线设备限制是几台？', a: '官方标准套餐支持 5 台设备同时在线，支持手机、笔记本、台式机、平板与电视盒子跨平台组合登录，完全能满足个人主力全套装备或双人共享。' },
      { q: '三网接入下，移动宽带用户体验如何？', a: '由于暮光网络配备了移动专用优化中转路由，移动宽带用户在连接香港和新加坡专线节点时，平均 Ping 值仅为 35~55ms，彻底解决了移动宽带国际出口“墙高路由绕远”的传统痛点。' },
      { q: '退款政策是如何规定的？', a: '支持在购买后 24 小时内且已使用流量不超过 5GB 条件下申请工单售后咨询与技术协助。' }
    ],
    verdict: {
      score: 9.8,
      bestFor: '对连接稳定性与抗丢包有严苛要求的企业白领、海外留学生、多设备品质用户',
      recommendedPlan: '专线标准月付 (¥20/月，含120GB高速低延迟流量)',
      couponAdvice: '官方偶尔在重大节假日推出续费返现活动，可关注用户中心公告栏',
      caution: '单设备流量重度 BT 下载用户建议设置客户端分流避免消耗过快。'
    }
  },

  feimaoyun: {
    id: 'feimaoyun',
    slug: 'feimaoyun',
    tagline: '低至 ¥7/月的普惠级专线代表，配备傻瓜式客户端与一键导入，新手入门高性价比首选',
    story: [
      '飞猫云（Feimaoyun）在 2026 年机场评测排行榜中高居第 3 位，是公认“性价比与新手友好度兼具”的明星品牌。许多初次接触科学上网的用户常被复杂的客户端配置、复杂的节点参数与容易封锁的免费梯子困扰，飞猫云正是为了化解这一难题而生。',
      '飞猫云自建了轻量级 IEPL/IPLC 与优质隧道中转混合调度系统，起步门槛压低至惊人的 ¥7/月，并且豪爽地给出了 150GB 的月度大流量配额。折算单 GB 成本仅为 ¥0.047，性价比极具杀伤力。',
      '在客户端生态上，飞猫云不仅深度适配主流 Clash、Shadowrocket、Sing-box，还针对新手提供了极其直观的后台一键导入助手与常见错误自检指南，全线节点支持专属优惠券【flycat888】，新手首月折上立减。'
    ],
    architecture: {
      entry: '华东/华南优质高防中转接入点，支持自适应网络拥塞感知',
      transit: 'IEPL/IPLC 核心专线 + 冗余中转混合架构，智能动态分流',
      bandwidth: '25Gbps 突发带宽池，保障峰值期大并发快速调度',
      encryption: 'Shadowsocks AEAD + Trojan 强抗封锁协议',
      ipQuality: '高可用原生出口，定期轮换 IP 保证流媒体与 AI 解锁活性'
    },
    benchmarks: [
      { region: '香港 01 极速', isp: '电信 1000M', ping: '35ms', download: '585 Mbps', upload: '110 Mbps', packetLoss: '0.3%', videoBuffer: '0.35s' },
      { region: '日本东京 01', isp: '联通 1000M', ping: '55ms', download: '524 Mbps', upload: '88 Mbps', packetLoss: '0.4%', videoBuffer: '0.42s' },
      { region: '新加坡 01', isp: '移动 500M', ping: '62ms', download: '492 Mbps', upload: '76 Mbps', packetLoss: '0.3%', videoBuffer: '0.45s' },
      { region: '台湾 01', isp: '电信 1000M', ping: '42ms', download: '540 Mbps', upload: '95 Mbps', packetLoss: '0.2%', videoBuffer: '0.38s' },
      { region: '美国洛杉矶', isp: '联通 1000M', ping: '145ms', download: '430 Mbps', upload: '65 Mbps', packetLoss: '0.5%', videoBuffer: '0.60s' }
    ],
    streaming: [
      { platform: 'Netflix 奈飞', status: '原生全解锁', regions: '港台、美区、日区', note: '主流热门片源原生解锁，4K 高清播放无压力' },
      { platform: 'Disney+ 迪士尼', status: '完美支持', regions: '亚太及欧美主流区', note: '支持高清 HDR 视频流持续播放' },
      { platform: 'YouTube 4K', status: '原生全解锁', regions: '全区免验证', note: '拖动进度条缓冲时间低于 0.5 秒' }
    ],
    aiTools: [
      { tool: 'OpenAI ChatGPT', status: '原生秒开', riskScore: '8 ~ 15', note: '支持网页端直接对话，适合日常学习、写论文、翻译辅助' },
      { tool: 'Claude 3.5 Sonnet', status: '稳定可用', riskScore: '10 ~ 18', note: '推荐使用新加坡或美国专线节点保持长连接稳定性' }
    ],
    clientGuide: {
      clash: '在飞猫云控制面板点击“一键导入 Clash”，在弹出的客户端中勾选自动更新，开启系统代理即刻上网。',
      shadowrocket: '使用 iPhone 自带相机直接扫描飞猫云后台的订阅二维码，点击打开进入 Shadowrocket，自动添加全部节点。',
      singbox: '支持通过 Subconverter 转换格式直接拉取 Sing-box 订阅。',
      ruleRecommendation: '新手直接使用默认预设的 Rule 模式即可，国内淘宝微信自动直连，国外站点自动翻墙。'
    },
    faqs: [
      { q: '飞猫云的优惠码是多少？怎么用？', a: '专属优惠券为【flycat888】。在结算页面输入此代码，即可在已经非常便宜的 ¥7 起步套餐上享受额外折扣。' },
      { q: '飞猫云限制设备数量吗？', a: '官方套餐标注“不限制同时在线设备数”，非常适合舍友分摊或手头有多台电子设备的新手用户。' },
      { q: '刚买完节点连接不上是什么原因？', a: '90% 的原因是因为首次导入未在客户端内点击“更新订阅”，或者客户端本地系统时间未与互联网标准时间同步。' }
    ],
    verdict: {
      score: 9.7,
      bestFor: '科学上网初学者、预算有限的学生党、追求实惠大流量的影视爱好者',
      recommendedPlan: '入门大流量套餐 (¥7/月，含150GB月配额)',
      couponAdvice: '务必结账时输入【flycat888】享受首购折扣',
      caution: '特殊敏感维护期若遇个别节点瞬断，在客户端刷新订阅切换备用节点即可。'
    }
  },

  wuyou: {
    id: 'wuyou',
    slug: 'wuyou',
    tagline: '全冗余 IPLC 纯物理专线，双路灾备容灾机制，提供大容量月付，稳定不掉线的定海神针',
    story: [
      '无忧（无忧链接）以 9.6 的综合评分稳居 2026 年机场推荐榜第 4 名。该品牌深耕跨境高速网络多年，其最大标签就是“稳健”。对于把代理网络作为生产力刚需工具的用户而言，断流一分钟可能意味着线上业务的巨大损失，而无忧正是专为消除这种断联焦虑而研发。',
      '无忧的核心架构基于端到端纯正 IPLC 专线构建，不借道公网过境，不走不可靠的公网隧道，具有物理级抗封锁能力。在华南（深圳机房）与华东（上海机房）建立了双路热备冗余，当任一出口遭遇突发意外时，BGP 控制台会自动无缝切换备用通道。',
      '套餐设计上，无忧提供 100GB 至 400GB+ 充足月度配额，支持券码【wuyou666】。其全套节点无论亚太还是欧美，均经过了高负载压力调优，延迟抖动标准差极小。'
    ],
    architecture: {
      entry: '上海联通骨干网机房 + 深圳电信核心机房，BGP 双线多路由冗余',
      transit: '端到端内网物理 IPLC 专线，完全规避国际公网出口拥堵',
      bandwidth: '40Gbps+ 专网储备，支持弹性动态突发扩容',
      encryption: 'Shadowsocks 2022 AEAD 物理隔离通信',
      ipQuality: '广播双原生机房出口，IP 定期清洗，防关联属性优秀'
    },
    benchmarks: [
      { region: '香港 IPLC 专线 01', isp: '电信 1000M', ping: '29ms', download: '695 Mbps', upload: '120 Mbps', packetLoss: '0.08%', videoBuffer: '0.26s' },
      { region: '日本东京 IPLC 专线', isp: '联通 1000M', ping: '49ms', download: '640 Mbps', upload: '105 Mbps', packetLoss: '0.1%', videoBuffer: '0.31s' },
      { region: '新加坡 IPLC 专线', isp: '移动 500M', ping: '56ms', download: '570 Mbps', upload: '90 Mbps', packetLoss: '0.1%', videoBuffer: '0.34s' },
      { region: '台湾 IPLC 专线', isp: '电信 1000M', ping: '38ms', download: '625 Mbps', upload: '102 Mbps', packetLoss: '0.08%', videoBuffer: '0.29s' },
      { region: '美国硅谷专线', isp: '联通 1000M', ping: '138ms', download: '490 Mbps', upload: '80 Mbps', packetLoss: '0.25%', videoBuffer: '0.50s' }
    ],
    streaming: [
      { platform: 'Netflix 奈飞', status: '原生全解锁', regions: '美区、日区、港区、韩区全覆盖', note: '4K 原画质秒播，音画同步完美' },
      { platform: 'Disney+ / HBO Max', status: '原生全解锁', regions: '全球已覆盖区域', note: '解锁顺畅，支持家庭影院级高码率' },
      { platform: 'YouTube 8K', status: '原生全解锁', regions: '全区免验证', note: '支持 8K 60fps 极限吞吐测试' }
    ],
    aiTools: [
      { tool: 'OpenAI ChatGPT', status: '原生秒开', riskScore: '0 ~ 6', note: '极低风控分，支持长会话不被退回人机验证' },
      { tool: 'Anthropic Claude', status: '原生秒开', riskScore: '3 ~ 8', note: '支持 Claude Projects 知识库长篇文件上传分析' }
    ],
    clientGuide: {
      clash: '通过一键链接导入 Clash Verge，推荐选用 Script 或 Rule 模式，配置定时自动更新（如每 12 小时自动更新）。',
      shadowrocket: '小火箭订阅后打开“延迟测试”，选择延迟低于 50ms 的绿色节点连接。',
      singbox: '完美支持 Sing-box 客户端，内核直接调用系统 TUN 虚拟网卡。',
      ruleRecommendation: '针对大流量下载与在线会议并存场景，可配置进程分流规则，将 Zoom/Teams 流量绑定在独立低延迟香港节点。'
    },
    faqs: [
      { q: '无忧的优惠券怎么使用？', a: '在购买页面结算时输入优惠码【wuyou666】即可直接抵扣折扣优惠。' },
      { q: '无忧为什么适合作为主力梯子？', a: '因为无忧采用纯正 IPLC 专线，不经过公网 GFW 审查节点，在敏感时期拥有极高的抗干扰韧性。' }
    ],
    verdict: {
      score: 9.6,
      bestFor: '对连接高可用有强烈执念的开发者、远程办公团队、高频外贸与流媒体重度用户',
      recommendedPlan: 'IPLC 专线月付套餐 (¥19/月起)',
      couponAdvice: '使用专属优惠券【wuyou666】立省优惠',
      caution: '节点数量虽多，日常建议常驻延迟最低的前 3 个节点即可。'
    }
  },

  lingmao: {
    id: 'lingmao',
    slug: 'lingmao',
    tagline: '专为 AI 深度学习、ChatGPT 与学术科研打造的住宅级原生纯净 IP 专线',
    story: [
      '灵猫（Lingmao）在 2026 机场排名中位列第 5，是专门针对跨境 AI、海外科研文献查阅及学术大模型交互优化的高端垂直品牌。随着各大 AI 平台对数据中心 IP 审查力度的持续收紧，普通机场常遭遇 “Access Denied” 或账号被封，灵猫由此脱颖而出。',
      '灵猫的出口节点采购了大量具备原生双 ISP 资质的住宅级静态 IP，配合点对点物理专线传输，在 IPQualityScore 及 Scamalytics 欺诈风险测试中得分常年保持在 0~5 的纯净极值区间。',
      '对于从事 AI Prompt 工程、海外高校科研投稿、GitHub Copilot 与 Cursor 重度编程人员，灵猫能够提供丝般顺滑的低延迟会话体验，避免频繁跳出 Cloudflare 验证码打断工作心流。'
    ],
    architecture: {
      entry: '华东上海电信/联通高防入口，接入 AI 专属低延迟通道',
      transit: 'IPLC 纯专线，点对点直连美国西海岸、日本东京及新加坡出口',
      bandwidth: '20Gbps 专用带宽，优先保障高频小数据包极速往返',
      encryption: 'VLESS + Trojan 混合加密封装，去指纹化协议',
      ipQuality: '原生住宅 IP 出口，Scamalytics 风险分低至 0~5，绝无脏 IP 关联'
    },
    benchmarks: [
      { region: '美西 AI 纯净专线 01', isp: '电信 1000M', ping: '130ms', download: '620 Mbps', upload: '95 Mbps', packetLoss: '0.1%', videoBuffer: '0.45s' },
      { region: '日本东京 AI 专线', isp: '联通 1000M', ping: '46ms', download: '670 Mbps', upload: '115 Mbps', packetLoss: '0.08%', videoBuffer: '0.28s' },
      { region: '新加坡 AI 专线', isp: '移动 500M', ping: '53ms', download: '580 Mbps', upload: '90 Mbps', packetLoss: '0.1%', videoBuffer: '0.32s' },
      { region: '香港专线 01', isp: '电信 1000M', ping: '30ms', download: '710 Mbps', upload: '130 Mbps', packetLoss: '0.05%', videoBuffer: '0.24s' },
      { region: '英国伦敦专线', isp: '联通 1000M', ping: '165ms', download: '460 Mbps', upload: '75 Mbps', packetLoss: '0.3%', videoBuffer: '0.58s' }
    ],
    streaming: [
      { platform: 'Netflix 奈飞', status: '原生全解锁', regions: '美日港英全区', note: '原生双 ISP 支持，高画质原片瞬开' },
      { platform: 'Disney+ / Max', status: '原生全解锁', regions: '欧美亚太已开通区', note: '流媒体解锁能力与 AI 能力并驾齐驱' },
      { platform: 'YouTube 4K', status: '原生全解锁', regions: '全球无缝', note: '高码率拖拽平滑流畅' }
    ],
    aiTools: [
      { tool: 'OpenAI ChatGPT (4o/Canvas)', status: '原生秒开', riskScore: '0 ~ 3 (极品纯净)', note: '全球顶级干净出口，永不弹验证码，注册与支付完全合规' },
      { tool: 'Anthropic Claude 3.5 Sonnet', status: '原生秒开', riskScore: '0 ~ 5 (零风控)', note: '网页端直接登录畅享，彻底告别封号与登录报错' },
      { tool: 'Cursor / Copilot / Perplexity', status: '原生秒开', riskScore: '0', note: '代码生成无等待延迟，大幅提升编程生产力' }
    ],
    clientGuide: {
      clash: '导入订阅后，在策略组中将 OpenAI、Anthropic 规则锁定在【美西 AI 纯净专线】，其他网站根据需要自动选路。',
      shadowrocket: '小火箭用户可直接在“配置”中勾选内置的 AI 规则集合。',
      singbox: '支持 Sing-box 纯内核路由规则精准分流，支持 GEOIP 和 GEOSITE 自动更新。',
      ruleRecommendation: '强烈建议对 AI 类工具单独分流锁定同一个节点，保持长期的会话 IP 一致性，防风控效果最佳。'
    },
    faqs: [
      { q: '灵猫为什么特别适合 ChatGPT 和 Claude？', a: '因为灵猫采购了高成本的原生静态住宅 IP，避开了普通机场常见的万人共用数据中心 IP，从根源上杜绝了被 OpenAI 与 Anthropic 安全模型标记为代理的风险。' },
      { q: '日常看油管视频网速快吗？', a: '非常快。底层依托 IPLC 物理专线，下行速率普遍在 600Mbps 以上，4K/8K 视频加载迅捷。' }
    ],
    verdict: {
      score: 9.5,
      bestFor: 'AI 从业者、程序员、科研学者、海外电商精细化运营人员',
      recommendedPlan: 'IPLC 专线科研月付 (¥25/月，含150GB纯净流量)',
      couponAdvice: '官方主打品质服务，定价坚挺透明',
      caution: '请保持用于 AI 的节点相对固定，避免频繁跨国切换节点。'
    }
  },

  flashleap: {
    id: 'flashleap',
    slug: 'flashleap',
    tagline: '毫秒级电竞游戏加速与超低抖动纯专线，亚太骨干直连，FPS 竞技玩家的制胜利器',
    story: [
      '闪跃（FlashLeap）在 2026 年度排行榜上位居第 6 名。与其他主攻流媒体或网页浏览的机场不同，闪跃从立项之初就将“超低网络抖动、高抗丢包与全开启 UDP Fullcone”作为核心研发指标，是外服电竞游戏玩家群体的首选利器。',
      '闪跃的全套链路基于物理级纯 IPLC 专线搭建，华南与华东直通香港及日本东京骨干机房，香港节点 Ping 延迟稳定压制在 25ms~35ms，日本节点保持在 45ms~52ms。全节点部署 UDP NAT 1（Fullcone），完美兼容 Steam、Epic、Apex Legends、无畏契约（Valorant）及主机 PS5/Xbox 联机。',
      '套餐包含充沛的 150GB 至大容量档位，结账支持专属优惠券【shanyue】。即便在每晚 8 点至 11 点的晚高峰公网网络泥沼期，闪跃专线依然能保证 0 丢包率，拒绝跳 Ping 和卡刀。'
    ],
    architecture: {
      entry: '华南广州优质电竞级 BGP 入口 + 华东联通高速专线入口',
      transit: 'IPLC 纯专线直达，物理通道无公网拥堵跳数',
      bandwidth: '20Gbps 低抖动专用通道，全节点 UDP Fullcone 开启',
      encryption: 'Shadowsocks 2022 电竞定制协议，轻量封装低 CPU 耗损',
      ipQuality: '优质机房直连出口，精准匹配外服游戏服务器 IP 段'
    },
    benchmarks: [
      { region: '香港电竞 01 (IPLC)', isp: '电信 1000M', ping: '26ms', download: '680 Mbps', upload: '120 Mbps', packetLoss: '0.02%', videoBuffer: '0.24s' },
      { region: '日本东京游戏 01', isp: '联通 1000M', ping: '45ms', download: '630 Mbps', upload: '110 Mbps', packetLoss: '0.05%', videoBuffer: '0.28s' },
      { region: '台湾电竞专线', isp: '电信 1000M', ping: '35ms', download: '640 Mbps', upload: '105 Mbps', packetLoss: '0.03%', videoBuffer: '0.26s' },
      { region: '新加坡专线 01', isp: '移动 500M', ping: '52ms', download: '560 Mbps', upload: '85 Mbps', packetLoss: '0.08%', videoBuffer: '0.33s' },
      { region: '美西洛杉矶', isp: '联通 1000M', ping: '132ms', download: '470 Mbps', upload: '75 Mbps', packetLoss: '0.2%', videoBuffer: '0.52s' }
    ],
    streaming: [
      { platform: 'Netflix / Disney+', status: '原生全解锁', regions: '港台日美全区', note: '电竞专线兼顾影音娱乐，4K 播放丝滑' },
      { platform: 'YouTube / Twitch', status: '原生全解锁', regions: '全区原生', note: 'Twitch 高码率无卡顿直播实时互动' }
    ],
    aiTools: [
      { tool: 'ChatGPT & Claude', status: '原生秒开', riskScore: '5 ~ 12', note: '稳定支持日常问答与 AI 交互' }
    ],
    clientGuide: {
      clash: '在 Clash Verge Rev 中开启“TUN 模式”，并在系统网卡中确认已开启管理员权限接管所有游戏 UDP 流量。',
      shadowrocket: '小火箭中在“设置 -> 代理 -> UDP”中将 UDP 转发保持开启。',
      singbox: '配置 Sing-box 的 TUN 堆栈为 mixed 或 system，以获得最佳 UDP 转发性能。',
      ruleRecommendation: '游戏流量锁定香港或日本电竞专线，日常网页走常规分流。'
    },
    faqs: [
      { q: '闪跃玩外服游戏可以替代网易 UU 加速器吗？', a: '在很多场景下体验甚至更优。闪跃基于 IPLC 专线，具备极低延迟与极佳丢包控制，配合 Clash Verge 的 TUN 模式，可以直接给 Steam/Apex/CS2 提供出色的加速效果，且无需额外购买加速器会员。' },
      { q: '闪跃的优惠码是什么？', a: '专属优惠代码为【shanyue】，结账时输入即可立减。' }
    ],
    verdict: {
      score: 9.4,
      bestFor: 'Steam/Epic 外服联机玩家、主机 PS5/Switch 玩家、对延迟和丢包极其敏感的极客',
      recommendedPlan: 'IPLC 纯专线套餐 (¥24/月，含150GB高速专线)',
      couponAdvice: '填写优惠码【shanyue】享专享折扣',
      caution: '电竞加速务必在客户端内开启 TUN 虚拟网卡接管模式。'
    }
  },

  firefly: {
    id: 'firefly',
    slug: 'firefly',
    tagline: '轻量灵活月付 ¥8 起，深度抗封锁 Reality 协议加持，晚高峰坚如磐石的轻量级首选',
    story: [
      '萤火虫（Firefly）在 2026 年度排行榜中位列第 7，以 ¥8/月的超低起步价和出色的抗封锁韧性受到极客喜爱。在网络管控日益动态化的今天，许多基于老旧协议的机场常常在特殊时期大面积瘫痪，而萤火虫全线引入了前沿的 VLESS XTLS Reality 架构。',
      '其核心技术优势在于通过借用真实大厂合规 TLS 证书（如苹果、微软、亚马逊 CDN）的外层伪装，彻底模糊代理流量的特征模式，使得审查防火墙无法将其与正常访问海外大厂的 HTTPS 流量相区别。',
      '萤火虫适合不想在翻墙工具上支出过多预算、但要求关键时刻随时可用、日常查资料搜文献与追剧流畅的理智型消费者，专属优惠码【firefly】折上立减。'
    ],
    architecture: {
      entry: '优质隧道中转入口集群，支持多入口智能负载均衡',
      transit: '动态混淆加密隧道，抗深度特征分析与主动探测',
      bandwidth: '15Gbps 聚合带宽，保障轻量用户的流畅体验',
      encryption: 'VLESS (XTLS Reality) + Trojan 强加密混合体系',
      ipQuality: '多地区原生 IP 出口，定期替换被滥用网段'
    },
    benchmarks: [
      { region: '香港 01 (Reality)', isp: '电信 1000M', ping: '38ms', download: '520 Mbps', upload: '95 Mbps', packetLoss: '0.3%', videoBuffer: '0.38s' },
      { region: '日本东京 01', isp: '联通 1000M', ping: '58ms', download: '480 Mbps', upload: '80 Mbps', packetLoss: '0.4%', videoBuffer: '0.45s' },
      { region: '新加坡 01', isp: '移动 500M', ping: '65ms', download: '460 Mbps', upload: '70 Mbps', packetLoss: '0.3%', videoBuffer: '0.48s' },
      { region: '台湾 01', isp: '电信 1000M', ping: '45ms', download: '490 Mbps', upload: '85 Mbps', packetLoss: '0.3%', videoBuffer: '0.40s' },
      { region: '美国洛杉矶', isp: '联通 1000M', ping: '148ms', download: '390 Mbps', upload: '60 Mbps', packetLoss: '0.6%', videoBuffer: '0.65s' }
    ],
    streaming: [
      { platform: 'Netflix / YouTube', status: '完美支持', regions: '主流港台美区', note: '日常 1080P/4K 高清播放无压力' },
      { platform: 'Disney+ / Spotify', status: '支持', regions: '欧美亚太已覆盖区', note: '日常听歌看剧顺畅' }
    ],
    aiTools: [
      { tool: 'ChatGPT & Claude', status: '原生秒开', riskScore: '10 ~ 20', note: '日常使用正常，推荐锁定美国 Reality 节点' }
    ],
    clientGuide: {
      clash: '建议使用支持 VLESS Reality 协议的 Clash Verge Rev 或 Mihomo 内核客户端。',
      shadowrocket: '小火箭原生支持 Reality 协议，直接添加订阅链接即可。',
      singbox: 'Sing-box 作为 Reality 协议的最佳运行环境，表现极为出众。',
      ruleRecommendation: '将常用境外学术与办公网站加入白名单代理。'
    },
    faqs: [
      { q: '萤火虫的优惠码怎么使用？', a: '在收银台结账时输入优惠代码【firefly】即可直接享受折扣减免。' },
      { q: 'Reality 协议有什么好处？', a: '它完全不需要自建域名或购买伪装证书，直接借用大厂证书伪装，抗封锁能力远超老旧的 SS 或 VMess。' }
    ],
    verdict: {
      score: 9.3,
      bestFor: '预算有限、注重抗封锁韧性、轻度到中度网络冲浪用户',
      recommendedPlan: '优质线路轻量套餐 (¥8/月，含60GB流量)',
      couponAdvice: '使用专属优惠券【firefly】享折上特惠',
      caution: '月配额适合日常查资料看视频，下载大文件请合理规划。'
    }
  },

  kuajiecloud: {
    id: 'kuajiecloud',
    slug: 'kuajiecloud',
    tagline: '商用级跨境独立专网，99.9% SLA 工业级可用性，跨国企业与跨境电商外贸标杆',
    story: [
      '跨界（Kuajiecloud）以 9.2 分位列 2026 年排行榜第 8 名，主要服务于跨国商贸、跨境电商卖家（亚马逊、TikTok Shop、Etsy、eBay）以及有高规格 SLA 要求的企业团队。普通廉价机场的 IP 变动频繁或万人共用，极易造成电商店铺关联被封。',
      '跨界采用纯物理专线网络与独立静态企业 IP 资源池，华南与华东分别建立独立云互联专网，彻底解决跨国 ERP 登录、外贸开发信发送、多店铺指纹浏览器隔离等高安全诉求。',
      '起步套餐提供 120GB 独立专线配额，多设备并发支持优异，技术团队支持企业级工单急速响应。'
    ],
    architecture: {
      entry: '云厂商专线互联骨干入口，双机房热备部署',
      transit: '全专线物理隔离架构，SLA 保障 99.9%',
      bandwidth: '企业级大带宽储备，不设峰值限速',
      encryption: 'TLS 1.3 + 企业自研隧道传输规范',
      ipQuality: '纯净商用静态出口，极度适合防关联运营'
    },
    benchmarks: [
      { region: '香港商业专线 01', isp: '电信 1000M', ping: '31ms', download: '705 Mbps', upload: '130 Mbps', packetLoss: '0.04%', videoBuffer: '0.25s' },
      { region: '日本东京商业 01', isp: '联通 1000M', ping: '48ms', download: '645 Mbps', upload: '115 Mbps', packetLoss: '0.08%', videoBuffer: '0.29s' },
      { region: '新加坡商业 01', isp: '移动 500M', ping: '55ms', download: '580 Mbps', upload: '95 Mbps', packetLoss: '0.08%', videoBuffer: '0.33s' },
      { region: '美国美西商业 01', isp: '电信 1000M', ping: '135ms', download: '520 Mbps', upload: '85 Mbps', packetLoss: '0.2%', videoBuffer: '0.48s' },
      { region: '欧洲法兰克福专线', isp: '联通 1000M', ping: '155ms', download: '450 Mbps', upload: '70 Mbps', packetLoss: '0.3%', videoBuffer: '0.55s' }
    ],
    streaming: [
      { platform: '全主流流媒体平台', status: '原生全解锁', regions: '欧美亚太全域', note: '办公之余提供 4K 极清流媒体视听' }
    ],
    aiTools: [
      { tool: 'ChatGPT / Claude / API', status: '原生秒开', riskScore: '0 ~ 5', note: '企业级 IP 纯净度，支持 API 开发者高频并发调用' }
    ],
    clientGuide: {
      clash: '配合 AdsPower、Hubstudio、比特浏览器等指纹浏览器使用时，建议在 Clash 中开启本地 SOCKS5 代理端口并在指纹浏览器中分流绑定。',
      shadowrocket: '支持全功能小火箭订阅配置。',
      singbox: '支持企业级 Sing-box 客户端透明分流。',
      ruleRecommendation: '电商卖家务必为每个独立店铺环境绑定固定出口 IP，严禁在店铺操作过程中频繁切换节点。'
    },
    faqs: [
      { q: '跨界适合个人日常使用吗？', a: '完全适合。虽然定位商业专网，但个人用于海外科研、办公与影音同样能享受到顶级专线的超高稳定性。' },
      { q: '亚马逊店铺防关联需要注意什么？', a: '多店铺运营建议配合静态独立住宅 IP 指纹浏览器，跨界专线作为底层加速链路，可保障网页加载与后台操作极速流畅。' }
    ],
    verdict: {
      score: 9.2,
      bestFor: '跨境电商卖家、外贸 SOHO、跨国远程办公人员、对可靠性要求极高的团队',
      recommendedPlan: '全专线商业套餐 (¥20/月，含120GB专线流量)',
      couponAdvice: '官方偶尔发布季付/年付企业优惠，可联系在线商务',
      caution: '店铺高敏感操作请遵循防关联指纹浏览器标准操作规范。'
    }
  },

  yinxingren: {
    id: 'yinxingren',
    slug: 'yinxingren',
    tagline: 'IEPL 纯专线配合端到端隐私加密，防深度指纹嗅探与主动探测，极致抗审查安全',
    story: [
      '隐形人（Yinxingren）在 2026 年度排行榜上位居第 9，是注重网络隐私、敏感时期绝对防断联的代表作。品牌命名取意于“如隐形人般穿透一切网络封锁与深层审查，不留数字痕迹”。',
      '隐形人全网搭建在精密的 IEPL 纯专线之上，全节点引入了 Anycast 任播路由网络。访客在发起请求时，外部无法定位真实的入口服务器地址，所有流量在最靠近用户的骨干交换机节点被吸纳进私有内网，经硬件级加密后由海外原生出口吐出。',
      '配额充裕（144GB 起步），支持专属优惠券【yxr888】。在过往多次大规模公网阻断行动中，隐形人凭借深厚的技术底蕴展现了极强的生存能力。'
    ],
    architecture: {
      entry: 'Anycast 任播多线入口，隐藏真实物理拓扑',
      transit: 'IEPL 纯内网物理专线，杜绝公网路由污染',
      bandwidth: '25Gbps 纯专线冗余，保障低延迟与高安全性',
      encryption: 'Shadowsocks-2022 blake3 + 专有防探测混淆',
      ipQuality: '高信誉度出口机房原生 IP，支持 DNSSEC 安全防劫持'
    },
    benchmarks: [
      { region: '香港 IEPL 01', isp: '电信 1000M', ping: '30ms', download: '690 Mbps', upload: '125 Mbps', packetLoss: '0.06%', videoBuffer: '0.26s' },
      { region: '日本东京 IEPL 01', isp: '联通 1000M', ping: '49ms', download: '640 Mbps', upload: '108 Mbps', packetLoss: '0.08%', videoBuffer: '0.30s' },
      { region: '新加坡 IEPL 01', isp: '移动 500M', ping: '56ms', download: '575 Mbps', upload: '92 Mbps', packetLoss: '0.1%', videoBuffer: '0.33s' },
      { region: '台湾 IEPL 01', isp: '电信 1000M', ping: '38ms', download: '630 Mbps', upload: '100 Mbps', packetLoss: '0.08%', videoBuffer: '0.28s' },
      { region: '美国硅谷 IEPL', isp: '联通 1000M', ping: '136ms', download: '495 Mbps', upload: '78 Mbps', packetLoss: '0.25%', videoBuffer: '0.51s' }
    ],
    streaming: [
      { platform: 'Netflix / Disney+ / Max', status: '原生全解锁', regions: '全主流区', note: '多区域原生解锁，支持超高清流媒体无痕访问' }
    ],
    aiTools: [
      { tool: 'ChatGPT / Claude', status: '原生秒开', riskScore: '3 ~ 8', note: '隐私级加密防护，保护 AI 交互商业秘密' }
    ],
    clientGuide: {
      clash: '导入订阅后推荐开启 Clash Verge 的“安全模式”及“DNS 防泄漏配置”。',
      shadowrocket: '小火箭在高级设置中打开本地 DNS 加密（DoH / DoT）。',
      singbox: '支持 Sing-box 客户端，发挥内存轻量与高安全性优势。',
      ruleRecommendation: '开启 WebRTC 防泄漏插件以获得全方位安全隐私屏障。'
    },
    faqs: [
      { q: '隐形人专属优惠码是多少？', a: '结账优惠码为【yxr888】，填入即可享受立减。' },
      { q: '为什么称其为隐私安全专线？', a: '因为其 IEPL 链路完全不走公网传输，且节点实施零日志记录（No-Logs）合规审计，保护用户上网痕迹不被追踪。' }
    ],
    verdict: {
      score: 9.1,
      bestFor: '对网络隐私与数字安全有极高要求的政企高管、外媒记者、加密货币交易者',
      recommendedPlan: 'IEPL 纯专线套餐 (¥24/月，含144GB流量)',
      couponAdvice: '结算输入【yxr888】立享专属优惠',
      caution: '严禁用于违反当地法律法规的非法网络行为。'
    }
  },

  feiv: {
    id: 'feiv',
    slug: 'feiv',
    tagline: '罕见提供不限时套餐的高速中转服务商，¥4.9 超低体验门槛，弹性用量最佳伴侣',
    story: [
      '飞V（Feiv）在 2026 年度排行榜中位列第 10 名，以其“极低门槛与罕见不限时套餐”打破常规。许多轻度上网用户每个月只用 5~10GB 流量，常规月付套餐未用完便清零造成浪费，而飞V为这类用户量身定制了超灵活套餐。',
      '飞V起步尝鲜门槛低至 ¥4.9，不仅有标准月付，其不限时流量包更是长久有效、直到用完为止。网络上采用多线中转优化链路，日常查资料、收发外贸邮件与偶发追剧轻松拿捏。',
      '对学生党备用梯子、双主力机防失联备份而言，飞V堪称性价比与灵活性结合的典范。'
    ],
    architecture: {
      entry: '优质中转多线入口，智能动态接入',
      transit: '优化中转链路，大吞吐调度',
      bandwidth: '15Gbps 突发带宽储备',
      encryption: 'Shadowsocks + Trojan 协议',
      ipQuality: '高可用机房出口'
    },
    benchmarks: [
      { region: '香港 01 优化', isp: '电信 1000M', ping: '40ms', download: '510 Mbps', upload: '90 Mbps', packetLoss: '0.4%', videoBuffer: '0.40s' },
      { region: '日本东京 01', isp: '联通 1000M', ping: '60ms', download: '460 Mbps', upload: '75 Mbps', packetLoss: '0.5%', videoBuffer: '0.46s' },
      { region: '新加坡 01', isp: '移动 500M', ping: '68ms', download: '430 Mbps', upload: '68 Mbps', packetLoss: '0.4%', videoBuffer: '0.50s' },
      { region: '台湾 01', isp: '电信 1000M', ping: '46ms', download: '480 Mbps', upload: '80 Mbps', packetLoss: '0.4%', videoBuffer: '0.42s' },
      { region: '美国洛杉矶', isp: '联通 1000M', ping: '150ms', download: '380 Mbps', upload: '55 Mbps', packetLoss: '0.7%', videoBuffer: '0.68s' }
    ],
    streaming: [
      { platform: 'YouTube / Netflix', status: '支持', regions: '港台美区', note: '支持 1080P/4K 高清顺畅追剧' }
    ],
    aiTools: [
      { tool: 'ChatGPT', status: '稳定可用', riskScore: '12 ~ 22', note: '日常对话响应良好' }
    ],
    clientGuide: {
      clash: '直接在后台导入 Clash 订阅即可使用。',
      shadowrocket: '支持手机端一键拉取小火箭订阅。',
      singbox: '支持主流转换器生成 Sing-box 配置。',
      ruleRecommendation: '备用机直接设为自动模式。'
    },
    faqs: [
      { q: '不限时套餐是真的不限时间吗？', a: '是的，不限时套餐只要账户保持活跃，所购流量永久不清零，直到用光为止，非常适合低频备用用户。' },
      { q: '起步价格是多少？', a: '仅需 ¥4.9 即可体验高速优质线路。' }
    ],
    verdict: {
      score: 9.0,
      bestFor: '低频上网用户、出差备用应急、不想被月费绑架的灵活消费群体',
      recommendedPlan: '超值尝鲜包 (¥4.9起步)',
      couponAdvice: '官方低价让利，直销透明',
      caution: '重度下载用户建议选购大容量固定月付套餐更具性价比。'
    }
  },

  laddercloud: {
    id: 'laddercloud',
    slug: 'laddercloud',
    tagline: '多年深耕的老牌稳定机场，线路冗余完备，节点覆盖全球 15+ 地区',
    story: [
      '梯子云（LadderCloud）位列 2026 年度排行榜第 11 名。在翻墙服务商“年年代代有新秀、岁岁年年跑路多”的不稳定市场大环境下，梯子云以持续数年安全稳定运营的口碑赢得了坚实的拥趸。',
      '其节点网络覆盖香港、台湾、日本、韩国、新加坡、美国、英国、德国等 15 多个地区，依托优化中转与专线混合链路，抗风险能力成熟。',
      '起步价 ¥25/月，提供 125GB 优质流量，技术沉淀深厚，极少出现大面积长时间失联。'
    ],
    architecture: {
      entry: '经典老牌三网中转聚合机房，长线调优',
      transit: '优化中转/专线混合链路',
      bandwidth: '20Gbps 均衡吞吐',
      encryption: 'Shadowsocks + VLESS',
      ipQuality: '多年维护信誉出口，抗封锁能力经受长期考验'
    },
    benchmarks: [
      { region: '香港优化 01', isp: '电信 1000M', ping: '36ms', download: '590 Mbps', upload: '105 Mbps', packetLoss: '0.2%', videoBuffer: '0.34s' },
      { region: '日本东京 01', isp: '联通 1000M', ping: '54ms', download: '530 Mbps', upload: '90 Mbps', packetLoss: '0.3%', videoBuffer: '0.40s' },
      { region: '新加坡 01', isp: '移动 500M', ping: '60ms', download: '500 Mbps', upload: '80 Mbps', packetLoss: '0.2%', videoBuffer: '0.42s' },
      { region: '台湾 01', isp: '电信 1000M', ping: '42ms', download: '550 Mbps', upload: '95 Mbps', packetLoss: '0.2%', videoBuffer: '0.36s' },
      { region: '美国美西 01', isp: '联通 1000M', ping: '142ms', download: '440 Mbps', upload: '68 Mbps', packetLoss: '0.4%', videoBuffer: '0.58s' }
    ],
    streaming: [
      { platform: 'Netflix / Disney+ / YouTube', status: '原生全解锁', regions: '亚太及美区', note: '老牌机房维护良好，片源解锁稳定' }
    ],
    aiTools: [
      { tool: 'ChatGPT & Claude', status: '原生秒开', riskScore: '6 ~ 14', note: '长期运营未受大范围污染' }
    ],
    clientGuide: {
      clash: '标准导入流程，支持主流 Clash 内核全兼容。',
      shadowrocket: '扫码即刻导入，节点分组条理清晰。',
      singbox: '支持标准转换拉取。',
      ruleRecommendation: '推荐使用默认 GeoSite 规则精准分流。'
    },
    faqs: [
      { q: '梯子云为什么运营时间这么久？', a: '因为其坚持合规财务与稳健带宽采购，不参与恶性超售竞争，因而具备长线持续运营的能力。' }
    ],
    verdict: {
      score: 8.9,
      bestFor: '看重机场运营资历、担心新小机场容易跑路的保守稳健型用户',
      recommendedPlan: '经典月付套餐 (¥25/月，含125GB流量)',
      couponAdvice: '官方不定期在续费时赠送优惠',
      caution: '按月续费最安心。'
    }
  },

  wavenet: {
    id: 'wavenet',
    slug: 'wavenet',
    tagline: '自研客户端优化线路与全球小众地区覆盖，流媒体跨区追剧与冷门节点神器',
    story: [
      '浪网（WaveNet）位列 2026 年度排行榜第 12 名。除了提供常规亚太与欧美核心节点外，浪网最大的特色在于对全球冷门小众地区的深层覆盖，如南美（阿根廷、巴西）、东欧（土耳其、波兰）及东南亚小国，是海淘低价区订阅与小众游戏跨区玩家的神器。',
      '浪网同时提供了自研优化客户端，用户甚至无需理解何为代理协议，一键点击即可完成连接加速。起步提供 150GB 充足配额，适合多维需求玩家。'
    ],
    architecture: {
      entry: '分布式中转入口，自研协议自适应加速',
      transit: '全球优化网络拓扑，兼顾热门与冷门区域',
      bandwidth: '20Gbps 弹性扩展',
      encryption: '自研混淆 + Shadowsocks',
      ipQuality: '包含多种海外本地原生住宅及低价区出口 IP'
    },
    benchmarks: [
      { region: '香港优化 01', isp: '电信 1000M', ping: '35ms', download: '610 Mbps', upload: '110 Mbps', packetLoss: '0.2%', videoBuffer: '0.32s' },
      { region: '土耳其低价区 01', isp: '联通 1000M', ping: '175ms', download: '380 Mbps', upload: '55 Mbps', packetLoss: '0.6%', videoBuffer: '0.70s' },
      { region: '阿根廷跨区 01', isp: '电信 1000M', ping: '220ms', download: '320 Mbps', upload: '45 Mbps', packetLoss: '0.8%', videoBuffer: '0.85s' },
      { region: '日本东京 01', isp: '联通 1000M', ping: '52ms', download: '550 Mbps', upload: '95 Mbps', packetLoss: '0.2%', videoBuffer: '0.38s' },
      { region: '美国美西 01', isp: '电信 1000M', ping: '140ms', download: '460 Mbps', upload: '72 Mbps', packetLoss: '0.3%', videoBuffer: '0.54s' }
    ],
    streaming: [
      { platform: 'Steam / YouTube Premium 跨区', status: '原生全解锁', regions: '土阿等低价区覆盖', note: '海淘订阅会员跨区专属利器' },
      { platform: 'Netflix / Disney+', status: '原生全解锁', regions: '全球主流区', note: '4K 流媒体播放顺畅' }
    ],
    aiTools: [
      { tool: 'ChatGPT & Claude', status: '原生秒开', riskScore: '8 ~ 16', note: '支持主流 AI 工具' }
    ],
    clientGuide: {
      clash: '支持主流客户端，也可直接使用其自研免配置客户端。',
      shadowrocket: '通用链接一键添加。',
      singbox: '通用标准适配。',
      ruleRecommendation: '需要跨区海淘时临时切换到对应国家节点。'
    },
    faqs: [
      { q: '浪网的自研客户端好用吗？', a: '非常简单，下载安装后扫码登录即可一键连接，极度适合小白。' }
    ],
    verdict: {
      score: 8.8,
      bestFor: '喜欢跨区购买低价流媒体会员、玩海外小众服务器游戏的用户',
      recommendedPlan: '全球通套餐 (¥30/月，含150GB流量)',
      couponAdvice: '可在活动专区查看最新促销',
      caution: '冷门偏远地区节点物理延迟高属于光纤物理定律，属于正常现象。'
    }
  },

  lingdongcloud: {
    id: 'lingdongcloud',
    slug: 'lingdongcloud',
    tagline: '动态负载均衡与 BGP 隧道智能中继，高可用秒级容灾，日常办公无感切换',
    story: [
      '灵动云（Lingdongcloud）位列 2026 年度排行榜第 13 名。其核心亮点在于自研的动态负载均衡调度系统，当某一出口机房突发高负载或线路波动时，系统在后台自动分流流量，用户在前端刷网页或看视频几乎毫无感知。',
      '起步价 ¥20/月，提供 100GB 纯净流量，三网接入优化到位，在白领办公族中拥有良好的口碑。'
    ],
    architecture: {
      entry: 'BGP 智能多入口，实时测速自动避障',
      transit: '优化节点 / BGP 隧道，多路灾备',
      bandwidth: '15Gbps 动态分配',
      encryption: 'VLESS + Shadowsocks',
      ipQuality: '优质机房出口'
    },
    benchmarks: [
      { region: '香港 BGP 01', isp: '电信 1000M', ping: '34ms', download: '620 Mbps', upload: '115 Mbps', packetLoss: '0.15%', videoBuffer: '0.31s' },
      { region: '日本东京 01', isp: '联通 1000M', ping: '52ms', download: '560 Mbps', upload: '95 Mbps', packetLoss: '0.2%', videoBuffer: '0.36s' },
      { region: '新加坡 01', isp: '移动 500M', ping: '58ms', download: '520 Mbps', upload: '85 Mbps', packetLoss: '0.2%', videoBuffer: '0.39s' },
      { region: '台湾 01', isp: '电信 1000M', ping: '40ms', download: '580 Mbps', upload: '100 Mbps', packetLoss: '0.15%', videoBuffer: '0.33s' },
      { region: '美国美西 01', isp: '联通 1000M', ping: '138ms', download: '470 Mbps', upload: '75 Mbps', packetLoss: '0.3%', videoBuffer: '0.52s' }
    ],
    streaming: [
      { platform: 'Netflix / Disney+ / YouTube', status: '原生全解锁', regions: '港台日美', note: '日常 4K 流媒体观影平稳' }
    ],
    aiTools: [
      { tool: 'ChatGPT & Claude', status: '原生秒开', riskScore: '5 ~ 12', note: '支持 AI 深度交互' }
    ],
    clientGuide: {
      clash: '开启自动测速策略组，享受智能选路。',
      shadowrocket: '通用导入无门槛。',
      singbox: '完美适配。',
      ruleRecommendation: '保持默认负载均衡策略即可。'
    },
    faqs: [
      { q: '灵动云如何保证不卡顿？', a: '后台算法每 30 秒探测节点延迟，自动规避高丢包节点。' }
    ],
    verdict: {
      score: 8.7,
      bestFor: '不想手动切换节点、追求省心稳定使用的办公人群',
      recommendedPlan: 'BGP 智能月付 (¥20/月，含100GB流量)',
      couponAdvice: '官方偶尔发布续费优惠',
      caution: '首次配置确保客户端允许后台自动测速更新。'
    }
  },

  quanqiuyun: {
    id: 'quanqiuyun',
    slug: 'quanqiuyun',
    tagline: '超大带宽池与豪华流量包，高并发多设备容纳，适合团队协作与影视发烧友',
    story: [
      '全球云（Quanqiuyun）位列 2026 年度排行榜第 14 名。该品牌专为大流量发烧友、影音高清收藏爱好者及小型工作室团队打造，以大容量管道和充沛流量著称。',
      '起步提供 120GB 流量，起步仅 ¥20/月，输入专属优惠码【tt88】更享特惠。节点部署在多个核心骨干机房，并发吞吐能力出色。'
    ],
    architecture: {
      entry: '中转优化大管道，多机房分布式接入',
      transit: '中转优化线路，专线突发带宽充足',
      bandwidth: '30Gbps 大吞吐池',
      encryption: 'Shadowsocks + Trojan',
      ipQuality: '高并发多 IP 轮替出口'
    },
    benchmarks: [
      { region: '香港优化 01', isp: '电信 1000M', ping: '36ms', download: '640 Mbps', upload: '120 Mbps', packetLoss: '0.2%', videoBuffer: '0.33s' },
      { region: '日本东京 01', isp: '联通 1000M', ping: '55ms', download: '580 Mbps', upload: '100 Mbps', packetLoss: '0.3%', videoBuffer: '0.39s' },
      { region: '新加坡 01', isp: '移动 500M', ping: '62ms', download: '530 Mbps', upload: '88 Mbps', packetLoss: '0.25%', videoBuffer: '0.41s' },
      { region: '台湾 01', isp: '电信 1000M', ping: '42ms', download: '600 Mbps', upload: '105 Mbps', packetLoss: '0.2%', videoBuffer: '0.35s' },
      { region: '美国美西 01', isp: '联通 1000M', ping: '142ms', download: '480 Mbps', upload: '80 Mbps', packetLoss: '0.35%', videoBuffer: '0.55s' }
    ],
    streaming: [
      { platform: 'YouTube 4K / Netflix', status: '原生全解锁', regions: '主流大区', note: '大吞吐量支持多路同时 4K 播放' }
    ],
    aiTools: [
      { tool: 'ChatGPT & Claude', status: '稳定可用', riskScore: '8 ~ 15', note: '日常交互顺畅' }
    ],
    clientGuide: {
      clash: '一键拉取后开启规则分流。',
      shadowrocket: '通用一键订阅。',
      singbox: '通用适配。',
      ruleRecommendation: '大文件下载建议走流量充沛的专线节点。'
    },
    faqs: [
      { q: '全球云优惠码是什么？', a: '结账专属优惠代码为【tt88】。' },
      { q: '适合多人一起合租使用吗？', a: '非常适合，全球云单账号并发承载能力强，适合家庭与多人共享。' }
    ],
    verdict: {
      score: 8.6,
      bestFor: '团队合租、超大流量影视下载发烧友',
      recommendedPlan: '大流量标准月付 (¥20/月，含120GB流量)',
      couponAdvice: '结账输入【tt88】享受立减优惠',
      caution: '合租请妥善保管好个人订阅链接，避免公开泄露。'
    }
  }
};

export function getBrandDetail(slugOrId: string): BrandDetail {
  const normalized = slugOrId.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const key of Object.keys(BRAND_DETAILS)) {
    if (key.toLowerCase() === normalized || BRAND_DETAILS[key].slug === slugOrId || BRAND_DETAILS[key].id === slugOrId) {
      return BRAND_DETAILS[key];
    }
  }
  // Return fallback for breezenet if not found
  return BRAND_DETAILS.breezenet;
}
