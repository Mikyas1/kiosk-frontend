<template>
  <!-- PROFILE -->
  <v-flex class="xs12 sm12 md8">
    <v-card class="mt-2 mb-5" v-bind:class="$vuetify.breakpoint.xsOnly && 'mx-1' || 'ml-4 mr-2'">
      <v-card-title primary-title>
        <div>
          <div class="headline">Edit Profile</div>
          <span class="grey--text">Edit your account.</span>
        </div>
      </v-card-title>

      <v-card-text>
        
        <h2 class="mt-0 font-weight-regular">1: Profile</h2>
        <v-form v-on:submit.prevent="uploadProfile" ref="profile">
          <v-text-field
            label="First Name"
            class="input-group--focused pr-4 pl-2 mt-2"
            v-model="showFirstName"
            v-bind:rules="inputRules"
          ></v-text-field>
          <v-text-field
            label="Last Name"
            class="input-group--focused pr-4 pl-2 mt-2"
            v-model="showLastName"
            v-bind:rules="inputRules"
          ></v-text-field>
          <v-btn
            flat
            dark
            class="c_selected_btn ml-0 text-capitalize"
            v-bind:loading="loadingProfile"
            type="submit"
          >Submit</v-btn>
        </v-form>

        <h2 class="mt-4 mb-3 font-weight-regular">2: Store Name</h2>
        <v-form v-on:submit.prevent="uploadStoreName" ref="storeName">
          <v-text-field
            label="Store Name"
            class="input-group--focused pr-4 pl-2 mt-2"
            v-model="showStoreName"
            v-bind:rules="inputRules"
          ></v-text-field>

          <v-btn
            flat
            dark
            class="c_selected_btn ml-0 text-capitalize"
            v-bind:loading="loadingName"
            type="submit"
          >Submit</v-btn>
        </v-form>

        <h2 class="mt-4 mb-3 font-weight-regular">3: Store Url</h2>
        <v-form v-on:submit.prevent="uploadStoreUrl" ref="storeUrl">
          <v-text-field
            label="Store Url"
            class="input-group--focused pr-4 pl-2 mt-2"
            v-model="showStoreUrl"
            v-bind:rules="inputRules"
          ></v-text-field>

          <div class="ml-4 mb-2 mt-0">
            <v-icon small color="warning">info</v-icon>Editing your store url will change your web-sites address.
          </div>

          <v-btn
            flat
            dark
            class="c_selected_btn ml-0 text-capitalize"
            v-bind:loading="loadingUrl"
            type="submit"
          >Submit</v-btn>
        </v-form>

        <h2 class="mt-4 mb-1 font-weight-regular">4: Delete Store</h2>

          <div class="ml-0 mb-2 mt-0 warning--text">
            <v-icon small color="warning">info</v-icon>
            Deleting your store will remove all your inventory, your web-site, all your store information, all your orders and more.
          </div>

          <v-btn
            flat
            dark
            class="ml-0 text-capitalize error"
            v-bind:loading="loadingUrl"
            v-on:click="deleteDialog = !deleteDialog"
          >Delete Store</v-btn>

          <v-dialog max-width="600px" v-model="deleteDialog">
            <v-card>
              <div primary-title>
                <div class="headline pt-4 ml-4"><v-icon class="error--text">delete</v-icon> Delete Store - {{storeInfo.storeName}}</div>
              </div>
              <v-card-text>
                <div class="ml-3 mb-2 mt-0 warning--text">
                  <v-icon small color="warning">info</v-icon>
                  Deleting your store will remove all your inventory, your web-site, all your store information, all your orders and more.
                </div>
                <div class="ml-0 mb-2 mt-4">
                  <v-icon small color="warning">warning</v-icon>
                  Are your sure, you want to delete your store?
                </div>
                  <v-btn
                    flat
                    dark
                    class="error ml-0 text-capitalize"
                    v-on:click="deleteStore"
                    :loading="deleteStoreLoading"
                  >Delete Store</v-btn>
                  <v-btn
                    flat
                    class="c_selected_btn text-capitalize white--text"
                    v-on:click="deleteDialog = !deleteDialog "
                  >Cancle</v-btn>
              </v-card-text>
            </v-card>
          </v-dialog>

      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import { getErrorMessage } from "@/resources/helper";

import { mapGetters } from "vuex";

export default {
  name: "storeInformationProfile",

  computed: {
    ...mapGetters({
      owner: "dashboard/owner",
      storeProfile: "dashboard/storeProfile",
      storeInfo: "dashboard/storeInfo"
    })
  },

  data() {
    return {
      loadingName: false,
      loadingUrl: false,
      loadingProfile: false,
      deleteStoreLoading: false,

      showStoreName: "",
      showStoreUrl: "",
      showFirstName: "",
      showLastName: "",

      inputRules: [v => v.length >= 3 || "Minimum length is 3 characters"],
      deleteDialog: false,
    };
  },

  methods: {
    uploadStoreName: function() {
      if (
        this.$refs.storeName.validate() &&
        this.showStoreName !== this.storeProfile.storeName
      ) {
        this.loadingName = true;

        var data = {
          data: { storeName: this.showStoreName.trim() },
          type: "storeName"
        }

        this.$store
          .dispatch("dashboard/update_store", data)

          .then(() => {
            this.$store.commit("SET_SNACKBAR", {
              message: "Successfully edited your Store Name",
              value: true,
              status: "success"
            });
            this.loadingName = false;
          })

          .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
            this.loadingName = false;
          });
      }
    },

    uploadStoreUrl: function() {
      if (
        this.$refs.storeUrl.validate() &&
        this.showStoreUrl !== this.storeProfile.storeUrl
      ) {
        this.loadingUrl = true;

        var data = {
          data: { storeUrl: this.showStoreUrl.trim() },
          type: "storeUrl"
        }

        this.$store
          .dispatch("dashboard/update_store", data)

          .then(() => {
            this.$store.commit("SET_SNACKBAR", {
              message: "Successfully edited your Store Url",
              value: true,
              status: "success"
            });
            this.loadingUrl = false;
          })

          .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
            this.loadingUrl = false;
          });
      }
    },

    uploadProfile: function() {
      if (this.$refs.profile.validate()) {
        this.loadingProfile = true;

        var data = {
          firstName: this.showFirstName.trim(),
          lastName: this.showLastName.trim()
        };

        this.$store
          .dispatch("dashboard/update_owner", data)

          .then(() => {
            this.$store.commit("SET_SNACKBAR", {
              message: "Successfully edited your Profile",
              value: true,
              status: "success"
            });
            this.loadingProfile = false;
          })

          .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
            this.loadingProfile = false;
          });
      }
    },
    deleteStore: function(){
      this.deleteStoreLoading = true;
      this.$store
          .dispatch("dashboard/delete_store")
          .then(() => {
            this.$store.commit("SET_SNACKBAR", {
              message: "Successfully Deleted your Store",
              value: true,
              status: "success"
            });
            this.deleteStoreLoading = false;
            this.$router.push({ name: 'logOut' })
          })

          .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
            this.deleteStoreLoading = false;
            // this.deleteDialog = false;
          });

    }
  },

  created() {
    this.showFirstName = this.owner.firtName;
    this.showLastName = this.owner.lastName;
    this.showStoreName = this.storeProfile.storeName;
    this.showStoreUrl = this.storeProfile.storeUrl;
  }
};
</script>

<style>
</style>
