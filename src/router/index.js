import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import {getCookie} from '@/config/mUtils'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Layout from '@/components/commen/Layout';
const login = r => require.ensure([], () => r(require('@/components/login/login')), 'login')

const home = r => require.ensure([], () => r(require('@/components/home/home')), 'home')
const admin = r => require.ensure([], () => r(require('@/components/home/children/admin/admin')), 'admin')
const storefind = r => require.ensure([], () => r(require('@/components/home/children/storefind/storefind')), 'storefind')
const storecreate = r => require.ensure([], () => r(require('@/components/home/children/storecreate/storecreate')), 'storecreate')
const storecreate2 = r => require.ensure([], () => r(require('@/components/home/children/storecreate2/storecreate2')), 'storecreate2')

const resources = r => require.ensure([], () => r(require('@/components/resources/resources')), 'resources')
const msq = r => require.ensure([], () => r(require('@/components/resources/children/msq/msq')), 'msq')
const privately = r => require.ensure([], () => r(require('@/components/resources/children/privately/privately')), 'privately')
const pub = r => require.ensure([], () => r(require('@/components/resources/children/pub/pub')), 'pub')
const biz = r => require.ensure([], () => r(require('@/components/biz/biz')), 'biz')
const visit = r => require.ensure([], () => r(require('@/components/resources/children/visit/visit')), 'visit')
const visitcreate = r => require.ensure([], () => r(require('@/components/visitcreate/visitcreate')), 'visitcreate')
Vue.use(Router)

const routes = [
    {
      path: '/',
      component: App,
      children: [
        { path: '',redirect: '/login'},
        { path: '/login',component: login},
        { path: '/home',component: Layout,meta: {requireAuth: true,},redirect: '/home/admin',
          children: [
            { path: 'admin', component: admin },
            { path: 'storefind', component: storefind },
            { path: 'storecreate', component:storecreate },
            { path: 'storecreate2', component:storecreate2 }
          ]
        },
        { path: '/resources',component: Layout,redirect: '/resources/pub',
          children: [
            { path: 'msq', component: msq},
            { path: 'privately', component: privately},
            { path: 'pub', component: pub},
            { path: 'visit', component: visit},
          ]
        },
        { path: '/biz',component: biz},
        { path: '/visitcreate',component: visitcreate}
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
