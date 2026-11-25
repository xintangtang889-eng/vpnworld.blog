// 26 new tutorials (plus 4 existing = 30 total guides)
module.exports = [
  {
    slug: "clash-verge-rev",
    title: "Clash Verge Rev 完整进阶教程：内核切换、Mihomo增强配置与Tun模式 | VPNWorld",
    description: "2026最全 Clash Verge Rev 进阶使用指南。深入讲解 Mihomo (Meta) 内核配置、Tun 虚拟网卡接管、自定义分流规则与 DNS 防污染方案。",
    keywords: "Clash Verge Rev, Mihomo, Clash Meta, Tun模式, 规则覆写, 机场客户端教程",
    platform: "Windows / macOS / Linux",
    date: "2026-03-01",
    readTime: "10 分钟",
    difficulty: "进阶级",
    h1: "Clash Verge Rev 完整进阶教程：内核切换、增强配置与 Tun 模式",
    intro: "Clash Verge Rev 作为目前桌面端最为强大且维护活跃的跨平台代理客户端，集成了最新的 Mihomo（Clash.Meta）内核。本文从零深入解析它的高级功能，包括 Tun 虚拟网卡全局接管、脚本与覆写规则配置、DNS 防泄漏设置，助您彻底驾驭这款神器。",
    sections: [
      {
        h2: "一、Mihomo 内核优势与核心机制",
        p: "原版 Clash 开源项目停更后，Mihomo（原 Clash.Meta）内核成为了开源代理领域的事实标准。它不仅原生支持 VLESS、Trojan、Hysteria 2、TUIC、Shadowsocks 2022 等全套现代抗封锁协议，更引入了高性能的规则集（Rule-Set）、GEOIP/GEOSITE 高速查询引擎与完整的 Fake-IP 栈。",
        tips: "在 Clash Verge Rev 中，进入【设置】->【内核】可实时查看当前运行的 Mihomo 内核版本，建议始终保持开启‘Alpha/稳定内核’更新。"
      },
      {
        h2: "二、Tun 虚拟网卡模式终极避坑",
        p: "系统代理（System Proxy）只能接管遵循系统环境变量的浏览器及常规应用，对于不支持系统代理的命令行终端（PowerShell / Git）、开发环境（Docker、pip、npm）以及大部分在线联机游戏则完全无效。开启 Tun 模式可创建系统级虚拟网卡，强制接管整机所有 TCP/UDP 流量。",
        steps: [
          "右键点击 Clash Verge Rev 图标，选择‘以管理员身份运行’（Tun 模式需要系统级网络虚拟网卡权限）。",
          "在左侧菜单点击【设置（Settings）】，找到【Tun 模式（Tun Mode）】开关。",
          "首次开启时，客户端会自动下载并安装 WinTun（Windows）或 utun（macOS）驱动，系统弹出网络权限请求时点击‘允许’。",
          "开启 Tun 模式后，务必确认【严格路由（Strict Route）】已启用，以彻底杜绝局部应用发生 DNS 泄漏或直连流量泄露。"
        ]
      },
      {
        h2: "三、订阅扩展脚本与规则覆写（Script & Merge）",
        p: "许多机场提供的订阅规则过于简陋或未针对国内流媒体优化。Clash Verge Rev 提供了强大的‘扩展脚本（Script）’与‘合并规则（Merge）’功能，允许用户在不修改机场原订阅的前提下，动态注入自定义的分流规则与策略组。",
        code: `# 示例：注入自定义流媒体规则
prepend-rules:
  - DOMAIN-SUFFIX,openai.com,DIRECT-OR-PROXIES
  - DOMAIN-SUFFIX,anthropic.com,AI-PROXIES
  - GEOSITE,cn,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,FINAL-PROXY`
      },
      {
        h2: "四、DNS 深度配置：Fake-IP 模式防污染实战",
        p: "为了解决 DNS 污染与解析延迟，推荐使用 Fake-IP 模式。客户端在本地直接分配 198.18.0.0/16 网段的虚拟 IP 给域名，并在节点建立远程连接时由境外节点直接进行真实 DNS 解析，从而彻底避开国内运营商的 DNS 劫持与投毒。"
      }
    ],
    recommendedBrands: ["yinxingren", "breezenet", "flashleap"]
  },
  {
    slug: "sing-box-windows",
    title: "Sing-box Windows 客户端配置教程：原生内核、低资源占用与图形化实操 | VPNWorld",
    description: "2026年最新 Sing-box Windows 客户端安装与节点配置教程。体验原生低内存代理利器，支持 VLESS Reality、Shadowsocks 2022 与自动分流。",
    keywords: "Sing-box Windows, Sing-box教程, VLESS Reality, 轻量代理客户端, 梯子配置",
    platform: "Windows 电脑",
    date: "2026-03-01",
    readTime: "8 分钟",
    difficulty: "入门到进阶",
    h1: "Sing-box Windows 客户端配置指南：极速轻量与全面抗封锁",
    intro: "Sing-box 是新一代通用代理平台，由 SagerNet 核心团队打造，凭借全 Go 语言重构的原生底层架构，在内存占用（通常仅 20MB~40MB）与路由匹配性能上全面领先。本文带您快速上手 Sing-box 的 Windows GUI 客户端配置。",
    sections: [
      {
        h2: "一、Sing-box 的划时代特性",
        p: "相比传统客户端，Sing-box 的架构设计更加纯粹统一。它天然支持最新的 VLESS Reality 协议、Hysteria 2、TUIC v5、Shadowsocks 2022，且内置高性能 Tun 实现，无需依赖第三方虚拟网卡组件即可提供零延迟的路由转发。"
      },
      {
        h2: "二、客户端下载与订阅导入流程",
        steps: [
          "访问官方开源仓库下载 Sing-box GUI for Windows，解压并运行。",
          "登录您的机场用户中心（如 <a href='../../review/breezenet/index.html'>微风网络</a> 或 <a href='../../review/feimaoyun/index.html'>飞猫云</a>），复制 Sing-box 订阅链接。",
          "在客户端侧边栏点击【Profiles】，点击右上角【+】新增订阅，将链接粘贴后命名并点击【Download】拉取。",
          "在【Dashboard】中选择出站策略组，勾选希望使用的海外节点地区（香港、新加坡、日本等）。"
        ]
      },
      {
        h2: "三、开启系统代理与 Tun 虚拟网卡",
        p: "Sing-box 支持直接勾选【Tun Inbound】。开启后客户端自动托管系统默认路由，实现如同商业 VPN 般的全局自动分流效果，国内网站直接直连，海外受限网站自动穿透。"
      }
    ],
    recommendedBrands: ["breezenet", "feimaoyun", "yinxingren"]
  },
  {
    slug: "shadowrocket-setup",
    title: "Shadowrocket 小火箭新手设置全攻略：订阅导入、节点测试与证书安装 | VPNWorld",
    description: "iOS 苹果最普及翻墙神器 Shadowrocket（小火箭）入门到精通指南。涵盖美区 Apple ID 获取、机场节点订阅导入、延迟测速与 HTTPS 解密证书配置。",
    keywords: "Shadowrocket教程, 小火箭设置, iOS翻墙, 苹果梯子, Shadowrocket订阅导入",
    platform: "iOS 苹果手机/平板",
    date: "2026-03-01",
    readTime: "9 分钟",
    difficulty: "新手小白入门",
    h1: "Shadowrocket 小火箭零基础设置教程：订阅导入与高效测速",
    intro: "Shadowrocket（俗称小火箭）是 iOS 平台上最具知名度、兼容性最广的代理应用。售价仅 2.99 美元，却具备极强的协议支持度与灵活的规则分流能力。本文指导新手完成从下载到丝滑上网的全流程。",
    sections: [
      {
        h2: "一、海外 Apple ID 下载小火箭",
        p: "由于众所周知的原因，中国大陆 App Store 已将所有代理工具下架。您需要准备一个美国或香港地区的 Apple ID，在 App Store 登录后搜索‘Shadowrocket’购买下载（注意正版开发者为 Pan Xiao Fei，谨防同名虚假盗版软件）。"
      },
      {
        h2: "二、三秒一键导入机场订阅",
        steps: [
          "在 Safari 浏览器中登录您的机场用户后台（如 <a href='../../review/yinxingren/index.html'>隐形人</a> 或 <a href='../../review/feiv/index.html'>飞V</a>）。",
          "在‘一键导入’区域点击【导入到 Shadowrocket】，系统会自动唤起小火箭并自动填入订阅地址与节点列表。",
          "若无法自动唤起，可手动点击小火箭右上角【+】号，类型选择【Subscribe】，将订阅 URL 粘贴进【URL】栏，点击右上角【保存】即可自动拉取更新。"
        ]
      },
      {
        h2: "三、路由模式与连通性测试",
        p: "主界面将【全局路由】保持为默认的【配置（Config）】（即分流模式）。点击【连通性测试】可批量检测所有节点的延迟，选中低延迟绿标节点后，打开顶部总开关，系统弹出‘添加 VPN 配置’时输入锁屏密码确认即可开启网络自由。"
      }
    ],
    recommendedBrands: ["yinxingren", "feiv", "wuyou"]
  },
  {
    slug: "quantumult-x-guide",
    title: "Quantumult X（圈X）终极实操教程：分流规则、重写脚本与任务配置 | VPNWorld",
    description: "2026最新 iOS 旗舰代理神器 Quantumult X 全方位实战指南。手把手教你配置策略组、引用外部规则分流、MitM 证书安装与 JS 自动化重写脚本。",
    keywords: "Quantumult X教程, 圈X配置, iOS高级代理, MitM证书, 分流规则, 策略组",
    platform: "iOS 苹果",
    date: "2026-03-01",
    readTime: "12 分钟",
    difficulty: "资深玩家",
    h1: "Quantumult X 终极配置教程：策略组、分流规则与 MitM 重写",
    intro: "被广大极客誉为‘圈X’的 Quantumult X 是 iOS 平台上的工业级网络工具。除了极低耗电与毫秒级延迟表现外，其强大的策略组嵌套、分流重写与 JavaScript 脚本执行能力使其无可替代。本文带您彻底掌握圈X的核心精髓。",
    sections: [
      {
        h2: "一、圈X的核心界面与逻辑认知",
        p: "圈X主屏由三部分组成：顶部为各策略组的展开卡片，中部为流量统计与网络图表，底部大风车为开关与设置入口。圈X坚持以‘配置文件’驱动，所有分流、节点筛选与重写规则均条理清晰地记录在配置文件中。"
      },
      {
        h2: "二、添加节点资源（Server Resource）",
        steps: [
          "点击右下角大风车 -> 在【节点】栏目点击【节点资源】。",
          "点击右上角【+】号，填入资源标签（如‘微风专线’），将机场提供的 Quantumult X 格式订阅链接粘贴至【资源路径】。",
          "向左滑动该资源点击【更新】，即可瞬间加载上百个全球节点。"
        ]
      },
      {
        h2: "三、分流规则集（Filter）与策略组搭建",
        p: "建议为媒体、国外常见站点、OpenAI 分别设置独立策略组。例如通过引用预置分流规则集，实现将 Netflix 流量固定分流至支持解锁的新加坡专线节点，而常规 Google/YouTube 则走延迟最低的香港中继线路。"
      }
    ],
    recommendedBrands: ["breezenet", "flashleap", "lingmao"]
  },
  {
    slug: "surge-ios-mac",
    title: "Surge iOS & Mac 高级配置全解析：策略组、模块与网络抓包实战 | VPNWorld",
    description: "Mac 与 iOS 双端神级网络调试代理工具 Surge 完全使用教程。讲解智能策略组构建、PON 抓包分析、MitM 模块扩展与企业级路由分流。",
    keywords: "Surge教程, Surge Mac, Surge iOS, 策略组, 网络调试, 机场订阅",
    platform: "macOS / iOS",
    date: "2026-03-01",
    readTime: "15 分钟",
    difficulty: "资深专家",
    h1: "Surge iOS & Mac 深度实战教程：掌控每一比特流量",
    intro: "Surge 是苹果生态中公认的网络调试与代理天花板。无论是其在 macOS 下的无缝接管能力，还是移动端的卓越稳定性，都体现了顶级工程水准。本文详解如何为 Surge 装载机场订阅并发挥其全部威力。",
    sections: [
      {
        h2: "一、为什么专业开发者与网络工程师偏爱 Surge？",
        p: "Surge 拥有毫秒级精准的诊断控制台、完整的 HTTP/HTTPS 请求与响应抓包审计面板、智能的链路备援机制。在跨国协同、海外 API 联调与全家网络调度场景下，Surge 提供了无可挑剔的鲁棒性。"
      },
      {
        h2: "二、订阅托管与 Policy Group 策略组搭建",
        p: "通过 `[Proxy Group]` 指令，您可以构建具备自动测速（url-test）、负载均衡（load-balance）与故障转移（fallback）的超高可靠策略群。即使某个落地节点由于机房维护临时下线，Surge 也会在 50ms 内无感切换至备用专线。"
      }
    ],
    recommendedBrands: ["yinxingren", "kuajiecloud", "breezenet"]
  },
  {
    slug: "loon-setup",
    title: "Loon 客户端新手配置全指南：插件中心、分流订阅与脚本调试 | VPNWorld",
    description: "iOS 高性价比代理利器 Loon 新手入门教程。详解一键插件安装、机场订阅导入、策略组自定义与去广告免配置流程。",
    keywords: "Loon教程, Loon配置, iOS代理工具, 插件中心, 机场节点",
    platform: "iOS 苹果",
    date: "2026-03-01",
    readTime: "8 分钟",
    difficulty: "入门级",
    h1: "Loon 客户端配置完全指南：开箱即用的插件生态",
    intro: "Loon 是近年来在 iOS 社区异军突起的网络代理神器。它在保持轻巧省电的同时，独创了‘插件中心’机制，大幅降低了初学者的学习曲线。无论是看流媒体还是访问 ChatGPT，只需一键启用对应插件即可搞定复杂的规则配置。",
    sections: [
      {
        h2: "一、基础配置：快速导入节点",
        steps: [
          "打开 Loon，点击下方【配置】->【节点订阅】。",
          "点击右上角【+】，粘贴机场订阅链接并保存更新。",
          "回到【仪表盘】，点击【策略组】，选择需要使用的节点。"
        ]
      },
      {
        h2: "二、善用插件中心：一键实现流媒体分流与去广告",
        p: "Loon 内置了丰富的官方与社区插件。用户无需手动编写复杂的 MitM 和 Script 脚本，只需在【插件】界面搜索‘OpenAI’或‘Bilibili 换区’，点击安装即刻生效。"
      }
    ],
    recommendedBrands: ["feimaoyun", "breezenet", "firefly"]
  },
  {
    slug: "stash-ios",
    title: "Stash（Clash for iOS）完全配置教程：覆写规则、Tun模式与多配置文件 | VPNWorld",
    description: "Stash 客户端实操指南。如何在 iPhone 与 iPad 上完美运行 Clash 规则订阅，体验原生 Clash YAML 兼容、按需连接与策略组管理。",
    keywords: "Stash教程, Clash for iOS, Stash配置, 苹果Clash, 覆写规则",
    platform: "iOS / iPadOS / macOS",
    date: "2026-03-01",
    readTime: "9 分钟",
    difficulty: "中级进阶",
    h1: "Stash 完全配置教程：在 iOS 体验纯正 Clash 威力",
    intro: "Stash 是 iOS 平台上第一款全面兼容 Clash 配置标准的高性能代理客户端。如果您在 Windows 或 Mac 端早已习惯了 Clash 的规则体系与策略组逻辑，那么 Stash 将为您提供跨设备完全一致的无缝上网体验。",
    sections: [
      {
        h2: "一、直接载入标准 Clash 订阅",
        p: "无需任何格式转换工具，直接将机场后台的 Clash YAML 订阅链接粘贴至 Stash，即可无损解析出所有的 Proxies、Proxy Group 与 Rules 规则链条。"
      },
      {
        h2: "二、On-Demand 按需连接省电神技",
        p: "开启 On-Demand（按需连接）后，iOS 系统仅在检测到有网络请求时自动激活代理隧道，在锁屏待机状态下完全断电休眠，彻底消除后台偷跑电量的顾虑。"
      }
    ],
    recommendedBrands: ["wuyou", "yinxingren", "laddercloud"]
  },
  {
    slug: "v2rayn-pc",
    title: "v2rayN 电脑客户端配置教程：Xray核心、VLESS Reality与节点测速 | VPNWorld",
    description: "经典老牌 Windows 代理利器 v2rayN 2026年最新安装教程。全面支持 Xray / Sing-box 双内核、VLESS Reality 协议导入与批量真连接延迟测试。",
    keywords: "v2rayN教程, Xray客户端, VLESS Reality配置, 电脑翻墙软件, 节点真连接测速",
    platform: "Windows 电脑",
    date: "2026-03-01",
    readTime: "8 分钟",
    difficulty: "入门级",
    h1: "v2rayN 电脑客户端配置教程：老牌经典与双内核加持",
    intro: "v2rayN 是 Windows 平台上历史悠久、用户基数极大的开源免费代理工具。支持 Xray 与 Sing-box 核心无缝切换，界面直观，测速功能极其强大，是验证机场节点网络质量的首选工具。",
    sections: [
      {
        h2: "一、下载安装与核心更新",
        p: "从 GitHub 官方 Releases 下载 `v2rayN-with-dependencies.zip`，解压即可运行。初次打开后，在顶部菜单【检查更新】中一键将 Xray-core 更新至最新发行版。"
      },
      {
        h2: "二、订阅导入与真连接测速（Tcping / 真延迟）",
        p: "点击【订阅分组】->【订阅分组设置】->【添加】，填入机场订阅地址。点击【订阅】->【更新订阅】加载节点。按 `Ctrl+A` 全选节点，按 `Ctrl+R` 进行‘真连接延迟测速’（基于真实 HTTP 请求握手），延迟显示为绿色数字的即为可用节点。"
      }
    ],
    recommendedBrands: ["feiv", "feimaoyun", "breezenet"]
  },
  {
    slug: "clash-meta-android",
    title: "Clash Meta for Android 详细实操：分应用代理、Tun模式与DNS防污染 | VPNWorld",
    description: "安卓手机最强开源翻墙工具 Clash Meta for Android (CMFA) 使用教程。详解配置导入、应用分流白名单、Tun 虚拟网卡与全局代理避坑。",
    keywords: "Clash Meta for Android, 安卓翻墙教程, CMFA配置, 分应用代理, 手机梯子",
    platform: "Android 安卓手机/平板",
    date: "2026-03-01",
    readTime: "9 分钟",
    difficulty: "新手小白入门",
    h1: "Clash Meta for Android 详细实战：安卓机翻墙首选利器",
    intro: "Clash Meta for Android（简称 CMFA）是目前 Android 阵营中功能最全面、协议支持最前沿的代理应用。基于 Mihomo 内核深度优化，完美解决了安卓系统杀后台、应用分流失效以及 DNS 泄露等老大难问题。",
    sections: [
      {
        h2: "一、分应用代理（应用分流）避坑设置",
        p: "很多国内应用（如微信、美团、淘宝、手机网银）在检测到代理开启时可能出现卡顿或风控。CMFA 提供了强大的应用分流功能，进入【设置】->【网络】->【分应用代理】，您可以自由勾选仅允许 Chrome、YouTube、Telegram 等海外软件走代理，国内软件完全不经过代理内核。"
      },
      {
        h2: "二、常驻后台保活技巧",
        steps: [
          "在手机系统【设置】->【应用管理】中找到 Clash Meta，将‘电池优化’设置为‘无限制’。",
          "在多任务卡片视图中，下拉 Clash Meta 应用卡片并点击【锁定】图标。",
          "开启客户端内的【自动启动】与【常驻通知栏】选项，确保在息屏待机状态下后台推送不间断。"
        ]
      }
    ],
    recommendedBrands: ["breezenet", "feimaoyun", "yinxingren"]
  },
  {
    slug: "nekobox-android",
    title: "NekoBox Android 手机客户端配置指南：Sing-box核心、多协议兼容 | VPNWorld",
    description: "轻量化安卓代理神器 NekoBox for Android 实操教程。基于 Sing-box 核心，原生支持 Trojan、VLESS Reality、Hysteria 2 全系协议。",
    keywords: "NekoBox教程, 安卓Sing-box客户端, VLESS Reality, Hysteria 2, 手机梯子",
    platform: "Android 安卓",
    date: "2026-03-01",
    readTime: "8 分钟",
    difficulty: "入门级",
    h1: "NekoBox Android 客户端配置教程：轻量省电与多协议全兼容",
    intro: "NekoBox for Android（简称松鼠/猫猫盒）是一款基于 Sing-box 核心构建的开源安卓客户端。它以界面干净、内存占用极低（仅约 30MB）、支持全协议直连而著称，深受低配置设备与注重电池续航用户的青睐。",
    sections: [
      {
        h2: "一、多格式订阅解析能力",
        p: "无论是标准的 V2Ray 订阅、Clash 格式、还是最前沿的 Sing-box JSON 格式与通用 Base64 链接，NekoBox 均能自动识别并进行智能转换导入。"
      },
      {
        h2: "二、路由规则与分流模式选择",
        p: "进入【路由设置】，推荐选择【绕过局域网及大陆地址（Bypass LAN & Mainland）】。内置的 GeoIP 与 GeoSite 数据库会自动识别国内主流 CDN 与域名，实现零配置智能分流。"
      }
    ],
    recommendedBrands: ["feiv", "wuyou", "firefly"]
  },
  {
    slug: "hiddify-next",
    title: "Hiddify Next 跨平台通用客户端教程：零门槛自动分流与多协议支持 | VPNWorld",
    description: "Windows / Mac / Android / iOS / Linux 全平台通吃代理神器 Hiddify Next 上手指南。开箱即用的现代化 UI，全协议支持与傻瓜式一键连接。",
    keywords: "Hiddify Next教程, 跨平台翻墙工具, 一键代理, Hiddify配置, 梯子软件",
    platform: "全平台 (Win/Mac/iOS/Android/Linux)",
    date: "2026-03-01",
    readTime: "7 分钟",
    difficulty: "零门槛小白",
    h1: "Hiddify Next 跨平台通用教程：真正零门槛的翻墙体验",
    intro: "如果您厌倦了在不同操作系统之间学习完全不同的代理软件，Hiddify Next 是绝佳选择。采用 Flutter 开发的现代化跨平台 UI，让 Windows、Mac、Android、iOS 和 Linux 拥有完全一致的操作逻辑与极简体验。",
    sections: [
      {
        h2: "一、极简操作三部曲",
        steps: [
          "下载并安装对应系统的 Hiddify Next 客户端。",
          "点击右上角【+】号，从剪贴板粘贴机场订阅链接，客户端会自动拉取节点并测速。",
          "点击中央圆形的大连接按钮，客户端自动选取延迟最低的最佳节点并启动系统代理。"
        ]
      },
      {
        h2: "二、区域模式与智能分流",
        p: "默认内置【智能分流（Smart Routing）】模式，自动放行微信、支付宝等国内应用，对于 YouTube、Netflix、Google 则自动走境外高速线路，完全无需用户折腾复杂的规则配置文件。"
      }
    ],
    recommendedBrands: ["feimaoyun", "breezenet", "quanqiuyun"]
  },
  {
    slug: "router-openwrt",
    title: "软路由 OpenWrt 安装 OpenClash / PassWall 全屋科学上网教程 | VPNWorld",
    description: "打造全家全设备无感翻墙路由器。详解软路由固件选择、OpenClash 与 PassWall 插件安装、Meta 内核开启与智能电视 / 游戏机透明网关实战。",
    keywords: "OpenWrt软路由翻墙, OpenClash教程, PassWall配置, 全屋科学上网, 旁路由透明代理",
    platform: "OpenWrt 软路由",
    date: "2026-03-01",
    readTime: "16 分钟",
    difficulty: "资深极客",
    h1: "OpenWrt 软路由全局翻墙实操：全屋设备无感透明代理",
    intro: "通过在软路由（如工控机 J4125、N5105、R2S/R4S 或老旧电脑）上部署 OpenWrt，可以实现全家局域网内所有手机、电脑、智能电视（Apple TV / 索尼电视）以及主机游戏机（PS5/Switch）开机即自带科学上网，彻底摆脱每台设备单装客户端的繁琐。",
    sections: [
      {
        h2: "一、主路由 vs 旁路由模式选型",
        p: "如果家里网络结构简单，推荐将 OpenWrt 设为唯一主路由（PPPoE 拨号）；如果已有硬路由（如华硕、小米路由器）提供 Wi-Fi，建议采用‘旁路由（网关模式）’，只需将需要翻墙的设备网关与 DNS 指向软路由 IP 即可，主网络稳定性不受任何干扰。"
      },
      {
        h2: "二、OpenClash 核心配置与 Fake-IP 模式",
        steps: [
          "在 OpenWrt 后台进入【服务】->【OpenClash】->【配置文件订阅】，添加机场订阅链接。",
          "在【插件设置】中将运行模式切换为【Fake-IP（增强模式）】，内核选择【Meta 核心】。",
          "开启【绕过中国大陆 IP】与【大陆白名单】，确保国内流量跑在千兆硬转发上不消耗软路由 CPU 性能。"
        ]
      }
    ],
    recommendedBrands: ["yinxingren", "breezenet", "laddercloud"]
  },
  {
    slug: "linux-sing-box",
    title: "Linux (Ubuntu/Debian) 命令行配置 Sing-box / Mihomo 守护进程代理教程 | VPNWorld",
    description: "Linux 服务器与终端开发者翻墙指南。手把手配置 Sing-box / Mihomo systemd 守护进程、Tun 虚拟网卡与环境变量代理实战。",
    keywords: "Linux翻墙教程, Ubuntu代理配置, Sing-box Linux, systemd守护进程, 终端代理",
    platform: "Linux (Ubuntu / Debian / CentOS)",
    date: "2026-03-01",
    readTime: "11 分钟",
    difficulty: "开发者必备",
    h1: "Linux 命令行翻墙全指南：Sing-box 守护进程与终端环境配置",
    intro: "对于程序员与 Linux 服务器管理员而言，国内云服务器或本地 Linux 工作站拉取 GitHub、下载 Docker 镜像、pip 安装 Python 依赖常因网络封锁失败。本文提供纯命令行环境下的工业级代理解决方案。",
    sections: [
      {
        h2: "一、部署 Sing-box 二进制与 Systemd 服务",
        p: "直接从官方下载编译好的二进制文件放入 `/usr/local/bin/sing-box`，并配置 `/etc/systemd/system/sing-box.service` 实现开机自动后台拉起与异常崩溃自愈。"
      },
      {
        h2: "二、设置终端临时与永久代理环境变量",
        code: `# 终端快速注入代理
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
export all_proxy="socks5://127.0.0.1:7890"

# 验证出口 IP
curl ipinfo.io`
      }
    ],
    recommendedBrands: ["breezenet", "yinxingren", "kuajiecloud"]
  },
  {
    slug: "apple-tv",
    title: "Apple TV 配合 tvOS 17+ 代理客户端（Surge/Stash/Sing-box）全屏翻墙教程 | VPNWorld",
    description: "tvOS 原生翻墙全解。利用 Apple TV 官方 App Store 安装 Surge、Stash、Sing-box 或 Loon，在大屏幕上无损观看 4K HDR 奈飞与 YouTube。",
    keywords: "Apple TV翻墙, tvOS代理软件, Surge Apple TV, Stash tvOS, 奈飞4K大屏",
    platform: "Apple TV (tvOS 17+)",
    date: "2026-03-01",
    readTime: "10 分钟",
    difficulty: "进阶玩家",
    h1: "Apple TV 大屏科学上网完全指南：tvOS 原生客户端配置实操",
    intro: "自 tvOS 17 开放原生 VPN 框架后，Apple TV 彻底摆脱了必须依赖软路由或电脑共享代理的尴尬局面。现在直接在电视端 App Store 安装 Surge、Stash、Sing-box 或 Loon，即可享受原生 4K@60fps 杜比视界片源直冲。",
    sections: [
      {
        h2: "一、客户端下载与 iCloud 同步",
        p: "使用外区 Apple ID 登录 Apple TV 上的 App Store，下载 Stash 或 Surge。如果您的 iPhone 上已经购买并配置好了该软件，tvOS 端支持通过 iCloud 一键自动同步所有的订阅和节点配置，遥控器无需输入任何字符！"
      },
      {
        h2: "二、节点选择与原生解锁验证",
        p: "在大屏幕上观看 Netflix、Disney+ 与 YouTube 4K 时，对节点的瞬时带宽与流媒体解锁能力要求极高。务必选择支持原生解锁的企业专线节点（如微风网络或隐形人），以避免频繁触发代理警告或降低至 1080P 画质。"
      }
    ],
    recommendedBrands: ["yinxingren", "breezenet", "wuyou"]
  },
  {
    slug: "game-console-proxy",
    title: "PS5 / Nintendo Switch / Xbox 主机翻墙联机与NAT加速实战教程 | VPNWorld",
    description: "主机游戏玩家必看！如何利用电脑代理共享、软路由或手机热点，让 PlayStation 5、Switch 和 Xbox 实现 NAT Type A/2 极速联机与游戏满速下载。",
    keywords: "PS5翻墙教程, Switch联机加速, Xbox代理设置, NAT类型优化, 主机游戏梯子",
    platform: "PS5 / Switch / Xbox 主机",
    date: "2026-03-01",
    readTime: "12 分钟",
    difficulty: "玩家进阶",
    h1: "游戏主机科学上网与 NAT 优化指南：告别联机丢包与商店打不开",
    intro: "国内主机玩家经常遭遇 PSN 商店加载转圈、任天堂 eShop 报错 2811-5001、或者怪物猎人 / 宝可梦 / 战地联机经常掉线掉包的问题。本文教您用最简单的三种方法实现主机游戏全球顺畅联机。",
    sections: [
      {
        h2: "一、方法一：PC 端局域网代理共享（零成本最快方案）",
        steps: [
          "在电脑端 Clash Verge Rev 设置中，打开【允许局域网连接（Allow LAN）】开关。",
          "记下电脑在路由器内的局域网 IP（例如 `192.168.1.100`）与代理端口（默认 `7890`）。",
          "打开 PS5 或 Switch 网络设置，选择【手动设置】，将代理服务器 IP 填入电脑 IP，端口填入 7890，保存连接即可。"
        ]
      },
      {
        h2: "二、方法二：路由器 Tun / Full-Cone 模式（彻底解决 NAT 严格）",
        p: "如果想要联机派对开黑无阻碍，必须达到 NAT Type A（Switch）或 Type 2（PS5）。推荐使用支持 UDP Full-Cone NAT 的专线机场节点（如闪跃或微风网络），并通过软路由实现全端口转发。"
      }
    ],
    recommendedBrands: ["flashleap", "breezenet", "yinxingren"]
  },
  {
    slug: "subconverter-guide",
    title: "订阅转换工具 Subconverter 自建与使用教程：节点清洗与规则重构 | VPNWorld",
    description: "为什么绝不能使用公共订阅转换平台？手把手教你利用 Docker 自建安全隐私的 Subconverter 服务，清洗垃圾节点并注入定制分流规则。",
    keywords: "Subconverter教程, 订阅转换自建, 隐私安全, 节点清洗, 订阅泄露防范",
    platform: "跨平台 / Docker",
    date: "2026-03-01",
    readTime: "13 分钟",
    difficulty: "资深玩家",
    h1: "Subconverter 订阅转换深度实战：保障隐私与深度定制规则",
    intro: "公共订阅转换网站常年存在‘后门偷跑订阅链接’、‘窃取用户流量’以及‘注入恶意推广’的巨大安全隐患。本文带您认清公共转换的风险，并指导如何通过本地运行或 Docker 一键搭建专属于自己的私有订阅转换中心。",
    sections: [
      {
        h2: "一、公共订阅转换的致命隐患",
        p: "当您将机场原订阅粘贴到不知名公共转换网站时，该网站的站长后台可以轻松获取包含您 Token 的原始链接，从而随意使用您的流量，甚至导致您的机场账号被判定多 IP 异地异常滥用而直接封号。"
      },
      {
        h2: "二、Docker 一秒自建 Subconverter",
        code: `docker run -d --name subconverter \\
  --restart=always -p 25500:25500 \\
  tindy2013/subconverter:latest`
      }
    ],
    recommendedBrands: ["breezenet", "yinxingren", "lingmao"]
  },
  {
    slug: "switchyomega-browser",
    title: "Chrome & Edge 浏览器插件 ZeroOmega / SwitchyOmega 独立代理分流指南 | VPNWorld",
    description: "无需全局开启客户端！利用浏览器扩展 ZeroOmega（SwitchyOmega 现代维护版）实现指定网页走机场节点，其它流量完全直连的极简方案。",
    keywords: "SwitchyOmega教程, ZeroOmega, 浏览器代理扩展, Chrome翻墙, 按需分流",
    platform: "Chrome / Edge / Firefox 浏览器",
    date: "2026-03-01",
    readTime: "7 分钟",
    difficulty: "新手轻量级",
    h1: "浏览器独立代理神器 ZeroOmega 指南：轻巧无感的分流体验",
    intro: "如果您仅仅是在查资料时需要访问 Google 或阅读境外技术文档，完全不希望整台电脑的微信、钉钉或后台软件都处于代理网络下，那么使用浏览器扩展独立代理是最优雅的解决方案。",
    sections: [
      {
        h2: "一、从 SwitchyOmega 到 ZeroOmega",
        p: "由于 Google Chrome 全面推行 Manifest V3 扩展规范，老版 SwitchyOmega 已停止适配。社区推荐升级至完全兼容 V3 规范的 ZeroOmega，支持一键无损导入原有备份。"
      },
      {
        h2: "二、配置 Auto Switch 自动切换情景模式",
        p: "利用 Auto Switch 模式配合 GFWList 规则列表，当访问 wikipedia.org、google.com 时自动调用本地 7890 端口代理，访问 baidu.com、bilibili.com 时自动直接连接，省心高效。"
      }
    ],
    recommendedBrands: ["feiv", "feimaoyun", "breezenet"]
  },
  {
    slug: "telegram-proxy",
    title: "Telegram 电脑与手机客户端独立 MTProto / Socks5 代理设置教程 | VPNWorld",
    description: "Telegram 电报连接转圈卡在‘Connecting...’？详细教你配置 TG 客户端内置 Socks5 代理与搭建私有 MTProto 专线协议。",
    keywords: "Telegram代理设置, 电报翻墙, MTProto代理, Socks5代理, TG连接不上",
    platform: "Windows / macOS / iOS / Android",
    date: "2026-03-01",
    readTime: "8 分钟",
    difficulty: "入门级",
    h1: "Telegram 独立代理全攻略：告别‘Connecting...’无限转圈",
    intro: "Telegram 在中国大陆属于重点干扰目标。很多用户即使打开了系统代理，由于系统代理模式未接管非 HTTP 协议流量，TG 依然频繁处于卡死或收发图片缓慢状态。配置 TG 内部独立代理即可瞬间秒连。",
    sections: [
      {
        h2: "一、在 Telegram 内直接绑定本地 Socks5 端口",
        steps: [
          "打开 Telegram【Settings】->【Data and Storage】->【Proxy Settings】。",
          "点击【Add Proxy】，选择【SOCKS5】。",
          "Server 填入 `127.0.0.1`，Port 填入代理客户端的本地监听端口（Clash 默认为 `7890`，v2rayN 默认为 `10808`），点击保存即可。"
        ]
      }
    ],
    recommendedBrands: ["breezenet", "yinxingren", "wuyou"]
  },
  {
    slug: "chatgpt-unblock",
    title: "ChatGPT & Claude 专线访问全攻略：解锁 1020 报错与 IP 纯净度检测 | VPNWorld",
    description: "彻底告别‘Access Denied 1020’与‘Not available in your country’！如何挑选低欺诈分干净节点，顺畅使用 ChatGPT 4o 与 Claude 3.5 Sonnet。",
    keywords: "ChatGPT报错1020, 解锁ChatGPT, Claude翻墙节点, IP纯净度, OpenAI访问受限",
    platform: "Web 浏览器 / 客户端",
    date: "2026-03-01",
    readTime: "11 分钟",
    difficulty: "必修技巧",
    h1: "ChatGPT 与 Claude 顺畅访问指南：攻克报错与纯净节点挑选",
    intro: "OpenAI 与 Anthropic 对访问 IP 的风控极为严苛，数据中心（机房 IP）常常遭到大面积拉黑屏蔽，轻则弹出 Cloudflare 恶心的人机验证循环，重则直接显示 1020 访问拒绝甚至永久封禁账号。本文教您如何挑选合格的专用节点。",
    sections: [
      {
        h2: "一、常见的四大报错与背后根源",
        p: "‘Not available in your country’通常是因为节点所在地处于不开放地区（如香港）；‘Access Denied 1020’通常是因为机房 IP 被万人共用触发了 Cloudflare 威胁情报标记；‘High risk IP’则是 IP 被欺诈库标记为数据中心批量爬虫。"
      },
      {
        h2: "二、实测合格的 AI 专线机场标准",
        p: "推荐使用具备原生家庭宽带落地或优化商宽的中继/专线机场（如隐形人、闪跃、微风网络），其节点具备专属解锁池，每天自动轮换清洗，稳定保持 0%~15% 的超低欺诈分。"
      }
    ],
    recommendedBrands: ["yinxingren", "flashleap", "breezenet"]
  },
  {
    slug: "netflix-disney-unlock",
    title: "Netflix 奈飞与 Disney+ 4K 跨区解锁教程：原生 IP 识别与分流重定向 | VPNWorld",
    description: "全面解决奈飞‘只能看自制剧（Netflix Originals）’与 Disney+ 报错 73/83。手把手教你识别真正的非自制剧解锁节点与分流规则配置。",
    keywords: "Netflix解锁教程, 奈飞只能看自制剧, Disney+报错, 原生IP节点, 流媒体分流",
    platform: "全平台 (TV/PC/Mobile)",
    date: "2026-03-01",
    readTime: "10 分钟",
    difficulty: "流媒体爱好者",
    h1: "Netflix 与 Disney+ 4K 解锁全攻略：告别自制剧受限与报错代码",
    intro: "许多新手购买了机场后打开 Netflix，发现只能搜到怪奇物语等 Netflix 自制剧，搜不到绝命毒师、进击的巨人等第三方版权剧；或者 Disney+ 报错无法播放。这说明您连接的节点并非该区域的完整解锁 IP。本文教您如何彻底解决。",
    sections: [
      {
        h2: "一、如何快速验证节点是否具备完整解锁资格",
        p: "在 Netflix 搜索框输入‘Breaking Bad’（绝命毒师）。如果能够正常检索并播放，说明该节点具备完全非自制剧商业版权解锁能力；若检索结果全无，说明仅具备半解锁或直连 DNS 伪装。"
      },
      {
        h2: "二、利用策略组锁定流媒体专属落地",
        p: "在 Clash Verge Rev 或 Surge 中，将 Netflix 规则组固定绑定到带有‘NF’或‘原生’标识的新加坡或台湾专线节点，而日常网页仍走香港低延迟节点，两者互不干扰。"
      }
    ],
    recommendedBrands: ["yinxingren", "breezenet", "kuajiecloud"]
  },
  {
    slug: "airport-speedtest",
    title: "机场节点真伪测速全教程：Stairs Speedtest 使用与晚高峰压测技巧 | VPNWorld",
    description: "学会像专业测评博主一样测试机场！详细讲解 Stairs Speedtest 批量测速工具使用、晚高峰 20:00~23:00 丢包压测与真假千兆带宽鉴别。",
    keywords: "机场测速教程, Stairs Speedtest, 节点压测, 晚高峰丢包测试, 测速图辨识",
    platform: "Windows / macOS",
    date: "2026-03-01",
    readTime: "11 分钟",
    difficulty: "进阶鉴别",
    h1: "机场节点真假测速全解析：学会专业压测与识别虚假宣传",
    intro: "论坛与群聊中满天飞的‘全绿 1000M 测速图’究竟有多少水分？为什么别人测速能跑满 500M，自己看 4K 却依然卡顿？本文手把手教你搭建专业的测试环境，用科学量化的数据揭露机场真实底细。",
    sections: [
      {
        h2: "一、为什么 Speedtest 网页测速会严重失真？",
        p: "许多机场会在规则中对 `speedtest.net` 的域名进行劫持或优先调度至特权测速节点，甚至利用国内 CDN 欺骗测速结果。只有通过全链路拉取大文件压测，才能反映真实出口带宽。"
      },
      {
        h2: "二、晚高峰（20:00 - 23:00）是照妖镜",
        p: "白天网络空闲期任何廉价机场都能测出不错的数据。真正的考验在晚高峰全国骨干网拥塞时刻。连续测试 30 次 Ping 丢包率与油管 4K 缓冲健康度，丢包率持续低于 1% 的才是真专线。"
      }
    ],
    recommendedBrands: ["yinxingren", "breezenet", "flashleap"]
  },
  {
    slug: "dns-leak-check",
    title: "防止 DNS 泄漏与运营商反诈拦截：DoH / DoT 与 Fake-IP 深度设置教程 | VPNWorld",
    description: "科学上网防追踪第一课！详解 DNS 泄露原理、如何在线检测真实运营商暴露，以及利用 DoH 加密 DNS 和 Fake-IP 打造无痕安全隧道。",
    keywords: "DNS泄漏检测, DoH加密DNS, 防运营商拦截, Fake-IP设置, 翻墙安全防护",
    platform: "全平台通用",
    date: "2026-03-01",
    readTime: "9 分钟",
    difficulty: "安全必修",
    h1: "DNS 泄露防护与反诈拦截防御实操：封堵网络隐私后门",
    intro: "很多用户以为开启了代理软件就万事大吉，却不知本地 DNS 查询依然在向国内运营商机房明文发送每一个访问的海外域名，导致被反诈系统精准识别。本文指导您彻底排查并封堵 DNS 泄露隐患。",
    sections: [
      {
        h2: "一、一分钟自测是否发生 DNS 泄漏",
        p: "打开专门的检测网站（如 `dnsleaktest.com`），点击【Extended Test】。如果在测试结果列表中赫然出现了‘China Telecom’、‘China Unicom’或国内本地 IP，说明您的代理配置存在严重的 DNS 泄露！"
      },
      {
        h2: "二、开启 DoH（DNS-over-HTTPS）加密上游",
        p: "在客户端配置中，将海外 DNS 上游指定为加密的 Cloudflare（`https://1.1.1.1/dns-query`）或 Google DNS（`https://dns.google/dns-query`），使中间任何网络节点无法窥探您的解析请求。"
      }
    ],
    recommendedBrands: ["yinxingren", "flashleap", "wuyou"]
  },
  {
    slug: "udp-fullcone-gaming",
    title: "UDP Full-Cone NAT 开启与电竞游戏低延迟加速调优实操教程 | VPNWorld",
    description: "专为外服联机玩家打造的低延迟优化指南。详解 UDP Full-Cone NAT 原理、如何在 Clash 与软路由开启对称型 NAT 穿透，消除丢包与掉线。",
    keywords: "UDP Full-Cone, NAT穿透优化, 外服游戏低延迟, 战地Apex连麦, 节点UDP测试",
    platform: "Windows / 软路由",
    date: "2026-03-01",
    readTime: "10 分钟",
    difficulty: "电竞调优",
    h1: "UDP Full-Cone NAT 开启指南：电竞外服联机低延迟实战",
    intro: "在玩 Apex 英雄、无畏契约、绝地求生等外服游戏或使用 Discord 语音连麦时，游戏数据传输完全基于 UDP 协议。如果机场节点不支持 UDP 转发或 NAT 类型严格，将导致频繁丢包甚至无法进入大厅。本文详解如何调优。",
    sections: [
      {
        h2: "一、什么是 Full-Cone（完全圆锥型）NAT？",
        p: "Full-Cone NAT 是最开放的 NAT 类型。一旦内部端口向外发送过数据，任何外部服务器均可反向向该端口推送游戏状态包，极大提升 P2P 联机撮合成功率并压低排队延迟。"
      },
      {
        h2: "二、验证节点是否支持 UDP 转发",
        p: "在客户端测速选项中开启【UDP 连通性测试】。只有显示支持 UDP 且 NAT 类型为 FullCone 的节点（如闪跃、微风专线），才适合作为联机加速主力。"
      }
    ],
    recommendedBrands: ["flashleap", "breezenet", "feimaoyun"]
  },
  {
    slug: "mitm-rewrite-rules",
    title: "MitM 证书安装与 HTTP 重写教程：去网页广告与脚本自动化实操 | VPNWorld",
    description: "Quantumult X / Loon / Surge 核心高阶技能！详解中间人攻击（MitM）CA 证书生成信任、HTTPS 流量解密与主流规则重写去广告配置。",
    keywords: "MitM证书安装, HTTPS解密, 规则重写, 去开屏广告, Quantumult X脚本",
    platform: "iOS 苹果",
    date: "2026-03-01",
    readTime: "12 分钟",
    difficulty: "资深高阶",
    h1: "MitM 证书安装与重写脚本全攻略：解锁 iOS 终极可定制性",
    intro: "想要彻底去除 App 内烦人的开屏广告与弹窗？想要实现各大平台的自动签到？这必须依靠 MitM（Man-in-the-Middle）技术。本文手把手教您在保证手机绝对安全的前提下，正确生成、安装并信任本地根证书。",
    sections: [
      {
        h2: "一、MitM 的工作原理与安全性澄清",
        p: "很多用户听到‘中间人证书’感到害怕。其实该证书完全由您本人的手机本地离线随机生成，私钥仅保存在手机 Secure Enclave 内部，绝无第三方泄露可能，作用仅在于允许本地代理工具解密并修改指定广告请求。"
      },
      {
        h2: "二、系统信任证书的必备两步",
        steps: [
          "在代理软件中生成并下载证书至 iOS 系统描述文件，进入【设置】->【已下载描述文件】完成安装。",
          "关键一步：进入系统【设置】->【通用】->【关于本机】->【证书信任设置】，找到刚安装的证书，手动勾选【完全信任】开关。"
        ]
      }
    ],
    recommendedBrands: ["yinxingren", "breezenet", "kuajiecloud"]
  },
  {
    slug: "clash-tun-mode",
    title: "Clash Verge / Meta Tun 虚拟网卡模式避坑指南：断网、DNS冲突与提权修复 | VPNWorld",
    description: "开启 Tun 模式后电脑无法上网或所有网页打不开？全面诊断 WinTun 驱动损坏、网卡网关优先级冲突、Service 模式授权失败等疑难杂症。",
    keywords: "Clash Tun模式断网, WinTun驱动错误, Clash断网修复, 虚拟网卡冲突, Service Mode安装",
    platform: "Windows / macOS",
    date: "2026-03-01",
    readTime: "9 分钟",
    difficulty: "故障排查必读",
    h1: "Clash Tun 模式终极避坑排查：告别断网、驱动报错与冲突",
    intro: "Tun 模式是解决整机应用（如游戏、终端、特定行业软件）代理的最佳武器，但在实际使用中，经常有用户反馈‘开启 Tun 后整台电脑无法上网’或提示驱动加载失败。本文提供 5 步立竿见影的修复方案。",
    sections: [
      {
        h2: "一、最常见元凶：Service Mode（系统服务模式）未授权",
        p: "Tun 模式需要深度修改系统的核心网络路由表，普通用户权限极易被 Windows 安全策略拦截。必须在 Clash Verge Rev 的【设置】中先点击安装【Service Mode】，并在其绿灯亮起后再启动 Tun 开关。"
      },
      {
        h2: "二、清理残留虚拟网卡驱动",
        p: "如果之前安装过其他加速器或旧版 VPN，设备管理器中可能残留过期的 WinTun 虚拟适配器。打开【设备管理器】->【网络适配器】，卸载多余的虚拟网卡并重启电脑即可彻底恢复正常。"
      }
    ],
    recommendedBrands: ["yinxingren", "breezenet", "wuyou"]
  },
  {
    slug: "docker-proxy-server",
    title: "Docker 部署 V2Ray / Sing-box 服务端与客户端内网穿透代理实战教程 | VPNWorld",
    description: "服务器运维与极客开发者必读。详解利用 Docker 一键部署 Sing-box 客户端，实现本地内网服务器透明翻墙与容器集群加速拉取。",
    keywords: "Docker部署代理, Sing-box Docker, 容器翻墙, 内网代理穿透, 服务器网络加速",
    platform: "Linux / Docker",
    date: "2026-03-01",
    readTime: "11 分钟",
    difficulty: "运维架构师",
    h1: "Docker 部署代理服务实操指南：让整个容器网络丝滑加速",
    intro: "在 Linux 服务器集群或家用群晖 NAS 上，如果每个容器单独配置代理极其低效繁琐。通过运行一个独立的轻量 Sing-box 代理容器，并配置 host 或 macvlan 网络，可以让所有容器环境共享高速境外网络。本文手把手演示实战部署。",
    sections: [
      {
        h2: "一、编写极简 docker-compose.yml",
        code: `version: '3'
services:
  sing-box:
    image: ghcr.io/sagernet/sing-box:latest
    container_name: sing-box
    restart: always
    network_mode: host
    volumes:
      - ./config.json:/etc/sing-box/config.json
    cap_add:
      - NET_ADMIN`
      },
      {
        h2: "二、配置容器镜像拉取与环境变量分流",
        p: "利用上述容器提供的本地 7890 端口，可让 Docker Daemon 守护进程无缝拉取境外镜像，彻底解决国内服务器拉取 Docker Hub 频繁连接超时的问题。"
      }
    ],
    recommendedBrands: ["breezenet", "yinxingren", "laddercloud"]
  }
];
