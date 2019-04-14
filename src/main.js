import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './resources/router'
import store from './resources/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
