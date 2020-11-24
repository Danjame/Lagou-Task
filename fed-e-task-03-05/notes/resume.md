# ** Composition APIs 及 3.0 原理 **
## Composition APIs
### Vue 3.0 Composition APIs
- 提供了基于函数的 API, 可以更加灵活地组织组件的逻辑和内部代码结构，甚至可以把逻辑功能提取出来实现重用。
### Vue 2.x 的 Options API
- 包含一个描述组件选项（data, methods, props等）的对象。
- Options API 开发复杂组件，同一功能的逻辑代码会被拆分到不同的选项，导致可读性差。

## Vue 3.0 性能提升
### 使用proxy对象重写了响应式系统
- Vue 2.x 中响应式系统的核心使用 defineProperty
- Vue 3.0 中使用 Proxy 对象重写了响应式系统
    1. 可以监听动态新增的属性
    2. 可以监听删除的属性
    3. 可以监听数组的索引和length属性

### 通过优化编译的过程和重写虚拟dom，提升了渲染的性能。
- Vue 2.x 中通过标记静态根节点来优化 diff 的过程
- Vue 3.0 中标记和提升所有的静态跟节点，diff 过程只需要对比动态节点的内容
    1. Fragments(升级 vetur 插件)
    2. 静态提升
    3. Patch flag
    4. 缓存事件处理函数

### 通过优化源码的体积和更好的 tree-shaking 支持的减少打包的体积。
- 打包优化体积
    1. Vue 3.0 移除了一些不常用的 API，例如：inline-template, filter 等
    2. 更好地支持Tree-shaking，通过编译阶段的静态分析，在打包阶段直接过滤掉没有引入的模块

## 浏览器加载 ES Module 的方式：
- type 为 module 的 script 标签是在 dom 创建之后，DOMContentLoaded 之前执行的

## Vite
### Vite 特点：
- 快速冷启动
- 按需编译
- 模块热更新，其性能与模块的总数无关
### Vite 和 Vue-CLI
- Vite 在开发模式下不需要打包可以执行运行
- vite 会对浏览器不识别的模块进行处理，比如 .vue 的文件，会在服务器对其进行编译，把编译的结果发送给浏览器
- 打包：
    1. Vue-CLI 开发模式下必须对项目进行打包才可以运行
    2. vite 在生产环境下使用 Rollup 打包，基于 ES Module 的方式打包
    3. Vue-CLI 使用 webpack 打包

### Vite 创建项目 (Vue 3.0)：
```
npm init vite-app <name>
cd <name>
npm install
npm run dev
```

## setup
- 包含两个参数： props 和 context
- 执行的时机：在props被解析完毕，组件实例被创建之前.
- 无法在其内部通过 this 获取到组件实例，其内部 this 指向 undefined

## reactive, ref 和 toRefs
### reactive 
处理一个对象，通过proxy处理成为一个响应式对象，对该对象进行解构之后会，提取值不再是响应式
### ref
将一个普通类型的变量转化为一个响应式对象，其返回值需要通过 .value 的方式来读写，但在 template 中不需要使用 .value 的方式
### toRefs 
将reactive()的响应式对象中的每个属性节点转化为响应式的

## watchEffect
- watchEffect 不要指定监听属性，它会自动收集依赖，只要回调函数中引用了响应式数据，当这些响应式数据变更时，即触发回调函数
- watch可以拿到新值和旧值，但是 watchEffect 拿不到
- watchEffect 在组件初始化的时候会执行一次用以收集依赖，之后一旦依赖发生变更，就会执行回调。但是 watch 不需要收集依赖

