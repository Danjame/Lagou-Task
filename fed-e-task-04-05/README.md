# fed-e-task-04-05
### 作业
请完成下面几道简答题。

1. 通过该项目，请简要说明 typescript 比 javascript 的优势在哪？
  - 在代码编写阶段就有异常语法提示
  - 减少不必要的类型判断，提高开发效率
  - 只能和准确的类型检测，减少开发阶段的错误
  - 让代码更加严格和安全

2. 请简述一下支付流程
  - 点击支付按钮，向服务器发送请求，把订单信息传给服务器。 
  - 服务器返回支付地址，使用该支付地址进行页面跳转。
  - 在支付页面完成支付后，支付宝会重定向到`/paysuccess`地址，同时向服务器发送支付状态。
  - 前端跳转到事先写好的`/paysuccess`路由页面。

3. react-redux 的主要作用是什么，常用的 api 有哪些，什么作用？
  react-redux 是 react 专用的 redux 库，它可以让 react 组件从 redux store 中读取和更新数据，达到数据全局共享的效果。

  - Provider 组件让整个 redux store 暴露给整个 app。
  - connect 方法在组件内部让组件和 redux store 连接起来。
  - mapStateToProps 方法可以建立 redux sotre 里的 state 和组件内部 props 对象的映射关系
  - mapDispatchToProps 方法可以建立组件操作和 redux action 之间的对应关系。
  - react-redux hooks：
    - useSelector(): 直接从 redux store 中提取 state 里的数据
    - useDispatch(): 返回 dispatch 函数的引用

4. redux 中的异步如何处理？
  使用 redex 中间件 redux-thunk 或者 redux-saga 处理。在中间里可以使用异步请求更新 redux store 里的数据。当触发一个 action 经过中间件之后，异步请求在中间件里完成，完成之后再经过 reducer 更新 store 里的 state。