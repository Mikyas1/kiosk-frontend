import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './resources/router'
import store from './resources/store'
import { i18n } from "./resources/i18n"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
