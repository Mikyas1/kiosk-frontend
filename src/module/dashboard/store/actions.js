import apiClient from "@/resources/apiClient";

export default {

    // FOR STORE INFORMATION
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
                else if (data.type == 'storeEmail'){
                    commit("SET_EMAIL", response.data.emails)
                }
                else if (data.type == 'storePhone'){
                    commit('SET_PHONE_NO', response.data.phones)
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

    add_branch: ({ commit, }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.store_information
            .add_branch(data)
            .then(response => {
                commit("ADD_BRANCH", response.data);
                resolve({ results: response });
            })
            .catch(e => {
                reject(e);
            });
        });
    },

    delete_branch: ({ commit, }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.store_information
            .delete_branch(data)
            .then(response => {
                commit("REMOVE_BRANCH", data);
                resolve({ results: response });
            })
            .catch(e => {
                reject(e);
            });
        });
    },

    update_branch: ({ commit, }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.store_information
            .update_branch(data.id, data.data)
            .then(response => {
                commit("EDIT_BRANCH", response.data);
                resolve({ results: response });
            })
            .catch(e => {
                reject(e);
            });
        });
    },

    delete_store: () => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.store_information
            .delete_store()
            .then(response => {
                resolve({ results: response });
            })
            .catch(e => {
                reject(e);
            });
        });
    },

    update_image: ({ commit, }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.store_information
            .update_store_img(data)
            .then(response => {
                // update store profile
                commit("SET_STORE_IMAGE", response.data[0]);
                resolve(response.data[0]);
            })
            .catch(e => {
                reject(e);
            });
        });
    },

    // FOR INVENTORY
    get_store_tag: ({ commit, },) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.inventory
            .get_store_tag()
            .then(response => {
                commit("SET_STORE_TAGS", response.data);
                resolve(response);
            })
            .catch(e => {
                reject(e);
            })
        })
    },
    get_inventory: ({ commit, }) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.inventory
            .get_inventory()
            .then(response => {
                commit("SET_INVENTORY", response.data);
                resolve(response.data);
            })
            .catch(e => {
                reject(e);
            })
        })
    },
    add_item: ({ commit, }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.inventory
            .add_item(data)
            .then(response => {
                commit("ADD_TO_INVENTORY", response.data);
                // update store token
                commit("SET_STORE_TOKEN", {type: 'SUB', data: response.data.token});
                resolve(response.data); 
            })
            .catch(e => {
                reject(e);
            });
        });
    },
    delete_item: ({ commit, }, id) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.inventory
            .delete_item(id)
            .then(response => {
                commit("DELETE_INVENTORY", id);
                resolve(response.data);
            })
            .catch(e => {
                reject(e);
            })
        })
    },
    update_item_data: ({ commit, }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.inventory
            .update_item_data(data)
            .then(response => {
                // commit or change item
                commit("SUBSTUTE_INVENTORY", response.data);
                commit("SET_STORE_TOKEN", {type: 'SUB', data: response.data.token});
                resolve(response.data);
            })
            .catch(e => {
                reject(e);
            })
        })
    },
    delete_item_image: ({ commit, }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.inventory
            .delete_item_image(data)
            .then(response => {
                // commit or change item
                commit("REPLACE_INVENTORY_IMAGE", data);
                resolve(response.data);
            })
            .catch(e => {
                reject(e);
            })
        })
    },
    upload_item_image: ({ commit, }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.inventory
            .upload_item_image(data.data)
            .then(response => {
                // commit or change item
                console.log(data);
                commit("UPDATE_INVENTORY_IMAGE_LIST", {data: response.data, itemId: data.id});
                resolve(response.data);
            })
            .catch(e => {
                reject(e);
            })
        })
    },

    // PACKAGES
    buy_tokens: ({ commit, }) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.packages
            .buy_tokens()
            .then(response => {
                commit("SET_STORE_TOKEN", {type: 'SET', data: response.data})
                resolve(response.data);
            })
            .catch(e => {
                reject(e);
            })
        })
    },

    // EDIT SITE
    get_themes: ({commit,}) => {
        return new Promise((resolve, reject) => {
            apiClient.dashboard.edit_site
            .get_themes()
            .then(response => {
                resolve(response.data);
            })
            .catch(e => {
                reject(e);
            })
        })
    }
};