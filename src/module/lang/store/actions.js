export default {
    setLang: ({ commit }, options) => {
        options.vm.$i18n.locale = options.lang;
        commit("SET_LANG", options.lang);
    }
}