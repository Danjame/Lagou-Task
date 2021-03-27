# **React Hooks、Chakra-UI、组件性能优化、封装组件库**
## Fomik
增强表单处理能⼒，简化表单处理流程。
[官⽹](https://jaredpalmer.com/formik/)

### 受控组件与⾮受控组件
- 受控组件
表单数据交由state对象管理，特点是可以实时得到表单数据，代码相对复杂。
- 非受控组件
表单数据交由DOM节点管理，特点是表单数据在需要时进⾏获取，代码实现相对简单。
- 总结: 受控组件和⾮受控组件都有其特点, 应该根据需求场进⾏选择。在⼤多数情况下，推荐使⽤受控组件处理表单数据。如果表单在数据交互⽅⾯⽐简单，使⽤⾮受控表单，否则使⽤受控表单。

## CSS-IN-JS
### 由来
1. CSS-IN-JS 是 WEB 项⽬中将 CSS 代码捆绑在 JavaScript 代码中的解决⽅案。
2. 这种⽅案旨在解决 CSS 的局限性, 例如缺乏动态功能, 作⽤域和可移植性。
### 优点
1. 让 CSS 代码拥有独⽴的作⽤域, 阻⽌ CSS 代码泄露到组件外部, 防⽌样式冲突。 
2. 让组件更具可移植性, 实现开箱即⽤, 轻松创建松耦合的应⽤程序。
3. 让组件更具可重⽤性, 只需编写⼀次即可, 可以在任何地⽅运⾏. 不仅可以在同⼀应⽤程序中重⽤组件, ⽽且可以在使⽤相同框架构建的其他应⽤程序中重⽤组件。
4. 让样式具有动态功能, 可以将复杂的逻辑应⽤于样式规则, 如果要创建需要动态功能的复杂UI, 它是理想的解决⽅案。
### 缺点
1. 为项⽬增加了额外的复杂性。
2. ⾃动⽣成的选择器⼤⼤降低了代码的可读性。
### Emotion
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
    - String Styles
        ```
        const styles = css`
            width: 100px;
            height: 100px;
        `
        ```
    - Object Styles
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