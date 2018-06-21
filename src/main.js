// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "@/vuex";
import fastclick from 'fastclick'
import api from '@/fetch/api'
import componentsArray from "@/config/components";
import * as filters from './filters' 
import '@/directives'
Vue.config.productionTip = false
window.api = api
// fix click-delay 300ms
fastclick.attach(document.body)

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 注册全局自定义组件
componentsArray.forEach(component => {
  Vue.component(component.name, component.instance)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
