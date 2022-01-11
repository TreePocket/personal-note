##### **简介:**

  Koa是一款新的web框架，致力于成为web应用和API开发领域中的一个更小、更富有表现力、更健壮的基石。

  利用async函数丢弃回调函数，并增强错误处理。Koa没有任何预制的中间件，可快速而愉快地编写服务端应用程序。

##### **核心概念：**

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img1.png" width="50%"  >

步骤：

1.初始化项目

2.安装koa依赖 cnpm install —save koa

3.创建index.js入口文件

4.运行 node index.js

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img2.png" width="80%" >

##### **Koa开发RESTful接口**

常见的GET/POST

统一的数据处理

接口调试及日志输出

使用的Koa中间件：

路由：koa-router

协议解析：koa-body

跨域处理: @koa/cors

格式化返回值: koa-json 

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img3.png" width="80%" >

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img4.png" width="80%" >

##### 添加接口前缀：

- router.prefix('/api')

##### 获取Get请求中的params

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img6.png" width="80%" >

##### **Koa路由进阶配置(代码路径：/文稿/frontend/koa-study2)**

开发目录结构

  按照功能模块进行区分

路由压缩

  Koa-combine-routers

静态资源

  koa-static

##### **koa安全header处理**

加入安全头:koa-helmet 

##### **开发过程中的热加载(使用nodemon)**

使用nodemon  cnpm install -D nodemon   

开启 npx nodemon src/index.js （开发模式下热加载index.js）

可以在package.json scripts中加入 “start”:”nodemon src/index.js” (就可以使用npm run start命令使用热加载)

 

##### **安装Webpack等依赖**

npm install -D clean-webpack-plugin webpack-node-externals @babel/core @babel/node @babel/preset-env babel-loader cross-env

clean-webpack-plugin:清理dist目录下的文件

webpack-node-externals:对nodemodules文件夹中的文件进行排除处理

@babel/core: babel的核心库

@babel/node:调试用到的

@babel/preset-env:对新特性的支持

babel-loader:在webpack中使用到的loader

Cross-env:环境变量的依赖

##### **在koa应用中支持ES6**

安装babel依赖

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img7.png" width="80%" >

配置.babelrc

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img8.png" width="80%" >

Package.json中修改

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img9.png" width="80%" >

##### **配置调试脚本**

vscode中在调试界面 添加调试配置

修改配置路径

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img10.png" width="80%" >

还可以修改package.json中的配置

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img11.png" width="80%" >

##### **优化webpack配置，npm构建脚本**

使用npm-check-updates依赖检测package.json中依赖的版本(ncu命令)

使用ncu命令检测是否有依赖需要更新 再使用对应命令更新依赖

整合koa中间件:

  使用koa-compose 

  安装依赖 cnpm install koa-compose -S

  导入 import compose from ‘koa-compose’

  使用 const middleware = compose([koaBody(),….])

  app.use(middleware)

webpack不同环境打包配置

  在生产环境中使用terser-webpack-pugin压缩js(cnpm install terser-webpack-plugin —save-dev)

  使用webpack-merge(cnpm install -D webpack-merge)

Webpack.config.base.js代码

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img12.png" width="100%" >

Webpack.config.dev.js代码

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img13.png" width="100%" >

webpack.config.prod.js代码

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img14.png" width="80%" >

utils.js代码

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img15.png" width="80%">

package.json配置代码

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img16.png" width="80%" >

使用splitChunks去掉重复依赖代码

使用rimraf依赖包清除dist目录



使用koa-compress在生产模式下压缩中间件代码

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/koa-img/img18.png" width="80%" >

##### **邮件服务总结**

1.公共邮箱限制，使用授权码

2.开发接口api:业务->路由->测试接口->前端页面

3.devServer处理开发过程中的跨域问题