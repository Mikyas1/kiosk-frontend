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
            update_customer_support(customer_support_id, payload) {
                return http.put(urls.customer_support_update + customer_support_id, payload);
            },
            update_owner(payload, ownerId) {
                return http.put(urls.update_owner + ownerId, payload);
            },
            get_store_img() {
                return http.get(urls.store_image)
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
            add_branch(branchId, payload) {
                return http.post(urls.update_branch + branchId, payload);
            }
        }
    }
}