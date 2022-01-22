/*
 * @Description: 
 * @Author: wupengfei
 * @Date: 2020-11-10 07:30:07
 * @LastEditors: wupengfei
 * @LastEditTime: 2020-11-11 23:35:40
 */

const JsCatalog = {
  title: 'JavaScript',
  children: [
    ['/frontend/JavaScript/Js中Require和import', 'Js中require和import区别'],
    ['/frontend/JavaScript/ES6+', 'ES6+'],
    ['/frontend/JavaScript/JavaScript数据结构和算法笔记', 'JavaScript数据结构和算法笔记'],
    ['/frontend/JavaScript/《你不知道的js》笔记', '《你不知道的js》笔记'],
    ['/frontend/JavaScript/原型', '原型'],
    ['/frontend/JavaScript/EventLoop', '浏览器中的EventLoop'],
    ['/frontend/JavaScript/bind和call和apply', 'bind、call和apply'],
  ]
};

const LinuxCatalog = {
  title: 'Linux',
  children: [
    ['/frontend/Linux/Linux免密远程登录', 'Linux免密远程登录'],
    ['/frontend/Linux/Linux目录及常用命令', 'Linux目录及常用命令']
  ]
}

const WebpackCatalog = {
  title: 'Webpack的那些事',
  children: [
    ['/frontend/Webpack/webpack基础', 'Webpack基础']
  ]
}

const NodeCatalog = {
  title: 'Node',
  children: [
    ['/frontend/Node/Koa初探', 'Koa初探'],
    ['/frontend/Node/JWT鉴权', 'JWT鉴权']
  ]
}

const NetWorkCatalog = {
  title: '网络',
  children: [
    ['/frontend/NetWork/http', '浏览器行为和Http']
  ]
}

const ArrayCatalog = {
  title: '数组',
  children: [
    ['/algorithm/Array/删除排序数组中的重复项-1星', '删除排序数组中的重复项-1星'],
    ['/algorithm/Array/连续数组','连续数组'],
    ['/algorithm/Array/螺旋矩阵','螺旋矩阵'],
    ['/algorithm/Array/合并两个有序数组','合并两个有序数组'],
    ['/algorithm/dataStruct', '常用的数据结构'],
    ['/algorithm/Array/把数组排成最小的数', '把数组排成最小的数'],
    ['/algorithm/Array/最大子序列交替和', '最大子序列交替和(最短贪心算法)'],
    ['/algorithm/Array/排序数组', '排序数组'],
    ['/algorithm/Array/多数元素', '多数元素'],
    ['/algorithm/Array/和相同的二元子数组', '和相同的二元子数组'],
    ['/algorithm/Array/数组中的逆序对', '数组中的逆序对'],
  ]
}

const TreeCatalog = {
  title:'树',
  children:[
    ['/algorithm/Tree/二叉树的最大深度','二叉树的最大深度'],
    ['/algorithm/Tree/二叉树的层序遍历','二叉树的层序遍历'],
    ['/algorithm/Tree/有序数组转换成BST','有序数组转换成BST'],
  ]
}

const DpCatalog = {
  title:'动态规划',
  children:[
    ['/algorithm/Dp/使序列递增的最小交换次数','使序列递增的最小交换次数'],
    ['/algorithm/Dp/dp-爬楼梯','爬楼梯'],
    ['/algorithm/Dp/dp-石子游戏','石子游戏'],
  ]
}

const DivideConquer = {
  title:'分治',
  children:[
    ['/algorithm/DivideConquer/自定义幂运算','自定义幂运算']
  ]
}

const BackTracking = {
  title:'回溯',
  children:[
    ['/algorithm/BackTracking/回溯-字符串的排列','字符串的排列']
  ]
}

const DFS = {
  title:'深度优先搜索',
  children:[
    ['/algorithm/DFS/传递信息','传递信息']
  ]
}

const VueCatalog = {
  title: '探索Vue的秘密',
  children: [
    ['/frontend/Vue/Vue2源码-core', 'Vue2源码-core'],
    ['/frontend/Vue/Vue2源码-platforms', 'Vue2源码-platforms'],
    ['/frontend/Vue/Vue3概览', 'Vue3概览'],
  ]
}

const CSSCatalog = {
  title: '现代化Css',
  children: [
    ['/frontend/Css/CSS设计模式', 'CSS设计模式'],
    ['/frontend/Css/CSS架构方案', 'CSS架构方案'],
  ]
}

const articlesCatalog = {
  title: '前端随笔',
  children:[
    ['/articles/2019前端随笔', '2019前端随笔'],
    ['/articles/忆大学', '忆大学'],
    ['/articles/致爸妈', '致爸妈'],
    ['/articles/平安夜', '平安夜'],
    ['/articles/生活', '生活'],
    ['/articles/元旦', '元旦'],
    ['/articles/小草岂可撼大树', '小草岂可撼大树'],
    ['/articles/长津湖和照相机', '长津湖和照相机'],
    ['/articles/结束的2021', '结束的2021'],
  ]
}

module.exports = {
  JsCatalog,
  LinuxCatalog,
  NodeCatalog,
  ArrayCatalog,
  NetWorkCatalog,
  WebpackCatalog,
  VueCatalog,
  CSSCatalog,
  TreeCatalog,
  DpCatalog,
  DivideConquer,
  articlesCatalog,
  BackTracking,
  DFS
}
