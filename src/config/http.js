import Vue from 'vue'
import store from '../store'
import router from '../router'
import axios from 'axios'
import {getCookie} from './mUtils'
import {OUT_LOGIN} from '@/store/mutation-types.js'
axios.defaults.timeout = 30000;
// http request 拦截器
axios.interceptors.request.use(
    config => {
      return config;
    },
    err => {
      return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
      if(response.data.Code == 3008){
        store.commit(OUT_LOGIN);
        router.push('/login?redirect='+router.currentRoute.fullPath)
      }else{
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

