# **React 服务端渲染专题（原生实现、Next.js 集成框架、Gatsby）**
## Gasby
### 介绍
Gatsby 是⼀个静态站点⽣成器，官⽹：https://www.gatsbyjs.org
1. 基于 React 和 GraphQL。 结合了 webpack, babel, react-router 等前端领域中最先进⼯具， 开发⼈员开发体验好。
2. 采⽤数据层和UI层分离⽽不失 SEO 的现代前端开发模式，对SEO⾮常友好。
3. 数据预读取, 在浏览器空闲的时候预先读取链接对应的⻚⾯内容，使静态⻚⾯拥有 SPA 应⽤的⽤户体验, ⽤户体验好。
4. 数据来源多样化: Headless CMS, markdown, API。
5. 功能插件化, Gatsby 中提供了丰富且功能强⼤的各种类型的插件。

### 静态应用优势
1. 访问速度快
2. 更利于 SEO 搜索引擎的内容抓取
3. 部署简单

### 创建 Gatsby 项目
1. 创建：`gatsby new project-name`
2. 启动：`gatsby develop 或 npm start`
3. 访问：`localhost:8000`

### 基于文件的路由系统
Gatsby 框架内置基于⽂件的路由系统, ⻚⾯组件被放置在 src/pages ⽂件夹中

### 以编程的方式创建页面
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

### 页面跳转
在 Gatsby 框架中⻚⾯跳转通过 Link 组件来实现
```
import { link } from 'Gatsby'
<Link to="/home">jump to home page</Link>
```

### GraphQL 数据层
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

### Gatsby 插件
Gatsby 框架内置插件系统, 插件是为应⽤添加功能的最好的⽅式。参考：https://www.gatsbyjs.org/plugins/
- 在 Gatsby 中有三种类型的插件
    1. 数据源插件 ( source )：
    从应⽤外部获取数据，将数据统⼀放在 Gatsby 的数据层中
    2. 数据转换插件 ( transformer )：
    转换特定类型的数据格式，⽐如将 markdown ⽂件中的内容转换为对象形式
    3. 功能插件 ( plugin )：
    为应⽤提供功能，⽐如通过插件让应⽤⽀持 Less 或者 TypeScript

### 将 JSON 数据放⼊数据层
要将本地 JSON ⽂件中的数据放⼊数据层需要⽤到两个插件:
1. `gatsby-source-filesystem`: ⽤于将本地⽂件中的数据添加⾄数据层。
2. `gatsby-transformer-json`：将原始 JSON 字符串转换为 JavaScript 对象。
```
module.exports = {
    plugins: [
        resolve: 'gatsby-source-filesystem',
        option: {
            name: 'data',
            path: `${__dirname}/data/`
        }
    ]
}
```

### 图像优化
插件：
1. `gatsby-source-filesystem`: ⽤于将本地⽂件信息添加⾄数据层。
2. `gatsby-plugin-sharp`: 提供本地图像的处理功能(调整图像尺⼨, 压缩图像体积 等等)。
3. `gatsby-transformer-sharp`: 将 `gatsby-plugin-sharp` 插件处理后的图像信息添加到数据层。
4. `gatsby-image`: React 组件, 优化图像显示, 基于 gatsby-transformer-sharp 插件转化后的数据。

安装插件：

    `npm install gatsby-plugin-sharp gatsby-transformer-sharp gatsby-image`

特点：
1. ⽣成多个具有不同宽度的图像版本, 为图像设置 srcset 和 sizes 属性, 因此⽆论您的设备是什么宽度都可以加载到合适⼤⼩的图⽚。
2. 使⽤"模糊处理"技术, 其中将⼀个20px宽的⼩图像显示为占位符, 直到实际图像下载完成为⽌。

### 将 markdown 数据放入数据层
1. 通过 gatsby-source-filesystem 将markdown⽂件数据放⼊数据层。
    ```
    resolve: `gatsby-source-filesystem`,
    options: {
        name: `posts`
        path: `${__dirname}/src/posts`
    }
    ```
2. 通过 gatsby-transformer-remark 将数据层中的原始 markdown 数据转换为对象形式。
    ```
    module.exports = {
        plugins: [`gatsby-transformer-remark`]
    }
    ```
3. 组件内数据查询
    ```
    export const query = graphql`
    query {
        ...
    }
    `
    ```
4. 重新构建查询数据，添加 slug 属性作为标识，slug值为文件名
    - gatsby.md -> /posts/gatsby
    - react.md -> /posts/react

    ```
    const onCreateNode = ({node, actions}) => {
        const { createNodeField } = actions
        if (node.internal.type === 'MarkdownRemark') {
            const slug = path.basename(node.fileAbsolutePath, '.md')
            createNodeField({
                node,
                name: 'slug',
                value: slug
            })
        }
    }
    ```
5. 根据 slug 标识构建⻚⾯

    ```
    const createPages = async ({graphql, actions}) => {
        const { createPage } = actions
        const template = path.resolve('./src/templates/blog.js')
        const res = await graphql(``)
        res.data.allMarkdownRemark.edges.forEach(edge => {
            createPage({
                component: template,
                path: `/blog/${edge.node.fields.slug}`,
                context: { slug: edge.node.fields.slug }
            })
        })
    }
    ```
6. 根据 slug 查询数据
    ```
    export const query = graphql`
        query($slug: String) {
            markdownRemark(fields: { slug: { eq: $slug } }) {
                frontmatter {
                    title
                    date
                }
                html
            }
        }
    `
    ```
7. 处理 markdown 中的图片
    - `gatsby-remark-images`: 处理 markdown 中的图⽚, 以便可以在⽣产环境中使⽤
    ```
    {
        resolve: 'gatsby-transformer-remark',
        options: {
            plugins: ['gatsby-remark-images']
        }
    }
    ```

### 从 Strapi 中获取数据
参考：https://www.gatsbyjs.org/packages/gatsby-source-strapi/?=strapi
```
    {
        resolve: 'gatsby-source-strapi',
        options: {
            apiUrl: `http://localhost:1337`
            contentTypes: [`posts`]
        }
    }
```

### Gatsby Source 插件开发
数据源插件负责从 Gatsby 应⽤外部获取数据，创建数据查询节点供开发者使⽤
1. gatsby clean 清除上⼀次的构建内容
2. 在项⽬根⽬录⾥下创建 plugins ⽂件夹，在此⽂件夹中继续创建具体的插件⽂件夹，⽐如 gatsby-source-mystrapi ⽂件夹
3. 在插件⽂件夹中创建 gatsby-node.js ⽂件
4. 插件实际上就是 npm 包
5. 导出 sourceNodes ⽅法⽤于获取外部数据，创建数据查询节点
6. 在 gatsby-config.js ⽂件中配置插件，并传递插件所需的配置参数
6. 重新运⾏应⽤

### Gatsby Transformer 插件开发
transformer 插件将 source 插件提供的数据转换为新的数据
1. 在 plugins ⽂件夹中创建 gatsby-transformer-xml ⽂件件
2. 在插件⽂件夹中创建 gatsby-node.js ⽂件
3. 在⽂件中导出 onCreateNode ⽅法⽤于构建 Gatsby 查询节点
4. 根据节点类型筛选 xml 节点 node.internal.mediaType -> application/xml
5. 通过 loadNodeContent ⽅法读取节点中的数据
6. 通过 xml2js 将xml数据转换为对象
7. 将对象转换为 Gatsby 查询节点

### SEO 优化
#### gatsby-plugin-react-helmet
react-helmet 是⼀个组件, ⽤于控制⻚⾯元数据. 这对于 SEO ⾮常重要
此插件⽤于将⻚⾯元数据添加到 Gatsby 构建的静态 HTML ⻚⾯中
#### 使用：`npm install gatsby-plugin-react-helmet react-helmet`

### Less 支持
1. 下载插件：npm install --save gatsby-plugin-less
2. 配置插件：plugins: [`gatsby-plugin-less`]
3. 创建样式：index.module.less
4. 引⼊样式：import styles from './index.module.less'