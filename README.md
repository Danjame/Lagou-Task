<<<<<<< HEAD
# Lagou-Task
=======
# fed-e-task-03-02
## 简答题
### 1. 请简述 Vue 首次渲染的过程
#### Vue 初始化，实例成员和静态成员
#### new Vue()
#### this._init()
#### vm.$mount()
1. 判断是否有传入 render，如果没有传递 render，通过 compileToFunction() 把模版编译成 render 函数
2. 把 render 函数记录到 options.render 中
#### mountComponent()
1. 判断是否有 render 选项，如果没有但是传入了模版，并且当前是开发环境的话会发送警告
2. 触发 beforeMount 
3. 定义 updateComponent
- vm._render() 渲染虚拟 DOM
- vm._update() 将虚拟 DOM 转换成真实 DOM
4. 创建 Watcher 实例
- 传入 updateComponent
- 调用 get() 方法
5. 触发 mounted
6. 返回 vm
#### watcher.get()
1. 创建完 watcher 会调用一次 get
2. 调用 updateComponent()
3. 调用 vm._render() 创建 Vnode
- 调用实例化时传入的 render()
- 或者编译 tamplate 生成的 render()
- 返回 VNode
3. 调用 vm._update()


### 2. 请简述 Vue 响应式原理
#### initState()
2. `initData()`，data 属性注入到 vue 实例上
3. `observe()`，把 data 对象转换成响应式对象
#### observe(value)
1. 判断 value 是否是对象，如果不是对象直接放回
2. 判断 value 是否有`__ob__`, 如果有直接返回，如果没有则创建 observer 对象
3. 返回 observer 对象
#### Obsever
1. 给 value 对象定义不可枚举的`__ob__`属性，记录当前的 obsever 对象
2. 数组的响应式处理,
3. 对象的响应式处理，调用`walk()`方法遍历对象的属性，对每个属性调用`defineReactive()`
#### defineReactive
1. 为每个属性创建dep对象
2. 如果当前属性的值是对象，则调用 observe
3. 定义 getter，收集依赖和返回属性的值
4. 定义 setter，保存新值，如果新值是对象，则调用 observe 方法，发送通知，调用`dep.notify()`
#### 依赖收集
1. 在 watcher 对象的 get 方法中调用 pushTarget， 把当前 watcher 对象记录到 Dep.target 属性中
2. 访问 data 中的成员的时候，在 defineReactive 的 getter 里收集依赖
3. 把属性对应的 watcher 对象添加到 dep 的 subs 数组中
4. 如果属性是对象，那么给 childOb 收集依赖，目的是子对象添加和删除成员时发送通知
#### Watcher
1. `dep.notify()`调用 watcher 对象的 update() 方法
2. `queueWatcher()`判断 watcher 是否被处理，如果没有的则添加到 queue 队列中，并调用`flushSheduleQueue()`
- 触发 beforeUpdate 钩子函数
- 调用 watcher.run()：run() => get() => getter() => updateComponent
- 清空上一次的依赖
- 触发 actived 钩子函数
- 触发 updated 钩子函数


### 3. 请简述虚拟 DOM 中 Key 的作用和好处
- 作用：给节点设置 key 可以定义节点的唯一性，视图更新时在 diff 算法中遍历寻找相同 key 值的节点达到复用的目的，如果找不到则直接移除。
- 好处：相比不设置 key 值，设置 key 值可以减少 dom 的操作，节省了渲染时间和提高了渲染性能。


### 4. 请简述 Vue 中模版编译的过程
#### compileToFunctions(template...)
1. 从缓存中加载编译好的 render 函数
2. 如果缓存中没有，则调用 compile(template, options)
#### compile(template, options)
1. 合并 options
#### baseCompile(template.trim(), finalOptions)
1. `parse()`， 把 template 转换成 AST tree
2. `optimize()`：
- 标记 AST tree 中的静态 sub trees
- 检测到静态子树，设置为静态，不需要在每次重新渲染时重新生成节点
- patch 阶段跳过静态子树
3. `generate()`，把 AST tree 转换成字符串形式的代码
#### compileToFunctions(template...)
1. createFunction 把字符串形式的代码转换成函数
2. render 和 staticRenderFns 初始化完毕，挂载到 Vue 实例的 options 对应的属性中
>>>>>>> fed-e-task-03-02
