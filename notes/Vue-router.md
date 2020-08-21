## Vue-Router
- Vue.use()传入函数或者对象，如果传入函数，则直接执行函数，若传入对象，则调用对象的install方法

### Hash 和 History
- replace 方法不记录历史
- push 方法记录历史
- go 方法跳转历史
- Hash 和 History 模式区别
都是客户端路由的实现方式，根据不同的地址渲染不同的内容，不会向服务器发送请求，
1. Hash 模式
#号后面内容作为路由地址，通过？携带参数。基于锚点，当锚点路由地址发生变化，触发onhashchange 事件
2. Hisroty 模式
需要要服务端配置支持
3. 基于html5 中的 History API:
history.pushState()
history.replaceState()

history.push 会向服务器发送请求
history.pushState 不会向服务器发送请求，只支持IE 10以后的版本

#### 服务器端配置：
应该配置除了静态资源外都应返回单页应用的index.html

#### 原理
- 通过history.pushState() 方法改变地址栏
- 监听 popstate 事件
- 根据当前路由地址找到对应组件重新渲染

### 简易VueRouter 的 hash 模式的实现。（编程作业第一题）
```
let _vue = null

export default class VueRouter {

    constructor(options) {
        this.options = options
        this.routeMap = {}
        // 把 data 设置为响应式
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
        // 混入
        _vue.mixin({
            beforeCreate () {
                if (this.$options.router) {
                    _vue.prototype.$router = this.$options.router
                }
            }
        })
    }

    init() {
        // 初始化创建路由映射关系，创建组件和监听 hash 变化
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
        // 提取#后面地址作为路由地址
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