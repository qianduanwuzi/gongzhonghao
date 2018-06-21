import axios from "axios";
import whiteList from "../config/whiteList";
import Store from "storejs"
import router from '../router'
import store from "@/vuex";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 100000;

axios.interceptors.request.use(
  config => {
    if(config.url != '/-1/login')  {
      config.headers.Authorization =Store.get('tokentype')+'_'+Store.get('token');
    }
    return config;
  },
  error => {
    store.dispatch('setTip', { type: 'warn', msg: '没有网络' })
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  res => {
    if (!whiteList.some(one =>  res.config.url.indexOf(one) >=0 )) { //没匹配到白名单
      if(res.status == 200) {
        // 令牌过期、失效
        if(res.data.code != '100001') {
          if(res.data.code == '100101' || res.data.code == '100100') {
            Store.remove('token')
            router.push('/login')
          }else{
            store.dispatch('setTip', { type: 'warn', msg: res.data.message })
          } 
        }
       
      }else {
        store.dispatch('setTip', { type: 'warn', msg: res.data.message })
      }
    }
    return res;
  },
  err => {
    store.dispatch('setTip', { type: 'warn', msg: err.response.data.message })
    return Promise.reject(err);
  }
);

export default axios;
