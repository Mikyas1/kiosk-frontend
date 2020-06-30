export default {
  active: state => state.active,
  owner: state => state.storeInfo.owner,
  storeInfo: state => state.storeInfo,
  storeUrl: state => state.storeInfo.storeUrl,
  storeDescription: state => state.storeInfo.description,
  customerSupport: state => state.storeInfo.customerSupport,
  storeProfile: state => {
    return {
      storeName: state.storeInfo.storeName,
      storeUrl: state.storeInfo.storeUrl,
      id: state.storeInfo.owner.id
    }
  },
  contactUs: state => {
    return {
      location: state.storeInfo.location,
      emails: state.storeInfo.emails,
      phones: state.storeInfo.phones
    }
  },
  branchs: state => state.storeInfo.branches,
  storeImage: state => {
    if(state.storeInfo.storeImage[0]){
      return state.storeInfo.storeImage[0].path
    } else {
      return ""
    }
  },
  storeCategory: state => {
    return state.storeInfo.categories.map(x => x.name);
  },
  storeTags: state => state.storeTags,
  storeToken: state => state.storeInfo.token,
  inventory: state => state.inventory,
  isInventoryNull: state => {
    if (state.inventory === null) {
      return true;
    } else {
      return false;
    }
  },
  themeSelected: state => state.storeInfo.theme
};
