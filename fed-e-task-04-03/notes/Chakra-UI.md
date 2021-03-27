# **React Hooks、Chakra-UI、组件性能优化、封装组件库**
## Chakra-UI
### 介绍
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

### 使用
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