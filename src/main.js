import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './resources/router'
import store from './resources/store'
import { i18n } from "./resources/i18n"
import http from './resources/http';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    var vm = this;
    http.interceptors.response.use(undefined, function(err){
      return new Promise(function(){
        if (
          err.response.status === 401 &&
          err.config &&
          !err.config.__isRetryRequest
        ) {
          vm.$store.dispatch("auth/logout");
          vm.$router.push({ name: "login" });
        } else {
          throw err;
        }
      });
    });
  }
}).$mount('#app')
