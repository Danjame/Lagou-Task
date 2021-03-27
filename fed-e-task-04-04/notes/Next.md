# **React 服务端渲染专题（原生实现、Next.js 集成框架、Gatsby）**
## Next.js
### Next.js 是 React 服务端渲染应⽤框架. ⽤于构建 SEO 友好的 SPA 应⽤。
- ⽀持两种预渲染⽅式, 静态⽣成和服务器端渲染。
- 基于⻚⾯的路由系统, 路由零配置。
- ⾃动代码拆分. 优化⻚⾯加载速度。
- ⽀持静态导出, 可将应⽤导出为静态⽹站。
- 内置 CSS-in-JS 库 styled-jsx。
- ⽅案成熟, 可⽤于⽣产环境, 世界许多公司都在使⽤。
- 应⽤部署简单, 拥有专属部署环境 Vercel, 也可以部署在其他环境。

### 创建 Next.js 项⽬
创建: `npm init next-app next-guide`
运⾏: `npm run dev`
访问: `localhost:3000`

### 基于页面的路由系统
- 在 Next.js 中, ⻚⾯是被放置在 pages ⽂件夹中的 React 组件
- 组件需要被默认导出
- 组件⽂件中不需要引⼊ React
- ⻚⾯地址与⽂件地址是对应的关系

### 创建页面和其对应关系
```
export default function Home () {
  return <div> Home page </div>
}
```
- `pages/index.js` => `/`
- `pages/list.js` => `/list`
- `pages/post/first.js` => `/post/first`

### 页面跳转
页面之间通过 Link 组件来进行跳转.
```
import Link from 'next/link'
<link><a>To Home Page</a></link>
```
- Link 组件默认使⽤ JavaScript 进⾏⻚⾯跳转. 即 SPA 形式的跳转.
- 如果浏览器中 JavaScript 被禁⽤. 则使⽤链接跳转.
- Link 组件中不应添加除 href 属性以外的属性, 其余属性添加到 a 标签上。
- Link 组件通过预取(在⽣产中)功能⾃动优化应⽤程序以获得最佳性能。

### 静态资源
- 应⽤程序根⽬录中的 public ⽂件夹⽤于提供静态资源
- 通过以下对应关系进⾏访问。
    - `public/images/1.jpg` => `/images/1.jpg`
    - `public/css/base.css` => `/css/base.css`

### 元数据
通过 Head 组件来修改元数据
```
import Head from 'next/head'
<Head>
  <title>Index Page</title>
</Head>
```

### CSS样式
- 内置 styled-jsx，⼀个 CSS-in-JS 库，允许在 React 组件中编写 CSS, CSS 仅作⽤于组件内部。
  ```
  <style jsx>{'
    .container {
      color: blue
    }
  '}
  </style>
  ```
- CSS 模块允许将组件的 CSS 样式编写在单独的 CSS ⽂件中，CSS模块约定的文件后缀为 .module.css
  ```
  // index.module.css
  .p {color: green}

  // index.js
  import styles from './index.module.css'
  <div className={styles.p}></div>
  ```
- 全局样式
  1. 在 pages ⽂件夹中新建 _app.js ⽂件并加⼊如下代码。

  ```
  export default function App({ Component, pageProps}) {
    return <Component {...pageProps} />
  }
  ```

    2. 在项⽬根⽬录下创建 styles ⽂件夹, 并在其中创建 global.css。
    3. 在 _app.js 中通过 import 引⼊ global.css。
    4. 重新启动开发服务器。

### 预渲染
- 预渲染是指数据和HTML的拼接在服务器端提前完成。
- 预渲染可以使 SEO 更加友好。
- 预渲染会带来更好的⽤户体验, 可以⽆需运⾏ JavaScript 即可查看应⽤程序UI。
- 预渲染的两种形式：
  1. 在 Next.js 中⽀持两种形式的预渲染: 静态⽣成和服务器端渲染。
  2. 静态⽣成和服务器端渲染是⽣成 HTML 的时机不同。
  3. 静态⽣成: 静态⽣成是在构建时⽣成 HTML. 以后的每个请求都共⽤构建时⽣成好的 HTML。
  4. 服务器端渲染: 服务器端渲染是在请求时⽣成 HTML. 每个请求都会重新⽣成 HTML。
- 预渲染方式的选择：
  1. Next.js 允许开发者为每个⻚⾯选择不同的预渲染⽅式，不同的预渲染⽅式拥有不同的特点，应根据场景进⾏渲染，但建议⼤多数⻚⾯建议使⽤静态⽣成。
  2. 静态⽣成⼀次构建, 反复使⽤, 访问速度快，因为⻚⾯都是事先⽣成好的。适⽤场景：营销⻚⾯、博客⽂章、电⼦商务产品列表、帮助和⽂档。
  3. 服务器端渲染访问速度不如静态⽣成快, 但是由于每次请求都会重新渲染, 所以适⽤数据频繁更新的⻚⾯或⻚⾯内容随请求变化⽽变化的⻚⾯。

### 静态生成
- 无数据：如果组件不需要在其他地⽅获取数据, 直接进⾏静态⽣成。
- 有数据：如果组件需要在其他地⽅获取数据, 在构建时 Next.js 会预先获取组件需要的数据, 然后再对组件进⾏静态⽣成。
- 实现：
  1. 创建基于动态路由的⻚⾯组件⽂件, 命名时在⽂件名称外⾯加上[], ⽐如 `[id].js`。
  2. 导出异步函数 getStaticPaths, ⽤于获取所有⽤户可以访问的路由参数。
  ```
  export async function getStaticPath () {
    // 获取可以访问的路由参数
    return {
      // 返回固定格式的路由参数
      paths: [{params: {id: 1}}, {params: {id: 2}}],
      fallback: false
    }
  }
  ```
  3. 导出异步函数 getStaticProps, ⽤于根据路由参数获取具体的数据。
  ```
  export async function getStaticProps ({ params }) {
    // 根据路由参数获取具体数据
    return {
      props: {}
    }
  }
  ```

### 自定义404页面
可以在 pages ⽂件夹中创建 404.js ⽂件
```
export default function Custom404 () {
  return <h1> 404 - Page Not Found </h1>
}
```

### API Routes
API Routes 可以理解为接⼝, 客户端向服务器端发送请求获取数据的接⼝。Next.js 应⽤允许 React 开发者编写服务器端代码创建数据接⼝。

- 在 pages/api ⽂件夹中创建 API Routes ⽂件. ⽐如 user.js 。
- 在⽂件中默认导出请求处理函数, 函数有两个参数, req 为请求对象, res 为响应对象。
  ```
  export default function (req, res) {
    res.status(200).send({id: 1, name: 'Tom'})
  }
  ```
- 访问 API Routes：`localhost:3000/api/user`
- 不要在 getStaticPaths 或 getStaticProps 函数中访问 API Routes, 因为这两个函数就是在服务器端运⾏的。