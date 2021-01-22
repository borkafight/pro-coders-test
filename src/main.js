import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Button, Card, Icon, Input} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

Vue.use(Button)
Vue.use(Card)
Vue.use(Icon)
Vue.use(Input)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
