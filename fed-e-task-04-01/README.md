# fed-e-task-04-01
### 作业
1. 请简述 React 16 版本中初始渲染的流程
DOM 初始渲染: virtualDOM -> Fiber -> Fiber[] -> DOM
    一. Babel 把 JSX 代码 转化为 React.createElement 的方法调用，该方法返回 virtualDOM 对象。
    二. 采用循环的方式为该 virtualDOM 对象里的所有 virtualDOM 对象构建对应的 Fiber 对象。
    三. 把所有的 Fiber 对象存储在一个数组当中。
    四. 根据每个 Fiber 对象里 effectTag 属性保存的需要进行的 DOM 操作应用到真实 DOM 对象当中

2. 为什么 React 16 版本中 render 阶段放弃了使用递归
在 React 16 之前，采用了循环加递归的方式进行了 virtualDOM 的对比，由于递归使用了 JavaScript 执行栈，所以一旦开始就无法停止直到任务执行完毕。如果 virtualDOM 层级比较深或者组件数量庞大则会一直占用主线程，导致无法执行其他任务。所以在对比过程中无法响应其他操作，造成页面卡顿，严重影响用户体验。

3. 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情
- 第一子阶段
#### 调用类组件的 getSnapshotBeforeUpdate 生命周期函数
循环 effect 链上的每个 fiber 对象获取其 effectTag, 当 effectTag 有值的话, 则调用类组件的 getSnapshotBeforeUpdate 生命周期函数
- 第二子阶段
#### 根据 effectTag 执行 DOM 操作
循环 effect 链, 获取 effectTag 并且根据它的值分别处理：
    - 插入：commitPlacement
    - 更新：commitWork
- 第三子阶段
#### 调用类组件的生命周期函数和函数组件的钩子函数
    - 类组件：
        a. 初始渲染-componentDidMount, 更新阶段--componentDidUpdate

        b. 执行渲染完成之后的回调函数 commitUpdateQueue
    - 函数组件：
        commitHookEffectListMount

4. 请简述 workInProgress Fiber 树存在的意义是什么
这是 React 的双缓存技术的核心所在，双缓存技术进行 Fiber 树的构建和替换，实现 DOM 对象的快速更新。由于 workInProgress 树是在内存中构建，因此其构建速度非常快。双缓存 包含了 currentFiber 和 workInProgress:
- currentFiber: 当前 Fiber 树，其 alternate 指向 workInProgress
- workInProgress: 即将更新的 Fiber 树，其 alternate 属性指向 currentFiber
