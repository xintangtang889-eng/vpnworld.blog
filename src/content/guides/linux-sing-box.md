---
title: "Linux (Ubuntu/Debian) 命令行配置 Sing-box / Mihomo 守护进程代理教程 | VPNWorld"
description: "Linux 服务器与终端开发者翻墙指南。手把手配置 Sing-box / Mihomo systemd 守护进程、Tun 虚拟网卡与环境变量代理实战。"
keywords: "Linux翻墙教程, Ubuntu代理配置, Sing-box Linux, systemd守护进程, 终端代理"
platform: "全平台客户端"
difficulty: "入门到进阶"
date: "2026-03-01"
readTime: "8 分钟"
h1: "Linux 命令行翻墙全指南：Sing-box 守护进程与终端环境配置"
intro: "对于程序员与 Linux 服务器管理员而言，国内云服务器或本地 Linux 工作站拉取 GitHub、下载 Docker 镜像、pip 安装 Python 依赖常因网络封锁失败。本文提供纯命令行环境下的工业级代理解决方案。"
recommendedBrands: ["yinxingren", "breezenet", "feimaoyun"]
---

<h2>一、部署 Sing-box 二进制与 Systemd 服务</h2>
<p>直接从官方下载编译好的二进制文件放入 `/usr/local/bin/sing-box`，并配置 `/etc/systemd/system/sing-box.service` 实现开机自动后台拉起与异常崩溃自愈。</p>

<h2>二、设置终端临时与永久代理环境变量</h2>

```bash
## 终端快速注入代理
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
export all_proxy="socks5://127.0.0.1:7890"

## 验证出口 IP
curl ipinfo.io
```
