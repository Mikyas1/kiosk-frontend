export default {
    SET_STORE_ID: (state, data) => {
      state.storeId = data;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_OWNER: (state, owner) => {
      state.owner = owner;
    },
    RESET: state => {
      state.token = null;
      state.owner = null;
    }
  };