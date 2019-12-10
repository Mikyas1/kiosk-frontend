import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
    namespaced: true,
    state: {
        // WHICH PAGE IS ACTIVE
        active: null,
        storeInfo: null,
        storeTags: null,
        inventory: null,
    },
    getters,
    actions,
    mutations
}
