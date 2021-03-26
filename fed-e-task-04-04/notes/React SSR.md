# **React 服务端渲染专题（原生实现、Next.js 集成框架、Gatsby）**
### React SSR 原生实现
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
通过 webpack 配置剔除打包⽂件中的 Node 模块
```
const nodeExternals = require('webpack-node-externals')
const config = {
  externals: [nodeExternals()]
}
```

- 路由支持
1. 在 React SSR 项⽬中需要实现两端路由。
2. 客户端路由是⽤于⽀持⽤户通过点击链接的形式跳转⻚⾯。
3. 服务器端路由是⽤于⽀持⽤户直接从浏览器地址栏中访问⻚⾯。
4. 客户端和服务器端公⽤⼀套路由规则。

路由规则
```
import Home from './pages/Home'
import List from './pages/List'
export default [{
  path: '/',
  component: Home,
  exact: true
}, {
  path: 'list',
  ... List
}]
```
服务器
```
app.get("*", async (req, res) => { })
```
服务器端路由配置:

```
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import routes from "../share/routes"

export default req => {
  const content = renderToString(
      <StaticRouter location={req.path}>{renderRoutes(routes)}</StaticRouter>
  )
}

```
服务器端路由配置:
```
import { BrowserRouter } from "react-router-dom"
import { renderRoutes } from "react-router-config"
import routes from "../share/routes"

ReactDOM.hydrate(
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>,
  document.getElementById("root")
);
```

- Redux 支持
1. 创建 Store
服务端创建 Store:
```
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../share/store/reducers'

export default () => createStore(reducer, {}, applyMiddleware(thunk))
```
2. 配置 Store
服务器端配置 Store
```
// index.js
app.get('*', (req, res) => {
  const store = createStore()
  res.send(renderer(req, store))
})

// renderer.js
import { Provider } from "react-redux"
export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path}>{renderRoutes(routes)}</StaticRouter>
    </Provider>
  );
```
3. 创建 Action 和 Reducer
4. 配置 polyfill，由于浏览器不能识别异步函数代码, 所以需要 polyfill 进⾏填充

问题：服务器端创建的 store 是空的, 组件并不能从Store中获取到任何数据。

方案：服务器端在渲染组件之前获取到组件所需要的数据。

    1. 在组件中添加 loadData ⽅法, 此⽅法⽤于获取组件所需数据，⽅法被服务器端调⽤。
    2. 将 loadData ⽅法保存在当前组件的路由信息对象中。
```
function loadData (store) {
  return store.dispatch(fetchUser())
}
```
    3. 服务器端在接收到请求后，根据请求地址匹配出要渲染的组件的路由信息。
    4. 从路由信息中获取组件中的 loadData ⽅法并调⽤⽅法获取组件所需数据。
    5. 当数据获取完成以后再渲染组件并将结果响应到客户端。

```
app.get('*', (req, res) => {
  const store = createStore();
  // 1. 请求地址 req.path
  // 2. 获取到路由配置信息 routes
  // 3. 根据请求地址匹配出要渲染的组件的路由对象信息
  const promises = matchRoutes(routes, req.path).map(({route}) => {
    // 如何才能知道数据什么时候获取完成
    if (route.loadData) return route.loadData(store)
  })

  Promise.all(promises).then(() => {
    res.send(renderer(req, store));
  })
})
```

- 消除警告
警告原因: 客户端 Store 在初始状态下是没有数据的, 在渲染组件的时候⽣成的是空 ul, 但是服务器端是先获取数据再进⾏的组件渲染, 
所以⽣成的是有⼦元素的ul, hydrate ⽅法在对⽐的时候发现两者不⼀致, 所以报了个警告。

解决思路: 将服务器端获取到的数据回填给客户端, 让客户端拥有初始数据。

1. 服务器响应 Store 初始状态
```
const initalState = serialize(store.getState());

<body>
  <div id="root">${content}</div>
  <script>window.INITIAL_STATE = ${initalState} </script>
  <script src="bundle.js"></script>
</body>
```

2. 客户端设置 Store 初始状态
`const store = createStore(reducer, window.INITIAL_STATE, applyMiddleware(thunk))`

- 防止 XSS 攻击
转义状态中的恶意代码。
```
import serialize from 'serialize-javascript'
const initalState = serialize(store.getState())

```