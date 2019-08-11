<template>
  <!-- PROFILE -->
  <v-flex class="xs12 sm12 md8">
    <v-card class="mt-2 mb-5" v-bind:class="$vuetify.breakpoint.xsOnly && 'mx-1' || 'ml-4 mr-2'">
      <v-card-title primary-title>
        <div>
          <div class="headline">{{ $t('edit_profile') }}</div>
          <span class="grey--text">{{ $t('edit_profile_info') }}</span>
        </div>
      </v-card-title>

      <v-card-text>
        
        <h2 class="mt-0 font-weight-regular">1: {{ $t('profile') }}</h2>
        <v-form v-on:submit.prevent="uploadProfile" ref="profile">
          <v-text-field
            :label="$t('first_name')"
            class="input-group--focused pr-4 pl-2 mt-2"
            v-model="showFirstName"
            v-bind:rules="inputRules"
          ></v-text-field>
          <v-text-field
            :label="$t('last_name')"
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
          >{{ $t('submit') }}</v-btn>
        </v-form>

        <h2 class="mt-4 mb-3 font-weight-regular">2: {{ $t('store_name') }}</h2>
        <v-form v-on:submit.prevent="uploadStoreName" ref="storeName">
          <v-text-field
            :label="$t('store_name')"
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
          >{{ $t('submit') }}</v-btn>
        </v-form>

        <h2 class="mt-4 mb-3 font-weight-regular">3: {{ $t('store_url') }}</h2>
        <v-form v-on:submit.prevent="uploadStoreUrl" ref="storeUrl">
          <v-text-field
            :label="$t('store_url')"
            class="input-group--focused pr-4 pl-2 mt-2"
            v-model="showStoreUrl"
            v-bind:rules="inputRules"
          ></v-text-field>

          <div class="ml-4 mb-2 mt-0">
            <v-icon small color="warning">info</v-icon>
            {{ $t('store_url_info') }}
          </div>

          <v-btn
            flat
            dark
            class="c_selected_btn ml-0 text-capitalize"
            v-bind:loading="loadingUrl"
            type="submit"
          >{{ $t('submit') }}</v-btn>
        </v-form>

        <h2 class="mt-4 mb-1 font-weight-regular">4: {{ $t('delete_store') }}</h2>

          <div class="ml-0 mb-2 mt-0 warning--text">
            <v-icon small color="warning">info</v-icon>
            {{ $t('delete_store_info') }}
          </div>

          <v-btn
            flat
            dark
            class="ml-0 text-capitalize error"
            v-bind:loading="loadingUrl"
            v-on:click="deleteDialog = !deleteDialog"
          >{{ $t('delete_store') }}</v-btn>

          <v-dialog max-width="600px" v-model="deleteDialog">
            <v-card>
              <div primary-title>
                <div class="headline pt-4 ml-4"><v-icon class="error--text">delete</v-icon> {{ $t('delete_store') }} - {{storeInfo.storeName}}</div>
              </div>
              <v-card-text>
                <div class="ml-3 mb-2 mt-0 warning--text">
                  <v-icon small color="warning">info</v-icon>
                    {{ $t('delete_store_info') }}
                </div>
                <div class="ml-0 mb-2 mt-4">
                  <v-icon small color="warning">warning</v-icon>
                    {{ $t('delete_store_info_prompt') }}
                </div>
                  <v-btn
                    flat
                    dark
                    class="error ml-0 text-capitalize"
                    v-on:click="deleteStore"
                    :loading="deleteStoreLoading"
                  >{{ $t('delete_store') }}</v-btn>
                  <v-btn
                    flat
                    class="c_selected_btn text-capitalize white--text"
                    v-on:click="deleteDialog = !deleteDialog "
                  >{{ $t('cancle') }}</v-btn>
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
