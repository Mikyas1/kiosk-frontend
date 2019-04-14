import Vue from "vue";
import Vuex from "vuex";
import modules from "../module/stores";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    key: 'kiosk',
    storage: window.localStorage,// or window.sessionStorage, or localForage
})

export default new Vuex.Store({
    modules,
    plugins: [vuexLocalStorage.plugin]
});