## Vue SSR
### 定义
- Vue SSR(Vue.js Server-Side Rendering) 是 Vue.js 官方提供的一个服务端渲染(同构应用)解 决方案
- 可以构建同构应用
- 基于 Vue 技术栈

### 使用场景
技术层面：
- 更快的首屏渲染速度
-  更好的 SEO

业务层面：
- 不适合管理系统
- 适合门户咨询类网站，例如企业官网，知乎，简书等
- 适合移动网站

## Gridsome
### Gridsome 目录结构
1. main.js 整个项目的入口文件
2. static 存放不需要打包的资源文件
3. templates 集合节点
4. .temp 打包编译自动生成的文件

### GraphQL
1. post 可依据 id 查询
2. 查询可以排序
3. 查询可以分页

## 组件化开发
### CDD (Component-Driven Development)
- 自下而上
- 从组件级别开始，到页面级别结束

### 有点
- 组件最大程度地被重用
- 并行开发
- 可视化测试