export function getErrorMessage(status, text) {
    switch(status) {
      case 404:
        return 'Can\'t reach the kiosk Site'
      case 500:
        return 'Internal server error occured'
      case 401:
        return 'Unauthorized to access your request'
      case 405:
        return 'Unauthorized to access your request method'
      default:
        return text
    }
}
