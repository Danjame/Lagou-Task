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

### 路由拦截器和请求拦截器
- 路由拦截器（导航守卫）：允许前端页面跳转之前进行一些操作。如判断当前用户是否登录过，如果登陆过，则可以跳转，否则重定向到登录页面
- 请求拦截器：允许在请求发送前进行一些操作，如在每个请求体里统一加上 token，进行身份验证
- 响应拦截器：允许在收到响应之后进行一些操作，如收到 token 过期的响应，先刷行 token 然后再次发出请求