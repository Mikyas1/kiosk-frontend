import http from "./http";
import urls from "./urls";

export default {
    auth: {
        login(payload) {
            return http.post(urls.login, payload);
        },
        register(payload) {
            return http.post(urls.register, payload);
        },
        validateCode(code) {
            return http.get(urls.validateCode + code);
        },
        validateUrl(url) {
            return http.get(urls.validateUrl + url);
        },
        validatePhone(phone) {
            return http.get(urls.validatePhone + phone);
        },
        validateEmail(email) {
            return http.get(urls.validateEmail + email);
        },
        getCategory() {
            return http.get(urls.getCategory);
        },
        forgetPassword(payload) {
            return http.post(urls.forgetPassword, payload);
        },
        updatePassword(payload) {
            return http.post(urls.updatePassword, payload);
        }
    },
    dashboard: {
        store_information: {
            get_store_info() {
                return http.get(urls.store_info);
            },
            update_store(payload) {
                return http.put(urls.store_update, payload);
            },
            delete_store() {
                return http.delete(urls.delete_store);
            },
            update_customer_support(customer_support_id, payload) {
                return http.put(urls.customer_support_update + customer_support_id, payload);
            },
            update_owner(payload) {
                return http.put(urls.update_owner, payload);
            },
            get_store_img() {
                return http.get(urls.store_image);
            },
            update_store_img(payload) {
                return http.post(urls.store_image_upload, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
            },
            update_branch(branchId, payload) {
                return http.put(urls.update_branch + branchId, payload);
            },
            delete_branch(branchId) {
                return http.delete(urls.delete_branch + branchId);
            },
            add_branch(payload) {
                return http.post(urls.add_branch, payload);
            }
        },
        inventory: {
            get_inventory() {
                return http.get(urls.get_inventory);
            },
            get_store_tag() {
                return http.get(urls.get_store_tag);
            },
            add_item(payload) {
                return http.post(urls.add_item, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
            },
            delete_item(item_id) {
                return http.delete(urls.delete_item + item_id);
            },
            update_item_data(data) {
                return http.put(urls.update_item_data, data);
            },
            delete_item_image(data) {
                return http.delete(urls.delete_item_image, {data: data});
            },
            upload_item_image(payload) {
                return http.put(urls.upload_item_image, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
        },
        packages: {
            buy_tokens() {
                return http.put(urls.buy_tokens);
            },
        },
        edit_site: {
            get_themes() {
                return http.get(urls.get_themes);
            },
            update_theme(theme_id) {
                return http.put(urls.update_theme + theme_id);
            }
        },
        dashboard: {
            get_activity(data) {
                return http.get(urls.get_activity + data);
            }
        }
    }
}