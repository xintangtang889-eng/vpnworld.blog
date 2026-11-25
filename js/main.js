/**
 * VPNWorld.blog - Main Interactive Engine
 * Pure Vanilla JavaScript - Ultra-lightweight & High Performance
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Mobile Menu Toggle
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const siteNav = document.querySelector(".site-nav");

  if (mobileBtn && siteNav) {
    mobileBtn.addEventListener("click", function () {
      siteNav.classList.toggle("mobile-active");
      const isExpanded = siteNav.classList.contains("mobile-active");
      mobileBtn.setAttribute("aria-expanded", isExpanded);
    });
  }

  // 2. FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      if (answer) {
        const isHidden = answer.style.display === "none";
        answer.style.display = isHidden ? "block" : "none";
        const icon = this.querySelector(".faq-toggle-icon");
        if (icon) {
          icon.textContent = isHidden ? "−" : "+";
        }
      }
    });
  });

  // 3. Search Engine System
  const searchTriggers = document.querySelectorAll(".search-trigger-btn");
  const searchModal = document.getElementById("search-modal");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  // Determine root relative prefix for dynamic links
  const rootPrefix = document.body.getAttribute("data-root") || "./";

  const searchableIndex = [
    { title: "2026 稳定机场推荐与VPN节点测评中心", category: "首页推荐", url: "index.html", keywords: "机场推荐 vpn推荐 梯子推荐 首页" },
    { title: "高性价比与便宜机场推荐", category: "推荐专题", url: "recommend/budget/index.html", keywords: "性价比机场 便宜机场 便宜梯子" },
    { title: "高端企业级 IPLC/IEPL 专线机场推荐", category: "推荐专题", url: "recommend/premium/index.html", keywords: "专线机场 IPLC IEPL 高端机场" },
    { title: "新手入门机场推荐与零基础上手", category: "推荐专题", url: "recommend/beginner/index.html", keywords: "新手翻墙 新手梯子 零基础" },
    { title: "稳定优先防封机场推荐", category: "推荐专题", url: "recommend/stable/index.html", keywords: "稳定机场 晚高峰防封 节点不掉线" },
    { title: "ChatGPT / Claude / OpenAI AI专用机场推荐", category: "推荐专题", url: "recommend/ai/index.html", keywords: "ChatGPT 住宅IP Claude OpenAI" },
    { title: "4K流媒体解锁专线机场推荐", category: "推荐专题", url: "recommend/streaming/index.html", keywords: "奈飞 Netflix 4K Disney 流媒体" },
    { title: "2026年中文机场综合实力排行榜", category: "排行榜", url: "ranking/overall/index.html", keywords: "综合排行 机场排名 节点排行榜" },
    { title: "真实性价比机场排行榜", category: "排行榜", url: "ranking/value/index.html", keywords: "性价比排行 价格每G流量" },
    { title: "低预算平价机场排行榜", category: "排行榜", url: "ranking/budget/index.html", keywords: "10元内 便宜套餐 平价机场" },
    { title: "节点稳定性与在线率排行榜", category: "排行榜", url: "ranking/stable/index.html", keywords: "稳定性 SLA 在线率 丢包" },
    { title: "机场多维在线横向对比工具", category: "实用工具", url: "compare/index.html", keywords: "对比 对照 机场对比 价格对比" },
    
    // 14 Verified Brands
    { title: "隐形人 深度评测与档案 (IEPL纯专线)", category: "机场评测", url: "review/yinxingren/index.html", keywords: "隐形人 IEPL 专线 yxr888 144G" },
    { title: "微风网络 Breezenet 深度评测 (¥8/200G专线)", category: "机场评测", url: "review/breezenet/index.html", keywords: "微风网络 Breezenet 8元 200G VLESS" },
    { title: "浪网 WaveNet 深度评测 (自研客户端)", category: "机场评测", url: "review/wavenet/index.html", keywords: "浪网 WaveNet 自研客户端 150G" },
    { title: "闪跃 FlashLeap 深度评测 (IPLC纯专线)", category: "机场评测", url: "review/flashleap/index.html", keywords: "闪跃 FlashLeap 游戏专线 shanyue 150G" },
    { title: "飞猫云 深度评测 (¥7/150G入门专线)", category: "机场评测", url: "review/feimaoyun/index.html", keywords: "飞猫云 flycat888 7元 150G" },
    { title: "暮光网络 深度评测 (专线节点VLESS)", category: "机场评测", url: "review/muguang/index.html", keywords: "暮光网络 VLESS 120G 专线" },
    { title: "无忧 深度评测 (IPLC专线月付19元)", category: "机场评测", url: "review/wuyou/index.html", keywords: "无忧链接 wuyou666 IPLC 100G" },
    { title: "灵猫 深度评测 (IPLC专线4K流媒体)", category: "机场评测", url: "review/lingmao/index.html", keywords: "灵猫 IPLC 150G 4K流媒体" },
    { title: "跨界 深度评测 (全专线跨境办公)", category: "机场评测", url: "review/kuajiecloud/index.html", keywords: "跨界云 跨境电商 120G 全专线" },
    { title: "梯子云 LadderCloud 深度评测 (大流量中转专线)", category: "机场评测", url: "review/laddercloud/index.html", keywords: "梯子云 LadderCloud 125G" },
    { title: "灵动云 深度评测 (优化节点BGP隧道)", category: "机场评测", url: "review/lingdongcloud/index.html", keywords: "灵动云 100G 优化节点" },
    { title: "全球云 深度评测 (中转优化120G)", category: "机场评测", url: "review/quanqiuyun/index.html", keywords: "全球云 tt88 120G 中转优化" },
    { title: "萤火虫 Firefly 深度评测 (¥8/60G平价入门)", category: "机场评测", url: "review/firefly/index.html", keywords: "萤火虫 Firefly 8元 60G 学生" },
    { title: "飞V 深度评测 (¥4.9起步与不限时套餐)", category: "机场评测", url: "review/feiv/index.html", keywords: "飞V 4.9元 不限时流量 Trojan" },

    // Guides
    { title: "Windows 客户端教程 (Clash Verge / Sing-box)", category: "使用教程", url: "guides/windows/index.html", keywords: "Windows 教程 电脑翻墙 Clash" },
    { title: "Android 安卓手机翻墙教程 (v2rayNG / Clash)", category: "使用教程", url: "guides/android/index.html", keywords: "安卓 Android 手机梯子教程" },
    { title: "iOS 苹果手机翻墙教程 (Shadowrocket 小火箭)", category: "使用教程", url: "guides/ios/index.html", keywords: "iPhone iOS 小火箭 Shadowrocket" },
    { title: "macOS 苹果电脑客户端翻墙教程", category: "使用教程", url: "guides/macos/index.html", keywords: "Mac macOS 苹果电脑 教程" },

    // Blog
    { title: "如何选择适合自己的机场？新手避坑指南", category: "博客文章", url: "blog/how-to-choose-airport/index.html", keywords: "如何选机场 避坑指南 防跑路" },
    { title: "传统VPN与机场节点有什么区别？全面对比", category: "博客文章", url: "blog/vpn-vs-airport/index.html", keywords: "VPN区别 机场区别 节点安全性" },
    { title: "Clash Verge Rev 核心功能实战与分流规则", category: "博客文章", url: "blog/clash-verge-rev-guide/index.html", keywords: "分流规则 Tun模式 订阅转换" },
    { title: "机场节点全部超时不可用？10个排查方法", category: "博客文章", url: "blog/node-timeout-troubleshoot/index.html", keywords: "节点超时 连不上 节点报错 修复" },
    { title: "IPLC专线、IEPL与普通BGP中继区别", category: "博客文章", url: "blog/iplc-iepl-transit-explained/index.html", keywords: "IPLC IEPL BGP 专线区别" },

    // Glossary
    { title: "什么是 IPLC 专线？名词解释", category: "知识百科", url: "glossary/iplc/index.html", keywords: "IPLC原理 专线优势 内网直连" },
    { title: "Shadowsocks、VLESS、Trojan 协议解析", category: "知识百科", url: "glossary/ss-vless-trojan/index.html", keywords: "协议比较 VLESS Trojan Hysteria" },
    { title: "分流规则深度解析：直连、全局与规则模式", category: "知识百科", url: "glossary/rule-clash/index.html", keywords: "分流 规则模式 全局代理 直连" },
    { title: "Ping延迟、测速带宽与丢包率科学解读", category: "知识百科", url: "glossary/speedtest-latency/index.html", keywords: "测速图 Ping延迟 丢包率" },
    { title: "节点倍率是什么？为什么流量消耗快？", category: "知识百科", url: "glossary/multiplier/index.html", keywords: "倍率 流量计算 扣费陷阱" }
  ];

  function openSearch() {
    if (searchModal) {
      searchModal.classList.add("active");
      if (searchInput) {
        searchInput.focus();
        renderResults("");
      }
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.classList.remove("active");
    }
  }

  function renderResults(query) {
    if (!searchResults) return;
    const cleanQuery = query.trim().toLowerCase();
    const filtered = cleanQuery === ""
      ? searchableIndex.slice(0, 6)
      : searchableIndex.filter(function (item) {
          return item.title.toLowerCase().includes(cleanQuery) ||
                 item.category.toLowerCase().includes(cleanQuery) ||
                 item.keywords.toLowerCase().includes(cleanQuery);
        });

    if (filtered.length === 0) {
      searchResults.innerHTML = '<li style="padding: 1.5rem; text-align: center; color: var(--color-muted);">未找到与 “' + escapeHtml(query) + '” 相关的内容</li>';
      return;
    }

    let html = "";
    filtered.forEach(function (item) {
      const targetUrl = rootPrefix + item.url;
      html += '<li class="search-result-item">' +
              '<a href="' + targetUrl + '">' +
              '<div class="search-item-title">' + highlightText(item.title, cleanQuery) + '</div>' +
              '<div class="search-item-meta">[' + item.category + '] · 点击即刻阅读</div>' +
              '</a></li>';
    });
    searchResults.innerHTML = html;
  }

  function highlightText(text, query) {
    if (!query) return escapeHtml(text);
    const escaped = escapeHtml(text);
    const re = new RegExp("(" + query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + ")", "gi");
    return escaped.replace(re, '<span style="color: var(--color-primary); font-weight: bold; text-decoration: underline;">$1</span>');
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  searchTriggers.forEach(function (btn) {
    btn.addEventListener("click", openSearch);
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      renderResults(this.value);
    });
  }

  if (searchModal) {
    searchModal.addEventListener("click", function (e) {
      if (e.target === searchModal) {
        closeSearch();
      }
    });
  }

  // Keyboard shortcut '/' opens search, 'Esc' closes
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      openSearch();
    } else if (e.key === "Escape" && searchModal && searchModal.classList.contains("active")) {
      closeSearch();
    }
  });
});
