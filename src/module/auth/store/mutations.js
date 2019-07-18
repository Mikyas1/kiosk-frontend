export default {
    // SET_STORE_ID: (state, storeId) => {
    //   state.storeId = storeId;
    // },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    // SET_OWNER: (state, owner) => {
    //   state.owner = owner;
    // },
    RESET: state => {
      state.token = null;
      // state.owner = null;
      // state.storeId = null;
    },
    // SET_OWNER_NAME: (state, name) => {
    //   state.owner.firtName = name.firstName;
    //   state.owner.lastName = name.lastName;
    // }
  };