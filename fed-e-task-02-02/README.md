# fed-e-task-02-02
lagou task

## 简答题
### 题一

首先 Webpack 通过 webpack.config.js 文件来进行主要的配置：
1. entry 字段指定入口文件
2. output 字段定义输出打包文件名字和目录
3. module 字段的 rules 数组配置资源模块的加载器
4. plugins 字段配置需要使用的插件

Webpack 启动之后，会从入口文件开始，找到入口文件里依赖到模块，根据 modules.rules 里配置的 loader 使用不同的 loader 对不同类型的文件进行加载和转换处理。最后把入口文件和所有依赖模块打包输出到 output 里定义的单独文件中。而在 Webpack 的运行过程中，插件可以帮助 Webpack 实现更多自动化的工作。

### 题二
- Loader：
Loader 机制是 Webpack 的核心，用于资源模块的加载。
开发思路：在 loader 文件中 使用 module.exports 导出一个接收 source 参数的函数，对传入的参数进行相关处理之后 return 出去。loader 内部可以依次使用多个其他 loader，最后输出结果需要是一个 JS 代码。最后在 webpack.config.js 的 modules.rules 里配置这个 loader 的目录和加载的文件类型。
- Plugin
Plugin 用于增强 Webpack 的自动化能力，其通过在生命周期的钩子中挂载函数来实现。
开发思路：插件是通过生命周期的钩子中挂载函数来工作，所以一般是定义个含有apply方法的类型，改方法接收 complier 对象，通过调用 complier 对象里的钩子绑定当钩子触发时需要执行的函数。