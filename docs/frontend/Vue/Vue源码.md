# Vue2源码

## src目录

### Compiler

​	作用：模板编译  把template中的代码处理成 Js 代码(render函数)

```javascript
function render(){
	with(this){ ===>vue实例
		return _c('div',{
			attrs:{
				'id':'app',
        'class':'yideng'
      }
		})
	}
} ==> 虚拟dom
```

### Core

​	核心代码包 

	#### components 模板编译代码

#### global-api 最上层的文件接口

#### instance 生命周期

- new Vue 发生了什么

  ```javascript
  //src/core/instance/index.js
  function Vue (options) {
    if (process.env.NODE_ENV !== 'production' &&
      !(this instanceof Vue)
    ) {
      warn('Vue is a constructor and should be called with the `new` keyword')
    }
    this._init(options)
  }
  ```

  Vue只能通过new关键字初始化,然会调用this._init方法,该方法在 src/core/instance/init.js 中定义

  ```javascript
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++
  
    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }
  
    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
  
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }
  
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  ```

  Vue 初始化干的事情:合并配置、初始化生命周期、初始化事件中心、初始化渲染、初始化 data、props、computed、watcher 等等

#### observer 数据收集与订阅



#### util 常用工具方法类

#### vdom 虚拟dom



### platforms

​	平台相关的代码

### server

​	服务端渲染的代码

### sfc

​	单文件处理相关代码  拆分template、style、script等进行不同的处理



## vue架构

### vue运行时（runtime）

​	vue运行起来后，它常驻于内存中的一个状态

​	在new Vue实例后，内存里面会存在一个Vue实例，这个实例对象维护了数据，方法，生命周期等

```javascript
let vm = new Vue({
	data:{
    
  },
  methods:{
    
  },
  created:{
    
  }
})
```



### 编译时

- 离线编译（在上线之前的编译）

  .vue文件(template) ==> webpack (vue-loader) ==> js 

- 在线编译（运行展示时的编译）runtime+compiler(在线编译使用的包)

  ```javascript
  Vue.component('button-counter', {
    data: function () {
      return {
        count: 0
      }
    },
    template: '<button v-on:click="count++">you clicked me {{count}}</button>'
  });
  ```

  通过运行的过程中，js来编译模板（运行时注册组件）



## 双向绑定(响应式原理)所涉及到的技术

- Object.defineProperty

  监听了对应的key

  Object.defineProperty(data,key,

  初始化的过程中，就需要去监听对应的key

  1. 可以监听已有key
  2. 不能监听没有的key
  3. 监听数组的时候，可能会导致多次出发get、set
  
    
  
    Object.defineProperty
  
     	//获取对应key  ==>  get
  
    	 //修改对应key的数据 ==> set



​	1.object.defineProperty 嵌套对象 要递归

​				

- Observer

  Observer  ===> 把数据处理成为响应式数据

  ```javascript
  new Observer({data1:123})
  ```

  

- Watcher(维护渲染视图的函数与数据之间的纽带)

  一个指令  对应一个watcher  vue1    导致内存中需要维护修改的watcher太多

  Vue2 对应一个watcher ==>  组件  render(){}  ==> 组件层面 diff

- Dep(电话本)

- Directive

  

### 数组重写的原因

对于数组的重写,只重写了 会修改数组本身元素的方法







