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

    // package colors
    c_titanium: "#a0b2c6",
    c_signal_yellow: "#FCDB38",
    c_gold: "e1ad21",
    c_old_gold: "cfb53b",
    c_white_gold: "bba58e",
    c_silver: "BEC2CB",
    c_bronze: "cd7f32",
    c_yellow: "e5e500",
  }
})
