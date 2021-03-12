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
