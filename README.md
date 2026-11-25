# VPNWorld.blog - 中文机场博客 · Bing SEO 专业建站系统

面向 Bing 自然搜索流量打造的专业中文机场推荐与 VPN 节点评测系统。

- **正式域名：** [https://vpnworld.blog](https://vpnworld.blog)
- **GitHub 远程仓库：** [https://github.com/xintangtang889-eng/vpnworld.blog](https://github.com/xintangtang889-eng/vpnworld.blog)
- **技术栈：** Astro 5.18.2 + TypeScript + Tailwind CSS + Content Collections
- **本地双击直接运行：** 全站严格遵循标准相对路径，支持在 Windows/Mac 上直接双击（`file://` 协议）正常打开、浏览与交互

---

## 🌟 核心功能特性

1. **专业门户视觉设计：** 现代浅色科技资讯媒体风格，1200px 响应式栅格，优雅排版。
2. **统一机场数据库：** 集中维护在 `src/data/airports.ts`，收录 14 家真实机场完整参数（包含套餐价格、标配流量、月付成本、优惠码及专属 Aff 链接）。
3. **多维排行榜系统：** 包含综合榜（严格按指定权威次序排列）、性价比榜（真实每GB折算）、平民低预算榜、稳定性排行榜。
4. **在线横向对比系统：** 位于 `/compare/`，支持用户交互勾选 2~4 家服务商同屏多维比对。
5. **本地秒开站内搜索：** 按快捷键 `Ctrl + K` 即可唤起全局实时搜索，无需后端数据库即可极速索引。
6. **100 篇深度技术博客 + 30 篇全平台客户端使用教程：** 纯 Markdown 内容集合，由 Zod 严格校验。
7. **Bing Technical SEO：** 完整 Open Graph、Twitter Card、Schema.org 结构化数据、独立 Title 与 Description。
8. **IndexNow 自动提交：** 配套官方 API Key 与自动化推送脚本，快速通知 Bingbot 抓取更新。

---

## 🚀 Cloudflare Pages 部署说明

1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**
3. 选择仓库 `xintangtang889-eng/vpnworld.blog`
4. 构建参数设置：
   - **Framework preset**：`Astro`
   - **Build command**：`npm run build`
   - **Build output directory**：`dist`
   - **Production branch**：`main` 或 `master`
5. 点击 **Save and Deploy** 即可完成全球发布！

---

## 🛠 本地开发与质检脚本

```bash
# 启动本地开发服务器
npm run dev

# 静态打包编译并同步本地根目录
npm run build

# 本地静态预览
npm run preview

# 运行全套自动化质检 (SEO合规 + 链接完整性 + 内容一致性)
npm test

# 向 Bing 触发 IndexNow 协议推送更新
npm run indexnow
```
