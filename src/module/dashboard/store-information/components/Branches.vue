<template>
    
<v-flex class="xs12 sm12 md4">

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

  <v-card min-height="250" class="my-4" v-bind:class="$vuetify.breakpoint.xsOnly && 'mx-1' || 'mx-4'">
    
    <v-toolbar
      color="primary"
      dark
      flat
    >
    
      <v-icon>store</v-icon>
    
      <v-toolbar-title>
        Branches
      </v-toolbar-title>

    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text class="pa-0">
    
      <v-list three-line class="pa-0">
    
        <template>
    
          <v-subheader class="c-list-header">Total {{ branches.length }} Branches.</v-subheader>
          
          <v-divider></v-divider>
          
          
          <v-list-tile 
            avatar
            class="c-list" 
            v-for="branch in branches" 
            v-bind:key="branch.id"
            ripple
            href="javascript:;"
            v-on:click="showEditDialog(branch.id)"
          >
  
            <v-list-tile-action>
              <v-icon>store</v-icon>
            </v-list-tile-action>
            
            <v-list-tile-content>
                <v-list-tile-title class="primary--text">{{ branch.branchName }}</v-list-tile-title>
                <v-list-tile-sub-title class="caption font-weight-light">{{ branch.location.country }} - {{ branch.location.region }} <br>{{ branch.location.city }}
                  <span v-if="branch.location.sub_city"> - {{ branch.location.sub_city }}</span><br>
                  <span v-if="branch.location.buildingAndRoomNo"> -- {{ checkLengthReturn(branch.location.buildingAndRoomNo) }}</span>
                </v-list-tile-sub-title>
            </v-list-tile-content>

          </v-list-tile>

          <v-dialog 
            max-width="600px" 
            v-model="editDialog"  
          >
            
            <v-card>

            <div primary-title>
              <div class="headline pt-4 ml-4">Edit Branch.</div>
            </div>

            <v-card-text>
              <div class="ml-2"><v-icon small color="primary">info</v-icon> The following Information is gone be displayed in your Contact Us page. Your customers might contact you through them.</div>

                <v-form ref="edit">

                  <v-text-field
                    label="Branch Name"
                    class="input-group--focused  pr-4 pl-2 mt-2"
                    v-bind:rules="inputRules"
                    v-model="branchEditing.branchName"
                  ></v-text-field>

                  <v-text-field
                    label="Email"
                    class="input-group--focused  pr-4 pl-2"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    label="Phone no"
                    class="input-group--focused  pr-4 pl-2"
                    v-model="phone"
                  ></v-text-field>

                  <v-subheader>Location</v-subheader>

                  <v-select
                    v-bind:items="countries"
                    label="Country"
                    item-text="Country"
                    item-value="abbr"
                    single-line
                    class=" pr-4 pl-2"
                    v-bind:rules="[(v) => v.length > 0 || 'Country is required']"
                    v-model="branchEditing.location.country"
                  ></v-select>

                  <v-select
                    v-bind:rules="[(v) => v.length > 0 || 'Region is required']"
                    v-bind:items="regions"
                    label="Region"
                    item-text="Region"
                    item-value="abbr"
                    single-line
                    class=" pr-4 pl-2"
                    v-model="branchEditing.location.region"
                  ></v-select>
                  
                  <v-text-field
                    label="City"
                    class="input-group--focused  pr-4 pl-2"
                    v-bind:rules="inputRules"
                    v-model="branchEditing.location.city"
                  ></v-text-field>

                  <v-text-field
                    label="Sub City"
                    class="input-group--focused  pr-4 pl-2"
                    v-model="branchEditing.location.sub_city"
                  ></v-text-field>

                  <v-textarea 
                    label="Discribe Store Location"
                    class=" pr-4 pl-2" 
                    v-model="branchEditing.location.buildingAndRoomNo"
                  >
                  </v-textarea>
                              
                  <v-btn 
                    flat 
                    dark 
                    class="c_selected_btn ml-0 text-capitalize" 
                    v-bind:loading="loadingEdit"
                    v-on:click="editBranch"
                  >
                      Edit
                  </v-btn>
                  
                  <v-btn 
                    flat 
                    dark
                    class="warning ml-0 text-capitalize"
                    v-bind:loading="loading"
                    v-on:click="removeBranch(branchEditing.id)"
                  >
                      Remove
                  </v-btn>
                              
                </v-form>

            </v-card-text>
            
          </v-card>

          </v-dialog>
          
        </template>
      
      </v-list>
    
    </v-card-text>

    <v-dialog max-width="600px" v-model="addDialog">
      <v-btn 
          fab
          slot="activator"
          dark
          class="secondary_1 white--text mt-5 c-btn"
          right
          absolute
          top
      >
      <v-icon>
          add
      </v-icon>
      </v-btn>
      <v-card>

        <div primary-title>
          <div class="headline pt-4 ml-4">Add a New Branch.</div>
        </div>

        <v-card-text>
          <div class="ml-2"><v-icon small color="primary">info</v-icon> The following Information is gone be displayed in your Contact Us page. Your customers might contact you through them.</div>
            <v-form ref="add" v-on:submit.prevent="addBranch">

                <v-text-field
                  label="Branch Name"
                  class="input-group--focused  pr-4 pl-2 mt-2"
                  v-bind:rules="inputRules"
                  v-model="newBranch.branchName"
                ></v-text-field>

                <v-text-field
                  label="Email"
                  class="input-group--focused  pr-4 pl-2"
                  v-model="newBranch.email"
                ></v-text-field>

                <v-text-field
                  label="Phone no"
                  class="input-group--focused  pr-4 pl-2"
                  v-model="newBranch.phone"
                ></v-text-field>

                <v-subheader>Location</v-subheader>

                <v-select
                  v-bind:items="countries"
                  label="Country"
                  item-text="Country"
                  item-value="abbr"
                  single-line
                  class=" pr-4 pl-2"
                  v-bind:rules="[(v) => v.length > 0 || 'Country is required']"
                  v-model="newBranch.location.country"
                ></v-select>

                <v-select
                  v-bind:rules="[(v) => v.length > 0 || 'Region is required']"
                  v-bind:items="regions"
                  label="Region"
                  item-text="Region"
                  item-value="abbr"
                  single-line
                  class=" pr-4 pl-2"
                  v-model="newBranch.location.region"
                ></v-select>
                
                <v-text-field
                  label="City"
                  class="input-group--focused  pr-4 pl-2"
                  v-bind:rules="inputRules"
                  v-model="newBranch.location.city"
                ></v-text-field>

                <v-text-field
                  label="Sub City"
                  class="input-group--focused  pr-4 pl-2"
                  v-model="newBranch.location.sub_city"
                ></v-text-field>

                <v-textarea 
                  label="Discribe Store Location"
                  class=" pr-4 pl-2" 
                  v-model="newBranch.location.buildingAndRoomNo"
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
    </v-dialog>

  </v-card>
</v-flex>

</template>

<script>
import apiClient from '@/resources/apiClient';
import { getErrorMessage } from '../../helper';
import { error } from 'util';

export default {
  name: 'storeInformationBranches',
  props: {
      branches: {
          type: Array,
          required: true,
      }
  },
  data() {
      return {
        
        email: "",
        phone: "",
        editDialog: false,
        branchEditing: { 
          branchName: "",
          location: {
            country: "",
            region: "",
            city: "",
            sub_city: "",
            buildingAndRoomNo: "",
            latitude: "",
            longitude: "",
          }
        },

        addDialog: false,
        newBranch: {
          branchName: "",
          email: "",
          phone: "",
          location: {
            country: "",
            region: "",
            city: "",
            sub_city: "",
            buildingAndRoomNo: "",
            latitude: "",
            longitude: "",
          }
        },

        countries: [
            'Ethiopia'
        ],
        
        regions: [
            'Oromia',
            'Amhara',
            'Tigray',
            'Addis Ababa',
        ],

        inputRules: [
            v => v.length >=3 || 'Minimum length is 3 characters',
        ],

        emailRules: [
            v => (v.match(/\S+@\S+\.\S+/)) || 'Invalid Email Address'
        ],

        loading: false,
        loadingEdit: false,

        // Snackbar Messages
        snackbar: false,
        timeout: 7000,
        snackbarMessage: '',
        color: 'c_selected_btn',
        icon: '',

      }
  },

  methods: {

    removeBranch: function(id) {
      this.loading = true
      this.snackbar = false

      apiClient.dashboard.store_information.delete_branch(id)

      .then(response => {
        this.snackbarMessage = 'Successfully Removed Branch.'
        this.snackbar = true
        this.color = 'c_selected_btn'
        this.icon = 'done'
        this.loading = false
        this.editDialog = !this.editDialog
        this.$emit('removeBranch', id)
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
          this.loading = false
          this.snackbar = true
          // FOR TESTING
          this.editDialog = !this.editDialog
          this.$emit('removeBranch', id)
      })
    
    },

    addBranch: function() {
      if(this.$refs.add.validate()){
        this.loading = true
        this.snackbar = false

        apiClient.dashboard.store_information.add_branch(this.$store.getters['auth/storeId'], this.newBranch)
        
        .then(response => {
            this.snackbarMessage = 'Successfully added Branch.'

            this.$emit('addBranch', response.data)

            this.snackbar = true
            this.color = 'c_selected_btn'
            this.icon = 'done'
            this.loading = false
            this.addDialog = !this.addDialog
            this.clearAddBranch()

        })

        .catch(error => {

          try {
              this.getErrorMessage(error.response.status, error.response.data)
          }
          catch(err) {
              this.snackbarMessage = 'Can\'t reach the kiosk Site' + error.response.status
          }
          
          this.color = ''
          this.icon = 'error_outline'
          this.loading = false
          this.snackbar = true

        })
      }
    },

    editBranch: function() {
      if(this.$refs.edit.validate()){
        this.loadingEdit = true
        this.snackbar = false

        this.branchEditing["emailData"] = {"choice": 1, "email": this.email} 
        this.branchEditing["phone"] = {"choice": 1, "phoneNumber": this.phone}

        apiClient.dashboard.store_information.update_branch(this.branchEditing.id, this.branchEditing)

        .then(response => {
          this.snackbarMessage = 'Successfully Edited Branch.'
          // this.branches.push(this.newBranch)
          this.snackbar = true
          this.color = 'c_selected_btn'
          this.icon = 'done'
          this.loadingEdit = false
          this.editDialog = !this.editDialog
        })

        .catch(error => {
          
        // FOR TEST THIS SHOULD BE FOR SUCCESS!
        // this.$emit('editBranch', response.data)
        this.$emit('editBranch', this.branchEditing)

        try {
          this.snackbarMessage = getErrorMessage(error.response.status, error.response.data)
        }
        catch(err) {
          this.snackbarMessage = 'Can\'t reach the kiosk Site' + error.response.status
        }
        
          this.color = ''
          this.icon = 'error_outline'
          this.loadingEdit = false
          this.snackbar = true
          
        })
      }
    },

    checkLengthReturn: function(val) {
  
      if(val.length < 26) {
          return val;
      } 
      else if(val.length >= 26) {
          return val.slice(0,23) + '...'
      }
    },

    // SET THE DIALOG FOR EDITING BRANCH
    showEditDialog: function(id) {
        for(let branch of this.branches) {
            if (branch.id == id) {
                this.branchEditing = JSON.parse(JSON.stringify(branch))
                this.branchEditing["id"] = id
                
                try {
                  this.email = this.branchEditing.emails[0].email
                }
                catch(err){}
                try {
                  this.phone = this.branchEditing.phones[0].phone
                }
                catch(err){}

                this.editDialog = !this.editDialog;
            }
        }
    },

    clearAddBranch: function(){
      // CLEAR NEWBRANCH
      this.newBranch.branchName = ""
      this.newBranch.email = ""
      this.newBranch.phone = ""
      this.newBranch.location.country = ""
      this.newBranch.location.region = ""
      this.newBranch.location.city = ""
      this.newBranch.location.sub_city = ""
      this.newBranch.location.buildingAndRoomNo = ""
      this.newBranch.location.latitude = ""
      this.newBranch.location.longitude = ""
    },
  },
  
  created() {
    //   console.log(this.branches)
  }
    
}
</script>

<style scoped>
.c-btn {
  z-index: 0;  
}
.c-list {
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  /* width: 140%; */
}
.c-list-header {
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
