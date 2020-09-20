# fed-e-task-01-01
lagou task

### 题一
```
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    }
}

a[6](); // 10
```

对var变量只有全局作用域和函数作用域，这里的var变量i由于是在全局上声明的所以是全局变量， 所以每一个a[i]函数里面打印出来的都是i的最终的赋值，即为i=10。

### 题二

报错，提示变量无法访问未初始化的变量tmp

虽然一开始初始化了全局变量var tmp，但是在花括号里有同名的let变量，并且形成了块级作用域，而在这个块级作用域里let tmp在初始化之前就被打印出来，所以报错。

### 题三
```
 var arr = [12, 34, 32, 89 ,4]

 console.log(Math.min(...arr)); // 4
 ```

 ### 题四
 - 作用域：对于var只有全局作用域和函数作用域，而对于let和const来说花括号就形成了块级作用域
 - 变量提升：var 会在其作用域下发生变量提升，而let和const则不会
 - 声明和赋值：var 和 let都可以先声明，在赋值，但是const必须同时声明和赋值
 - 变量和常量：var 和 let是变量，也就是可以重新赋值，而const是常量，一旦赋值无法改变，如果是引用类型的值，则引用的数据可变的，但是指针不变。

 ### 题五
// 20

setTimeout 的回调函数是一个箭头函数，箭头函数没有自己的this，它的this都是继承与上一级，所以这里this指当前对象，所以打印了对象的属性a

### 题六
由于Symbol的值总是独一无二，因为可以防止由于变量或者对象属性重名造成的冲突。

### 题七

#### 深拷贝和浅拷贝是针对引用数据类型而言的：

浅拷贝就是复制引用数据类型的指针，而不复制堆中的数据，新旧对象共享同一块内存

深拷贝就是复制引用数据类型本身，在堆内存里开辟新的空间存放复制的数据，新旧对象各有不同的指针指向不同的堆内存中的数据

实现浅拷贝的方法：
`Object.assing()`
`Array.prototype.concat()`
`Array.prototype.slice()`

实现深拷贝的方法：
`JSON.parse(JSON.stringify())`
使用函数库`lodash`的`_.cloneDeep()`

### 题八

JS异步编程，由于JS是单线程模式的语言, 任务需要排队依次执行。在执行大量任务的时候会造成阻塞。而其异步模式的API不需要排队等待，而是被分配到另一个线程同步执行，帮助JS同时执行大量的任务。

异步编程就是设置了两个线程，一个是主线程，一个是消息线程。而EventLoop就是这个消息线程，负责主线程和其他进程的通信工作。

1. 当JS在全局依次执行代码的时候，每个同步任务会依次放入调用栈等待排队并且依次执行，期间，遇到异步语句，会把异步任务依次放入宏队列和微队列等待执行。
2. 当全局的同步任务在调用栈中被执行完毕后，微任务会被依次放入调用栈执行。
- 期间如遇到了微任务，则被放入队列的末尾，也会在本次队列中被执行。
- 期间如遇到了宏任务，则被放入宏任务队列，等待宏任务的执行。
3. 当微任务被执行完毕，宏任务被依次放入调用栈执行，直至执行完毕。
- 期间如遇到了微任务，则被依次放入微任务队列，等待被依次执行。
- 期间如遇到了宏任务，则被依次放入宏任务队列，等待下轮的依次执行。
4. 重复2-3步骤。

宏任务：setTimeout, setInterval, requestAnimationFrame, setImmediate 等

微任务：Promise, Object.observe, process.nextTick 等

### 题九
```
const a = new Promise((resolve, reject)=>{
    resolve('hello');
})

const b =  new Promise((resolve, reject)=>{
    resolve('lagou');
})

const c = new Promise((resolve, reject)=>{
    resolve('I ❤️ U');
})

const pro = Promise.all([a, b, c]).then(value=>{
    console.log(value.join(' '))
})
```

### 题十
TypeScript是JavaScript的超集，在JavaScript的原有基础上扩展了更多新特性，总的来说TypeScirpt 包含了 JavaScript，ES6+ 和强大的类型系统。最终会被编译成JavaScript。

### 题十一

#### TypeScirpt优点
总的来说，ts在语法层面就可以发现问题和异常：
- 更早暴露异常
- 更智能，更准确
- 重构更牢靠
- 减少不必要的类型判断

#### TypeScirpt缺点
- 全新的概念较多，对于初学者的学习成本比较大
- 对于小型项目不灵活，更大的开发成本