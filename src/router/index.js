import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/Login',
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/Home',
    name: 'Home',
    redirect: '/Welcome',
    component: () => import( /* webpackChunkName: "Home" */ '../views/Home.vue'),
    children: [{
        path: '/Welcome',
        name: 'Welcome',
        component: () => import( /* webpackChunkName: "Welcome" */ '../components/Welcome.vue')
      },
      {
        path: '/rights',
        name: 'Rights',
        component: () => import( /* webpackChunkName: "Rights" */ '../components/rights/rights.vue')
      }, {
        path: '/roles',
        name: 'Roles',
        component: () => import( /* webpackChunkName: "Roles" */ '../components/rights/roles.vue')
      }, {
        path: '/goods',
        name: 'Goods',
        component: () => import( /* webpackChunkName: "Goods" */ '../components/goods/goods.vue')
      }, {
        path: '/goods/add',
        name: 'add',
        component: () => import( /* webpackChunkName: "Add" */ '../components/goods/add.vue')
      },{
        path: '/categories',
        name: 'Categories',
        component: () => import( /* webpackChunkName: "Categories" */ '../components/goods/categories.vue')
      }, {
        path: '/params',
        name: 'Params',
        component: () => import( /* webpackChunkName: "Params" */ '../components/goods/params.vue')
      }, {
        path: '/orders',
        name: 'Orders',
        component: () => import( /* webpackChunkName: "Orders" */ '../components/orders/orders.vue')
      }, {
        path: '/reports',
        name: 'Reports',
        component: () => import( /* webpackChunkName: "Reports" */ '../components/reports/reports.vue')
      }, {
        path: '/users',
        name: 'Users',
        component: () => import( /* webpackChunkName: "Users" */ '../components/user/Users.vue')
      }
    ]
  }
]
const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//路由导航守卫 控制页面的访问权限
router.beforeEach((to, from, next) => {
  if (to.path === '/Login') return next();
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/Login')
  next()
})
export default router