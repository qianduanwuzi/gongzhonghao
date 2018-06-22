import Vue from 'vue'
import Router from 'vue-router'
import TakeOrOrder from '@/modules/takeOrder' 
import Ticket from '@/modules/ticket' 
import Help from '@/modules/help' 
import Portal from '@/portal'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'portal',
      component: Portal,
      children: [
        {
          name: '提货/预约', // portal header显示title '_xxxx'表示portal 不显示footer-nav
          path: 'takeororder',
          component: TakeOrOrder,
          meta:{requireAuth: true}
        },
        {
          name: '我的蟹券', 
          path: 'ticket',
          component: Ticket,
          meta:{requireAuth: true}
        },
        {
          name: '客服/帮助', 
          path: 'help',
          component: Help,
          meta:{requireAuth: true}
        },
      ]
    }
  ]
})
