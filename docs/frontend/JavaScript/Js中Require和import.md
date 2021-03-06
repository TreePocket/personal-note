### require是CommonJS的语法
- 什么是CommonJS？
  
  CommonJS是一种JS语言模块化的规范，通常会在服务器端的NodeJS上使用。
  
  在CommonJs的模块化规范中，每一个文件就是一个模块，拥有自己独立的作用域、变量、以及方法等，对其他的模块都不可见。
  
  CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性是对外的接口。
  
  模块化规范带来的好处是在业务复杂，模块众多的大型项目中，开发者都遵循相同的规则来开发各自的模块，通过规范来约束模块的定义，就不需要太多的沟通或者大量的文档来说明自己模块的使用规则。
### import是ES6的一个语法标准
在调用时间的区别：
​	require是运行时调用，所以require理论上可以运行在代码的任何地方

​	import是编译时调用，所以必须放在文件开头

本质区别:

​	require是赋值过程，require的结果就是对象、数字、字符串、函数等赋值给某个变量。

​	import是解构过程。

​	require只能在运行时确定模块的依赖关系及输入/输出的变量，无法进行静态优化。

​	import遵循ES6规范，支持编译时静态分析，便于JS引入宏和类型验证，动态绑定。



  - 通过require引入基础数据类型时，属于复制该变量
  - 通过require引入复杂数据类型时，数据浅拷贝该对象
  - 出现模块之间的循环引用时，会输出已经执行的模块，而未执行的模块不输出
  - CommonJS模块默认export的是一个对象，即使导出的是基础数据类型