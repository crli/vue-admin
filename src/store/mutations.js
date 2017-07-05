import {
	GET_USERINFO,OUT_LOGIN,NONE_GO
} from './mutation-types.js'

import {setCookie,removeStore,delCookie,setStore} from '../config/mUtils'

export default {
	//获取用户信息
	[GET_USERINFO](state, info) {
    if (state.userInfo && (state.userInfo.AccountName !== info.AccountName   )) {
      return;
    };

    if (info&&!info.Msg) {
      state.userInfo = info;
      state.login = true;
    } else {
      state.userInfo = null;
    }
	},
  //退出登录
  [OUT_LOGIN](state) {
    state.userInfo = null;
    delCookie("ATOKEN")
  },
  [NONE_GO](state,flag){
    state.nonego = flag
  }
}
