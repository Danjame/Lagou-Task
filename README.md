# fed-e-task-03-01

## 简答题
### 题一
不是响应式的

但是可以使用以下方法向嵌套对象添加响应式属性：
1. `Vue.set(obj, property, value)`
2. `this.$set(this.obj, property, valu)`

内部原理
Vue 在初始化实例的时候会把data对象里的所有的 key 转化成 getter 和 setter，所以只有在初始化时存在的 key 才会被检查到。所以 vue 是无法侦察到 key 的增加和删除的。