/*
 * @Description: 
 * @Author: wupengfei
 * @Date: 2020-11-08 09:23:59
 * @LastEditors: wupengfei
 * @LastEditTime: 2020-11-10 07:52:18
 */
var catlog = require('./catalog');
module.exports = {
  title: '树兜的一方小天地',
  description: '成熟大概就是和天真告别吧',
  head: [
    ['link']
  ],
  base: '/pocketPage/',
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  dest: './docs/.vuepress/dist',
  ga: '',
  evergreen: true,
  themeConfig: {
    sidebarDepth: 4, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated',// 文档更新时间
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '前端',
        link: '/frontend/JavaScript/Js中Require和import',
      },
      {
        text: '算法',
        link: '/algorithm/Array/删除排序数组中的重复项-1星'
      },
      { text: '随笔', link: '/articles/2019前端随笔' },
      { text: '书籍', link: '/books/' }
    ],
    sidebar: {
      '/frontend/': [
        catlog.JsCatalog,
        catlog.LinuxCatalog,
        catlog.NodeCatalog,
        catlog.NetWorkCatalog,
        catlog.CSSCatalog,
        ['/frontend/Engineering/', '前端工程化'],
        ['/frontend/Performance/', '前端性能优化'],
        ['/frontend/React/', 'React专题'],
        catlog.VueCatalog,
        catlog.WebpackCatalog
        // ['/frontend/Webpack/', 'Webpack的那些事'],
      ],
      '/algorithm/': [
        catlog.ArrayCatalog,
        catlog.TreeCatalog,
        catlog.DpCatalog,
        catlog.DivideConquer,
        catlog.BackTracking,
        catlog.DFS
      ],
      '/articles':[
        catlog.articlesCatalog
      ]
    }
  }
}