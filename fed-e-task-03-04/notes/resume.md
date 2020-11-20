## Vue SSR
### 定义
- Vue SSR(Vue.js Server-Side Rendering) 是 Vue.js 官方提供的一个服务端渲染(同构应用)解 决方案
- 可以构建同构应用
- 基于 Vue 技术栈

### 使用场景
技术层面：
- 更快的首屏渲染速度
-  更好的 SEO

### 业务层面：
- 不适合管理系统
- 适合门户咨询类网站，例如企业官网，知乎，简书等
- 适合移动网站

## Gridsome
### 定义
是由Vue.js驱动的Jamstack框架，用于构建默认情况下快速生成的静态生成的网站和应用。
- Gridsome是Vue提供支持的静态站点生成器，用于为任何无头CMS，本地文件或API构建可用于CDN的网站
- 使用Vue.js，webpack和Node.js等现代工具构建网站。通过npm进行热重载并访问任何软件包，并使用自动前缀在您喜欢的预处理器（如Sass或Less）中编写CSS。
- 基于 Vue.js 的 Jamstack 框架
- Gridsome 使开发人员可以轻松构建默认情况下快速生成的静态生成的网站和应用程序
- Gridsome允许在内容里面引用任何CMS或数据源。可以从WordPress，Contentful或任何其他无头CMS或API中提取数据，并在组件和页面中使用GraphQL访问它。

### Gridsome 目录结构
1. main.js 整个项目的入口文件
2. static 存放不需要打包的资源文件
3. templates 集合节点
4. .temp 打包编译自动生成的文件

### GraphQL
- GraphQL 并不是作为服务器端部署，而是作为 Gridsome 在本地管理资源的一种方式。通过 GraphQL 统一管理实际上非常方便，因为作为一个数据库查询语言，它有非常完备的查询语句，与 JSON 相似的描述结构，再结合 Relay 的 Connections 方式处理集合，管理资源不再需要自行引入其它项目，大大减轻了维护难度。
- GraphQL数据层是在开发模式下可用的工具。这是临时存储到 Gridsome 项目中的所有数据的地方。可以将其视为可帮助您更快更好地处理数据的本地数据库。来自 GraphQL 数据层的数据将生成为静态内容。数据层和导入数据的源之间没有实时连接。这意味着您需要重新生成网站以获取最新的数据更新。
- 每个 Gridsome 项目都有一个 GraphQL 资源管理器，可以在开发模式下使用它来探索和测试查询。在这里，您还将获得所有可用 GraphQL 集合的列表。

1. post 可依据 id 查询
2. 查询可以排序
3. 查询可以分页

#### 查询数据
您可以将数据从GraphQL数据层查询到任何页面，模板或组件中。在Vue组件中，使用 `<page-query>` 或 `<static-query>` 块添加查询。
- 在 Pages 和 Templates 中使用 `<page-query>`
- 在 Components 中使用 `<static-query>`

### MarkdownIt
- 使用 markdownIt 插件可以将 md 格式的文章转换成 html。
- 安装：`npm install markdown-it`
- 使用：
```
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();
md.render(article);
```

## 组件化开发
### CDD (Component-Driven Development)
- 自下而上
- 从组件级别开始，到页面级别结束

### 优点
- 组件最大程度地被重用
- 并行开发
- 可视化测试