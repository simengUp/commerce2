import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'
import VueAxios from 'vue-axios'
/* 引用公共样式 */
import './assets/css/global.css'
/* 引用icon图标 */
import './assets/fonts/iconfont.css'
//import { padStart } from 'core-js/core/string';

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.config.productionTip = false


//全局过滤器
Vue.filter('dataFormat',function(date){
  const dt = new Date(date)

  const y = dt.getFullYear()
  const m =(dt.getMonth()+1+"").padStart(2,"0")
  const d =( dt.getDate()+"").padStart(2+"0")
  const hh = (dt.getHours()+"").padStart(2+"")
  const mm = (dt.getMinutes()+"").padStart(2+"0")
   const ss = (dt.getSeconds()+"").padStart(2+"0")

   return `${y}-${m}-${d}-${hh}:${mm}:${ss}`

})




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')