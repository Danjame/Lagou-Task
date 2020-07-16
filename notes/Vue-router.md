 Vue.use()传入函数或者对象，如果传入函数，则直接执行函数，若传入对象，则调用对象的install方法

replace 方法不记录历史
push 方法记录历史
go 方法跳转历史

Hash 和 History 模式区别
都是客户端路由的实现方式，根据不同的地址渲染不同的内容，不会向服务器发送请求，

Hash 模式
#号后面内容作为路由地址，通过？携带参数

基于锚点，当锚点路由地址发生变化，触发onhashchange 事件

Hisroty 模式
需要要服务端配置支持

基于html5 中的 History API:
history.pushState()
history.replaceState()

history.push 会向服务器发送请求
history.pushState 不会向服务器发送请求，只支持IE 10以后的版本

服务器端配置：
应该配置除了静态资源外都应返回单页应用的index.html


原理
- 通过history.pushState() 方法改变地址栏
- 监听 popstate 事件
- 根据当前路由地址找到对应组件重新渲染