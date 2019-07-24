import apiClient from "@/resources/apiClient";

export default {
    
  login: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      apiClient.auth.login(data)
        .then(response => {
          commit("SET_TOKEN", response.data.token);
          // commit("SET_OWNER", response.data.store.owner);
          // commit("SET_STORE_ID", response.data.store.storeId);
          commit("dashboard/SET_STORE_INFO", response.data.store, { root: true });
          resolve({ results: response });
        })
        .catch(e => {
          reject(e);
        });
    });
  },
    
  logout: ({ commit }) => {
    commit("RESET");
    commit("dashboard/RESET", null, { root: true });
    // var cookies = document.cookie.split(";");

    // for (var i = 0; i < cookies.length; i++) {
    //   var cookie = cookies[i];
    //   var eqPos = cookie.indexOf("=");
    //   var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //   document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // }
  },

  register: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      apiClient.auth.register(data)
      .then(response => {
        commit("SET_TOKEN", response.data.token);
        // commit("SET_OWNER", response.data.store.owner);
        // commit("SET_STORE_ID", response.data.store.storeId);
        commit("dashboard/SET_STORE_INFO", response.data.store, { root: true });
        resolve({ results: response });
      })
      .catch(e => {
        reject(e);
      });
    });
  },
}