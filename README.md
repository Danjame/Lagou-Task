<<<<<<< HEAD
<<<<<<< HEAD
# Lagou-Task


=======
# fed-e-task-01-02
lagou task

## 解答题

### 题一
- 原理：计算对象被引用的次数，当引用次数为0时，则进行垃圾回收。
- 优点：
1. 即时回收垃圾对象
2. 减少程序的暂停时间
- 缺点：
1. 无法回收被循环引用的对象
2. 资源开销大

### 题二
1. 第一阶段和标记清除完全一致，即遍历所有的活动对象，并对其进行标记
2. 整理活动对象的位置，让其位置具有连续性
3. 回收非活动空间

### 题三
新生代储存区有两个等大小的空间分别为from和to空间，分别为使用空间和空闲空间。
1. 垃圾回收会先把from空间进行标记整理。
2. 然后把from空间的活动对象拷贝到to空间。
3. 释放from空间。

### 题四
增量标记算法在回收老生代对象的时候才会执行，其工作原理就是把整一段垃圾回收过程分段执行，缩小程序执行的停顿时间，减少阻塞。


## 代码题1
### 练习一
```
const fp = require('lodash/fp');

const cars = [
    {
        name: "Ferrari FF",
        horsepower: 660,
        dollar_value: 700000,
        in_stock: true
    },
    {
        name: "Spyker C12 Zagato",
        horsepower: 650,
        dollar_value: 648000,
        in_stock: false
    },
    {
        name: "Jaguar XKR-S",
        horsepower: 550,
        dollar_value: 132000,
        in_stock: false
    },
    {
        name: "Audi R8",
        horsepower: 525,
        dollar_value: 114200,
        in_stock: false
    },
    {
        name: "Aston Martin One-77",
        horsepower: 750,
        dollar_value: 1850000,
        in_stock: true
    },
    {
        name: "Pagani Huayra",
        horsepower: 700,
        dollar_value: 1300000,
        in_stock: false
    },
] 

const lastCar = fp.flowRight(fp.prop('in_stock'), fp.last);

console.log(lastCar(cars));
```

### 练习二
```
const lastCar = fp.flowRight(fp.prop('name'), fp.first);

console.log(lastCar(cars));
```

### 练习三
```
let _average = function(xs){
    return fp.reduce(fp.add, 0, xs) / xs.length
}

let averageDollarValue = fp.flowRight(_average, fp.map(car => car.dollar_value))

console.log(averageDollarValue(cars));
```

### 练习四
```
let _underscore = fp.replace(/\W+/g, '_');

const sanitizeNames = fp.map(fp.flowRight(_underscore, fp.toLower));

console.log(sanitizeNames(['Hello World']));
```

## 代码题3
```
class Container{
    static of (value){
        return new Container(value)
    }

    constructor (value){
        this._value = value
    }

    map(fn){
        return Container.of(fn(this._value))
    }
}

class Maybe{
    static of (x){
        return new Maybe(x)
    }

    isNothing(){
        return this._value === null || this._value === undefined
    }

    constructor (x){
        this._value = x
    }

    map(fn){
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
}
```
### 练习一
```
let maybe = Maybe.of([5, 6, 1]);

let ex1 = x => maybe.map(fp.map(fp.add(x)));


console.log(ex1(2));
```
### 练习二
```
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do',]);

let ex2 = x => x.map(fp.first);

console.log(ex2(xs));
```
### 练习三
```
let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])
})

let user = { id: 2, name: "Albert" }

let ex3 = fp.flowRight(x=>x.map(fp.first), safeProp)

console.log(ex3('name', user))
```
### 练习四
```
let ex4 = n => Maybe.of(n).map(parseInt);


console.log(ex4("10"));
```
>>>>>>> fed-e-task-01-02
=======
# fed-e-task-02-01
lagou task

## 简答题
### 题一
1. 解决的问题
- 传统语言或者语法的弊端
- 无法使用模块化 / 组建化
- 重复相同的机械式工作
2. 带来的价值
- 保证代码质量和风格统一
- 后端服务接口的支持
- 整体依赖后端项目
### 题二
脚手架除了为我们创建项目基础结构，还给我们提供了项目规范和约定，如组织结构，开发范式，模块依赖，工具配置，基础代码。脚手架实际上就是cli应用


## 编程题
1. 实现过程：命令行交互获取用户回答的信息 => 创建模版目录和目标目录 => 使用模板引擎渲染模版目录的文件 => 将渲染结果写入到目标路径中
- 小型脚手架工具详见代码
2. 详见代码
3. 详见代码
录屏讲解连接 https://www.dropbox.com/sh/30lq4h7ub4n9fzk/AAAqrpBeYZFH_7LU5IqsiXR8a?dl=0 （文件太大无法push，压缩后又太模糊没法看，百度网盘上传也压缩模糊不得了，只能传到dropbox上了）
>>>>>>> fed-e-task-02-01
