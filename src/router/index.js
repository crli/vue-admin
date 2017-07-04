import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import {getCookie} from '@/config/mUtils'
const login = r => require.ensure([], () => r(require('@/components/login/login')), 'login')
const admin = r => require.ensure([], () => r(require('@/components/admin/admin')), 'admin')
Vue.use(Router)

const routes = [
    {
      path: '/',
      component: App,
      children: [
      {
        path: '',
        redirect: '/login'
      },
      {
        path: '/login',
        component: login
      },
      {
        path: '/admin',
        component: admin,
        meta: {
            requireAuth: true,
        }
      }
      ]
    }

];
const router =  new Router({
  routes: routes,
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production'
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
      if (getCookie("ATOKEN")) {
          next();
      }
      else {
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        })
      }
  }
  else {
    next();
  }
})
export default router;
