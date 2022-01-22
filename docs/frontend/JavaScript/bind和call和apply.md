### bind

#### 概念和作用

`bind()`方法可以将任意对象设置为任意函数的作用域，可以控制this的值。`bind()` 方法会创建一个新的函数实例，其this值会被绑定到传给`bind()` 的对象。

```js
window.color = 'red';
var o = {
  color: 'blue'
};
function sayColor() {
  console.log(this.color);
}
let objectSayColor = sayColor.bind(o);
objectSayColor();//blue
```

#### 手写代码

```js
Function.prototype.bind = function (context) {
  //对context进行深拷贝,防止bind执行后返回函数未执行期间,context被修改
  const ctx = JSON.parse(JSON.stringify(context)) || window
  ctx.func = this
  const args = Array.from(arguments).slice(1)
  retutrn function(){
    //注意bind方法需要合并两次函数执行的参数
    const Allargs = args.concat(Array.from(arguments))
    return Allargs.length > 0 ? ctx.func(...Allargs) : ctx.func()
  }
}
//测试
obj = { c:2 }
function a(x,y,z) { console.log(this,x,y,z) }
a.bind(obj,1,2)(3) //{c:2} 1 2 3
a.bind2(obj,1,2)(3) //{c:2,func:[function a]} 1 2 3

```



### call和apply

#### 概念和作用

`call()` 和 `apply()`可以控制函数调用上下文即函数体内this值。

`call()` 或 `apply()`可以将任意对象设置为任意函数的作用域。

#### 手写代码

```js
//手写call
Function.prototype.myCall = function(context) {
  let ctx = context || window;
  ctx.fn = this;
  let args = [...arguments].slice(1);
  let result = ctx.fn(...args);
  delete ctx.fn;
  return result;
}
```

```js
//手写apply
Function.prototype.myApply = function(context){
  let ctx = context || window;
  ctx.fn = this;
  let result = arguments[1] ? ctx.fn(... arguments[1]) : ctx.fn();
  delete ctx.fn;
  return result;
}
```
