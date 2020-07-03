# **模块化开发与规范化标准**
# **Webpack 打包**
## 由来
- 新特性代码编译
- 模块化 JavaScript 打包
- 支持不同类型的资源模块

Webpack实现前段整体的模块化

## 使用说明
- 通过 webpack.config.js 来配置文件：
1. output 字段定义打包js文件
2. module 字段的 rules 数组配置资源模块的加载
3. plugins 字段配置使用的插件

### loader 机制：
loader 机制是 Webpack 的核心，实现资源模块加载
#### 编译转换加载器
`css-loader`： 样式资源加载
`style-loader`： 样式结果导入

#### 文件操作加载器
`html-loader`：html文件加载器
`file-loader`：文件资源加载器
`url-loader`：把文件进行 base64 编码，生成 data-url 格式。
最佳实践：
- 小文件使用Data URLs，减少请求次数
- 大文件单独提取存放，提高加载速度

#### 代码检查加载器

#### webpack 模块加载方式
- 遵循 ES Modules 标准的 import 声明
- 遵循 CommonJS 标准的 require 函数
- 遵循 AMD 标准的 define 函数和 require 函数
- 样式代码中的 @import 指令和 url 函数
- HTML 代码中图片标签的 src 属性

### 插件机制
plugin 增强 Webpack 自动化能力，解决其他自动化的工作

- plugin 插件通过生命周期的钩子中挂在函数实现
- 常用插件
`clean-webpack-plugin`：自动清除输出目录
`html-webpack-plugin`：自动生成 HTML 文件
`copy-webpack-plugin`：自动拷贝静态文件至输出目录

### 开发体验
#### 自动编译
使用 webpack --watch 命令可启动自动编译功能，监视文件的变化
#### 自动刷新
BrowserSync 工具可以自动刷新浏览器
#### Webpack Dev Server
Webpack Dev Server 集成了自动编译和自动刷新浏览器的功能，其在内存中完成编译并且从中读取
#### 源码映射
Source Map 可以定位源码位置
#### 模块热更新 HMR 
Hot Modules Replacement
- 样式文件可以实现自动热更新
- 但是对于js文件需要手动实现自动热更新

### 生产环境的优化
#### 不同环境的配置文件
- 根据环境不同导出不同的配置
- 一个环境对应一个配置文件
#### Webpack DefinePlugin 
- 定义环境变量
- 为代码注入全局成员
#### Tree Shaking
自动忽略输出冗余代码
#### 模块合并 concatenateModules
合并所用的模块并且输出到一个函数中，提升效率和减少代码体积
#### sideEffects
sideEffects 用于 npm 包标记是否有副作用
#### Webpack 代码分割
- 多入口打包
- 动态导入