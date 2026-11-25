---
title: "Quantumult X（圈X）终极实操教程：分流规则、重写脚本与任务配置 | VPNWorld"
description: "2026最新 iOS 旗舰代理神器 Quantumult X 全方位实战指南。手把手教你配置策略组、引用外部规则分流、MitM 证书安装与 JS 自动化重写脚本。"
keywords: "Quantumult X教程, 圈X配置, iOS高级代理, MitM证书, 分流规则, 策略组"
platform: "全平台客户端"
difficulty: "入门到进阶"
date: "2026-03-01"
readTime: "8 分钟"
h1: "Quantumult X 终极配置教程：策略组、分流规则与 MitM 重写"
intro: "被广大极客誉为‘圈X’的 Quantumult X 是 iOS 平台上的工业级网络工具。除了极低耗电与毫秒级延迟表现外，其强大的策略组嵌套、分流重写与 JavaScript 脚本执行能力使其无可替代。本文带您彻底掌握圈X的核心精髓。"
recommendedBrands: ["yinxingren", "breezenet", "feimaoyun"]
---

<h2>一、圈X的核心界面与逻辑认知</h2>
      <p>圈X主屏由三部分组成：顶部为各策略组的展开卡片，中部为流量统计与网络图表，底部大风车为开关与设置入口。圈X坚持以‘配置文件’驱动，所有分流、节点筛选与重写规则均条理清晰地记录在配置文件中。</p>
      
    
      <h2>二、添加节点资源（Server Resource）</h2>
      <p>undefined</p>
      <ol style="margin: 1rem 0; padding-left: 1.5rem; line-height: 1.8;"><li style="margin-bottom: 0.5rem;">点击右下角大风车 -> 在【节点】栏目点击【节点资源】。</li><li style="margin-bottom: 0.5rem;">点击右上角【+】号，填入资源标签（如‘微风专线’），将机场提供的 Quantumult X 格式订阅链接粘贴至【资源路径】。</li><li style="margin-bottom: 0.5rem;">向左滑动该资源点击【更新】，即可瞬间加载上百个全球节点。</li></ol>
    
      <h2>三、分流规则集（Filter）与策略组搭建</h2>
      <p>建议为媒体、国外常见站点、OpenAI 分别设置独立策略组。例如通过引用预置分流规则集，实现将 Netflix 流量固定分流至支持解锁的新加坡专线节点，而常规 Google/YouTube 则走延迟最低的香港中继线路。</p>