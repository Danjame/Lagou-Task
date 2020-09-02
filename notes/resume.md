## 响应式处理过程
1. initState()
2. initData(), data属性注入到vue实例上
3. observe()，把data对象转换成响应式对象

observe(value)/src/core/observer/index.js
1. 判断value是否是对象，如果不是对象直接放回
2. 判断value是否有__ob__, 如果有直接返回，如果没有则创建observer对象
3. 返回obsever对象

Obsever /src/core/observer/index.js
1. 给value对象定义不可枚举的 __ob__属性，记录当前的obsever对象
2. 数组的响应式处理,
3. 对象的响应式处理，调用walk方法(遍历对象的属性，对每个属性调用defineReactive)

defineReactive /src/core/observer/index.js
1. 为每个属性创建dep对象
2. 如果当前属性的值是对象，则调用observe
3. 定义getter，收集依赖和返回属性的值
4. 定义setter，保存新值，如果新值是对象，则调用observe方法，发送通知，调用dep.notify

依赖收集
1. 在watcher对象的get方法中调用pushTarget记录Dep.target属性
2. 访问data中的成员的时候收集依赖，defineReactive的getter里收集依赖
3. 把属性对应的watcher对象添加到dep的subs数组中
4. 如果属性是对象，那么给childOb收集依赖，目的是子对象添加和删除成员时发送通知

watcher
dep.notify()调用watcher对象的update()方法
queueWatcher()判断watcher是否被处理，如果没有的则添加到queue队列中，并调用flushSheduleQueue()
flushSheduleQueue() 里面
1. 触发beforeUpdate钩子函数
2. 调用watcher.run()：run() get() getter() updateComponent
3. 清空上一次的依赖
4. 触发actived钩子函数
5. 触发updated钩子函数