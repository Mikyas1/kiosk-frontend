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
      case 400:
        return 'The requset submited was a bad request';
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

const capitalize = function (string) {
  return string && string[0].toUpperCase() + string.slice(1).toLowerCase();
}

const getLastElement = function (array) {
  return array[array.length - 1];
}

const getMainImage = function (item) {
  if (item.images) {
    return item.images.filter(x => x.isMain == true)[0];
  } else {
    return {path: ""};
  }
}

const getListImage = function (item) {
  if (item.images) {
    return item.images.filter(x => x.isMain == false);
  } else {
    return [];
  }
}

export { getErrorMessage, urlify, capitalize, getLastElement, getMainImage, getListImage };