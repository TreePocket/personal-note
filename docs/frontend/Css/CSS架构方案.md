## ITCSS

### Settings层实现

- 定义一些公共变量：颜色、边框、字体大小、阴影、层级...

```scss
//基色调
$color-primary:#ff5777;
$color-white:#fff;
$color-black:#000;

//文字颜色
$color-text-primay:#333;
$color-text-secondary:#666;
$color-text-tertiary:$color-white;
$color-text-quaternary:$color-primary;

//边框颜色
$color-border-base:$e5e5e5;

//背景颜色
$color-background-primary:#f1f1f1;
$color-background-secondary:$color-white;
$color-background-tertiary:$color-primary;

//层级
$index-normal:1;
$index-top:1000;
$index-poper:2000;
```

```javascript
//在vue.config.js中将var.scss配置成全局的
module.exports = {
	css:{
		loaderOptions:{
			scss:{
				prependData:
					@import "@/style/settings/var.scss"
			}
		}
	}
}
```

### Tools层

- 引入SassMagic工具库
  - 将工具库下载 把src下的目录放到项目的tools文件夹中
  - 在vue.config.js中配置

```javascript
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        additionalData: `@import "~@/style/tools/_sassMagic.sass"`
      },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        additionalData: `@import "~@/style/tools/_sassMagic.sass"`
      },
      // 给 less-loader 传递 Less.js 相关选项
    }
  }
}
```

### Base层

- Generic层：引入normalize.css，重置浏览器默认样式
- Base层：对各类元素基础样式进行补充

### Components层

- 经典的组件：栅格、布局组件
- 自定义组件

```javascript
//Components目录下的index.js
import {Layout, Header, Aside, Main, Footer} from './layout';
import Col from 'vant/lib/col';
import 'vant/lib/col/index.css';
import Row from 'vant/lib/row';
import 'vant/lib/row/index.css';
import BoxCenter from './box-center';
import SingleCenter from './single-center';
import BoxSkin from './box-skin';
import Launch from './launch';
import FootNav from './foot-nav';
import Magazine from './magazine';

const components = {
  Layout,
  Header,
  Aside,
  Main,
  Footer,
  CRow: Row,
  CCol: Col,
  BoxCenter,
  SingleCenter,
  BoxSkin,
  Launch,
  FootNav,
  Magazine
}

const install = (app) => {
  Object.keys(components).forEach(key => {
    if(key === 'CRow' || key === 'CCol') {
      app.component(key, components[key])
    }else{
      app.component(components[key]['name'], components[key])
    }
  });
}

const Mui = {
  install
}

export default Mui
```

### ACSS层

- 让样式极限复用
- 解决Acss无语义化缺点:属性选择器

```scss
.fl{
  float:left;
}
.fr{
  float:right;
}

//解决Acss无语义化缺点:属性选择器
<div class="media" fl ml-4 mr-12></media>
[fl]{
  float:left;
}
[fr]{
  float:right;
}
```

- Settings与Acss层的关系

```scss
/* 字体颜色
[font-primary] {
  color: #333333
}

[font-secondary] {
  color: #666666
}
...
-------------------------- */

@each $style in (primary $color-text-primary, secondary $color-text-secondary, tertiary $color-text-tertiary, quaternary $color-text-quaternary) {
  [font-#{nth($style, 1)}] {
    color: #{nth($style, 2)};
  }
}

/* 背景颜色
[bg-primary] {
  background-color: #F1F1F1;
}
[bg-secondary] {
  background-color: #FFFFFF;
}
...
-------------------------- */
@each $style in (primary $background-color-primary, secondary $background-color-secondary, tertiary $background-color-tertiary) {
  [bg-#{nth($style, 1)}] {
    background-color: #{nth($style, 2)};
  }
}
```



