export default {
    owner: state => state.owner,
    loggedIn: state => state.token !== null,
    token: state => state.token,
    storeId: state => state.storeId,
  };
  