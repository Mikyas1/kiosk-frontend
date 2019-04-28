export function urlify(storeName){
    return storeName.toLowerCase().trim().replace(/ /g, '-').replace(/'|;|!|@|#|$|%|^|&|_|=|:|"|<|>/g, '');
}
