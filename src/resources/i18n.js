import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
    en: {
        signup: "Sign Up",
        logout: "Logout",

        // FOR NAVGATION
        dashboard: "Dashboard",
        ordersAndFaqs: "Orders and FAQs",
        inventory: "Inventory",
        editSite: "Edit Web-Site",
        storeInformation: "Store Information",
        packages: "Packages",

        language: "Language",
        android: "Android",

        // FOOTER
        footer_message: "Its always sunny at KIOSK.et",
        footer: "Kiosic.et",

        // BODY NAV
        home: "Home",
        visit_your_site: "Visit your Site",

        // ABOUT US
        about_us: "About Store",
        about_us_info: "Information about your store.",
        about_us_info_detail: "The following information is gone be displayed in your website's about us page.",
        store_description: "Store Description",
        submit: "Submit",

        // STORE IMAGE
        store_picture: "Store Picture",
        store_picture_info: "Picture of your store.",
        store_picture_info_detail: "The picture you upload here, is gone be displayed in your website's about us page.",
        no_store_image: "You haven't added store image.",
        upload_image: "Upload Image",
        change_image: "Change Image",

        // CUSTOMER SUPPORT
        customer_support: "Customer Support",
        customer_support_info: "Supports you give your Customers.",
        warranty_information: "Warranty Information",

        warranty_information_info: "This Warranty information will be applied to all your Products.",
        add_warranty_information: "Add your Warranty Information.",
        remove: "Remove",

        // RETURN POLICY
        return_policy: "Return Policy",
        return_policy_info: "This Return Policy information will be applied to all your Products.",
        add_return_policy: "Add your Return Policy.", 

        // CUSTOMER CARE
        customer_care: "Customer Care",
        customer_care_info: "This Customer Care information will be applied to all your Products.",
        add_customer_care: "Add your Customer care brifly.",

        
        // CONTACT US
        contact_us: "Contact Us",
        contact_us_info: "Information about how to Reach you",
        contact_us_info_detail: "The following Information is gone be displayed in your Contact Us page. Your customers might contact you through them.",
        store_location: "Store Location",
        country: "Country",
        region: "Region",
        city: "City",
        sub_city: "Sub City",
        buildingAndRoomNo: "Discribe Store Location",
        add_store_phone: "Add Store Phone No",
        add: "Add",
        add_store_email: "Add Store Email",


        // EDIT PROFILE
        edit_profile: "Edit Profile",
        edit_profile_info: "Edit your account.",
        profile: "Profile",
        first_name: "First Name",
        last_name: "Last Name",
        store_name: "Store Name",
        store_url: "Store Url",
        store_url_info: "Editing your store url will change your web-sites address.",
        delete_store: "Delete Store",
        delete_store_info: "Deleting your store will remove all your inventory, your web-site, all your store information, all your orders and more.",
        delete_store_info_prompt: "Are your sure, you want to delete your store?",
        cancle: "Cancel",
        
        // BRANCHES
        branch: "Branches",
        total: "Total",
        add_new_branch: "Add a New Branch.",
        add_new_branch_info: "The following Information is gone be displayed in your Contact Us page. Your customers might contact you through them.",
        branch_name: "Branch Name",
        branch_phone_no: "Branch Phone no",
        branch_location: "Branch Location",
        
        edit_branch: "Edit Branch.",
        edit: "Edit",




    },
    am: {
        signup: "ተመዝገቡ",
        logout: "ውጣ",

        // FOR NAVGATION
        dashboard: "ሰሌዳ",
        ordersAndFaqs: "ትእዛዞች እና ጥያቄዎች",
        inventory: "የእቃዎች ዝርዝር",
        editSite: "ዌብ ሳይትዎን ያርትኡ",
        storeInformation: "የድርጅቶ መረጃ",
        packages: "ጥቅሎች",

        language: "ቋንቋ",
        android: "አንድሮይድ",

        // FOOTER
        // footer_message: "በኪዎስክ አለም ፀሀይ አትጠልቅም",
        footer_message: "በኪዮስክ አለም ፀሀይ አትጠልቅም",
        footer: "ኪዮስክ ኢቲ",

        // BODY NAV
        home: "ቤት",
        visit_your_site: "ዌብ-ሳይትዎን ይጎብኙ",

        // ABOUT US
        about_us: "ስለ ድርጅቶ",
        about_us_info: "ስለ ድርጅቶ መረጃ ያስገቡ።",
        about_us_info_detail: "የሚከተሉት መረጃዎች በ ዌብሳይትዎ \"ስለ እኛ\" ገፅ ላይ የሚታዩ ይሆናል።",
        store_description: "ድርጅቶን ያብራሩ",
        submit: "አስገባ",

        // STORE IMAGE
        store_picture: "የሱቆ ፎቶ",
        store_picture_info: "የሱቆ ፎቶን ያስገቡ።",
        store_picture_info_detail: "እዚህ ያስገቡት ፎቶ በ ዌብሳይትዎ \"ስለ እኛ\" ገፅ ላይ የሚታይ ይሆናል።",
        no_store_image: "ምንም ፎቶአላስገቡም",
        upload_image: "ፎቶ አስገባ",
        change_image: "ፎቶ ቀይር",

        // CUSTOMER SUPPORT
        customer_support: "የደንበኛ ድጋፍ",
        customer_support_info: "ለደንበኛዎ የሚሰጡዋቸው ድጋፍች",
        warranty_information: "የዋራንቲ መረጃ",

        warranty_information_info: "እዚህ የሚያስገቡት የዋራንቲ መረጃ ለ ሁሉም እቃዎቾ ተግባራዊ ይሆናል።",
        add_warranty_information: "የዋራንቲዎን መረጃ ያስገቡ",
        remove: "አስወግድ",

        // RETURN POLICY
        return_policy: "የምላሽ ፖሊሲ",
        return_policy_info: "እዚህ የሚያስገቡት የምላሽ ፖሊሲ ለ ሁሉም እቃዎቾ ተግባራዊ ይሆናል።",
        add_return_policy: "የምላሽ ፖሊሲዎን ያስገቡ", 

        // CUSTOMER CARE
        customer_care: "የደንበኛ እንክብካቤ",
        customer_care_info: "እዚህ የሚያስገቡት የደንበኛ እንክብካቤ ለ ሁሉም እቃዎቾ ተግባራዊ ይሆናል።",
        add_customer_care: "የሚሰጡን የደንበኛ እንክብካቤ ያስገቡ",

        
        // CONTACT US
        contact_us: "የግንኙነት መንገዶች",
        contact_us_info: "ደንበኞችዎ እርሶን የሚያገኙበት መንገዶች",
        contact_us_info_detail: "የሚከተሉት መረጃዎች በ ዌብሳይትዎ \"የግንኙነት መንገዶች\" ገፅ ላይ የሚታይ ይሆናል፤ ደንበኞችዎ መረጃዎቹን ተጠቅሞ ሊያገኞት ይችላል።",
        store_location: "የሱቆ አድራሻ",
        country: "ሃገር",
        region: "ክልል",
        city: "ከተማ",
        sub_city: "ክፍለ ከተማ",
        buildingAndRoomNo: "የሱቆን አድራሻ ያብራሩ",
        add_store_phone: "የሱቆን ስልክ ቁጥር ያስገቡ",
        add: "አስገባ",
        add_store_email: "የሱቆን ኢሜል ያስገቡ",
        
        // EDIT PROFILE
        edit_profile: "መገለጫዎን ያርትኡ",
        edit_profile_info: "መለያዎን ያርትኡ",
        profile: "መገለጫ",
        first_name: "ስም",
        last_name: "ያባት ስም",
        store_name: "የድርጅቶ ስም",
        store_url: "የድርጅቶ ድህረገፅ አድራሻ",
        store_url_info: "የድርጅቶ ድህረገፅ አድራሻ ማርተእ የድህረገፅዎን አድራሻ ይቀይረዋል።",
        delete_store: "ድርጅቶን ይሰርዙ",
        delete_store_info: "ድርጅቶን መሰረዝ ያስገቡትን እቃዎች ፣ ድህረገፅዎን ፣ የድርጅቶን መረጃ ፣ ትእዛዞቾን እና ሌሎችንም ያጠፋቦታል።",
        delete_store_info_prompt: "እርግጠኛ ኖት ፤ ድርጅቶን መሰረዝ ይፈልጋሉ?",
        cancle: "ተወው",

        // BRANCHES
        branch: "ቅርንጫፎች",
        total: "በአጠቃላይ",
        add_new_branch: "አዲስ ቅርንጫፍ ያስገቡ",
        add_new_branch_info: "የሚከተሉት መረጃዎች በ ዌብሳይትዎ \"የግንኙነት መንገዶች\" ገፅ ላይ የሚታይ ይሆናል፤ ደንበኞችዎ መረጃዎቹን ተጠቅሞ ሊያገኞት ይችላል።",
        branch_name: "የቅርንጫፎ ስም",
        branch_phone_no: "የቅርንጫፎ ስልክ",
        branch_location: "የቅርንጫፎ አድራሻ",
        
        edit_branch: "ቅርንጫፎን ያርትኡ",
        edit: "አርትእ",



    },
};

export const i18n = new VueI18n({
    locale: "en",
    fallbackLocale: "en",
    messages
})