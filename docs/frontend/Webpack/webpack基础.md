# webpack

*webpack* 是一个现代 JavaScript 应用程序的**静态模块打包器**，可以用来打包所有资源。

[官方文档](https://www.webpackjs.com/concepts/)

## 四个核心概念

- 入口(entry)
- 输出(output)
- loader
- 插件(plugins)

### entry（入口）

可以通过在 [webpack 配置](https://www.webpackjs.com/configuration)中配置 `entry` 属性，来指定一个入口起点（或多个入口起点）。默认值为 `./src`。

**webpack.config.js**

```javascript
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

### output（出口）

**output** 属性告诉 webpack 在哪里输出它所创建的 *bundles*，以及如何命名这些文件，默认值为 `./dist`。

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

### loader

**loader** 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效[模块](https://www.webpackjs.com/concepts/modules)，然后你就可以利用 webpack 的打包能力，对它们进行处理。

```md
::: warning
注意，loader 能够 import 导入任何类型的模块（例如 .css 文件），这是 webpack 特有的功能，其他打包程序或任务执行器的可能并不支持。
:::
```

在 webpack 的配置中 **loader** 有两个目标：

1. `test` 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
2. `use` 属性，表示进行转换时，应该使用哪个 loader。

**webpack.config.js**

```javascript
const path = require('path');

const config = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;
```

上配置中，对一个单独的 module 对象定义了 `rules` 属性，里面包含两个必须属性：`test` 和 `use`。这告诉 webpack 编译器(compiler) 如下信息：

```md
::: tip
“嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先使用 raw-loader 转换一下。”
:::
```

```md
::: warning
在 webpack 配置中定义 loader 时，要定义在 module.rules 中，而不是 rules。
:::
```

Loader 是有先后顺序的，**从下到上**，**从右到左**

### plugins（插件）

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。

想要使用一个插件，你只需要 `require()` 它，然后把它添加到 `plugins` 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 `new` 操作符来创建它的一个实例。

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

webpack 提供许多开箱可用的插件！查阅我们的[插件列表](https://www.webpackjs.com/plugins)获取更多信息。

## 基本使用

### 安装

```
npm install webpack webpack-cli -D
```

webpack-cli和webpack在版本4中已分离，安装完webpack-cli可以使用webpack命令

### 创建bundle 文件

- 在目录下新建一个 src 文件夹,新建 index.js 文件
- 在根目录下创建一个dist文件夹, 并在其中创建一个index.html文件

**index.js**

```javascript
function component() {
    let element = document.createElement('div')
    element.innerHTML = "Hello Webpack"
    document.body.appendChild(element)
}

component()
```

在 index.html 里面引入将要打包生成后的 main.js

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>

  <script src="main.js"></script>
</body>

</html>
```

### 执行打包

```
npx webpack
```

执行 **npx webpack**，会将我们的脚本作为入口起点，然后在dist目录下生成main.js文件。

### 配置文件

在根目录新建 **webpack.config.js** 目录

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

通过配置文件进行打包

```
npx webpack --config webpack.config.js
```

### NPM脚本

因为每次执行打包命令不是特别方便，我们可以在package.json添加一个npm脚本

package.json

```json
...
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"build": "webpack"
},
...
```

可以使用 **npm run build** 命令，来替代我们之前使用的 npx 命令

```
npm run build
```

## 管理资源

现在我们尝试整合一些其他资源，比如图像、看看 webpack 如何处理，让我们从 CSS 开始起步

### 打包CSS

要想从 JavaScript 模块中 import 一个 CSS 文件，你需要在 module 配置中安装并添加 **style-loader** 和 **css-loader**

```
npm install --save-dev style-loader css-loader
```

**webpack.config.js**

```js
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loadder'
                ]
            }
        ]
    }
};
```

```md
::: tip
webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader
:::
```

这使你可以在依赖于此样式的文件中 import './style.css'。现在，当该模块运行时，含有 CSS 字符串的 **style** 标签，将被插入到 html 文件的 **head** 中。

在项目中添加一个新的 style.css 文件，并将其导入到我们的 index.js 中

**src/style.css** 

```css
body {
    color: red;
}
```

在 index.js 文件中引入

```js
import './style.css'
```

运行构建命令

```
npm run build
```

再次在浏览器中打开 index.html，你应该看到 Hello webpack 现在的样式是红色。查看页面的 head 标签。它应该包含我们在 index.js 中导入的 style 块元素

```md
::: tip
因为loader的执行顺序是从右往左，从下往上的，webpack肯定是先将所有css模块依赖解析完得到计算结果再创建style标签。因此应该把style-loader放在css-loader的前面
:::
```

**style-loader**的作用

style-loader 它的原理其实就是通过一个 JS 脚本创建一个style标签，里面会包含一些样式。并且它是不能单独使用的，因为它并不负责解析css之前的依赖关系

- 单独使用 css-loader 只能保证我们能引用 css 模块进来,但是没有效果
- style-loader 就可以创建一个 style 标签，并且把 引入进来的 css 样式放到这个标签里面

```md
::: tip
有一点需要注意了:我们在当前项目的 js 中引入了几个css模块，它就会生成几个style标签
:::
```

### 使用scss

安装依赖包

```
npm install sass-loader node-sass webpack --save-dev
```

**webpack.config.js**

```js
{
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
}
```

