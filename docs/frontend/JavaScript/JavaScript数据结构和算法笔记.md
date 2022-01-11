# 学习JavaScript数据结构和算法笔记

## JS基础遗漏部分

#### 相等运算符(==)

使用==时，不同类型的值比较会进行不同的处理，如下表：

| 类型(x)    | 类型(y)    | 结果                |
| ---------- | ---------- | ------------------- |
| null       | undefined  | true                |
| undefined  | null       | true                |
| 数         | 字符串     | x == toNumber(y)    |
| 字符串     | 数         | toNumber(x) == y    |
| 布尔值     | 任何类型   | toNumber(x) == y    |
| 任何类型   | 布尔值     | x == toNumber(y)    |
| 字符串或数 | 对象       | x == toPrimitive(y) |
| 对象       | 字符串或数 | toPrimitive(x) == y |

如果x和y的类型相同，JS会用equal方法比较这两个值或对象，没有列在表格里的其他情况都会返回false

- toNumber方法对不同类型的返回：

| 值类型    | 结果                   |
| --------- | ---------------------- |
| undefined | NaN                    |
| null      | +0                     |
| 布尔值    | true返回1，false返回+0 |
| 数        | 数对应的值             |

- toPrimitive方法对不同类型返回的结果：

  如果对象的valueOf方法的结果是原始值，返回原始值；如果对象的toString方法返回原始值，就返回这个值；其他情况都返回错误。

  ```javascript
  console.log('packt' == true) //false
  //1.首先，布尔值会被toNumber方法转成数,因此得到packt == 0
  //2.其次，用toNumber转换字符串值，因为字符串包含字母，所以被转成NaN,表达式就变成了NaN == 0，结果就是false
  ```

#### 增强的对象属性

ES2015引入了数组解构的概念，可以用来一次初始化多个变量。

```javascript
let [x,y] = ['a','b'];
```

数组解构也可以用来进行值的互换，而不需要创建临时变量。

```javascript
[x,y] = [y,x];
```

属性简写

```javascript
let [x, y] = ['a', 'b'];
let obj = { x, y };
console.log(obj)l//{x:'a',y:'b'}
```

#### 使用类进行面向对象编程

ES2015引入了一种更简明的声明类的方式。

```javascript
class Book { // {2}   
  constructor(title, pages, isbn) {     
    this.title = title;     
    this.pages = pages;     
    this.isbn = isbn;   
  }   
  printIsbn() {     
    console.log(this.isbn);   
  } 
}
```

- 继承

可以使用extends关键字扩展一个类并继承它的行为。在构造函数中，也可以通过super关键字引用父类的构造函数。

```javascript
class ITBook extends Book { // {1}  
  constructor (title, pages, isbn, technology) {     
    super(title, pages, isbn); // {2}     
    this.technology = technology;   
  }    
  printTechnology() {     
    console.log(this.technology);   
  } 
}
```

ES2015也可以为类属性创建存取器函数。要声明get和set函数，只需在我们要暴露和使用的函数名前面加get或set关键字。可以用相同的名字声明类属性，或者在属性名前面加下划线，让这个属性看起来像私有的。

```javascript
class Person {   
  constructor (name) {     
    this._name = name; // {1}  
  }   
  get name() { // {2}     
    return this._name;   
  }   
  set name(value) { // {3}     
    this._name = value;   
  } 
}
```

## 数组

### 添加元素

#### 末尾插入元素

```
使用push方法。numbers.push(11,12,13)
```

#### 在数组开头插入元素

```javascript
Array.prototype.insertFirstPosition = function(value) {   
  for (let i = this.length; i >= 0; i--) {     
    this[i] = this[i - 1];   
  }   
  this[0] = value; 
};
```

使用unshift方法，可以直接把元素插入数组的开头，此方法的逻辑和insertFirstPosition方法的行为是一样的。numbers.unshift(-2,34,5);

## 删除元素

### 数组开头移除元素

​	使用shift()方法。numbers.shift();

### 结尾删除元素

​	使用pop()方法。numbers.pop();

### 在任意位置添加或删除元素

- 删除元素

  可以使用splice方法，通过指定位置/索引，就可以删除相应位置上指定的数量的元素了

  ```javascript
  numbers.splice(5,3)
  ```

- 插入元素

  ```javascript
  numbers.splice(5,0,2,3,4);
  ```

splice方法接收的第一个参数，表示想要删除或插入的元素的索引值，第二个参数是删除元素的个数(所以想插入元素时传入0) 第三个参数往后,就是要添加到数组里的值

## JS的数组方法参考

| 方法        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| concat      | 连接2个或多个数组，并返回结果                                |
| every       | 对数组中的每个元素运行指定函数，如果函数对每个元素都返回true,则返回true |
| filter      | 对数组中的每个元素运行指定函数，返回该函数会返回true的元素组成的数组 |
| forEach     | 对数组中的每个元素运行指定函数，没有返回值                   |
| join        | 将所有的元素连接成一个字符串                                 |
| indexOf     | 返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1   |
| lastIndexOf | 返回在数组中搜索到的与给定参数相等的元素的索引里的最大值     |
| map         | 对数组中的每个元素运行给定函数，返回每次函数调用的结果组成的数组 |
| reverse     | 颠倒数组中元素的顺序                                         |
| slice       | 传入索引值，将数组里对应索引范围内的元素作为新数组返回       |
| some        | 对数组中的每个元素运行指定函数，如果任一元素返回true,则返回true |
| sort        | 按照字母顺序对数组排序，支持传入指定排序方法的函数作为参数   |
| toString    |                                                              |
| valueOf     | 和toString类似，将数组作为字符串返回                         |

还有常用的push pop shift unshift等方法

### 累加器方法：reduce

reduce方法接收一个有如下四个参数的函数:previousValue,currentValue,index,array 

index和array是可选的参数。这个函数会返回一个将被叠加到累加器的值,reduce方法停止执行后会返回这个累加器。例如对数组所有元素求和:

numbers.reduce((previous,current)=> previous + current)

### ES2015 ES2016新增的数组方法

| 方法       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| @@iterator | 返回一个包含数组键值对的迭代器对象，可以通过同步调用得到数组元素的键值对 |
| copyWithin | 复制数组中一系列元素到同一数组指定的起始位置                 |
| entries    | 返回包含数组所有键值对的@@iterator                           |
| includes   | 如果数组中存在某个元素则返回true,否则返回false               |
| find       | 根据回调函数给定的条件从数组中查找元素，如果找到返回该元素   |
| findIndex  | 根据回调函数给定的条件从数组中查找元素，如果找到返回该元素的索引 |
| fill       | 用静态值填充数组                                             |
| from       | 根据已有数组创建一个新数组                                   |
| keys       | 返回包含数组所有索引的@@iterator                             |
| of         | 根据传入的参数创建一个新数组                                 |
| values     | 返回包含数组中所有值的@@iterator                             |

### 使用@@iterator对象

ES2015为Array类增加了一个@@iterator属性，需要通过Symbol.iterator来访问。

```javascript
let iterator = numbers[Symbol.iterator]();
console.log(iterator.next().value); // 1 
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3 
console.log(iterator.next().value); // 4 
console.log(iterator.next().value); // 5
```

不断调用迭代器的next方法，就能依次得到数组中的值。

### 数组的entries、keys、values方法

- entries方法返回包含键值对的@@iterator

```javascript
let aEntries = numbers.entries();//得到键值对的迭代器
console.log(aEntries.next().value);//[0,1]   numbers索引为0的值为1
console.log(aEntries.next().value);//[1,2]   numbers索引为1的值为2
console.log(aEntries.next().value);//[2,3]  numbers索引为2的值为3
```

- keys方法会返回包含数组索引的@@iterator

```javascript
const aKeys = numbers.keys(); 
console.log(aKeys.next()); //{value:0 , done:false}
console.log(aKeys.next()); //{value:1 , done:false}
console.log(aKeys.next()); //{value:2 , done:false}
```

keys方法会返回numbers数组的索引，一旦没有可迭代的值，aKeys.next()就会返回一个value属性为undefined、done属性为true的对象。如果done属性的值为false,就意味着还有可迭代的值。

- values方法返回的@@iterator则包含数组的值

```javascript
const aValues = numbers.values();
console.log(aValues.next()); // { value: 1, done: false }
console.log(aValues.next()); // { value: 2, done: false}
console.log(aValues.next()); // { value: 3, done: false}
```

### 使用from方法

Array.from方法根据已有的数组创建一个新数组。例如赋值数组：

```javascript
let numbers2 = Array.from(numbers);
```

还可以传入一个用来过滤值的函数

```javascript
let evens = Array.from(numbers, x => (x % 2 == 0));
```

上面的代码会创建一个evens数组，以及值true或false

### 使用Array.of方法

Array.of方法根据传入的参数创建一个新数组

```javascript
let numbers3 = Array.of(1);
let numbers4 = Array.of(1, 3, 4, 5, 6);
//相当于
let numbers3 = [1];
let numbers4 = [1, 3, 4, 5, 6];
```

### 使用fill方法

fill方法用静态值填充数组

```javascript
let numbersCopy = Array.of(1, 2, 3, 4, 5, 6);
numbersCopy.fill(0); //[0,0,0,0,0,0]
//还可以指定开始填充的索引
numbersCopy.fill(2, 1);//[0,2,2,2,2,2] 从索引1开始的所有位置值都是2
//还可以指定结束填充的索引
numbersCopy.fill(1,3,5);//[0,2,2,1,1,2]
```

创建数组并初始化值时用fill

```javascript
let ones = Array(6).fill(1);[1,1,1,1,1,1]
```

### 使用copyWithin方法

copyWithin方法赋值数组中的一系列元素到同一数组指定的起始位置。

```javascript
copyArray = [1,2,3,4,5,6];
copyArray.copyWithin(1,3,5);//[1,4,5,4,5,6]
```

从索引3开始到索引5（不包括5）的元素复制到位置1

## 排序元素

数组元素反序 使用reverse()方法

数组元素排序使用 sort()方法 sort方法默认把元素认成字符串进行比较，可以传入比较函数，自己指定比较规则

```javascript
numbers.sort( (a,b) => a - b )//升序
```

自定义排序

​	我们可以对任何对象类型的数组排序，可以创建compareFunction来比较元素。例如对象Person有名字和年龄属性，我们希望根据年龄排序：

```javascript
const friends = [{ name : 'John' , age : 30},{ name : 'Ana' , age : 20 },{ name : 'Chris' ,age : 25}]
function comparePerson(a,b){
  if(a.age < b.age){
    return -1;
  }
  if(a.age > b.age){
  	return 1;
  }
  return 0;
}
console.log(friends.sort(comparePerson));
```

## 搜索

indexOf方法返回与参数匹配的第一个元素的索引，lastIndexOf返回与参数匹配的最后一个元素的索引。

ES2015中———find和findIndex方法]

​	find和findIndex方法接收一个回调函数，搜索第一个满足回调函数条件的值

```javascript
let numbers = [1,2,3,4,5,6,7];
function multipleOf7(element,index,array){
	return (element % 7  == 0);
}
console.log(numbers.find(multipleOf7));
console.log(numbers.findIndex(multipleOf7));
```

find和findIndex不同在于，find方法返回第一个满足条件的值，findIndex方法返回这个值在数组中的索引。

ES7------使用includes方法

​	如果数组中存在某个元素，includes方法会返回true,否则返回false

​	如果给includes方法传入一个起始索引，搜索会从索引指定的位置开始

```javascript
let numbers = [7,6,5,4,3,2,1]
console.log(numbers.includes(4,5))//false 数组索引5之后的元素没有4
```

## 栈

### 基于数组的栈

```javascript
class Stack(){
	constructor(){
    this.items = [];
	}
  //添加一个(或几个)新元素到栈顶
  push(element){
    this.items.push(element);
  }
  //移除栈顶元素，并返回被移除的元素
  pop(){
    return this.items.pop();
  }
  //返回栈顶的元素,不对栈进行任何修改
  peek(){
    return this.items[this.items.length - 1];
  }
  //判断栈空，没有元素返回true,否则返回false
  isEmpty(){
    return this.items.length === 0;
  }
  //移除栈里的所有元素
  clear(){
    this.items = [];
  }
  //返回栈里元素的个数
  size(){
    return this.items.length;
  }
}
```

### 基于对象的栈

```javascript
class Stack(){
	constructor(){
    this.count = 0;
    this.items = [];
  }
  push(element){
    this.items[this.count] = element;
    this.count++;
  }
  size(){
    return this.count;
  }
  isEmpty(){
    return this.count === 0;
  }
  pop(){
    if(this.isEmpty()){
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }
  peek(){
    if(this.isEmpty()){
      return undefined;
    }
    return this.items[this.count - 1];
  }
  clear(){
    this.items = {};
    this.count = 0;
  }
  toString(){
    if(this.isEmpty()){
      return '';
    }
    let objString = `${this.items[0]}`;
    for(let i=1;i<this.count;i++){
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}
```

### 保护数据结构内部元素

ES6语法创建的Stack类，是基于原型的。尽管基于原型的类能节省内存空间并在扩展方面优于函数的类，但这种方式不能声明私有变量或方法。

#### 下划线命名约定

下划线命名约定就是在属性名称之前加上一个下划线(_) 不过这种方式只是一种约定，并不能保护数据。

#### 用ES6的限定作用域Symbol实现类

```javascript
const _items = Symbol('stackItems');
class Stack {
	constructor () {
    	this[_items] = [];
    }
}
```

这种方法创建了一个假的私有属性，因为ES6新增的Object.getOwnPropertySymbols方法能够取到类里面声明的所有Symbols属性。

```javascript
const stack = new Stack();
stack.push(5);
stack.push(8);
let objectSymbols = Object.getOwnPropertySymbols(stack);
console.log(objectSymbols.length);//1
console.log(objectSymbols);//[Symbol()]
console.log(objectSymbols[0]);//Symbol()
stack[objectSymbols[0]].push(1);
stack.print();//5,8,1
```

### 用栈解决问题

#### 十进制转二进制

```javascript
function decimalToBinary(decNumber){
	const remStack = new Stack();
  let number = decNumber;
  let rem;
 	let binaryString = '';
  	
  while(number > 0){
    rem = Math.floor(number % 2);
    remStack.push(rem);
    number = Math.floor(number / 2);
  }
  
  while(!remStack.isEmpty()){
    binaryString += remStack.pop().toString();
  }
  
  return binaryString;
}
```

#### 进制转换算法

```javascript
function baseConverter(decNumber,base) {
	const remStack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = decNumber;
    let rem;
  	let baseString = "";
    if(!(base >= 2 && base <= 36)){
    	return '';
    }
  	while(number > 0){
    	rem = Math.floor(number % base);
      	remStack.push(rem);
      	number = Math.floor(number / base);
    }
 	while(!remStack.isEmpty()){
    	baseString += digits[remStack.pop()];
    }
	return baseString;
}
```

