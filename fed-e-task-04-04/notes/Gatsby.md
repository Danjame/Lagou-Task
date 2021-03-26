# **React 服务端渲染专题（原生实现、Next.js 集成框架、Gatsby）**
### Gasby
#### 介绍
Gatsby 是⼀个静态站点⽣成器，官⽹：https://www.gatsbyjs.org
1. 基于 React 和 GraphQL。 结合了 webpack, babel, react-router 等前端领域中最先进⼯具， 开发⼈员开发体验好。
2. 采⽤数据层和UI层分离⽽不失 SEO 的现代前端开发模式，对SEO⾮常友好。
3. 数据预读取, 在浏览器空闲的时候预先读取链接对应的⻚⾯内容，使静态⻚⾯拥有 SPA 应⽤的⽤户体验, ⽤户体验好。
4. 数据来源多样化: Headless CMS, markdown, API。
5. 功能插件化, Gatsby 中提供了丰富且功能强⼤的各种类型的插件。

#### 静态应用优势
1. 访问速度快
2. 更利于 SEO 搜索引擎的内容抓取
3. 部署简单

#### 创建 Gatsby 项目
1. 创建：`gatsby new project-name`
2. 启动：`gatsby develop 或 npm start`
3. 访问：`localhost:8000`

#### 基于文件的路由系统
Gatsby 框架内置基于⽂件的路由系统, ⻚⾯组件被放置在 src/pages ⽂件夹中

#### 以编程的方式创建页面
基于同⼀个模板创建多个HTML⻚⾯
- `createPages`方法用于创建页面
- Gatsby 在构建应用时会调用该方法
- 该方法需要在 gatsby-node.js 文件中定义
```
function createPages ({ action }) {
    const { createPage } = action
    // 获取模板绝对路径
    // 获取组件所需数据
    // 根据模板和数据创建页面
}

module.exports = { createPages }
```

#### 页面跳转
在 Gatsby 框架中⻚⾯跳转通过 Link 组件来实现
```
import { link } from 'Gatsby'
<Link to="/home">jump to home page</Link>
```

#### GraphQL 数据层
在 Gatsby 框架中提供了⼀个统⼀的存储数据的地⽅，叫做数据层。数据层使⽤ GraphQL 构建。在应⽤构建时，Gatsby 会从外部获取数据并将数据放⼊数据层，组件可以直接从数据层查询数据。调试⼯具为：localhost:8000/___graphql
- 页面组件数据查询：在组件⽂件中导出查询命令, 框架执⾏查询并将结果传递给组件的 prop 对象. 存储在 props 对象的 data 属性中。
```
import { graphql } from 'gatsby'
function PageComponent ({ data }) {
    return <div>{data.site.siteMetadata.title}</div>
}
export const query = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`
```
- 非页面组件数据查询：通过钩⼦函数 useStaticQuery 进⾏⼿动查询。
```
import { graphql, useStaticQuery } from 'gatsby'
const data = useStaticQuery(graphql`
    query {
        site {
            siteMetadata {
                title
                description
            }
        }
    }
`)
```

#### Gatsby 插件
Gatsby 框架内置插件系统, 插件是为应⽤添加功能的最好的⽅式。参考：https://www.gatsbyjs.org/plugins/
- 在 Gatsby 中有三种类型的插件
    1. 数据源插件 ( source )：
    负责从应⽤外部获取数据，将数据统⼀放在 Gatsby 的数据层中
    2. 数据转换插件 ( transformer )：
    负责从应⽤外部获取数据，将数据统⼀放在 Gatsby 的数据层中
    3. 功能插件 ( plugin )：
    为应⽤提供功能，⽐如通过插件让应⽤⽀持 Less 或者 TypeScript
