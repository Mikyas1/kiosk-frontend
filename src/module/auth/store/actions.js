import apiClient from "@/resources/apiClient";

export default {
    
  login: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      apiClient.auth.login(data)
        .then(response => {
          commit("SET_TOKEN", response.data.token);
          commit("SET_OWNER", response.data.store.owner);
          commit("SET_STORE_ID", response.data.store.storeId);
          resolve({ results: response });
        })
        .catch(e => {
          reject(e);
        });
    });
  },
    
  logout: ({ commit }) => {
    commit("RESET");
  },

  register: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      apiClient.auth.register(data)
      .then(response => {
        commit("SET_TOKEN", response.data.token);
        commit("SET_OWNER", response.data.store.owner);
        commit("SET_STORE_ID", response.data.store.storeId);
        resolve({ results: response });
      })
      .catch(e => {
        reject(e);
      });
    });
  },
}