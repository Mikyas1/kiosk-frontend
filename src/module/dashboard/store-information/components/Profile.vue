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
      <h2 class="my-0 ml-3 font-weight-regular">1: Store Name</h2>

      <v-card-text>
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
            v-bind:loading="loading"
            type="submit"
          >Submit</v-btn>
        </v-form>

        <h2 class="mt-4 mb-3 font-weight-regular">2: Store Url</h2>

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
            v-bind:loading="loading"
            type="submit"
          >Submit</v-btn>
        </v-form>

        <h2 class="mt-4 font-weight-regular">3: Profile</h2>
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
            v-bind:loading="loading"
            type="submit"
          >Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import apiClient from "@/resources/apiClient";
import { getErrorMessage } from "@/resources/helper";

export default {
  name: "storeInformationProfile",

  props: {
    profile: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      loading: false,

      showStoreName: "",
      showStoreUrl: "",
      showFirstName: "",
      showLastName: "",

      inputRules: [v => v.length >= 3 || "Minimum length is 3 characters"]
    };
  },

  methods: {
    uploadStoreName: function() {
      if (
        this.$refs.storeName.validate() &&
        this.showStoreName !== this.profile.store.storeName
      ) {
        this.loading = true;

        var data = { storeName: this.showStoreName.trim() };

        apiClient.dashboard.store_information
          .update_store(data)

          .then(() => {
            this.$store.commit("SET_SNACKBAR", {
              message: "Successfully edited your Store Name",
              value: true,
              status: "success"
            });
            this.loading = false;
            this.profile.store.storeName = this.showStoreName;
          })

          .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
            this.loading = false;
            this.showStoreName = this.profile.store.storeName;
          });
      }
    },

    uploadStoreUrl: function() {
      if (
        this.$refs.storeUrl.validate() &&
        this.showStoreUrl !== this.profile.store.storeUrl
      ) {
        this.loading = true;

        var data = { storeUrl: this.showStoreUrl.trim() };

        apiClient.dashboard.store_information
          .update_store(data)

          .then(() => {
            this.$store.commit("SET_SNACKBAR", {
              message: "Successfully edited your Store Url",
              value: true,
              status: "success"
            });
            this.loading = false;
            this.profile.store.storeUrl = this.showStoreUrl;
          })

          .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
            this.loading = false;
            this.showStoreUrl = this.profile.store.storeUrl;
          });
      }
    },

    uploadProfile: function() {
      if (this.$refs.profile.validate()) {
        this.loading = true;

        var data = {
          firstName: this.showFirstName.trim(),
          lastName: this.showLastName.trim()
        };

        apiClient.dashboard.store_information
          .update_owner(data, this.profile.owner.id)

          .then(() => {
            this.$store.commit("SET_SNACKBAR", {
              message: "Successfully edited your Profile",
              value: true,
              status: "success"
            });
            this.loading = false;
            this.$store.commit("auth/SET_OWNER_NAME", data);
          })

          .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
            this.loading = false;
          });
      }
    }
  },

  created() {
    this.showFirstName = this.profile.owner.firtName;
    this.showLastName = this.profile.owner.lastName;
    this.showStoreName = this.profile.store.storeName;
    this.showStoreUrl = this.profile.store.storeUrl;
  }
};
</script>

<style>
</style>
