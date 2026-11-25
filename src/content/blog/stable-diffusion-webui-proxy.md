---
title: "Stable Diffusion WebUI 插件与模型扩展在线下载代理配置实操 | VPNWorld"
description: "解决 SD WebUI 扩展插件列表打不开、ControlNet 模型在线下载连接超时问题。详解 Python 内置代理设置与 Git 命令行代理映射。"
keywords: "Stable Diffusion代理, SD插件打不开, ControlNet下载超时, Python代理设置, 本地AI生图加速"
category: "跨境 AI 生产力"
date: "2026-03-01"
readTime: "8 分钟"
h1: "Stable Diffusion 插件与模型下载加速：本地 AI 画师必修课"
intro: "在本地部署运行 AUTOMATIC1111 或 ComfyUI 时，点击‘从网址安装扩展’或更新模型权重常常抛出 `ConnectionResetError: [WinError 10054]`。只要配置好启动脚本的环境变量，就能让所有模型扩展满速下载。"
recommendedBrands: ["yinxingren", "breezenet", "feimaoyun"]
---

<h2>一、修改 `webui-user.bat` 添加代理启动参数</h2>
      <p>在 Windows 系统下，右键编辑 `webui-user.bat` 文件，在 `set COMMANDLINE_ARGS=` 上方插入以下两行代码：</p>
      
```bash
set HTTP_PROXY=http://127.0.0.1:7890
set HTTPS_PROXY=http://127.0.0.1:7890
```
