import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',// 'mdi' || 'fa' || 'fa4'
  // c_ == custom
  theme: {
    primary: '#1e88e5',
    secondary_1: '#fc4b6c',
    c_light: '#EEF5F9',
    c_primary_dark: '#1C81D9',
    c_text: '#607d8b',
    c_text_1: '#67757c',
    c_text_2: '#455A6B',
    c_selected_btn: '#26C6DA',
  }
})
