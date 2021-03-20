# **React Hooks、Chakra-UI、组件性能优化、封装组件库**
### React Hooks
#### `useState()`
用于为函数组件引入状态并保存状态值。
1. 接收唯⼀的参数即状态初始值. 初始值可以是任意数据类型. 
2. 返回值为数组. 数组中存储状态值和更改状态值的⽅法. ⽅法名称约定以set开头, 后⾯加上状态名称. 
3. ⽅法可以被调⽤多次. ⽤以保存不同状态值。
4. 参数可以是⼀个函数, 函数返回什么, 初始状态就是什么, 函数只会被调⽤⼀次, ⽤在初始值是动态值的情况。设置状态值⽅法的⽅法本身是异步的。

#### `useReducer()`
useReducer 是另⼀种让函数组件保存状态的⽅式。
1. 第一个参数为 reducer 函数，第二个参数为保存的状态值。
2. useReducer 的返回值为一个包含传入状态值和 dispatch 的数组。
3. reducer 函数内部通过判断 action 的 type 值对状态进行操作。
4. 通过 dispatch 方法传入 action 来触发 reducer 以进行状态更改。

#### `useContext()`
useContext 可以跨组件层级获取数据时简化获取数据的代码
```
const context = createContext()
const value = useContext(context)
```

#### `useEffect()`
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

#### `useMesmo()`
useMemo 的⾏为类似Vue中的计算属性, 可以监测某个值的变化, 根据变化值计算新值。
1. useMemo 会缓存计算结果. 如果监测值没有发⽣变化, 即使组件重新渲染, 也不会重新计算. 此⾏为可以有助于避免在每个渲染上进⾏昂贵的计算。

#### `memo()`
memo 可以让组件中的数据没有发⽣变化时, 阻⽌组件更新. 类似类组件中的 PureComponent 和 shouldComponentUpdate。

#### `useCallback()`
缓存函数, 使组件重新渲染时得到相同的函数实例。

#### `useRef()`
1. 获取 DOM 元素对象
2. 保存数据，即使组件重新渲染，保存的数据仍然存在，保存的数据的更改不会触发组件的重新渲染

#### 自定义 Hook
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

#### 路由 Hooks
用来分别获取相关的路由对象
1. useHistory
2. useLocation
3. useRouteMatch
4. useParams

### Fomik
增强表单处理能⼒，简化表单处理流程。
[官⽹](https://jaredpalmer.com/formik/)

### 受控组件与⾮受控组件
#### 非受控组件
表单数据交由DOM节点管理，特点是表单数据在需要时进⾏获取，代码实现相对简单。
#### 受控组件
表单数据交由state对象管理，特点是可以实时得到表单数据，代码相对复杂。

- 总结: 受控组件和⾮受控组件都有其特点, 应该根据需求场进⾏选择。在⼤多数情况下，推荐使⽤受控组件处理表单数据。如果表单在数据交互⽅⾯⽐简单，使⽤⾮受控表单，否则使⽤受控表单。

### CSS-IN-JS
#### 由来
1. CSS-IN-JS 是 WEB 项⽬中将 CSS 代码捆绑在 JavaScript 代码中的解决⽅案。
2. 这种⽅案旨在解决 CSS 的局限性, 例如缺乏动态功能, 作⽤域和可移植性。
#### 优点
1. 让 CSS 代码拥有独⽴的作⽤域, 阻⽌ CSS 代码泄露到组件外部, 防⽌样式冲突。 
2. 让组件更具可移植性, 实现开箱即⽤, 轻松创建松耦合的应⽤程序。
3. 让组件更具可重⽤性, 只需编写⼀次即可, 可以在任何地⽅运⾏. 不仅可以在同⼀应⽤程序中重⽤组件, ⽽且可以在使⽤相同框架构建的其他应⽤程序中重⽤组件。
4. 让样式具有动态功能, 可以将复杂的逻辑应⽤于样式规则, 如果要创建需要动态功能的复杂UI, 它是理想的解决⽅案。
#### 缺点
1. 为项⽬增加了额外的复杂性。
2. ⾃动⽣成的选择器⼤⼤降低了代码的可读性。

#### Emotion
Emotion 是⼀个旨在使⽤ JavaScript 编写 CSS 样式的库。
- 安装
`npm install @emotion/core @emotion/styled`
- 配置
`npm run eject`

在 package.json ⽂件中找到 babel 属性, 加⼊
```
"presets: [
    "react-app",
    "@emotion/babel-preset-css-prop"
]"
```
- Styles
String Styles
```
const styles = css`
    width: 100px;
    height: 100px;
`
```
Object Styles
```
const styles = css({
    width: 100,
    height: 100
})
```
- css 属性优先级
1. props 对象中的 css 属性优先级⾼于组件内部的 css 属性。
2. 在调⽤组件时可以在覆盖组件默认样式。
- Styled Components
```
const Button = styled.button`
    color: red
`

const Button = styled.button({
    color: 'red'
})
```
- 嵌套选择器 &
表示组件本身
- as 属性
要使⽤组件中的样式, 但要更改呈现的元素, 可以使⽤ as 属性。`<Button as="div" />`
- 组合样式
在样式组合中, 后调⽤的样式优先级⾼于先调⽤的样式。
- 全局样式
`<Global styles = {styles} />`
- 关键帧动画
```
const move = keyFrames`
    0% { left: 0}
    100% { left: 100}
`
const styles = css`
    width: 100px;
    height: 100px;
    animation: ${move} 1s ease
`
function App () {
    return <div css={styles}>
        Hello World...
    </div>
}
```
- 主题
```
const theme = {
    colors: {
        primary: 'blue'
    }
}
<ThemeProvider theme={theme} ></ThemeProvider>

const getPrimaryColor = props => css`
    color: ${props.colors.primary}
`
<div css={getPrimaryColor}></div>
```

### Chakra-UI
#### 介绍
Chakra UI 是⼀个简单的, 模块化的易于理解的 UI 组件库. 提供了丰富的构建 React 应⽤所需的UI组件。

⽂档: https://next.chakra-ui.com/docs/getting-started

1. Chakra UI 内置 Emotion，是 CSS-IN-JS 解决⽅案的集⼤成者
2. 基于 Styled-Systems https://styled-system.com/ 
3. ⽀持开箱即⽤的主题功能
4. 默认⽀持⽩天和⿊夜两种模式
5. 拥有⼤量功能丰富且⾮常有⽤的组件
6. 使响应式设计变得轻⽽易举
7. ⽂档清晰⽽全⾯. 查找API更加容易
8. 适⽤于构建⽤于展示的给⽤户的界⾯
9. 框架正在变得越来越完善

#### 使用
1. 引入主题
```
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@chakra-ui/theme'

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
)
```

2. 依赖版本
安装最新版本会出现问题，使用以下版本不会有问题：
```
 "dependencies": {
    "@chakra-ui/react": "^1.0.4",
    "@chakra-ui/theme": "^1.2.2",
    "@emotion/react": "^11.1.3",
    "@emotion/styled": "^11.0.0",
    "framer-motion": "^3.1.1",
  }
```