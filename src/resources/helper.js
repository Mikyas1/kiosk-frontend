const getErrorMessage = function (error) {
  try {
    switch (error.response.status) {
      case 404:
        return 'Can\'t reach the kiosk Site';
      case 500:
        return 'Internal server error occured';
      case 401:
        return 'Unauthorized to access your request';
      case 405:
        return 'Unauthorized to access your request method';
      default:
        return error.response.data;
    }
  }
  catch (err) {
    return 'Can\'t reach the kiosk Site';
  }
}

const urlify = function (storeName) {
  return storeName.toLowerCase().trim().replace(/ /g, '-').replace(/'|;|!|@|#|$|%|^|&|_|=|:|"|<|>/g, '');
}

export { getErrorMessage, urlify };