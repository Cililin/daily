import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/', //主页
      name: 'home',
      component: HomeView
    },
    {
      path: '/detail/:storyid', //:storyid：动态路由参数  /?id=xxx
      //主页跳转到详情页
      name: 'detail',
      component: () => import('../views/DetailView.vue') //异步加载 懒加载 用到才加载
    },
    {
      path: "/comments/:storyid", //评论页面
      name: 'comment',
      component: () => import('../views/CommentView.vue')
    }, {
      path: "/userset",
      name: 'userset',
      component: () => import('../views/UsersetView.vue')
    },
    {
      path: "/:pathMatch(.*)*", //无该页面
      meta: {
        title: "找不到此页面",
      },
      component: () => import('../views/404.vue')
    }, {
      path: "/403", //权限不足页面
      meta: {
        title: "权限不足",
      },
      component: () => import('../views/403.vue')
    }
  ]
})

export default router //导出router实例供其他地方使用