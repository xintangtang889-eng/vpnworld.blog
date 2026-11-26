---
title: "Docker 部署 V2Ray / Sing-box 服务端与客户端内网穿透代理实战教程 | VPNWorld"
description: "服务器运维与极客开发者必读。详解利用 Docker 一键部署 Sing-box 客户端，实现本地内网服务器透明翻墙与容器集群加速拉取。"
keywords: "Docker部署代理, Sing-box Docker, 容器翻墙, 内网代理穿透, 服务器网络加速"
platform: "全平台客户端"
difficulty: "入门到进阶"
date: "2026-03-01"
readTime: "8 分钟"
h1: "Docker 部署代理服务实操指南：让整个容器网络丝滑加速"
intro: "在 Linux 服务器集群或家用群晖 NAS 上，如果每个容器单独配置代理极其低效繁琐。通过运行一个独立的轻量 Sing-box 代理容器，并配置 host 或 macvlan 网络，可以让所有容器环境共享高速境外网络。本文手把手演示实战部署。"
recommendedBrands: ["yinxingren", "breezenet", "feimaoyun"]
---

<h2>一、编写极简 docker-compose.yml</h2>

```bash
version: '3'
services:
  sing-box:
    image: ghcr.io/sagernet/sing-box:latest
    container_name: sing-box
    restart: always
    network_mode: host
    volumes:
      - ./config.json:/etc/sing-box/config.json
    cap_add:
      - NET_ADMIN
```

<h2>二、配置容器镜像拉取与环境变量分流</h2>
<p>利用上述容器提供的本地 7890 端口，可让 Docker Daemon 守护进程无缝拉取境外镜像，彻底解决国内服务器拉取 Docker Hub 频繁连接超时的问题。</p>
