# **Redux 和 Mobx**
### Redux 核心
#### 工作流程
- Store: 存储状态的容器，JavaScript 对象
- View：视图，HTML页面
- Action：对象，描述对状态进行的操作
- Reducers：函数，操作状态并返回新的状态

View => DISPATCH => Actions => Reducer => Store => SUBSCRIBE

1. 组件通过 dispatch 方法触发 Action
2. Store 接收 Action 并将 Action 分发给 Reducer
3. Reducer 根据 Action 类型对状态进行更改并将更改后的状态返回给 Store
4. 组件订阅了Store中的状态，Store中的状态更新会同步到组件

#### API
`const store = Redux.createStore(reducer)`
`function reducer (state = initialState, action) {}`
`store.getState()`
`store.subscribe(function () {})`
`store.dispatch({type: 'description...'})`

### React 中遇到的问题
在 React 中组件通信的数据流是单向的, 顶层组件可以通过props属性向下层组件传递数据, 而下层组件不能向上层组件传递数据, 要实现下层组件修改数据, 需要上层组件传递修改数据的方法到下层组件。当项目越来越大的时候, 组件之间传递数据变得越来越困难。

### React + Redux
使用Redux管理数据，由于 Store 独立于组件，使得数据管理独立于组件，解决了组件与组件之间传递数据困难的问题。

### 更改 store 中的数据
#### action 是改变状态的唯一途径
`this.props.dispatch({type: 'action description'})`
#### reducer 接收 action，并对数据进行处理并返回
```
const reducer = (state, action) => {
    switch (action.type) {
        case 'action description':
        return { some data }
        default:
        return state
    }
}
```

### Provider 组件 与 connect 方法
#### Provider
Provider 让组件可以获得 Store 中的数据
```
import { Provider } from 'react-redux'
<Provider store={store}><App /></Provider>
```

#### connect
组件使用 connect 方法将数据通过 props 传递进组件
```
import { connect } from 'react-redux'
const mapStateToProps = state => ({
    count: state.count
})
export default connect(mapStateToProps)(组件名称)
```

## React 性能优化最佳实践
1. 组件卸载前进行清理操作
- 函数组件使用 useEffect 的返回值进行清理操作。
- 类组件使用 componentWillUnmount 进行清理操作。
2. 使用纯组件降低组件重新渲染的频率
- React 提供了 PureComponent 类, 类组件在继承它以后, 类组件就变成了纯组件. 纯组件会对 props 和 state 进行浅层比较, 如果上一次的 props、state 和下一次的 props、state 相同, 则不会重新渲染组件。
- 浅比较指的是比较基本数据类型是否具有相同的值, 比如1是否等于1, true是否等于true. 比较复杂数据类型的第一层值是否相同。
- PureComponent 应用于类组件。
3. 使用高阶组件 React.memo 进行组件缓存
- 高阶组件是 React 应用中共享代码, 增加逻辑复用的一种方式. 比如 A 组件和 B 组件都需要使用一个相同的逻辑，如何将逻辑抽取到一个公共的地方呢？答案就是使用高阶组件
- React.memo 应用于函数组件。
- memo 方法的第二个参数即为比较函数，可以自定义比较逻辑，如果为组件传递的数据涉及嵌套层次，就可以自定义比较逻辑。
4. 使用 shouldComponentUpdate 生命周期函数减少组件渲染频率
- shouldComponentUpdate 是类组件的生命周期函数, 在组件 props 或者 state 发生改变后调用。函数默认返回 true, 重新渲染组件, 返回 false, 阻止组件重新渲染。
- 函数的第一个参数为 nextProps, 第二个参数为 nextState。
5. 使用组件懒加载
- 使用 lazy 方法引入需要进行懒加载的组件，并把懒加载的组件包裹在 suspense 组件里。
```
const About = lazy(() => import("./about")

<Suspense fallback={<div>loading....</div>}>
<About />
</Suspense>
```
6. 使用 fragment 以避免额外的标记
- 使用 fragment 占位符作为 jsx 的最外层父级，避免额外的无意义 div 元素。
7. 不要使用内联函数定义
- 在使用内联函数后, render 方法每次运行时都会创建该函数的新实例, 导致 React 在进行 Virtual DOM 比对时, 新旧函数比对不相等，导致React 总是为元素绑定新的函数实例, 而旧的函数实例又要交给垃圾回收器处理。
- 正确的做法是在组件中单独定义函数, 将函数绑定给事件。
8. 在构造函数中进行函数 this 绑定
- 在构造函数中对函数的 this 进行更正，构造函数只执行一次, 所以函数 this 指向更正的代码也只执行一次。
- 也可以在行内进行 this 更正， render 方法每次执行时都会调用 bind 方法生成新的函数实例。
9. 类组件中的箭头函数
- 当使用箭头函数时, 该函数被添加为类的实例对象属性, 而不是原型对象属性。如果组件被多次重用, 每个组件实例对象中都将会有一个相同的函数实例, 降低了函数实例的可重用性造成了资源浪费。
- 更正函数内部 this 指向的最佳做法仍是在构造函数中使用 bind 方法进行绑定。
10. 避免使用内联样式属性
- 当使用内联 style 为元素添加样式时, 内联 style 会被编译为 JavaScript 代码, 通过 JavaScript 代码将样式规则映射到元素的身上, 浏览器就会花费更多的时间执行脚本和渲染 UI, 从而增加了组件的渲染时间。
- 更好的办法是将 CSS 文件导入样式组件。
11. 优化条件渲染
- 频繁的挂载和卸载组件是一项耗性能的操作, 为了确保应用程序的性能, 应该减少组件挂载和卸载的次数。
- 在 React 中我们经常会根据条件渲染不同的组件. 条件渲染是一项必做的优化操作。
12. 不要在 render 方法中更改应用状态
- 当应用程序状态发生更改时, React 会调用 render 方法, 如果在 render 方法中继续更改应用程序状态, 就会发生 render 方法递归调用导致应用报错。
13. 为组件创建错误边界
- 默认情况下, 组件渲染错误会导致整个应用程序中断, 创建错误边界可确保在特定组件发生错误时应用程序不会中断。
- 错误边界是一个 React 组件, 可以捕获子级组件在渲染时发生的错误, 当错误发生时, 可以将错误记录下来, 可以显示备用 UI 界面.
- 错误边界涉及到两个生命周期函数, 分别为 getDerivedStateFromError 和 componentDidCatch.
- getDerivedStateFromError 为静态方法, 方法中需要返回一个对象, 该对象会和state对象进行合并, 用于更改应用程序状态。
-componentDidCatch 方法用于记录应用程序错误信息. 该方法的参数就是错误对象。
14. 避免数据结构突变
15. 为列表数据添加唯一标识
- 当需要渲染列表数据时, 我们应该为每一个列表项添加 key 属性, key 属性的值必须是唯一的。
- key 属性可以让 React 直接了当的知道哪些列表项发生了变化, 从而避免了 React 内部逐一遍历 Virtual DOM 查找变化所带来的性能消耗. 避免了元素因为位置变化而导致的重新创建.
16. 节流和防抖
- 节流和防抖可以用于控制在指定的时间内调用的事件处理程序的次数。
17. 外部资源使用 CDN (Content Delivery Network) 加载
- 内容交付网络（CDN）指的是地理上分散的服务器组, 它们一起工作以提供网络内容的快速交付。
18. 依赖优化
- 在应用程序中经常会依赖第三方包，但我们不想引用包中的所有代码，我们只想按需引用代码，此时我们可以使用插件对依赖项进行优化。[优化资源](https://github.com/GoogleChromeLabs/webpack-libs-optimizations)
19. 长列表优化（虚拟列表）
- 在工作中, 我们经常需要以列表的形式展示数据, 如果列表项过多一次加载一次全部展示就会出现页面卡顿从而产生性能问题. 可以使用分页或者上拉加载解决问题. 除分页和上拉加载以外, 还可以使用虚拟列表技术解决性能问题.。
- 虚拟列表就是按需显示, 不必一次渲染所有列表项, 只显示用户可视区域内的元素, 再根据用户的滚动位置逐步渲染其余数据. 上拉加载是随着滚动请求数据和渲染数据, 虚拟列表是一次请求所有数据, 随着滚动按需渲染。
- react-virtualized 可以实现虚拟列表. 它会在页面中生成一块滚动区域, 在区域内进行列表内容的显示. 它会根据可视区域大小生成数据, 比如可视区域内正好可以放置10条数据, 它就会渲染10条数据, 然后再根据用户的滚动位置, 不断的渲染数据并替换区域内数据. 再通过定位的方式设置列表项的位置, 形成滚动的视觉效果。
