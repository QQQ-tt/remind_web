@echo off
setlocal enabledelayedexpansion

:: 服务器IP/域名
set DEPLOY_HOST=qqqtx.com

:: 检查并删除dist文件夹
if exist "dist" (
  rmdir /S /Q "dist"
  echo delete dist success
) else (
  echo dist is not exist
)

:: 运行构建命令并检查错误
call npm run build
if errorlevel 1 (
  echo 构建失败，终止部署
  exit /b 1
)
echo npm run build is ok

:: 远程清理和创建目录
ssh root@%DEPLOY_HOST% ^
    "rm -rf /root/install/nginx/data/dist && ^
    mkdir -p /root/install/nginx/data"

:: 确保配置了SSH密钥以避免密码输入
REM 将以下命令中的IP、用户名、远程目录替换为实际信息
scp -r ./dist root@%DEPLOY_HOST%:/root/install/nginx/data

:: 设置文件权限
ssh root@%DEPLOY_HOST% ^
    "chmod -R 755 /root/install/nginx/data/dist"
echo 部署完成