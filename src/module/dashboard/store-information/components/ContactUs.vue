<template>
  <!-- CONTACT US -->
  <v-flex class="xs12 sm12 md8">
    <v-card class="my-4 mb-5" v-bind:class="$vuetify.breakpoint.xsOnly && 'mx-1' || 'ml-4 mr-2'">
      <v-card-title primary-title>
        <div>
          <div class="headline">{{ $t('contact_us') }}</div>
          <span class="grey--text">{{ $t('contact_us_info') }}</span>
        </div>
      </v-card-title>

      <v-card-text>
        <div class="ml-2">
          <v-icon small color="primary">info</v-icon>
          {{ $t('contact_us_info_detail') }}
        </div>

        <!-- STORE LOCATION -->
        <h2 class="font-weight-regular mt-4">1: {{ $t('store_location') }}</h2>

        <v-form ref="location" v-on:submit.prevent="uploadLocation">
          <v-select
            v-bind:items="countries"
            :label="'* ' + $t('country')"
            item-text="Country"
            item-value="abbr"
            single-line
            class="pr-4 pl-2"
            v-model="locationInformation.country"
            v-bind:rules="[(v) => v.length > 0 || 'Country is required']"
          ></v-select>

          <v-select
            v-bind:items="regions"
            :label="'* ' + $t('region')"
            item-text="Region"
            item-value="abbr"
            single-line
            class="pr-4 pl-2"
            v-model="locationInformation.region"
            v-bind:rules="[(v) => v.length > 0 || 'Region is required']"
          ></v-select>

          <v-text-field
            :label="'* ' + $t('city')"
            class="input-group--focused pr-4 pl-2"
            v-model="locationInformation.city"
            v-bind:rules="inputRules"
          ></v-text-field>

          <v-text-field
            :label="$t('sub_city')"
            class="input-group--focused pr-4 pl-2"
            v-model="locationInformation.sub_city"
          ></v-text-field>

          <v-textarea
            :label="$t('buildingAndRoomNo')"
            class="pr-4 pl-2"
            v-model="locationInformation.buildingAndRoomNo"
          ></v-textarea>

          <v-btn
            flat
            dark
            class="c_selected_btn ml-0 text-capitalize"
            type="submit"
            v-bind:loading="loading"
          >{{ $t('submit') }}</v-btn>
        </v-form>

        <!-- STORE PHONE NO -->
        <h2 class="font-weight-regular mt-4">2: {{ $t('add_store_phone') }}</h2>
        <v-form ref="phone" v-on:submit.prevent="uploadPhone(0, phone, null)">
          <v-text-field 
            :label="$t('add_store_phone')"
            class="input-group--focused pr-4 pl-2"
            type="number"
            v-model="phone">
          </v-text-field>

          <v-btn
            flat
            dark
            class="c_selected_btn ml-0 text-capitalize"
            type="submit"
            v-bind:loading="loadingPhone"
          >{{ $t('add') }}</v-btn>

          <div class="mb-2 ml-2 email mr-4 mt-2" v-for="phone in contactUs.phones" v-bind:key="phone.id">
            <v-btn
              v-on:click="uploadPhone(2, phone.phoneNumber, phone.id)"
              fab
              depressed
              small
              dark
              class="secondary_1 white--text"
            >
              <v-icon small>clear</v-icon>
            </v-btn>
            {{ phone.phoneNumber }}
          </div>
        </v-form>


        <!-- STORE EMAIL -->
        <h2 class="font-weight-regular mt-4">3: {{ $t('add_store_email') }}</h2>
        <v-form ref="email" v-on:submit.prevent="uploadEmail(0, email, null)">
          <v-text-field
            :label="$t('add_store_email')"
            class="input-group--focused pr-4 pl-2 mt-2"
            v-model="email"
            v-bind:rules="emailRules"
          ></v-text-field>

          <v-btn
            flat
            dark
            class="c_selected_btn ml-0 text-capitalize"
            type="submit"
            v-bind:loading="loadingEmail"
          >{{ $t('add') }}</v-btn>

          <div class="mb-2 ml-2 email mr-4 mt-2" v-for="email in contactUs.emails" v-bind:key="email.id">
            <v-btn
              v-on:click="uploadEmail(2, email.email, email.id)"
              fab
              depressed
              small
              dark
              class="secondary_1 white--text"
            >
              <v-icon small>clear</v-icon>
            </v-btn>
            {{ email.email }}
          </div>
        </v-form>



      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import { getErrorMessage } from "@/resources/helper";
import { location } from "@/resources/data";

import { mapGetters } from "vuex";

export default {
  name: "storeInformationContactUs",
  components: {},

  data() {
    return {

      locationInformation: {},
      email: "",
      phone: "",

      // Rules for Inputs
      inputRules: [
        v => v.length >= 3 || "Minimum length is 3 characters"
        // 'Required',
      ],

      emailRules: [v => v.match(/\S+@\S+\.\S+/) || "Invalid Email Address"],

      loading: false,
      loadingEmail: false,
      loadingPhone: false
    };
  },

  computed: {
    ...mapGetters({
      contactUs: "dashboard/contactUs"
    }),
    regions() {
      return location.regions;
    },
    countries() {
      return location.countries;
    }
  },

  methods: {
    uploadLocation: function() {
      if (this.$refs.location.validate()) {
        this.loading = true;

        let data = {
          data: { location: this.locationInformation },
          type: "location"
        }

        this.uploadStoreInfo(data, "Successfully uploaded location").then(() => {
          this.loading = false;
        }) .catch(() => {
            this.loading = false;
        })
      } else {
        return;
      }
    },

    uploadEmail: function(choice, email, id) {
    
      if (choice == 0) {

        let data = {
          data: {
            emailData: [
              {
                choice: choice,
                newEmail: email.trim()
              }
            ]
          },
          type: "storeEmail"
        };
        // ADD
        if (this.$refs.email.validate()) {
          this.loadingEmail = true;

          this.uploadStoreInfo(data, "Successfully added Email").then(() => {
            this.loadingEmail = false;
            this.email = "";
          }) .catch(() => {
            this.loadingEmail = false;
          })

        } else {
          return;
        }
      } else if (choice == 2) {
        
        let data = {
          data: {
            emailData: [
              {
                newEmail: email,
                id: id,
                choice: choice
              }
            ]
          },
          type: "storeEmail"
        };
        
        // DELETE
        this.uploadStoreInfo(data, "Successfully removed Email").then(() => {
          // this.emails = this.emails.filter(x => x.id !== id);
        });
      }
    },

    uploadPhone: function(choice, phone, id) {

      if (choice == 0) {
        let data = {
          data: {
            phoneData: [
              {
                choice: choice,
                newPhoneNumber: phone
              }
            ]
          },
          type: "storePhone"
        };
        
        // ADD PHONE NO
        
        if(this.phone != '') {
          this.loadingPhone = true;

          this.uploadStoreInfo(data, "Successfully added Phone Number").then(
            response => {
              this.loadingPhone = false;
              this.phone = "";
            }
          ) .catch(() => {
            this.loadingPhone = false;
          })
        } else {
          return;
        }
      } else if (choice == 2) {

        let data = {
          data: {
            phoneData: [
              {
                id: id,
                newPhoneNumber: phone,
                choice: choice
              }
            ]
          },
          type: "storePhone"
        };
      
        // REMOVE PHONE NO
        this.uploadStoreInfo(data, "Successfully removed Phone Number").then(
          () => {
            // this.phones = this.phones.filter(x => x.id !== id);
          }
        );
      }
    },

    // HELPER FUNCTION
    uploadStoreInfo: function(data, message) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("dashboard/update_store", data)

          .then(response => {
            this.$store.commit("SET_SNACKBAR", {
              message: message,
              value: true,
              status: "success"
            });
            resolve(response);
          })

          .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
            reject(error);
          });
      });
    }
  },

  created() {
    this.locationInformation = this.contactUs.location;
    // this.emails = this.contactUs.emails;
    // this.phones = this.contactUs.phones;
  }
};
</script>

<style scoped>
.email {
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}
</style>
