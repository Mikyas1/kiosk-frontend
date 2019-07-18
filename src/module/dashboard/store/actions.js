import apiClient from "@/resources/apiClient";

export default {

    update_store: ({ commit, }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.store_information
            .update_store(data.data)
            .then(response => {
                if (data.type == 'description'){
                    commit("SET_STORE_DESCRIPTION", data.data.description);
                }
                else if (data.type == 'storeName'){
                    commit("SET_STORE_NAME", data.data.storeName)
                }
                else if (data.type == 'storeUrl'){
                    commit("SET_STORE_URL", data.data.storeUrl)
                }
                else if (data.type == 'location'){
                    commit("SET_LOCATION", data.data.location)
                }
                resolve({ results: response });
            })
            .catch(e => {
                reject(e);
            });
        });
    },

    update_customer_support: ({ commit, }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.store_information
            .update_customer_support(data.id, data.data)
            .then(response => {
                if (data.type == 'W') {
                    commit("SET_WARRANTY_INFORMATION", data.data.warrantyInfo); 
                }
                else if (data.type == 'R') {
                    commit("SET_RETURN_POLICY", data.data.returnPolicy); 
                }
                else if (data.type == 'C') {
                    commit("SET_CUSTOMER_CARE", data.data.customerCare); 
                }
                resolve({ results: response });
            })
            .catch(e => {
                reject(e);
            });
        });
    },

    update_owner: ({ commit, }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.store_information
            .update_owner(data)
            .then(response => {
                commit("SET_OWNER", data); 
                resolve({ results: response });
            })
            .catch(e => {
                reject(e);
            });
        });
    },


};