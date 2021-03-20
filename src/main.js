import Vue from 'vue'
import App from './App'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入滑块图形验证码插件
import SlideVerify from 'vue-monoplasty-slide-verify'

Vue.use(ElementUI)
Vue.use(SlideVerify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
