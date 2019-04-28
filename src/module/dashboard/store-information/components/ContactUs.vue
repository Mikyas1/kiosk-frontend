<template>
        
        <!-- CONTACT US -->
        <v-flex class="xs12 sm12 md8">

          <v-snackbar
            v-model="snackbar"
            v-bind:timeout="timeout"
            top
            v-bind:color="color"
          >
              <v-icon color="white">{{ icon }}</v-icon>&nbsp;&nbsp;
              <span>{{ snackbarMessage }}</span>
              <v-btn
              color="pink"
              flat
              v-on:click="snackbar = false"
              >
                  <v-icon small color="secondary_1">clear</v-icon>
              </v-btn>
          </v-snackbar>
        
          <v-card class="my-4 mb-5" v-bind:class="$vuetify.breakpoint.xsOnly && 'mx-1' || 'ml-4 mr-2'">
            
            <v-card-title primary-title>
              <div>
                <div class="headline">Contact Us</div>
                  <span class="grey--text">Information about how to Reach you</span>
                </div>
            </v-card-title>

            <v-card-text>
              <div class="ml-2"><v-icon small color="primary">info</v-icon> The following Information is gone be displayed in your Contact Us page. Your customers might contact you through them.</div>
               
                <v-form ref="email" v-on:submit.prevent="uploadEmail(0, email, null)">

                    <v-text-field
                      label="Add Email"
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
                    >
                        Add
                    </v-btn>
                    
                    <div class="mb-2 ml-2 email mr-4 mt-2" v-for="email in emails" v-bind:key="email.id">
                      <v-btn 
                        v-on:click="uploadEmail(3, email.email, email.id)"
                        fab
                        depressed
                        small
                        dark
                        class="secondary_1 white--text">
                        <v-icon small>clear</v-icon>
                      </v-btn>
                      {{ email.email }} 
                    </div>

                </v-form>

                <v-form class="mt-4" ref="phone" v-on:submit.prevent="uploadPhone(0, phone, null)">

                    <v-text-field
                      label="Add Phone no"
                      class="input-group--focused pr-4 pl-2"
                      v-model="phone"
                    ></v-text-field>

                    <v-btn 
                      flat 
                      dark 
                      class="c_selected_btn ml-0 text-capitalize"
                      type="submit"
                      v-bind:loading="loadingPhone"
                    >
                        Add
                    </v-btn>

                    <div class="mb-2 ml-2 email mr-4 mt-2" v-for="phone in phones" v-bind:key="phone.id">
                      <v-btn 
                        v-on:click="uploadPhone(3, phone.phone, phone.id)"
                        fab
                        depressed
                        small
                        dark
                        class="secondary_1 white--text">
                        <v-icon small>clear</v-icon>
                      </v-btn>
                      {{ phone.phone }}
                    </div>

                </v-form>
                
                  <div class="headline mt-4">Store Location</div>

                <v-form ref="location" v-on:submit.prevent="uploadLocation">
                    <v-select
                      v-bind:items="countries"
                      label="Country"
                      item-text="Country"
                      item-value="abbr"
                      single-line
                      class=" pr-4 pl-2"
                      v-model="locationInformation.country"
                      v-bind:rules="[(v) => v.length > 0 || 'Country is required']"
                    ></v-select>

                    <v-select
                      v-bind:items="regions"
                      label="Region"
                      item-text="Region"
                      item-value="abbr"
                      single-line
                      class=" pr-4 pl-2"
                      v-model="locationInformation.region"
                      v-bind:rules="[(v) => v.length > 0 || 'Region is required']"
                    ></v-select>
                    
                    <v-text-field
                      label="City"
                      class="input-group--focused pr-4 pl-2"
                      v-model="locationInformation.city"
                      v-bind:rules="inputRules"
                    ></v-text-field>

                    <v-text-field
                      label="Sub City"
                      class="input-group--focused pr-4 pl-2"
                      v-model="locationInformation.sub_city"
                    ></v-text-field>

                    <v-textarea 
                      label="Discribe Store Location"
                      class=" pr-4 pl-2" 
                      v-model="locationInformation.buildingAndRoomNo"
                    >
                    </v-textarea>
                                
                    <v-btn 
                      flat 
                      dark 
                      class="c_selected_btn ml-0 text-capitalize"
                      type="submit"
                      v-bind:loading="loading"
                    >
                        Submit
                    </v-btn>
                                
                </v-form>
            </v-card-text>

          </v-card>
        
        </v-flex>

</template>

<script>
import apiClient from '@/resources/apiClient';
import { getErrorMessage } from '../../helper';

export default {
  name: 'storeInformationContactUs',
  components: {
  },

  props: {
      contactUs: {
          type: Object,
          required: true,
      }
  },

  data () {

    return {

        countries: [
            'Ethiopia'
        ],
        
        regions: [
            'Oromia',
            'Amhara',
            'Tigray',
            'Addis Ababa',
        ],

        locationInformation: {},
        email: '',
        phone: '',
        emails: [],
        phones: [],

        // Rules for Inputs
        inputRules: [
            v => v.length >=3 || 'Minimum length is 3 characters',
            // 'Required',
        ],

        emailRules: [
            v => (v.match(/\S+@\S+\.\S+/)) || 'Invalid Email Address'
        ],

        loading: false,
        loadingEmail: false,
        loadingPhone: false,

        // Snackbar Messages
        snackbar: false,
        timeout: 7000,
        snackbarMessage: '',
        color: 'c_selected_btn',
        icon: '',

    }
  
  },

  methods: {

    uploadLocation: function() {
      if(this.$refs.location.validate()) {
        this.loading = true
        this.snackbar = false

        let data = {}
        data["location"] = this.locationInformation

        this.uploadStoreInfo(data, 'Successfully uploaded location');
        this.loading = false

      } else {
        return
      }
    },

    uploadEmail: function(choice, email, id) {
      
      let data = {
        emailData : {},
      }

      data.emailData["choice"] = choice
      data.emailData["email"] = email

      
      if(choice == 0) {
        // ADD
        if(this.$refs.email.validate()) {
        this.loadingEmail = true
        this.snackbar = false

        this.uploadStoreInfo(data, 'Successfully added Email')

        .then(response => {
          this.emails.push(response.data)
        })

        this.loadingEmail = false
        this.email = ''
        
        } else {
          return
        }

      } else if (choice == 3) {
        // DELETE
        this.snackbar = false
        this.uploadStoreInfo(data, 'Successfully removed Email')
        
        .then(response => {
          this.emails = this.emails.filter(x => x.id !== id);
        })
      }

    },

    uploadPhone: function(choice, phone, id) {
      let data = {
        phone : {},
      }

      data.phone["choice"] = choice
      data.phone["phoneNumber"] = phone

      if(choice == 0) {
        // ADD PHONE NO
        if(this.$refs.phone.validate()) {
          this.loadingPhone = true
          this.snackbar = false

          this.uploadStoreInfo(data, 'Successfully added Phone Number')

          .then(response => {
            this.phones.push(response.data)
          })

          this.loadingPhone = false
          this.phone = ''
        } else {
          return
        }
      } else if (choice == 3) {
        // REMOVE PHONE NO
        this.snackbar = false
        this.uploadStoreInfo(data, 'Successfully removed Phone Number')
        
        .then(response => {
          this.phones = this.phones.filter(x => x.id !== id);
        })
      }
    },

    // HELPER FUNCTION
    uploadStoreInfo: function(data, message){
      
      return new Promise((resolve, reject) => {
        
        apiClient.dashboard.store_information.update_store(data)

        .then(response => {
          this.snackbarMessage = message
          this.snackbar = true
          this.color = 'c_selected_btn'
          this.icon = 'done'

          resolve(response)
        })

        .catch(error => {

          try {
              this.snackbarMessage = getErrorMessage(error.response.status, error.response.data)
          }
          catch(err) {
              this.snackbarMessage = 'Can\'t reach the kiosk Site' + error.response.status
          }
          
          this.color = ''
          this.icon = 'error_outline'
          this.snackbar = true

          reject(error)

        })
      
      })

    },
  },

  created() {
    this.locationInformation = this.contactUs.location
    this.emails = this.contactUs.emails
    this.phones = this.contactUs.phones
  },
  
}
</script>

<style scoped>
.email {
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}
</style>
