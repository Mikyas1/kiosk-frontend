export default {
  active: state => state.active,
  owner: state => state.storeInfo.owner,
  storeInfo: state => state.storeInfo,
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
  storeImage: state => state.storeInfo.storeProfile[0].path,
};
