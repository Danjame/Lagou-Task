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
#### 对var变量只有全局作用域和函数作用域，这里的var变量i由于是在全局上声明的所以是全局变量， 所以每一个a[i]函数里面打印出来的都是i的最终的赋值，即为i=10。