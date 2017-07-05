import Vue from 'vue'
import App from './App'
import router from './router/'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import 'normalize.css/normalize.css';
// import 'assets/font/iconfont';
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
