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
    },
    SET_EMAIL: (state, data) => {
      state.storeInfo.emails = null;
      state.storeInfo.emails = data;
    },
    SET_PHONE_NO: (state, data) => {
      state.storeInfo.phones = null;
      state.storeInfo.phones = data;
    },
    ADD_BRANCH: (state, data) => {
      state.storeInfo.branches.push(data);
    },
    REMOVE_BRANCH: (state, branchId) => {
      state.storeInfo.branches = state.storeInfo.branches.filter(
        x => x.id !== branchId
      );
    },
    EDIT_BRANCH: (state, data) => {
      let index = state.storeInfo.branches.findIndex(
        x => x.id == data.id
      );
      state.storeInfo.branches[index] = data;
    }
  };