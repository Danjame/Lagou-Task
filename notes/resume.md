### 部署方式
- 配置 Host + Port
- 压缩发布包
- 把发布包传到服务端
- 解压
- 安装依赖
- 启动服务

### PM2
1. 后台启动服务，保持运行状态
2. 安装 `npm install --global pm2`
2. 常用命令：
- `pm2 list` 查看应用列表
- `pm2 start` 启动应用
- `pm2 stop` 停止应用
- `pm2 reload` 重载应用
- `pm2 restart` 重启应用
- `pm2 delete` 删除应用

### 自动化部署
#### 现代化部署方式（CI/CD）
- 流程：本地源码 => Git 远程仓库 => CI/CD 服务 => web 服务器
- CI/CD 服务：
1. 拉取最新代码
2. 编译构建
3. 打包 release
4. 发布 release
5. 把 release 部署到服务器