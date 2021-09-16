import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/redirect'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401'], resolve),
    hidden: true
  },

  // 例外路由地址，不用后台懒加载，用固定路由地址，这样就可以列外，并且直接跳转到这里来了。
    {
    path: '/module/texu_ups',
    component: (resolve) => require(['@/views/module/texu_up'], resolve),
    hidden: true
  },
     // 例外路由地址，不用后台懒加载，用固定路由地址，这样就可以列外，并且直接跳转到这里来了。
    {
    path: '/module/uplisttest',
    component: (resolve) => require(['@/views/module/uplisttest'], resolve),
    hidden: true
  },
      // 例外路由地址，不用后台懒加载，用固定路由地址，这样就可以列外，并且直接跳转到这里来了。
  //   {
  //   path: '/module/listinfo',
  //   component: (resolve) => require(['@/views/module/listinfo'], resolve),
  //   hidden: true
  // },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/index'], resolve),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/dict',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'dataList/:dictType',
        component: (resolve) => require(['@/views/system/config/dict/dataList/data'], resolve),
        name: 'Data',
        meta: { title: '字典数据', icon: '' }
      }
    ]
  },
  {
    path: '/job',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: (resolve) => require(['@/views/system/monitor/job/log'], resolve),
        name: 'JobLog',
        meta: { title: '调度日志' }
      }
    ]
  },
  {
    path: '/gen',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit',
        component: (resolve) => require(['@/views/system/tools/gen/editTable'], resolve),
        name: 'GenEdit',
        meta: { title: '修改生成配置' }
      }
    ]
  },
  {
    path: '/modelInfo',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'fields',
        component: (resolve) => require(['@/views/system/model/info/list/fields'], resolve),
        name: 'modelFields',
        meta: { title: '模型字段列表' }
      }
    ]
  },
  {
    path: '/system/wf/flow',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'design',
        component: (resolve) => require(['@/views/system/wf/flow/design'], resolve),
        name: 'flowDesign',
        meta: { title: '流程设计' }
      }
    ]
  }
]

export default new Router({
  //mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
