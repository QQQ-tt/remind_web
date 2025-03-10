@echo off
setlocal enabledelayedexpansion
:: 服务器IP/域名
set DEPLOY_HOST=qqqtx.com

REM 检查dist文件夹是否存在并删除
if exist "dist" (
  rmdir /S /Q "dist"
  echo delete dist success
) else (
  echo dist is not exist
)

REM 运行npm命令
call npm run build

echo npm run build is ok

REM 使用ssh远程执行命令，删除远程目录
ssh root@%DEPLOY_HOST% ^
    "rm -rf /root/install/nginx/data/dist && "^
    "mkdir /root/install/nginx/data "^

REM 请确保你已经配置了ssh密钥对以避免输入密码
REM 将以下命令中的IP、用户名、远程目录替换为实际信息
scp -r ./dist root@%DEPLOY_HOST%:/root/install/nginx/data

ssh root@%DEPLOY_HOST% ^
    "chmod -R 755 /root/install/nginx/data/dist"
echo build and send success