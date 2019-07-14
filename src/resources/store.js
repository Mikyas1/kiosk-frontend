import Vue from "vue";
import Vuex from "vuex";
import modules from "../module/stores";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    key: 'kiosk',
    storage: window.localStorage,// or window.sessionStorage, or localForage
    reducer: (state) => (
        {
            auth: state.auth,
            lang: state.lang,
            dashboard: state.dashboard,
            home: state.home,
        }
    ),
})

export default new Vuex.Store({
    modules,
    // SNACKBAR STORE
    state: {
        snackbar: {
            message: '',
            value: false,
            status: '',
            timeout: 7000,
            multiline: false,
        }
    },
    getters: {
        snackbar: store => store.snackbar,
    },
    mutations: {
        SET_SNACKBAR: (store, payload) => {

            // CLOSE_SNACKBAR
            store.snackbar.value = false;
            store.snackbar.multiline = false;
            store.snackbar.timeout = 7000;
            store.snackbar.message = null;
            store.snackbar.status = null;

            store.snackbar.message = payload.message;
            store.snackbar.multiline = (payload.message.length > 50) ? true : false
            store.snackbar.value = payload.value;
            store.snackbar.status = payload.status;
            if (payload.timeout) {
                store.snackbar.timeout = payload.timeout;
            }
            if (payload.multiline) {
                store.snackbar.multiline = payload.multiline;
            }
        },
        CLOSE_SNCKBAR: (store) => {
            store.snackbar.value = false;
            store.snackbar.multiline = false;
            store.snackbar.timeout = 7000;
            store.snackbar.message = null;
            store.snackbar.status = null;
        }
    },
    plugins: [vuexLocalStorage.plugin]
});