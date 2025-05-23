# 社区平台后端部署指南

## 1. 前端环境安装
```bash
在前端的目录下，下载axios的包：npm install axios
```
## 2. 后端配置
使用idea等IDE打开本项目，配置好communityBack\src\main\resources\static\application.properties文件中的数据库用户名和密码

## 3. 数据库配置
使用mysql创建数据库community_db，在该数据库下创建表user，字段包含id、username、password。插入基本的测试账户用于登录。
### 使用navicat的图形化界面进行创建数据库

### 使用命令提示符创建数据库
#### 登录mysql
```bash
mysql -u root -p
```
#### 创建数据库
```sql
CREATE DATABASE `community_db` 
/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ 
/*!80016 DEFAULT ENCRYPTION='N' */
```

#### 创建user表
```sql
CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
```
#### 插入数据
```sql
use community_db;
insert into user(id, username, password)
values(1, 'test', '123');
```
## 4. 运行后台服务器
在idea中运行communityBack\src\main\java\com\springboot\communityback\CommunityBackApplication.java即可。
