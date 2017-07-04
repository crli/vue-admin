import axios from 'axios'
import '../config/http'
// import md5 from 'js-md5'
import {baseUrl,imgSrc} from '../config/env'
function changePara(obj) {
  let newObj = {};

  return newObj
}

// 获得用户信息
export const getUser = (token) => axios.post(baseUrl+'app/GetUserInfo', changePara({Token:token}))
