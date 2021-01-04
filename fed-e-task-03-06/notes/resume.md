# **Vue.js + Vuex + TypeScript 实战项目开发与项目优化**

### 请求 data 和 ContentType 的问题
- 如果 data 是普通对象，则 Content-Type 是 application/json
- 通过 qs.stringify() 转换之后的 data 格式为：key=value&key=value，其 Content-Type 为 application/x-www-form-urlencoded
- 如果 data 是 FormData 对象，则 Content-Type 为 multipart/form-data
- axios 默认发送的是 application/json

### 关于 Vuex
- Vuex 容器的状态实现了数据共享，在组件里面方便访问，但是没有持久话的功能
- 修改容器数据使用 mutation 函数
- 为了防止页面刷新导致的数据丢失，应该把数据存储在 localStorage

### Vue Router
#### 路由元信息
- 定义路由的时候可以配置`meta`字段：
```
routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/login',
          component: login,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
```
- 一个路由匹配到的所有路由记录会暴露为`$route`对象 (还有在导航守卫中的路由对象) 的`$route.matched`数组。因此，我们需要遍历`$route.matched`来检查路由记录中的`meta`字段。
```
// 检查元字段
to.matched.some(record => record.meta.requiresAuth)
```

### 路由拦截器和请求拦截器
- 路由拦截器（导航守卫）：允许前端页面跳转之前进行一些操作。如判断当前用户是否登录过，如果登陆过，则可以跳转，否则重定向到登录页面
```
const router = new VueRouter({ ... })
router.beforeEach((to, from, next) => {
  // Do something before being navigated
})
```
- 请求拦截器：允许在请求发送前进行一些操作，如在每个请求体里统一加上 token，进行身份验证
```
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
```
- 响应拦截器：允许在收到响应之后进行一些操作，如收到 token 过期的响应，先刷行 token 然后再次发出请求
```
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
```

### 处理 token 过期
1. 使用请求拦截器，拦截每个请求并判断 token 的有效时间。如果 token 过期，则刮起请求，刷新 token 之后重新请求
- 优点：节省请求，节省流量
- 缺点：需要后端提供过期时间字段；如果使用本地时间被篡改，拦截会失败
2. 使用响应拦截器，拦截返回的数据。如果返回过期状态，则先刷新 token 再进行请求
- 优点：无需过期时间字段，无需判断时间
- 缺点：多一次请求，消耗更多的流量

### 部署相关
1. 如果在 history 模式下使用 Vue Router，将无法搭配简单的静态文件服务器。如 Vue Router 中的 `todos/1`，开发服务器会配置相关的响应，但是生产环境的简单静态服务器会返回404。在这种情况下，需要在生产环境服务器中将没有匹配到的静态文件的请求回退到 `index.html`。[Vue Router 官方文档说明](https://router.vuejs.org/zh/guide/essentials/history-mode.html)
2. 接口跨域
- 如果前端和后端 API 同源，则不需要做任何跨域处理
- 如果前端和后端 API 不同源，需要做跨域处理：
  - 方式一：配置服务端代理（Nginx, Apache, Tomcat, ...）
  - 方式二：后台接口启用 `CORS` 支持