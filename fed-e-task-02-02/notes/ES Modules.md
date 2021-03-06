# **模块化开发与规范化标准**
# **模块化开发**
## 演变过程
1. 引入script文件
污染全局作用域
命名冲突
完全依靠约定
2. 命名空间对象
模块可以被修改，没有私有空间
3. IIFE
私有空间的变量不会被修改
4. IIFE 里传入参数
更加明显的模块依赖关系

## 规范
### CommonJS
- 一个文件就是一个模块
- 每个模块有单独的作用域
- 通过module.exports导出成员
- 通过require函数载入模块

### AMD规范
- 使用相对复杂
- 模块JS文件请求频繁

### ES Modules
- 语言层面实现了模块化
- 自动采用严格模式
- 每个模块运行在单独的私有作用域
- 通过 CORS 请求外部的 JS 模块
- script会延迟执行脚本

#### ES Modules in Node.js
- Node.js 内置模块默认导出了每一个成员
- Node.js 外置模块默认导出一个默认成员

- ES Modules 可以导入 CommonJS 模块
- CommonJS 不能导入 ES Modules 模块
- CommonJS 始终只会导出一个默认成员
- import 不是解构导出的对象

- ES Modules 中不能直接使用 CommonJS 中的全局成员
- 在 package.json 中加入 `"type":"module"` 字段可以直接在 node 中运行 ES Modules 文件而不需要 ejs 扩展名。此时 CommonJS 的文件需要使用 cjs 扩展名。