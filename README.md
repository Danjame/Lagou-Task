# fed-e-task-03-01

## 简答题
### 题一
不是响应式的。

但是可以使用以下方法向嵌套对象添加响应式属性：
1. `Vue.set(obj, property, value)`
2. `this.$set(this.obj, property, valu)`

内部原理：

Vue 在初始化实例的时候会把data对象里的所有的 key 转化成 getter 和 setter，所以只有在初始化时存在的 key 才会被检查到。所以 vue 是无法侦察到 key 的增加和删除的。

### 题二
Diff 算法执行过程
1. 在首次渲染视图时，patch 会新增节点，把 vnode 渲染成真实 dom。
2. 当数据发生变化时，patch 会对 vnode 和 oldVnode 进行差异比较：
- 当 vnode 和 oldVnode 不是同一节点时，patch 会使用 vnode 创建新节点，并删除 oldVnode， 完成节点替换。
- 当 vnode 和 oldVnode 是同一节点时，进一步对 vnode 里的 newChildren 和 oldVnode 里的 oldChildren 进行比较，其中会使用到四种遍历方法：

a) newStartVnode / oldStartVnode: 新开始节点和旧开始节点依次比较

b) newEndVnode / oldEndVnode: 新结束节点和旧结束节点倒序比较

c) newStartVnode / oldEndVnode: 新开始节点和旧结束节点逆向比较

d) newEndVnode / oldStartVnode: 新结束节点和旧开始节点逆向比较

- 通过对新旧 vnode 的子节点进行比较，对子节点进行增加，删除或者移动。


## 编程题
### 题一
#### 模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
```
let _vue = null

export default class VueRouter {

    constructor(options) {
        this.options = options
        this.routeMap = {}
        this.data = _vue.observable({
            current: '/'
        })
        this.init();
    }

    static install(Vue) {
        if (VueRouter.install.installed) {
            return;
        }
        VueRouter.install.installed = true
        _vue = Vue
        _vue.mixin({
            beforeCreate () {
                if (this.$options.router) {
                    _vue.prototype.$router = this.$options.router
                }
            }
        })
    }

    init() {
        this.createRouteMap()
        this.initComponent(_vue)
        window.addEventListener('load', this.hashChangeHandler.bind(this))
        window.addEventListener('hashchange', this.hashChangeHandler.bind(this))
    }

    createRouteMap() {
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        })
    }

    hashChangeHandler() {
        this.data.current = `/${window.location.hash.slice(1)}`
    }

    initComponent(Vue) {
        const that = this
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h){
                return h('a', {
                    attrs:{
                        href: `#${this.to}`
                    },
                    on: {
                        click: this.clickHandler
                    }
                }, [this.$slots.default])
            },
            methods: {
                clickHandler(e){
                    e.preventDefault()
                    this.$router.data.current = this.to
                    window.location.hash = `#${this.to.slice(1)}`
                }
            }
        }),

        Vue.component('router-view', {
            render(h) {
                const component = that.routeMap[that.data.current]
                return h(component)
            }
        })
    }
}
```

### 题二
#### 在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
在`class Compiler`中增加以下代码：
```
  // 处理 v-html 指令
  htmlUpdater(node, value, key){
    node.innerHTML = value
    new Watcher(this.vm, key, (newValue) => {
      node.innerHTML = newValue
    })
  }
``` 
修改 `update` 方法为：
```
  update (node, key, attrName) {
    if(attrName.startsWith('on')){
        // 截取时间名称
      const event = attrName.slice(3)
      this.addEventHandler(node, event, key)
      return
    }
    let updateFn = this[attrName + 'Updater']
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }
```
增加`addEventHandler`方法:
```
  addEventHandler(node, event, Fn){
      // 用正则判断是否为合法函数名，是的话从vue实例中定义的方法中找到并执行
    if(/^[a-zA-Z\$_][a-zA-Z\d_]*$/.test(Fn)){
      node.addEventListener(event, e=>this.vm[Fn](e))
    } else {
        //否则直接执行脚本语句
      node.addEventListener(event, function () {
        eval(Fn)
      })
    }
  }
```


### 题三
#### 参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果。