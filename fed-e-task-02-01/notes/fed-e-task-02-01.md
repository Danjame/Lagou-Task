# **开发脚手架及封装自动化构建工作流**
## 工程化
1. 解决问题
- 传统语言或者语法的弊端
- 无法使用模块化 / 组建化
- 重复的机械式工作
2. 价值
- 代码风格统一，质量保证
- 依赖后端服务借口的支持
- 整体依赖后端项目


## 脚手架工具
本质作用：创建项目基础结构，提供项目规范和约定（组织结构，开发范式，模块依赖，工具配置，基础代码）
工作原理：实际上是cli应用
1. yarn / npm init 初始化一个 package.json 文件
2. 在 package.json 里bin字段定义入口文件
3. npx / yarn link 命令可以连接到全局
4. 创建模版目录和模版文件，在模版文件里使用`<%= 输入内容 %>`可以接收inquirer 交互回来的数据
5. 通过命令行交互询问用户问题
- 安装 inquirer 模块
- 使用`inquirer.prompt()`方法提出问题，参数为对象数组，对象属性有type，name，message
- 可链式调用`then()`对答案进行处理
6. 根据用户回答的结果生成文件
- 倒入 path 和 fs 模块
- 安装模版引擎`yarn add ejs`
- 使用`path.join()`生成模版目录，`__dirname`可获取当前文件路径
- 使用`process.cwd()`获取命令行目录作为目标目录
- 使用`fs.readdir()`读取文件目录，第一个参数为模版文件路径，第二参数为回调函数，回调函数的第一个参数为错误对象，第二个参数为文件的相对路径
- 使用模版引擎方法`ejs.renderFile()`渲染文件，第一个参数为文件的绝对路径，第二个参数为需要填入的数据，第三个参数为回调函数，回调函数的第一个参数为错误对象，第二个参数为渲染结果
- 使用`fs.writeFileSync()`写入到目标文件，第一个参数为目标路径，第二个参数为写入内容


## 自动化构建

### Grunt
1. yarn / npm init 初始化一个 package.json 文件
2. 入口文件为 gruntfile.js
3. 导出参数为 grunt 的函数，函数内部使用相应的API创建任务
4. 使用`grunt.registerTask()`方法注册任务，第一个参数指定任务名字，第二个参数指定回调函数
5. 如果给`grunt.registerTask()`的第一个参数传入 default，那么后面传入的任务为启动grunt时执行的默认任务。第二个参数可传入任务数组，数组每个元素为已注册的任务，那么默认会一次执行数组里的任务
6. 对于执行异步任务，结束后需要执行内部的`this.async()`以指明异步任务的结束
7. 在注册任务里`return false`可以标记任务失败，在默认任务数组里，失败的任务后续的任务不会被执行，除非使用 --force 命令
8. 使用`grunt.initConfig()`进行目标配置
9. `grunt.loadNpmTasks()`加载插件
10. 使用 load-grunt-tasks 可以自动加载所有 grunt 的插件
11. 使用 yarn / npx grunt 运行注册的任务


### Gulp
#### 工作原理：读取流=>转换流=>写入流
1. yarn / npm init 初始化一个 package.json 文件
2. 入口文件为 gulpfile.js
3. 任务中使用`src()`和链式调用`pipe()`进行流的处理
4. 使用`dest()`写入目标目录
5. 组合任务
- 串行任务`series()`，依次执行多个任务
- 并行任务`parallel()`，同时执行多个任务
6. 使用 yarn / npx gulp 执行相应的任务