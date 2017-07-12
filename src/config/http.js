import Vue from 'vue'
import store from '../store'
import router from '../router'
import axios from 'axios'
import {getCookie} from './mUtils'
import {OUT_LOGIN} from '@/store/mutation-types.js'
import { Notification } from 'element-ui';
axios.defaults.timeout = 30000;
import { Loading } from 'element-ui';
// http request 拦截器
let loadingInstance = null;
console.log
axios.interceptors.request.use(
    config => {
      loadingInstance = Loading.service({target:document.querySelector('#admin-main')});
      return config;
    },
    err => {
      loadingInstance.close()
      this.$message.error(err);
      return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
      loadingInstance.close()
      if(response.data.Code == 3008){
        Notification.info({
          title: '消息',
          message: response.data.Msg
        });
        store.commit(OUT_LOGIN);
        router.push('/login?redirect='+router.currentRoute.fullPath)
      }if(response.data.Code == 3006){
        Notification.info({
          title: '消息',
          message: response.data.Msg
        });
      } else{
        return response;
      }

    },
    error => {
      if (error.response) {
        if(error.response.Code == 3008){
          store.commit(OUT_LOGIN);
          router.push('/login?redirect='+router.currentRoute.fullPath)
        }
    }
    return Promise.reject(error)
});
Vue.prototype.$ajax = axios;

