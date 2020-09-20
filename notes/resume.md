## 首次渲染过程
### Vue 初始化，实例成员和静态成员
### new Vue()
### this._init()
### vm.$mount()
src/platforms/web/entry-runtime-with-compiler.js
1. 如果没有传递 render，把模版编译成 render 函数
2. compileToFunctions() 生成 render() 渲染函数
3. options.render = render
### vm.$mount()
src/platforms/web/runtime/index.js
mountComponent()
### mountComponent()
src/core/instance/lifecycle.js
1. 判断是否有 render 选项，如果没有但是传入了模版，并且当前是开发环境的话会发送警告
2. 触发 beforeMount 
3. 定义 updateComponent
- vm._update()
- vm._render() 渲染虚拟 DOM
- vm._update() 将虚拟 DOM 转换成真实 DOM
4. 创建 Watcher 实例
- 传入 updateComponent
- 调用 get() 方法
5. 触发 mounted
6. 返回 vm
### watcher.get()
1. 创建完 watcher 会调用一次 get
2. 调用 updateComponent()
3. 调用 vm._render() 创建 Vnode
- 调用实例化时传入的 render()
- 或者编译 tamplate 生成的 render()
- 返回 VNode
3. 调用 vm._update()


## 响应式处理过程
### initState()
2. `initData()`，data 属性注入到 vue 实例上
3. `observe()`，把 data 对象转换成响应式对象
### observe(value)
src/core/observer/index.js
1. 判断 value 是否是对象，如果不是对象直接放回
2. 判断 value 是否有`__ob__`, 如果有直接返回，如果没有则创建 observer 对象
3. 返回 observer 对象
### Obsever
src/core/observer/index.js
1. 给 value 对象定义不可枚举的`__ob__`属性，记录当前的 obsever 对象
2. 数组的响应式处理,
3. 对象的响应式处理，调用`walk()`方法遍历对象的属性，对每个属性调用`defineReactive()`
### defineReactive
src/core/observer/index.js
1. 为每个属性创建dep对象
2. 如果当前属性的值是对象，则调用 observe
3. 定义 getter，收集依赖和返回属性的值
4. 定义 setter，保存新值，如果新值是对象，则调用 observe 方法，发送通知，调用`dep.notify()`
### 依赖收集
1. 在 watcher 对象的 get 方法中调用 pushTarget， 把当前 watcher 对象记录到 Dep.target 属性中
2. 访问 data 中的成员的时候，在 defineReactive 的 getter 里收集依赖
3. 把属性对应的 watcher 对象添加到 dep 的 subs 数组中
4. 如果属性是对象，那么给 childOb 收集依赖，目的是子对象添加和删除成员时发送通知
### Watcher
1. `dep.notify()`调用 watcher 对象的 update() 方法
2. `queueWatcher()`判断 watcher 是否被处理，如果没有的则添加到 queue 队列中，并调用`flushSheduleQueue()`
- 触发 beforeUpdate 钩子函数
- 调用 watcher.run()：run() => get() => getter() => updateComponent
- 清空上一次的依赖
- 触发 actived 钩子函数
- 触发 updated 钩子函数


## 虚拟dom
### vm._render()
1. 如果传入了 render 函数，调用`vm.$creatElement()`=>`createElement(vm, a, b, c, d, true)`，如果没有传入 render 函数，则调用`vm._c()`=>`createElement(vm, a, b, c, d, true)`
2. `_createElement()`，`vnode = new VNode()`
3. 返回 vnode
### vm._update()
- 首次执行：`vm.__patch__(vm.$sel, vnode, hydrating, false)`
- 数据更新：`vm.__patch__(prevVnode, vnode)`
### vm.__patch__
1. `runtime/index.js`中把`runtime/patch.js` 的 patch 函数挂载到`Vue.prototype.__patch__`
2. 设置 modules 和 nodeOps
3. 调用 createPatchFunction() 函数，返回 patch 函数
### patch
1. vdom/patch.js 中的 createPatchFunction() 函数返回 patch 函数
2. 挂载cbs对象，其存放了用于处理节点属性/事件/样式的钩子函数
3. 判断第一个参数是否为真实dom，如果是说明是首次加载，将真实 dom 转换成 vnode，调用 createElm，把 newVnode 转换成真实dom，并挂载到 dom 树上
4. 如果是数据更新的时候，新旧节点是 sameVnode，执行 patchVnode，也就是 diff
5. 删除新旧节点
### createElm(vnode, insertedVnodeQueue)
1. 把虚拟节点转换成真实 DOM，并插入到 DOM 树中
2. 把虚拟节点的 children 转换成真实 DOM，并插入到 DOM 树中
### patchVnode
 1. 对比新旧 VNode 和其子节点之间的差异
 2. 如果其子节点不同，则调用 updatechildren 对比子节点的差异
### updateChildren
 1. 依次找到相同的子节点进行比较，有四种比较方式
 2. 在老节点的子节点中查找 newStartVnode，并进行处理
 3. 如果新节点比老节点多，把新增子节点插入到 DOM 中
 4. 如果老节点比新节点多，删除多余的老节点


## 模板编译
### compileToFunctions(template...)
1. 从缓存中加载编译好的 render 函数
2. 如果缓存中没有，则调用 compile(template, options)
### compile(template, options)
1. 合并 options
### baseCompile(template.trim(), finalOptions)
1. `parse()`， 把 template 转换成 AST tree
2. `optimize()`：
- 标记 AST tree 中的静态 sub trees
- 检测到静态子树，设置为静态，不需要在每次重新渲染时重新生成节点
- patch 阶段跳过静态子树
3. `generate()`，把 AST tree 转换成字符串形式的代码
### compileToFunctions(template...)
1. createFunction 把字符串形式的代码转换成函数
2. render 和 staticRenderFns 初始化完毕，挂载到 Vue 实例的 options 对应的属性中

注：
- 模版编译过程中标记静态根节点，对静态根节点进行优化处理，重新渲染的时候不需要再处理静态根节点，因其内容不会再发生改变。
- 在模版中不要留下无意义的空白和换行，否则会在 AST 对象中保留这些空白和换行，并且被存储在内存中，对浏览器渲染没有任何意义。