export default {
    SET_ACTIVE_PAGE: (state, data) => {
      state.active = data;
    },
    SET_STORE_INFO: (state, store) => {
      state.storeInfo = store;
    },
    RESET: (state, data) => {
      state.storeInfo = data;
      state.active = data;
    },
    SET_STORE_DESCRIPTION: (state, data) => {
      state.storeInfo.description = data;
    },
    SET_WARRANTY_INFORMATION: (state, data) => {
      state.storeInfo.customerSupport.warrantyInfo = data;
    },
    SET_RETURN_POLICY: (state, data) => {
      state.storeInfo.customerSupport.returnPolicy = data;
    },
    SET_CUSTOMER_CARE: (state, data) => {
      state.storeInfo.customerSupport.customerCare = data;
    },
    SET_STORE_NAME: (state, data) => {
      state.storeInfo.storeName = data;
    },
    SET_STORE_URL: (state, data) => {
      state.storeInfo.storeUrl = data;
    },
    SET_OWNER: (state, data) => {
      state.storeInfo.owner.firtName = data.firstName;
      state.storeInfo.owner.lastName = data.lastName;
    },
    SET_LOCATION: (state, data) => {
      state.storeInfo.location = data;
    }
  };