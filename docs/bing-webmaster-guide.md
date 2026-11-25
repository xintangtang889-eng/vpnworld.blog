# Bing Webmaster Tools (必应站长平台) 完整实操与验证指南

本文档为 `vpnworld.blog` 网站管理员提供详细的 Bing Webmaster Tools 配置步骤。

---

## 一、添加站点与所有权验证

1. 打开 [Bing Webmaster Tools 官方控制台](https://www.bing.com/webmasters) 并使用微软账号登录。
2. 在左上角点击 **“添加网站” (Add a site)**：
   - 输入正式生产域名：`https://vpnworld.blog/`
3. 选择验证方式：
   - **方式 A（推荐 · HTML 标记验证）：** Bing 会提供一段 `<meta name="msvalidate.01" content="YOUR_KEY" />` 标签，将其复制添加到 `index.html` 的 `<head>` 区域即可。
   - **方式 B（DNS CNAME / TXT 验证）：** 在域名 DNS 解析服务商（如 Cloudflare）后台添加对应的 TXT 记录。
   - **方式 C（Google Search Console 快捷导入）：** 若已在 GSC 完成所有权验证，可直接一键同步授权。

---

## 二、提交 Sitemap (网站地图)

1. 在 Bing 站长平台左侧导航栏中点击 **“站点地图” (Sitemaps)**。
2. 点击右上角 **“提交站点地图” (Submit sitemap)**。
3. 输入完整的正式 Sitemap 地址：
   ```text
   https://vpnworld.blog/sitemap.xml
   ```
   以及站点地图索引：
   ```text
   https://vpnworld.blog/sitemap-index.xml
   ```
4. 提交后系统会显示状态为“已处理”或“正在处理”，通常在 24~48 小时内完成全量索引抓取。

---

## 三、IndexNow 自动推送配置

本站已内置原生 IndexNow 支持：

- **验证 Key 文件：** `https://vpnworld.blog/c7e2b1093f4848d5b4a9238e8316c02a.txt`
- **Key 值：** `c7e2b1093f4848d5b4a9238e8316c02a`
- **本地运行推送命令：**
  ```bash
  # 提交重要更新页面
  npm run indexnow

  # 或提交单个指定页面
  node scripts/indexnow.js https://vpnworld.blog/recommend/budget/
  ```

> **注意：**
> 1. IndexNow 协议能够秒级通知 Bingbot、Yandex 等引擎内容更新；
> 2. 收到 HTTP 200/202 仅代表推送成功，最终是否收录以及排名表现取决于内容质量与必应算法审核。

---

## 四、URL Inspection 与抓取诊断

1. 在左侧菜单点击 **“URL 检查” (URL Inspection)**。
2. 输入待检测的页面（例如 `https://vpnworld.blog/`）。
3. 检查返回结果：
   - **索引状态 (Index Status)：** 是否被成功收录。
   - **移动端友好度 (Mobile Friendliness)：** 是否存在文字过小或元素过近。
   - **页面抓取代码 (Live Test)：** 检查 Bing 抓取到的 HTML 是否包含完整正文内容。

---

## 五、Bing 核心 SEO 关键词跟踪

在 Bing Webmaster 的 **“搜索性能” (Search Performance)** 模块中重点关注本站设定的核心主攻词：
- `机场推荐`
- `机场节点`
- `性价比机场`
- `梯子推荐`
- `vpn`
- `vpn机场`
- `vpn节点`
- `vpn推荐`
