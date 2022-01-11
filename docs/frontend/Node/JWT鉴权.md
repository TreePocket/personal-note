核心概念（鉴权方式，加密/解密，HTTPS）

JWT工作原理

Nodejs集成JWT

 

**常见的鉴权方式**

Session Cookie

优点:较易扩展、简单

缺点:安全性低、性能低，服务端存储、多服务器同步session困难、跨平台困难

JWT

优点:易扩展、支持移动设备、跨应用调用、安全、承载信息丰富

缺点:刷新与过期处理、Payload不易过大、中间人攻击

Oauth

优点:开放、安全、简单、权限

缺点:需要增加授权服务器、增加网络请求



##### **什么是JWT?**

​	JWT的全称是JSON Web Token，一个JWT由三部分构成:Header,Payload,Signature。

##### JWT特点

- 防CSRF(主要是伪造请求，带上Cookie)
- 适合移动应用
- 无状态，编码数据

##### JWT工作原理

<img src="https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/jwt.png" width="50%"  >

**提高JWT安全性的策略**

使用HTTPS

服务器存储Secret,动态Secret

设置短期的Token有效，设置刷新Token