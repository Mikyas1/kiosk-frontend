const urls = {

    // FOR REGISTERATION
    validateUrl: '/registration/validateUrl/',
    validateEmail: '/registration/validateEmail/',
    validatePhone: '/registration/validatePhone/',
    validateCode: '/registration/validateCode/',
    register: '/registration/create',
    getCategory: '/unsecured/getCategories',
    forgetPassword: '/registration/forgetPassword',
    updatePassword: '/registration/updatePasswrod',

    // FOR LOGIN
    login: "/kiosks/login",

    // FOR STORE INFORMATION
    store_info: '/kiosks/getStore/',
    store_update: '/kiosks/store/update/',
    customer_support_update: '/kiosks/customerSupport/update/',
    update_owner: '/kiosks/storeOwner/update/',
    delete_store: '/kiosks/delete/',

    // FOR STORE IMAGE
    store_image: 'images/getStorePicture/',
    store_image_upload: '/images/uploadProfilePicture',

    // FOR STORE BRANCH
    add_branch: '/kiosks/branch/add/',
    delete_branch: '/kiosks/branch/delete?branchId=',
    update_branch:'/kiosks/branch/update/',

    // FOR INVENTORY
    get_inventory: '/inventory/getItems/',
    get_store_tag: '/inventory/getStoreTag/',
    add_item: '/inventory/add-item/',
    delete_item: '/inventory/deleteItem/',
    update_item_data: '/inventory/updateItemData',
    delete_item_image: '/inventory/deleteItemImage',
    upload_item_image: '/inventory/uploadItemImage',

    // FOR PACKAGE
    buy_tokens: '/inventory/buyTokens',

    // FOR EDIT SITE
    get_themes: '/kiosks/getThemes/',
    update_theme: '/kiosks/themeUpdate/',

    // FOR DASHBOARD
    get_activity: '/kiosks/activityHistory',

}

export default urls;