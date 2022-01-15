

## EventLoop

### 前言

#### **js是单线程**

javaScript的一大特点是单线程，作为浏览器脚本语言，javaScript的主要用途是与用户互动，以及操作DOM，这些用途决定了js是单线程的，否则会带来很复杂的同步问题。

因此当遇到耗时比较大的任务时，使用单线程就会造成页面的卡死，eventloop机制就是来解决这个问题的。



### 基础概念

#### **任务队列**

单线程就意味着所有任务都需要排队执行，执行任务可以被分为两种，一种是同步任务，另一种是异步任务。

同步任务指的是在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。

异步任务指的是，不进入主线程，进入任务队列（task queue）的任务，只有任务队列通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。



#### 异步队列

##### EventQueue

异步队列，又叫回调函数队列（CallBack Queue）,当EventTable中的事件被触发，事件对应的回调函数就会被push进这个EventQueue,然后等待被执行。

##### **EventTable**

eventTable是用来存储js中的异步事件（request,setTimeout,IO等）及其对应的回调函数的列表。

##### 宏任务和微任务

异步队列又分为宏任务队列和微任务队列。

| 宏任务                | 微任务           |
| --------------------- | ---------------- |
| script                | Promise(async)   |
| setTimeout            | MutationObserver |
| setInterval           |                  |
| requestAnimationFrame |                  |

先执行宏任务，然后判断宏任务中是否有微任务，有微任务则执行微任务，只有当前宏任务的微任务全部执行完毕之后，才会执行下一个宏任务。

### 例题

##### 1.宏任务和微任务的执行顺序

```js
//1.宏任务和微任务的执行顺序
setTimeout(()=>{
  console.log('timeout');
},0);
const promise = new Promise(resolve => {
  console.log('promise init');
  resolve(1);
  console.log('promise end');
});
promise.then(res => {
	console.log('promise result:',res);
})

// promise init 
// promise end 
// promise result:1 
// timeout
```

##### 2.宏任务微任务交错执行

```js
//2.宏任务微任务交错执行
setTimeout(()=>{
  console.log('timeout1');
  Promise.resolve().then(()=>{
    console.log('promise1');
  })
},0);

Promise.resolve().then(()=>{
  console.log('promise2');
  setTimeout(()=>{
    console.log('timeout2');
  },0);
});

//promise2
//timeout1
//promise1
//timeout2
```

##### 3.async await 拆解

```js
//3.async await 拆解
//如果 await 后是一个简单类型，则进行 Promise 包裹

async function fn(){
  return await 12345;
  //实际上等价于
  //return Promise.resolve(1234)
}
fn().then(res=>console.log(res));//1234

//如果 await 后是一个 thenable对象，则不用进行 Promise 包裹(chrome的优化)
async function fn(){
  return ({
    then(resolve){
      resolve(1234);
    }
  })
}
fn().then(res => console.log(res));//1234
```

##### 4.使用async await 顺序判断 (将async await 转换成熟悉的Promise)

```js
//4.使用async await 顺序判断 (将async await 转换成熟悉的Promise)
async function async1(){
  console.log('async1 start');
  /* 可转换
  new Promise(resolve => {
    console.log('async2')
    resolve()
  }).then(res => console.log('async1 end'))
  */
  await async2();
  console.log('async1 end');
}
async function async2(){
  console.log('async2');
}
//入口
async1();
console.log('script');

//async1 start
//async2
//script
//async1 end
```

##### 5.如果promise没有resolve 或 reject,则promise之后的代码不会被得到执行

```js
//5.如果promise没有resolve 或 reject,则promise之后的代码不会被得到执行
async function async1(){
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1');
  })
  console.log('async1 success');
  return 'async1 end';
}
console.log('script start');
async1().then(res => console.log(res))
console.log('script end');

//script start
//async1 start
//promise1
//script end
```

##### 6.真实面试题

```js
//真实面试题
async function async1(){
  console.log('async1 start');
  //await async2();
  //console.log('async1 end');
  //上面两行代码等价于下面的new Promise
  new Promise(resolve => {
    console.log('async2')
    resolve()
  }).then(res => console.log('async1 end'))
}
async function async2(){
  console.log('async2');
}
console.log('script start');
setTimeout(function(){
  console.log('setTimeout');
},0);
async1();
new Promise(function(resolve){
  console.log('promise1');
  resolve();
}).then(function(){
  console.log('promise2');
}).then(function(){
  console.log('promise3');
}).then(function(){
  console.log('promise4');
});
console.log('script end');

//script start
//async1 start
//async2
//promise1
//script end
//async1 end
//promise2
//promise3
//promise4
//setTimeout
```

```js
async function async1(){
  console.log('async1 start');
  return new Promise(resolve => {
    resolve(async2());
  }).then(()=>{
    console.log('async1 end');
  })
}
function async2(){
  console.log('async2');
}
//如果将async2前加个async 结果会不同 
//async function async2(){
//  console.log('async2')
//}

setTimeout(function(){
  console.log('setTimeout');
},0);
async1();
new Promise(function(resolve){
  console.log('promise1');
  resolve();
}).then(function(){
  console.log('promise2');
}).then(function(){
  console.log('promise3');
}).then(function(){
  console.log('promise4');
});

//async1 start
//async2
//promise1
//async1 end
//promise2
//promise3
//promise4
//setTimeout

```

