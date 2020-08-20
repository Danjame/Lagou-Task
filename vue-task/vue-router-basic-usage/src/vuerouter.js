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