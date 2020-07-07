# vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性

## 项目说明：
### 资源加载器：
- vue 资源
对于 vue 后缀的文件需要使用 `vue-loader`

- js 资源
使用`babel-loader`转换ES新特性，并且忽略掉`/node_modules/`目录下的文件

- less 资源
除了`css-loader`和`style-loader`，由于是一个 vue 项目，所以还需要使用`vue-style-loader`，项目使用了 less 预处理的css语言，所以还需依赖`less-loader`

- 图片资源
使用`url-loader`，由于打包过后，图片资源的URL地址也会使用ES模块语法一并打包，打包结果无法被正常访问，因此需要在`option`中配置 `esModule`为`false`，不使用ES模块语法即可。该处使用`url-loader`前提也需要安装`file-loader`

### 插件
- 使用`clean-Webpack-plugin`在每次打包之前清除原来的输出目录，防止输出文件的冗余
- 对于 vue 项目需要使用`vue-loader-plugin`
- 使用`html-webpack-plugin` 自动生成 html 文件，并且传入对象参数，动态配置title，指定 template 以及 favicon
- 使用 HMR 以启用热更新网页

### devServer
- hot 配置为 true 启用热更新
- open 配置为 true 来启用服务时自动打开网页

### devtool
- `source-map`以定位可读源码