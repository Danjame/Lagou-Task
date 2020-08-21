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
- 如果 oldChildren 的数组先遍历完(oldStartIdx > oldEndIdx)，说明 newChildren 有剩余，把剩余节点添加到后面
- 如果 newChildren 的数组先遍历完(newStartIdx > newEndIdx)，说明 oldChildren 有剩余，把剩余节点全部删除


## 编程题
### 题一
#### 模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
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
index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./src/style.css">
    <title>Snabdom Task</title>
</head>
<body>
    <div id="app"></div>
    <script src="./src/snabbdomDemo.js"></script>
</body>
</html>
```
snabbdomDemo.js
```
import { init, h } from 'snabbdom'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

const patch = init([
    style,
    eventlisteners
])

let app = document.querySelector('#app')

let data = [
        {rank: 1, name: 'Massachusetts Institute of Technology (MIT)', 
        desc: '“Mind and Hand” is the thought-provoking motto of the Massachusetts Institute of Technology, known also as MIT. This motto enigmatically encapsulates this famous institution’s mission to advance knowledge in science, technology and areas of scholarship that can help to make the world a better place.'},
        {rank: 2, name: 'Stanford University', 
        desc: 'Located 35 miles south of San Francisco and 20 miles north of San Jose, Stanford University is in the heart of Northern California’s dynamic Silicon Valley, home to Yahoo, Google, Hewlett-Packard, and many other cutting-edge tech companies that were founded by and continue to be led by Stanford alumni and faculty. Nicknamed the “billionaire factory”, it is said that if Stanford graduates formed their own country it would boast one of the world’s largest ten economies.'},
        {rank: 3, name: 'The University of Edinburgh', 
        desc: 'Established in 1636, Harvard is the oldest higher education institution in the United States, and is widely regarded in terms of its influence, reputation, and academic pedigree as a leading university in not just the US but also the world.'},
        {rank: 4, name: 'California Institute of Technology (Caltech)', 
        desc: 'The California Institute of Technology (Caltech) is a world-renowned science and engineering research and education institution, located in Pasadena, California, around 11 miles northeast of downtown Los Angeles.'},
        {rank: 5, name: 'University of Oxford', 
        desc: 'The University of Oxford is the oldest university in the English-speaking world, and is actually so ancient that its founding date is unknown – though it is thought that teaching took place there as early as the 11th century.'}
    ]
//页面虚拟dom
function view(){
    return h ('div', [
        h('div.head', 'Top Universities Ranking'),
        h('div.sortWrapper',
        [
            h('div.sortTitle','Sort by'),
            h('button.btn', {on: {click: rankSort}}, 'Rank'),
            h('button.btn', {on: {click: [alphabetSort, 'name']}}, 'Name'),
            h('button.btn', {on: {click: [alphabetSort, 'desc']}}, 'Discription'),
            h('button.btn', {on: {click: addHandler}}, 'Add')
        ]),
        h('div', listView(data))
    ])
}
//列表虚拟dom
function listView(data){
    return h('ul', data.map(item=>{
        return h('li.uni', { style: {
            opacity: '0',
            transition: 'opacity 1s',
            remove: { opacity: '0' },
            delayed: { opacity: '1' }
          }} ,[
            h('div.rank', item.rank),
            h('div.name', item.name),
            h('div.desc', item.desc),
            h('button.delete', {on: {click: [removeHandler, item.rank]}}, 'X')
        ])
    }))
}

let oldVnode = patch(app, view())

//添加
function addHandler(){
    let maxRank = Math.max(...data.map(item=>item.rank))
    data.push({
        rank: ++maxRank,
        name: `new name${maxRank}`,
        desc: `new desc${maxRank}`,
    })

    oldVnode = patch(oldVnode, view())
}

//删除
function removeHandler(rank){
    data.forEach(item=>{
        data = data.filter(item=>{
            return item.rank !== rank
        })
    })
    oldVnode = patch(oldVnode, view())
}

//排名排序
function rankSort (){
    data = data.sort((a, b)=>{
        return a.rank - b.rank
    })
    oldVnode = patch(oldVnode, view())
}
//其他属性字母排序
function alphabetSort(property){
    //提取属性值并排序
    let arr = []
    data.forEach(item=>{
        arr.push(item[property])
    })
    arr.sort()

    //根据属性值的顺序排序data对象
    let newData = [];
    for(let i = 0; i<data.length; i++){
        data.forEach(item=>{
            if(item[property]===arr[i]){
                newData[i]=item;
            }
        })
    }
    data = newData;
    oldVnode = patch(oldVnode, view())
}
```
style.css
```
body{
    margin: 0 auto;
    width: 800px;
}

*{
    margin: 0;
    padding: 0;
    list-style: none;
}

button{
    border: none;
    background-color: transparent;
    outline: none;
}

.head{
    padding: 20px;
    text-align: center;
    font-size: 28px;
}

.btn{
    width: 100px;
}

.sortWrapper{
    display: flex;
    margin: 0 auto;
    width: 100%;
}

.sortTitle{
    width: 200px;
    text-align: center;
}

.uni{
    display: flex;
}

.rank, .name, .desc, .delete{
    padding: 10px;
    flex-shrink: 0;
}

.rank{
    width: 50px;
}

.name{
    width: 100px
}

.desc{
    width:500px;
}


```