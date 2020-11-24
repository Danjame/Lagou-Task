# fed-e-task-03-05
1、Vue 3.0 性能提升主要是通过哪几方面体现的？
- 优化响应式系统
Vue 3.0 中使用 Proxy 对象重写了响应式系统
- 优化编译
Vue 3.0 中标记和提升所有的静态跟节点，diff 过程只需要对比动态节点的内容
- 优化打包

2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？
1. Composition Api 提供了基于函数的 API, 可以更加灵活地组织组件的逻辑和内部代码结构，甚至可以把逻辑功能提取出来实现重用。
2. Options Api 包含一个描述组件选项（data, methods, props等）的对象， Options API 开发复杂组件时，同一功能的逻辑代码会被拆分到不同的选项，导致可读性差。


3、Proxy 相对于 Object.defineProperty 有哪些优点？
- 多层属性嵌套，在访问属性过程中处理下一级属性
- 可以监听动态新增的属性
- 可以监听删除的属性
- 可以监听数组的索引和length属性

4、Vue 3.0 在编译方面有哪些优化？
- Vue 3.0 中标记和提升所有的静态跟节点，diff 过程只需要对比动态节点的内容
    1. Fragments(升级 vetur 插件)
    2. 静态提升
    3. Patch flag
    4. 缓存事件处理函数

5、Vue.js 3.0 响应式系统的实现原理？
- 使用 reactive, ref 和 toRefs 把数据转换成响应式数据
- 使用 effect 收集依赖
- 使用 track 跟踪依赖
- 使用 trigger 触发更新