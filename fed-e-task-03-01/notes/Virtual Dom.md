## Virtual Dom
### Diff 算法
Diff 算法执行过程
1. 在首次渲染视图时，patch 会新增节点，把 vnode 渲染成真实 dom。
2. 当数据发生变化时，patch 会对 vnode 和 oldVnode 进行差异比较：
- 当 vnode 和 oldVnode 不是同一节点时，patch 会使用 vnode 创建新节点，并删除 oldVnode， 完成节点替换。
- 当 vnode 和 oldVnode 是同一节点时，进一步对 vnode 里的 newChildren 和 oldVnode 里的 oldChildren 进行比较，其中会使用到四种遍历方法：

a) newStartVnode / oldStartVnode: 新开始节点和旧开始节点依次比较

b) newEndVnode / oldEndVnode: 新结束节点和旧结束节点倒序比较

c) newStartVnode / oldEndVnode: 新开始节点和旧结束节点逆向比较

d) newEndVnode / oldStartVnode: 新结束节点和旧开始节点逆向比较

- 通过对新旧 vnode 的子节点进行比较，对子节点进行增加，删除或者移动。
- 如果 oldChildren 的数组先遍历完(oldStartIdx > oldEndIdx)，说明 newChildren 有剩余，把剩余节点添加到后面
- 如果 newChildren 的数组先遍历完(newStartIdx > newEndIdx)，说明 oldChildren 有剩余，把剩余节点全部删除

### Snabbdom
#### init
init(modules, domApi), 返回 patch 函数
#### patch
patch(dom/oldVnode, vnode)
- 渲染vnode到指定dom元素上
- 对比差异并渲染
#### createElm
createElm(vnode, insertedVnodeQueue)，返回创建的 DOM 元素