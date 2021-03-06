### SPA 单页应用
- 优点
1. 用户体验好
2. 开发效率高
3. 渲染性能高
4. 可维护性高
- 缺点
1. 首屏渲染时间长
2. 不利于 SEO

### 同构应用
- 通过服务端渲染首屏直出，解决 SPA 应用首屏渲染慢和不利于 SEO 问题
- 通过客户端渲染接管页面内容交互得到更好的用户体验

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

##### 部署工作流 .github/workflows
```
name: GitHub Actions
on:
  push: 
    tags:
      - 'v*'
jobs: 
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:

    # 下载源码
    - name: Checkout
      uses: actions/checkout@master

    # 打包构建
    - name: Build
      uses: actions/setup-node@master
    - run: npm install
    - run: npm run build
    - run: tar -zcvf release.tgz .nuxt nuxt.config.js package.json package-lock.json pm2.config.json

    # 发布 Release
    - name: Create Release
      id: create_release
      uses: actions/create-release@master 
      env:
        GITHUB_TOKEN: ${{ secrets.TOKEN }} 
      with:
        tag_name: ${{ github.ref }} 
        release_name: Release ${{ github.ref }} 
        draft: false
        prerelease: false

    # 上传构建结果到 Release
    - name: Upload Release Asset
      id: upload-release-asset
      uses: actions/upload-release-asset@master 
      env:
        GITHUB_TOKEN: ${{ secrets.TOKEN }} 
      with:
        upload_url: ${{ steps.create_release.outputs.upload_url }} 
        asset_path: ./release.tgz
        asset_name: release.tgz 
        asset_content_type: application/x-tgz

    # 部署到服务器
    - name: Deploy
      uses: appleboy/ssh-action@master 
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        password: ${{ secrets.PASSWORD }}
        port: ${{ secrets.PORT }}
        script: |
          cd /home/ubuntu/nuxt-demo
          wget https://github.com/Danjame/Nuxt-Task/releases/latest/download/release.tgz -O release.tgz
          tar zxvf release.tgz
          npm install --production
          pm2 reload pm2.config.json
```

##### pm2.config.json
```
{
    "apps":[
        {
            "name": "RealWorld",
            "script": "npm",
            "args": "start"
        }
    ]
}
```