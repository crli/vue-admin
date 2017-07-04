import Vue from 'vue'
import {
  getUser
} from '../service/getData'
import {
  GET_USERINFO
} from './mutation-types.js'
import {baseUrl} from '../config/env'
import {getCookie} from '@/config/mUtils'
export default {
  getUserInfo({commit,state}) {
    let Token = getCookie("ATOKEN")
    getUser(Token).then((response) => {
      if(response&&response.data){
        commit(GET_USERINFO,response.data)
      }
    })
  }
}
