# **ES6 新特性**

## 目的
- 解决原有语法的不足
- 对原有语法进行增强
- 全新的对象、全新的方法、全新的功能
- 全新的数据类型和数据结构

### 变量`let`、常量`const`和块级作用域
- 常量`const`为只读，一旦声明不允许被修改
- 最佳实践：不用`var`，主用`const`，配合`let`

### 数组和对象的解构赋值

### 模板字符串 `${}`

### 字符串扩展方法
- `includes()`
- `startsWith()`
- `endsWith()`

三个方法均返回布尔值

### 参数默认值
- 带默认值的参数应置于形参的最后一位

### 剩余操作符和展开操作符
- 剩余操作符只能出现在形参的最后一位
- 剩余操作符可以替代函数的arguments对象

### 箭头函数
- 无this，不改变this的指向，继承于上下文

### 对象字面量增强
- 属性和值的省略
`name: 'name'`
可简写为
`name`
- 方法简写
`method: function (){}`
可以简写为
`method(){}`
- 计算属性名，如
`[Math.random()]: 'value'`

### 对象扩展方法
- `Object.assign(target, source)` 将多个源对象的属性复制到一个目标对象中
- `Object.is()` 判断两个值是否相等

### Proxy 代理对象
```
const proxy = new Proxy(obj,{
    get(target, property){
        do some things...
    },
    set(target, property, value){
        do some things...
    }
})
```
- defineProperty只能监视属性的读写，通过重写数组的操作方法来劫持方法的调用过程
- Proxy可以监视更多的对象操作，更好的支持数组对象监视
- Proxy以非侵入的方式监视了对象的读写

### Reflect 
统一的对象操作API， 统一提供了一套用于操作对象的API:
- `Reflect.has(obj, property)`
- `Reflect.deleteProperty(obj, property)`
- `Reflect.ownKeys(obj)`

### Promise 对象
更优的一步编程解决方案

### class 类
#### 实例方法:
- 通过实例化的对象调用
#### 静态方法:
- 静态方法通过类型本身去调用
- static 静态方法里的this指向当前的类型，而不是某个实例对象
#### 类的继承 extends

### Set数据结构
与数组类似，但是每个值都是唯一的

### Map数据结构
与对象相似，本质上是键值对集合
- 如果对象的键是非字符串类型，那么使用`Object.keys()`获取的键都是经过toString的处理返回值
- 而Map里的键可以是任意类型的数据，并且可以通过`Object.keys()`正常获取

### Symbol 数据类型
- `Symbol('descriptor')`
- 通过Symbol 创建出来的值是独一无二的，不会重复，避免重名产生冲突
- 通过`Symbol.for('descriptor')`来达到复用的目的

### for...of 循环
`for ( const item of arr){}`
- 可以遍历实现了Iterable可迭代接口的数据结构
- 可以使用`break`随时终止遍历

### Generator
```
function * generator (){
    do something...
    yield 100
    do something...
    yield 200
}

const gen = generator()
gen.next();
gen.next();
```
yield 的值会作为next方法的结果返回

### ES 2016
- 数组的`includes()`方法
- 指数运算符 
如`Math.pow(2, 10)`结果为2的10次方

### ES 2017
- `Object.values(obj)` 以数组方式返回属性值
- `Object.entries(obj)` 以数组方式返回键值对
- `Object.getOwnPropertyDescriptors()` 获取对象的特性信息
- `String.prototype.padStart()`/ `String.prototype.padEnd(length, pad)` 使用字符串填充直到达到指定的长度
- 函数参数结尾可添加逗号
- Async / Await 语法糖

# **TypeScript**

### 类型安全
- 强类型：语言层面直接限制了实参和形参类型必须相同，不允许任意的数据隐式类型转换
- 弱类型：语言层面不会限制实参的类型，允许任意的数据隐式类型转换

### 类型检查
- 静态类型：声明阶段明确变量类型，变量声明过后，类型不允许再被修改
- 动态类型：运行阶段明确变量类型，类型可以随时改变

### 开发常见问题
#### js运行阶段才能发现问题

#### ts在语法层面就可以发现问题
- 更早暴露异常
- 更智能，更准确
- 重构更牢靠
- 减少不必要的类型判断

### TypeScript的原始数据类型
- 在严格模式下，字符串，数字和布尔值类型的变量不可以为null或者undefined
- 在严格模式下，void只能是undefined, 非严格模式下，可以为null或者undefined