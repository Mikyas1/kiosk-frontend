const urls = {

    // FOR REGISTERATION
    validateUrl: '/registration/validateUrl/',
    validateEmail: '/registration/validateEmail/',
    validatePhone: '/registration/validatePhone/',
    validateCode: '/registration/validateCode/',
    register: '/registration/create',

    // FOR LOGIN
    login: "/kiosks/login",

    // FOR STORE INFORMATION
    store_info: '/kiosks/getStore/',
    store_update: '/kiosks/store/update/',
    customer_support_update: '/kiosks/customerSupport/update/',
    update_owner: '/kiosks/storeOwner/update/',

    // FOR STORE IMAGE
    store_image: 'images/getStorePicture/',
    store_image_upload: '/images/uploadProfilePicture/',

    // FOR STORE BRANCH
    update_branch: '/kiosks/branch/add/',
    delete_branch: '/kiosks/branch/delete',

}

export default urls;