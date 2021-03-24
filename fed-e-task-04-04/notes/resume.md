# **React 服务端渲染专题（原生实现、Next.js 集成框架、Gatsby）**
### React 服务端渲染
#### 客户端渲染
CSR：Client Side Rendering
- 服务器端仅返回 JSON 数据, DATA 和 HTML 在客户端进⾏渲染。
- ⾸屏等待时间⻓, ⽤户体验差。
- ⻚⾯结构为空, 不利于 SEO。
#### 服务端渲染
SSR：Server Side Rendering
- 服务器端返回HTML, DATA 和 HTML 在服务器端进⾏渲染。
#### SSR 同构
同构指的是代码复⽤. 即实现客户端和服务器端最⼤程度的代码复⽤。
#### 服务端渲染指南
- 项目结构
```
react-ssr
    src 源代码⽂件夹
        client 客户端代码
        server 服务器端代码
        share 同构代码
```
- Node 服务器
```
import express from 'express'
const app = express()
app.use(express.static('public'))
app.listen(3000, () => { console.log('Server is running on 3000 port') })
```
- 实现 React SSR
1. 引⼊要渲染的 React 组件。
2. 通过 renderToString ⽅法将 React 组件转换为 HTML 字符串，通过 react-dom/server 导⼊。
3. 将结果 HTML 字符串响应到客户端。
- Webpack 打包配置
1. 配置服务器端打包命令: "dev:server-build": "webpack --config webpack.server.js --watch"
2. 配置客户端打包命令："dev:client-build": "webpack --config webpack.client.js --watch"
3. 配置服务端启动命令: "dev:server-run": "nodemon --watch build --exec \'node build/bundle.js\'"
4. 合并 webpack 配置
服务器端 webpack 配置和客户端 webpack 配置存在重复. 将重复配置抽象到 webpack.base.js 配置⽂件中。
```
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const config = { ... }
module.exports = merge(baseConfig, config)
```

- 客户端⼆次 "渲染" hydrate
1. hydrate ⽅法在实现渲染的时候, 会复⽤原本已经存在的 DOM 节点, 减少重新⽣成节点以及删除原本 DOM 节点的开销。
2. 通过 `通过 react-dom 导⼊ hydrate`:
```
ReactDOM.hydrate(<App />, document.querySelector("#root"))
```
- 添加客户端包文件请求链接
```
<html>
  <head>
    <title>React SSR</title>
  </head>
  <body>
    <div id="root">${content}</div>
    <script src="bundle.js"></script>
  </body>
</html>
```

- 优化


