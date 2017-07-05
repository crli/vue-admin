import axios from 'axios'
import '../config/http'
import md5 from 'js-md5'
import {baseUrl,imgSrc} from '../config/env'
function changePara(obj) {
  let newObj = {};

  return newObj
}

// 获得用户信息
export const getUser = (token) => axios.post(baseUrl+'app/GetUserInfo', changePara({Token:token}))

export const StaffLogin = (UserName,PassWord) => axios.post(baseUrl+'Erp/StaffLogin', changePara({UserName:UserName,PassWord:PassWord}))

export const GetArea = (Id,Type,show) => axios.post(baseUrl+'api/GetArea', {Id:Id,Type:Type,show:show})

export const GetAllArea = () => axios.post(baseUrl+'api/GetAllArea', {})
