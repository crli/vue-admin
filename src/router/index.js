import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import {getCookie} from '@/config/mUtils'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Layout from '@/components/commen/Layout';
const login = r => require.ensure([], () => r(require('@/components/login/login')), 'login')
const admin = r => require.ensure([], () => r(require('@/components/admin/admin')), 'admin')
const storefind = r => require.ensure([], () => r(require('@/components/store/storefind')), 'storefind')
// const storecreate = r => require.ensure([], () => r(require('@/components/store/storecreate')), 'storecreate')
// const storecreate2 = r => require.ensure([], () => r(require('@/components/store/storecreate2')), 'storecreate2')
import storecreate2 from '@/components/store/storecreate2';
import storecreate from '@/components/store/storecreate';
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
        component: Layout,
        meta: {
            requireAuth: true,
        },
        children: [{ path: 'index', component: admin }]
      },
      {
        path: '/storefind',
        component: Layout,
        children: [
          { path: 'index', component: storefind}
        ]
      },
      {
        path: '/storecreate',
        component: Layout,
        children: [
          { path: 'frist', component: storecreate},
          { path: 'second', component: storecreate2}
        ]
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
  NProgress.start();
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
router.afterEach(() => {
  NProgress.done();
});
export default router;
