## OOCSS

- OO：面向对象
- 原则一：容器与内容分离

```html
<!-- 容器与内容分离 -->
<div class="post">
  <p class="metadata">
    <a>Author name</a>commented on <a>21-02-2010</a>@
  </p>
</div>
<!-- comment中的meta-data -->
<div class="comment">
  <p class="metadata">
    <a>Author name</a>commented on<a>21-02-2010</a>@
  </p>
</div>
.post{css code}容器样式
.metadata{css code}内容样式
```

- 原则二：结构(基础对象)与皮肤分离

```html
<!-- 基础对象 与 对象 分离 -->
<div class="menu fix"></div>
<div class="menu fix1"></div>
.menu{
	color:green;
	font-size:12px;
}
.fix1{
	font-size:12px;
}
.fix2{
	color:red;
}
```

- 原则三：面向设计开发

## BEM

- 块(Block)、元素(Elemen__)、修饰符(Modifier--)

```html
<div class="menu">
		<div class="menu__tab menu__tab--style1">tab1</div>
		<div class="menu__tab menu__tab--style1">tab2</div>
		<div class="menu__tab menu__tab--style1">tab3</div>
		<div class="menu__tab menu__tab--style1">tab4</div>
</div>

<div class="menu">
		<div class="menu__tab menu__tab--style2">tab1</div>
		<div class="menu__tab menu__tab--style2">tab2</div>
		<div class="menu__tab menu__tab--style2">tab3</div>
		<div class="menu__tab menu__tab--style2">tab4</div>
</div>
```

- 作用：命名规范、让页面结构清晰
- 进阶的OOCSS

## SMACSS

- 分类：Base、Layout、Modules、State、Theme
  - Base
    - 重置浏览器默认样式 normalize.css
    - 元素的特殊定制化
  - Layout
    - 网站可能存在的布局方式 l-header l-main l-footer
  - Modules
    - 维护网站可复用的模块的样式
  - State
    - 管理模块的不同状态的样式 is-hidden
  - Theme
    - 维护网站皮肤的目录 theme-
- 好处：易维护、易复用、易扩展

- 命名规范：l-header、is-hidden、theme-nav

## ITCSS

- 分层：七层
  - Settings
    - 维护网站的变量
  - Tools
    - 维护样式的工具库
  - Generic
    - 浏览器默认样式重置
  - Base
    - 元素定制化的设置
  - Objects
    - 维护网站OOCSS的样式
  - Components
    - 维护网站通用组件的样式
  - Trumps
    - 权重最高的样式 ！important
- 与SMACSS区别：层次分的更细

## ACSS

- 一个样式属性一个类
- 好处：极强的复用性、维护成本低
- 坏处：破坏了CSS命名的语义化

