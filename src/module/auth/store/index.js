import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
    namespaced: true,
    state: {
        owner: {},
        token: null,
        storeId: null,
    },
    getters,
    actions,
    mutations
}


// MANUAL
// TO SET OR GET INDIVIDUAL VAL
// this.$store.state['auth'].token = "asfkasjasljhfhfkjasfhas"
// TO COMMIT MUTATION THIS TRIGGERS DATA TO BE SEVED TO LOCAL BROWTHER STORAGE
// this.token = this.$store.commit("auth/SET_TOKEN", "asdfsdfasffaas")
// TO ACCUSS GETTERS
// this.token = this.$store.getters["auth/token"]