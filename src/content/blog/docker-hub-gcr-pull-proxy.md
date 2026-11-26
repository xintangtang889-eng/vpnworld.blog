---
title: "解决国内无法拉取 Docker Hub 与 gcr.io 镜像：终端代理配置指南 | VPNWorld"
description: "国内各公共 Docker 镜像加速源相继关闭后，如何通过本地代理软件为 Docker Daemon 注入 HTTP 代理，实现秒速 pull 官方镜像。"
keywords: "Docker拉取镜像失败, Docker代理配置, gcr.io镜像加速, Docker daemon代理, 终端科学上网"
category: "跨境 AI 生产力"
date: "2026-03-01"
readTime: "8 分钟"
h1: "解决 Docker 镜像无法拉取难题：守护进程代理完美配置"
intro: "自国内各大云厂商的公开 Docker 镜像源大面积停止服务后，开发者在执行 `docker pull` 时经常卡在等待状态直至报错超时。由于 Docker 镜像下载由后台守护进程（Dockerd）执行，普通终端环境变量无法生效。本文给出标准配置答案。"
recommendedBrands: ["yinxingren", "breezenet", "feimaoyun"]
---

<h2>一、为 Systemd Docker 服务注入代理配置</h2>
<p>创建 `/etc/systemd/system/docker.service.d/http-proxy.conf` 文件并填入代理参数：</p>

```bash
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7890"
Environment="HTTPS_PROXY=http://127.0.0.1:7890"
Environment="NO_PROXY=localhost,127.0.0.1,docker-registry.local"
```
