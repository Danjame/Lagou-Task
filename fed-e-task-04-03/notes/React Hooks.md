# **React Hooks、Chakra-UI、组件性能优化、封装组件库**
## React Hooks
### `useState()`
用于为函数组件引入状态并保存状态值。
1. 接收唯⼀的参数即状态初始值. 初始值可以是任意数据类型. 
2. 返回值为数组. 数组中存储状态值和更改状态值的⽅法. ⽅法名称约定以set开头, 后⾯加上状态名称. 
3. ⽅法可以被调⽤多次. ⽤以保存不同状态值。
4. 参数可以是⼀个函数, 函数返回什么, 初始状态就是什么, 函数只会被调⽤⼀次, ⽤在初始值是动态值的情况。设置状态值⽅法的⽅法本身是异步的。

### `useReducer()`
useReducer 是另⼀种让函数组件保存状态的⽅式。
1. 第一个参数为 reducer 函数，第二个参数为保存的状态值。
2. useReducer 的返回值为一个包含传入状态值和 dispatch 的数组。
3. reducer 函数内部通过判断 action 的 type 值对状态进行操作。
4. 通过 dispatch 方法传入 action 来触发 reducer 以进行状态更改。

### `useContext()`
useContext 可以跨组件层级获取数据时简化获取数据的代码
```
const context = createContext()
const value = useContext(context)
```

### `useEffect()`
让函数型组件拥有处理副作用的能力，类似生命周期函数。
1. 可以把 useEffect 看做 componentDidMount, componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
2. 三种使用方式
    - useEffect(() => {}) => componentDidMount, componentDidUpdate
    - useEffect(() => {}, []) => componentDidMount，传入指定数据到第二个参数的 数组里可检测其数据的变化而触发 effect
    - useEffect(() => () => {}) => componentWillUnMount
3. useEffect 中的参数函数不能是异步函数, 因为 useEffect 函数要返回清理资源的函数, 如果是异步函数就变成了返回 Promise，如果传入异步函数，需要把异步函数包裹在一个 IIFE 函数内部。
    ```
    useEffect(() => {
        (async () => {
            await axios.get()
        })()
    })
    ```

### `useMesmo()`
useMemo 的⾏为类似Vue中的计算属性, 可以监测某个值的变化, 根据变化值计算新值。
1. useMemo 会缓存计算结果. 如果监测值没有发⽣变化, 即使组件重新渲染, 也不会重新计算. 此⾏为可以有助于避免在每个渲染上进⾏昂贵的计算。

### `memo()`
memo 可以让组件中的数据没有发⽣变化时, 阻⽌组件更新. 类似类组件中的 PureComponent 和 shouldComponentUpdate。

### `useCallback()`
缓存函数, 使组件重新渲染时得到相同的函数实例。

### `useRef()`
1. 获取 DOM 元素对象
2. 保存数据，即使组件重新渲染，保存的数据仍然存在，保存的数据的更改不会触发组件的重新渲染

### 自定义 Hook
1. ⾃定义 Hook 是标准的封装和共享逻辑的⽅式。
2. ⾃定义 Hook 是⼀个函数, 其名称以 use 开头。
3. ⾃定义 Hook 其实就是逻辑和内置 Hook 的组合。
```
function useUpdateInput (initialValue) {
    const [value, setValue] = useState(initialValue)
    return {
        value,
        onChange: event => setValue(event.target.value)
    }
}

function App () {
    const nameInput = useUpdateInput('')
    const passwordInput = useUpdateInput('')
    const submitForm = event => {
        event.preventDefault()
        console.log(nameInput.value)
        console.log(passwordInput.value)
    }
    return <form onSubmit="submitForm">
        <input type=""text name="name" {...nameInput} />
        <input type=""password name="password" {...passwordInput} />
        <input type="submit" />
    </form>
}
```

### 路由 Hooks
用来分别获取相关的路由对象
1. useHistory
2. useLocation
3. useRouteMatch
4. useParams