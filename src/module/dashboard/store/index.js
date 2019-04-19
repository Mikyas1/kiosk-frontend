import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
    namespaced: true,
    state: {
        // WHICH PAGE IS ACTIVE
        active: '',
    },
    getters,
    actions,
    mutations
}
