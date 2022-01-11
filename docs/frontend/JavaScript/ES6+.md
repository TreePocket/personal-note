## ES6

### let 和 const

- const声明常量，当值被修改时会报错

-  const比较符合函数式编程

- 本质区别 编译器内部处理机制不同 const效率更高一些

### 解构

#### 数组解构

```
const s = [1,2,3];
const [first,second,third] = s;
```

#### 对象解构

```javascript
function test(){
  return {
    a:"hello",
    b:2
  }
}
const result = test();
const {a,b} = result;
console.log(a);//"hello"
```

#### 字符串模板

```javascript
const s = "hello";
const e = "world";
const c = test `foor ${s} ${e} bar`;
function test(strs,...values){
	console.log(strs);//["foor"," ","bar"]
	console.log(vlaues);//["hello","world"]
}
```

### 赋值

```javascript
    //Array.from()
    const s = "123"
    const resutl = Array.from(s)
    console.log(result);//['1','2','3']
    
    //对象赋值
    const test = ['6','7','8',...s]
    console.log(test);//['6','7','8','1','2','3']
    const k1 = "arr"
    const testObj = {
        [k1+1]:1,
        s,
        q(){
            console.log('hello world');
        }
    }
    testObj.q() //hello world
    console.log(testObj.s) //"123"
    console.log(testObj.arr1) //1
```

### 原型链有关

```javascript
const eat = {
    getEat(){
        return 'food'
    }
}
const drink = {
    getDrink(){
        return 'milk'
    }
}
let sunday = Object.create(eat);
//console.log(sunday.getEat())
```

### ES7

在ES6基础上新增了两项功能，一个是数组的includes方法，另一个是Math.pow的简写语法

```
//ES7
//includes
const arr = [12,2,3];
console.log(arr.indexOf(4)>=0) //false
console.log(arr.includes(4)) //false

// **
console.log(Math.pow(2,3)) 
console.log(2 ** 3);
```



### ES8

在异步操作、Object、String能力上做了进一步增强，让代码编写更加效率

#### async/await

```javascript
//ES8
// async/awiat
//next => Promise 

//操作异步代码
//1.嵌套回调
async function (){
	 await Promise.resolve();
	 console.log(1);
}

async function add(num){
	const a = 1;
	return num + a;
}
add(2).then(res=>{
	console.log(res);
})

//await 语法
function promiseFn(){
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve('result');
		},1500)
	})
}
async function fn(){
	let res = await promiseFn();
  console.log('异步代码执行完毕')
}

//错误处理
function promiseFn(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      reject("错误信息");
    },1500);
  })
}
async function fn(){
  try {
    await promiseFn();
    console.log("我在错误下边不会执行");
	}catch (err) {
    console.log(err);
  }
}
fn();
//或者可以简写
async function fn(){
  await promiseFn();
  console.log('我在错误下边不会执行')；
}
fn().catch(err=>{
  console.log(err);
})

//要想捕获错误后继续执行后面代码
async function fn(){
  await promiseFn().catch(err=>{
    console.log(err)
  });
  console.log('我在错误下边会执行')；
}
fn();

//多个await异步命令
function promiseFn(){
  return new Promise(resolve => {
    setTimeout(()=>{
      resolve("result");
    },1000);
  })
}
function promiseFn1(){
  return new Promise(resolve => {
    setTimeout(()=>{
      resolve("result");
    },2000)
  })
}
async function fn1(){
  console.time("fn1");
  let res1 = await promiseFn();
  let res2 = await promiseFn1();
  console.timeEnd("fn1");//约3秒 时间是串行的
}
async function fn2(){
  console.time("fn2");
  let [res1,res2] = await Promise.all([promiseFn(),promiseFn1()]);
  console.timeEnd("fn2");//约2秒 时间是并行的
}

//2.Promie
//3.Generators



//Object.getOwnPropertyDescriptions();
const obj = {
  name:'测试',
  get fn(){
    return "fn";
  }
}
console.log(Object.getOwnPropertyDescriptors(obj));//

```

#### Object.values 和 Object.entries

```javascript
//Object.values()
const obj = {"name":"测试",age:4}
//遍历obj  ES8之前
console.log(Object.keys(obj).map(key=>obj[key]));//['测试',4]
//ES8 
console.log(Object.values(obj))

//Object.entries()  vs for...in(会枚举原型链中的属性)
const obj = {"name":"测试",age:4}
console.log(Object.entries(obj))//[["name","测试"],["age":4]]
console.log(Object.entries('ceshi'));//[['0','c'],['1','e'],....]

//遍历对象的键值
for(const [key,value] of Object.entries(obj)){
  console.log(`${key}` - `${value}`);
}
Object.entries(obj).forEach([key,value]=>{
  console.log(`${key}` - `${value}`);
})
```

#### String Padding

```javascript
//String Padding
//1.String.prototype.padStart(targetLength,[padString]); 
	// targetLength  目标长度，添加后字符串的长度
console.log('123'.padStart(4,'30'));//3123
console.log('123'.padStart(10,'30'));//3030303123
//2.String.prototype.padEnd
```

#### SharedArrayBuffer

```javascript
//SharedArrayBuffer 与 Atomics

//给js带来了多线程的功能，高级特性 JS引擎核心改进

//共享内存主要思想: 把多线程引入js

//新的全局对象 SharedArrayBuffer

//多线程 竞争 Atomics

new SharedArrayBuffer(length); //缓冲区大小,字节byte为单位

web worker

//main.js
//创建一个worker进程
const worker = new Worker('./worker.js');
//postMessage
worker.postMessage('hello i am main');
worker.onmessage = function(e){
  console.log(e.data);
}

//worker.js
onmessage = function(e){
  console.log(e.data);
  postMessage("hello i am worker");
}

//使用postMessage 数据量大 通讯效率就低

//使用 SharedArrayBuffer
// main.js
//创建一个worker进程
const worker = new Worker('./worker.js');
//新建1kb内存
const sharedBuffer = new SharedArrayBuffer(1024);
//建视图
const intArrBuffer = new Int32Array(SharedArrayBuffer);
for(let i=0;i<intArrBuffer.length;i++){
  intArrBuffer[i] = i;
}
console.log(intArrBuffer);
//postMessage 发送的共享内存地址
worker.postMessage(sharedBuffer);

worker.onmessage = function(e){
  //console.log(e.data);
  console.log('更改后的数据' + intArrBuffer[20]); // 更改后的数据88
}

//worker.js
onmessage = function(e) {
  let arrBuffer = e.data;
  console.log(arrBuffer[20]); //20
  arrBuffer[20] = 88;
}


//原子操作
//main.js
//创建一个worker进程
const worker = new Worker('./worker.js');
//新建1kb内存
const sharedBuffer = new SharedArrayBuffer(1024);
//建视图
const intArrBuffer = new Int32Array(sharedBuffer);

for(let i=0;i < intArrBuffer.length;i++){
  intArrBuffer[i] = i;
}
//console.log(sharedBuffer);
//postMessage 发送的共享内存地址

worker.postMessage(intArrBuffer);
worker.onmessage = function(e){
  //console.log(e.data);
  console.log('更改后的数据',Atomics.load(arrBuffer,20));
};

//worker.js
onmessage = function(e) {
  let arrBuffer = e.data;
  console.log(Atomics.load(arrBuffer,20));
  Atomics.store(arrBuffer,20,99);
  postMessage('hello i am worker');
}
```



### ES9

主要解决了遍历中的异步、异步中的归一操作等问题、也提供了对象的深拷贝、筛选功能并且提升了正则的处理能力

#### 异步迭代器

```javascript
//新增异步迭代器
//Asyncchronous Iterator,异步执行语句 for...await...of  ,Async generator
//特殊对象
//next() => {value,done} done:布尔类型

//创建一个迭代器
const createIterator = (items) => {
    const keys = Object.keys(items);
    const len = keys.length;
    let pointer = 0;
    return {
        next() {
            const done = pointer >= len;
            const value = !done ? items[keys[pointer++]] : undefined;
            return {
                value,
                done
            }
        }
    }
}

const ite1 = createIterator([1, 2, 3]);
// console.log(ite1.next());
// console.log(ite1.next());
// console.log(ite1.next());
// console.log(ite1.next());

//Symbol.iterator for...of 
//数组原生具有iterator接口
// const arr = [1, 2, 3];
// console.log(typeof arr[Symbol.iterator])
// for (const val of arr) {
//     console.log(val);
// }

//对象默认没有迭代器
// const obj = { name: 'huanhuan', age: 18 }
// console.log(typeof obj[Symbol.iterator]) //undefined

// const obj = { name: 'huanhuan', age: 18 };
// obj[Symbol.iterator] = function () {
//     const me = this;
//     const keys = Object.keys(me);
//     const len = keys.length;
//     let pointer = 0;
//     return {
//         next() {
//             const done = pointer >= len;
//             const value = !done ? me[keys[pointer++]] : undefined;
//             return {
//                 value,
//                 done
//             }
//         }
//     }
// }
// for(const val of obj){
//     console.log(val)
// }


// 什么是生成器
// Generator 特殊函数 yield表达式 *
//执行函数时，并不会执行函数体
// function* fn() {
//     console.log('正常函数我会执行');
//     yield (1);
//     yield (2);
//     yield (3);
//     console.log('执行完了');
// }
// const iteratorFn = fn();//只是创建了一个iterator
// console.log(iteratorFn.next());
// console.log(iteratorFn.next());
// console.log(iteratorFn.next());
// console.log(iteratorFn.next());


//异步迭代器
//区别
//同步:next() => {value:'',done:false}
//异步:next() => promise 

const createAsyncIterator = items => {
    const keys = Object.keys(items);
    const len = keys.length;
    let pointer = 0;
    return {
        next() {
            const done = pointer >= len;
            const value = !done ? items[keys[pointer++]] : undefined;
            return Promise.resolve({
                value,
                done
            })
        }
    }
}

const asyncI = createAsyncIterator([1, 2, 3]);
// asyncI.next().then(res=>{
//     console.log(res);
// })
// asyncI.next().then(res=>{
//     console.log(res);
// })
// asyncI.next().then(res=>{
//     console.log(res);
// })
// asyncI.next().then(res=>{
//     console.log(res);
// })

//for...await...of
const asyncItems = {
    name: 'huanhuan',
    age: 5,
    [Symbol.asyncIterator]() {
        const me = this;
        const keys = Object.keys(me);
        const len = keys.length;
        let pointer = 0;
        return {
            next() {
                const done = pointer >= len;
                const value = !done ? me[keys[pointer++]] : undefined;
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve({value,done});
                    }, 1000);
                })
            }
        }
    }
}

async function fn() {
    for await (const val of asyncItems) {
        console.log(val)
    }
}
fn();
```

#### 异步生成器

```javascript
async function* fn(){
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}
const asyncI = fn();
async function fn1(){
  for await (const val of asyncI){
    console.log(val);
  }
}
fn1();
```

#### Promise.finally

```javascript
function fn(){
  return new Promise((resolve,reject) => {
    //resolve('value');
    reject('error');
  }).catch(err=>{
    console.log(err);
  }).finally(()=>{
    console.log('我都会执行');
  })
}
```



#### Rest/Spread

```javascript
function fn(a,b,c){
	console.log(a,b,c);
}
fn(1,2,3,4,5);//1 2 3

function fn(a,b,...c){
  console.log(a,b,c);
}
fn(1,2,3,4,5);//1 2 [3,4,5]

const obj = {
  name:'wpf',
  age:8,
  info:{
    phone: 110
  }
}
const { name, ...infos } = obj;
console.log(name,infos);//wpf	{age:8,info:{phone:110}}

function fn({name,...infos}){
  console.log(infos);
}
fn(obj);//{age:8,info:{phone:110}}
const obj2 = { ...obj,address:'hangzhou' };
console.log(obj2);//{name:'wpf',age:8,info:{phone:110},address:'hangzhou'}

//对象浅拷贝
const objClone = { ...obj };
objClone.name = 'xiaofeifei';
console.log(objClone.name);//xiaofeifei
console.log(obj.name);//wpf
objClone.info.phone = 119;
console.log(objClone.info.phone);//119
console.log(obj.info.phone);//119
```

#### 正则表达式

```javascript
//需求: YYYY-MM-DD 年月日解析到数组中
const dateStr = "2030-08-01";
const reg = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
//改善之前
const res = reg.exec(dateStr);
console.log(res); //["2030-08-01","2030","08","01"]
//ES9 ?<name>
const reg1 = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<date>[0-9]{2})/;
const res1 = reg1.exec(dateStr);
console.log(res1.groups.year,res1.groups.month,res1.groups.date);

//replace 2030-08-01 => 08-01-2030
const newDate = dateStr.replace(reg1,'$<month>-$<date>-$<year>');
console.log(newDate);


//反向断言
//先行断言
//获取货币符号
const str = '$123';
//先行断言 (?=pattern)
const reg = /\D(?=\d+)/;
const result = reg.exec(str);
console.log(result);//$

//后行断言 反向断言 (?<=pattern)
const reg1 = /(?<=\D)\d+/;
console.log(reg1.exec(str));//123

//dotAll方式
const str = 'wu\npengfei';
console.log(/wu.pengfei/.test(str));//false
console.log(/wu.pengfei/s.test(str));//true


//汉字匹配
const oldReg = /[\u4e00-\u9fa5]/;//繁琐不好记
const str = '吴鹏飞'；
const newReg = /\p{Script=Han}/u;
console.log(newReg.test(str));//true
```





### ES10

ES10没有大幅的改动，JSON问题修复，数组、字符串、对象、函数等能力进一步加强，同时新增的BigInt数据类型

#### flat & flatMap

```javascript
//flat() flatMap()
const arr = [1, 2, 3, [4, 5]];
const arr1 = [1, 2, 3, [4, 5, [6, 7]]];
console.log(arr.flat());//[1,2,3,4,5]
console.log(arr1.flat());//[1,2,3,4,5,[6,7]]
//指定遍历深度
console.log(arr1.flat(2));//[1,2,3,4,5,6,7]

//指定任意深度
console.log(arr1.flat(Infinity));

//取出数组的空项
const arr2 = [1, 2, , , , 3];
console.log(arr2.flat());//[1,2,3]

const arr3 = [1, 2, 3, 4];
console.log(arr3.map(x => [x * 2]));//[[2],[4],[6],[8]]
console.log(arr3.flatMap(x => [x * 2])); //[2,4,6,8]
```

#### fromEntries

```javascript
// Object.fromEntries(); => 对象自身可枚举属性的键值对数组  for...in...会遍历原型链上的属性
const map = new Map([['name', 'wpf'], ['address', 'hangzhou']]);
console.log(Object.fromEntries(map));//{name: 'wpf', address: 'hangzhou'}
//Object.entries
console.log(Object.entries({ name: '123', age: 12 }));//[['name','123'],['age',12]]
```

#### matchAll

```javascript
//String.prototype.matchAll 返回包含所有匹配正则表达式及分组捕获迭代器
const str = 'wpf niu niu le';
const reg = /niu*/g;
// 之前
while ((matches = reg.exec(str)) !== null) {
    console.log(`${matches[0]}-${reg.lastIndex}`);
}
//现在
let matches2 = str.matchAll(reg);
console.log(matches2);
// for(const res of matches2){
//     console.log(res);
// }
console.log(matches2.next());
console.log(matches2.next());
console.log(matches2.next());

const reg2 = /w(u)(peng(\d?))/g;
const str2 = 'wupengfei666wupengffffei';
// console.log(str2.match(reg2));
const arr4 = [...str2.matchAll(reg2)];
console.log(arr4);
```

#### trimStart & trimEnd

```javascript
//trimStart() trimEnd() 去除字符串首尾空格
```

#### Symbol.prototype.description

```javascript
//Symbol.prototype.description
const sym = Symbol('描述');
console.log(String(sym));//Symbol(描述)
console.log(sym.description);//描述

// Catch 参数可以省略
//之前
try { } catch (e) { console.log(e); }
//现在
try { } catch { }

// 行分隔符和段分隔符
// JSON.parse  JSON是ECMAScript一个子集
// JSON -> 可以包含行分隔符和段分隔符 草案阶段
const json = '{"name":"wpf\nlihai"}';
console.log(json);
// JSON.parse(json);//报错
```

#### Array.prototype.sort()

```javascript
// Array.prototype.sort();
//小于10 插入排序  快速排序 不稳定的排序算法
//新的v8 TimSort()  O(nlogn) 稳定
const tempArr = [{
    name: 'wpf', age: 18
}, {
    name: 'www', age: 4,
}, {
    name: 'w', age: 4
}];
tempArr.sort((a, b) => a.age - b.age);
console.log(tempArr);
//非稳定
// [
//     { name: 'w', age: 4 },
//     { name: 'www', age: 4 },
//     { name: 'wpf', age: 18 }
// ]
//稳定
// [
//     { name: 'www', age: 4 },
//     { name: 'w', age: 4 },
//     { name: 'wpf', age: 18 }
// ]

// 新的Function.toString()
// Object.prototype.toString();
// 标准化，返回精确字符
function /**注释 */ foo /**注释 */(){
    console.log(foo.toString())
}
foo();
//之前
//function foo() {}
//现在
//function /**注释 */ foo /**注释 */(){  console.log(foo.toString())}
```

#### BigInt

```javascript
//BigInt 任意精度整数 第七种基本数据类型
let num = 1n;
let num2 = 10n;
const bigIntNum = BigInt(12);
console.log('类型',typeof num);
console.log('类型比较',num === 1); //false
console.log('类型比较',num == 1); //true
console.log('运算',num - num2);
console.log(bigIntNum);
```

#### globalThis

```javascript
// 标准化globalThis 对象 在任何平台访问全局属性
const getGlobal = function(){
    if(typeof self != 'undefined'){return self}
    if(typeof window != 'undefined'){return window}
    if(typeof global != 'undefined'){return global}
    throw new Error();
}
console.log(globalThis);
```

