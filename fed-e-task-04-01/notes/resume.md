# **React 设计原理解密及核心源码解读**
### React 16 的架构分为三层：调度层、协调层、渲染层。
- Scheduler (调度层): 调度任务的优先级，高优先任务优先进入协调器
- Reconciler (协调层): 构建 Fiber 数据结构，对比 Fiber 对象找出差异，记录 Fiber 对象要进行的 DOM 操作
- Renderer (渲染层): 负责将发生变化的部分渲染到页面上

#### Scheduler 调度层
在 React 16 版本中，放弃了递归对比 virtualDOM 的方式，采用循环模拟递归方式。对比过程中利用了浏览器的空闲时间来完成，不会长期占用主线程，解决了页面卡顿的问题。
在 window 对象中提供了 requestIdleCallback API，其可以利用浏览器的空余之间执行任务，但是有兼容性和稳定性的问题。
React 16 实现了自己的任务调度库 Scheduler。它可以实现在浏览器空余时间执行任务，设置任务的优先级。
#### Reconciler 协调层
在 React 15 版本中，协调器和渲染器交替执行，即找到差异立即更新
在 React 16 版本中，等协调器找出所有差异后打上标记，统一交给渲染器进行 DOM 更新。
#### Renderer 渲染层
渲染器根据协调器为 Fiber 节点打的标记，同步执行对应的 DOM 操作。

### Fiber
在 React 16 之前，采用了循环加递归的方式进行了 virtualDOM 的对比，由于递归使用了 JavaScript 执行栈，所以一旦开始就无法停止直到任务执行完毕。
如果 virtualDOM 层级比较深则会一直占用主线程，导致无法执行其他任务。所以在对比过程中无法响应其他操作，造成页面卡顿。
#### 解决方案
1. 利用浏览器的空闲时间执行任务，防止长时间占用主线程。
2. 放弃使用递归只采用循环，因为循环可以被打断。
3. 拆分任务，将任务拆分成多个小任务。
#### 实现
在 Fiber 方案中，为了实现任务的终止和再继续，DOM比对算法被分为两个部分：
1. 构建 Fiber (可中断)
2. 提交 Commit (不可中断)
#### 两种情况
- DOM 初始渲染: virtualDOM -> Fiber -> Fiber[] -> DOM
- DOM 更新操作: newFiber vs oldFiber -> Fiber[] -> DOM

### 双缓存技术
React 使用双缓存技术进行 Fiber 树的构建和替换，实现 DOM 对象的快速更新。由于 workInProgress 树是在内存中构建，
因此其构建速度非常快。
- currentFiber: 当前 Fiber 树，其 alternate 指向 workInProgress
- workInProgress: 即将更新的 Fiber 树，其 alternate 属性指向 currentFiber

### fiberRoot 和 rootFiber
- fiberRoot 表示 fiber 数据结构对象，是 Fiber 数据结构中最外层的对象。其包含了 rootFiber，属性 current 指向 rootFiber
- rootFiber 表示组件挂载点的 Fiber 对象，指向 fiberRoot，stateNode 属性指向 fiberRoot。
- 在 React 应用中 fiberRoot 只有一个而 rootFiber 可以有多个。

### 初始化渲染
1. render 阶段
负责创建 Fiber 数据结构并为 Fiber 节点打上标记，标记当前 Fiber 节点要进行的 DOM 操作。
2. commit 阶段
负责根据 Fiber 系节点标记进行相应的 DOM 操作。