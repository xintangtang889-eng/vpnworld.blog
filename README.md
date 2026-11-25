# VPNWorld.blog - 中文机场博客 · Bing SEO 专业建站系统

面向 Bing 自然搜索流量打造的专业中文机场推荐与 VPN 节点评测系统。

- **正式域名：** [https://vpnworld.blog](https://vpnworld.blog)
- **GitHub 远程仓库：** [https://github.com/xintangtang889-eng/vpnworld.blog](https://github.com/xintangtang889-eng/vpnworld.blog)
- **技术标准：** 纯原生 HTML5 + 原生 CSS (无构建器冗余运行时，加载速度达秒开级)
- **本地直接运行：** 全站严格遵循标准相对路径，支持在 Windows/Mac 上直接双击（`file://` 协议）正常打开、浏览与交互

---

## 🌟 核心功能特性

1. **专业门户视觉设计：** 现代浅色科技资讯媒体风格，1200px 响应式栅格，优雅排版。
2. **统一机场数据库：** 集中维护在 `js/airports.js`，包含 5 家真实老牌机场完整参数，杜绝多处维护数据冲突。
3. **多维排行榜系统：** 包含综合榜、性价比榜（真实每GB折算）、平民低预算榜、稳定性排行榜。
4. **在线横向对比系统：** 位于 `/compare/`，支持用户交互勾选 2~4 家服务商同屏多维比对。
5. **本地秒开站内搜索：** 按键盘 `/` 键即可唤起全局实时搜索，无需后端数据库即可极速索引。
6. **Bing Technical SEO：** 完整 Open Graph、Twitter Card、Schema.org 结构化数据、独立 Title 与 Description。
7. **自动化质量验收：** 内置 `audit-seo.js`、`check-links.js` 与 `validate-content.js` 校验脚本。
8. **IndexNow 自动提交：** 配套官方 API Key 与自动化推送脚本，快速通知 Bingbot 抓取更新。

---

## 🛠 本地开发与质检脚本

```bash
# 运行全套自动化质检 (SEO合规 + 链接完整性 + 内容一致性)
npm test

# 单独检查 SEO 标签 (Title, Description, Canonical, H1)
npm run audit

# 单独检查相对路径与死链 (确保支持 file:// 协议)
npm run check-links

# 检查内容与数据库一致性
npm run validate

# 向 Bing 触发 IndexNow 协议推送更新
npm run indexnow
```

---

## 📁 目录架构说明

```text
/
├── index.html                   # 核心首页 (主攻关键词落地页)
├── 404.html                     # 404 页面
├── sitemap.xml                  # 搜索引擎网站地图
├── sitemap-index.xml            # Sitemap 索引文件
├── robots.txt                   # 爬虫抓取规则
├── c7e2b1093f4848d5b4a9238e8316c02a.txt # IndexNow 密钥验证文件
├── css/
│   └── style.css                # 原生响应式设计系统
├── js/
│   ├── airports.js              # 核心机场数据库
│   ├── main.js                  # 导航、FAQ折叠与本地实时检索
│   └── compare.js               # 横向对比工具交互引擎
├── recommend/                   # 6大核心推荐专题 (budget, premium, beginner, stable, ai, streaming)
├── ranking/                     # 4大排行榜 (overall, value, budget, stable)
├── airport/                     # 5个品牌官方档案资料页
├── review/                      # 5篇独立深度评测报告
├── compare/                     # 在线横向对比工具
├── guides/                      # 4大平台客户端教程 (windows, android, ios, macos)
├── blog/                        # 5篇深度文章
├── glossary/                    # 5篇技术知识百科
├── about/                       # 关于我们
├── contact/                     # 联系与纠错
├── editorial-policy/            # 编辑准则与利益披露
├── privacy-policy/              # 隐私权保护政策
├── disclaimer/                  # 法律免责声明
├── docs/                        # SEO地图、验收报告与部署文档
└── scripts/                     # 自动化审计与 IndexNow 脚本
```
