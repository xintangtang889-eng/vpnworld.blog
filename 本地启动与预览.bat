@echo off
chcp 65001 >nul
echo 正在启动 VPNWorld 本地静态服务器...
start http://localhost:4321
npm run preview
pause
