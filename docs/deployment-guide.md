# VPNWorld.blog 部署与上线运维指南

本项目为纯静态秒开架构，无需任何 Node.js 服务端运行环境，天生支持 Cloudflare Pages、GitHub Pages、Vercel 及任意静态虚拟主机。

---

## 方案一：Cloudflare Pages 部署 (强烈推荐 · 免费全球 CDN)

Cloudflare Pages 是本站的最佳部署平台，具备全球 Anycast 边缘缓存与秒级加速能力。

### 部署步骤：
1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)。
2. 进入 **Compute (Workers) & Pages** → 点击 **Create application** → 选择 **Pages** → **Connect to Git**。
3. 选择 GitHub 仓库：`xintangtang889-eng/vpnworld.blog`。
4. 配置构建设置：
   - **Framework preset (框架预设)：** `None`
   - **Build command (构建命令)：** 留空，或填 `npm run build`
   - **Build output directory (输出目录)：** 留空，或者输入根目录 `.`
5. 点击 **Save and Deploy**，Cloudflare 将在 15 秒内完成全站部署！
6. 进入 **Custom domains (自定义域名)** 绑定正式域名：
   - 输入 `vpnworld.blog` 并按照提示开启 Cloudflare CNAME / DNS 解析。

---

## 方案二：GitHub Pages 部署

1. 打开 GitHub 仓库设置：`https://github.com/xintangtang889-eng/vpnworld.blog/settings/pages`
2. 在 **Build and deployment** 下：
   - Source: 选择 **Deploy from a branch**
   - Branch: 选择 `main` 分支，路径选择 `/ (root)`
3. 点击 **Save**。
4. 在 **Custom domain** 中填入 `vpnworld.blog`，勾选 **Enforce HTTPS**。

---

## 三、上线后站长必做清单

1. **域名 DNS 解析：**
   将 `vpnworld.blog` 的 A 记录或 CNAME 解析指向 Cloudflare 或 GitHub Pages。
2. **Bing Webmaster Tools 绑定：**
   按照 [docs/bing-webmaster-guide.md](bing-webmaster-guide.md) 指引，在 Bing 站长平台验证站点并提交 `https://vpnworld.blog/sitemap.xml`。
3. **触发 IndexNow 首批推送：**
   部署上线后，在本地终端运行：
   ```bash
   npm run indexnow
   ```
   秒级通知必应与各搜索引擎蜘蛛来抓取最新更新。
