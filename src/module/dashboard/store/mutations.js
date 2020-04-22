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
      state.storeTags = data;
      state.inventory = data;
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
    },
    SET_STORE_IMAGE: (state, path) => { 
      state.storeInfo.storeImage = [{"path": path}];
    },
    SET_STORE_TAGS: (state, data) => {
      state.storeTags = data;
    },
    SET_STORE_TOKEN: (state, data) => {
      if (data.type == 'ADD') {
        state.storeInfo.token = state.storeInfo.token + data.data;
      } else if(data.type == 'SUB'){
        state.storeInfo.token = state.storeInfo.token - data.data;
      } else if(data.type == 'SET') {
        state.storeInfo.token = data.data;
      }
    },
    SET_INVENTORY: (state, data) => {
      state.inventory = data;
    },
    ADD_TO_INVENTORY: (state, data) => {
      state.inventory.push(data);
    },
    DELETE_INVENTORY: (state, id) => {
      state.inventory = state.inventory.filter(x => x.id !== id);
    },
    SUBSTUTE_INVENTORY: (state, data) => {
      let index = state.inventory.findIndex(x => x.id == data.id);
      state.inventory[index] = null;
      state.inventory[index] = data;
    },
    UPDATE_INVENTORY_IMAGE_LIST: (state, data) => {
      state.inventory.filter(x => x.id == data.itemId)[0].images = data.data;
    },
    REPLACE_INVENTORY_IMAGE: (state, data) => {
      var itemId = data.itemId;
      // delete only one at a time
      var imageId = data.imageId[0];
      var mainImage = data.mainImage;
      var item = state.inventory.filter(x => x.id == itemId)[0];
      if (mainImage == null) {
        // if the deleted image is not main image remove the image
        item.images = item.images.filter(x => x.id != imageId);
      } else {
        // if the deleted image is main image
        // first remove the main image from the photo list
        item.images = item.images.filter(x => x.id != imageId);
        // then set the substituting image as main
        var index = item.images.findIndex(x => x.id == mainImage);
        if (index !== -1) {
          item.images[index].isMain = true;
        }
      }
    },
    SET_THEME: (state, data) => {
      state.storeInfo.theme = data;
    }
};