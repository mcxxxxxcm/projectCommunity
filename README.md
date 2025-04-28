# 社区平台部署指南

## 1. 环境安装
- [Node.js](https://nodejs.org/) (LTS版)
- [Git](https://soft.wsyhn.com/soft/git2.47.0.2.exe)
- [steam++](https://gitee.com/rmbgame/SteamTools/releases/download/3.0.0-rc.16/Steam%20%20_v3.0.0-rc.16_win_x64.exe)  (git网站加速器)

## 2. 获取代码
```bash
取消ssl验证：git config --global http.sslVerify false
git clone https://github.com/mcxxxxxcm/projectCommunity.git
cd projectCommunity
```
## 3. 配置git身份
```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```
## 4. 运行项目
进入项目文件夹projectCommunity
```bash
npm install
npm run dev
```
## 5. 访问项目网址
浏览器访问：`http://localhost:5173`

# 代码的更新和上传
## 1. 配置好git身份
```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

## 2. 本地仓库和远程仓库代码同步
```bash
git pull
```

## 3. 本地仓库代码上传到远程仓库
```bash
git add .
git commit -m "你修改的内容"
git push
```

## 4. 刷新github仓库网站，查看上传是否成功