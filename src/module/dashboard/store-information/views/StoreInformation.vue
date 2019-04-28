<template>

    <v-container class="c-body pa-0" fluid="true">
      
      <!-- SNACK BAR -->
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

      <!-- BODY NAVIGATOR -->
      <Navbar parent="Store Information" />

      <!-- LOADER -->
      <v-progress-linear
        v-if="loading"
        v-bind:indeterminate="true"
        class="my-0"
      ></v-progress-linear>

    <!-- some height if no page content -->
    
    <div v-if="!load" class="c-height"></div>

    <div v-if="load">
    
      <v-layout row wrap class="first-card">
        
        <!-- ABOUT US --> 
        <AboutUs v-bind:aboutUs="aboutUs"/>

        <!-- CUSTOMER SUPPORT -->
        <CustomerSupport v-bind:customerSupport="storeInformation.customerSupport" />

      </v-layout>


      <v-layout row wrap>
        
        <!-- CONTACT US -->
        <ContactUs v-bind:contactUs="contactUs"/>


        <!-- BRANCHES -->
        <Branches 
          v-on:removeBranch="deleteBranch($event)"
          v-on:addBranch="addNewBranch($event)"
          v-on:editBranch="editBranch($event)"
          v-bind:branches="storeInformation.branches"
        />
        
      </v-layout>

      <v-layout row wrap>

        <!-- PROFILE -->
        <Profile v-bind:profile="profile"/>

      </v-layout>
           
    </div>
    
    </v-container>

</template>

<script>
import Navbar from '@/components/BodyNav';

import AboutUs from '../components/AboutUs';
import CustomerSupport from '../components/CustomerSupport';
import Profile from '../components/Profile';
import ContactUs from '../components/ContactUs';
import Branches from '../components/Branches';

import apiClient from '@/resources/apiClient';
import { getErrorMessage } from '../../helper';

export default {
  name: 'storeInformation',
    
  components: {
    Navbar,

    AboutUs,
    CustomerSupport,
    Profile,
    ContactUs,
    Branches,
  },

  data () {
    return {
      storeInformation: {},
      load: false,

      aboutUs: {
        description: '',
        id: 0,
      },

      profile: {
        owner: {
          firtName: '',
          lastName: '',
          id: 0,
        },
        store: {
          storeName: '',
          storeUrl: '', 
        },
      },

      // branches: {},

      contactUs: {},

      loading: false,

      // Snackbar Messages
      snackbar: false,
      timeout: 7000,
      snackbarMessage: '',
      color: 'c_selected_btn',
      icon: '',
    }
  },

  created() {
    this.$store.commit('dashboard/SET_ACTIVE_PAGE', 'storeInformation');
    
    this.loading = true
    this.snackbar = false

    apiClient.dashboard.store_information.get_store_info()

    .then(response => {
        
      this.storeInformation = response.data
      
      // SET DATA FOR ABOUT US PAGE
      this.aboutUs.description = response.data.description
      this.aboutUs.id = response.data.storeId

      // SET DATA FOR PROFILE PAGE
      this.profile.owner.firtName = response.data.owner.firtName
      this.profile.owner.lastName = response.data.owner.lastName
      this.profile.owner.id = response.data.owner.id

      this.profile.store.storeName = response.data.storeName
      this.profile.store.storeUrl = response.data.storeUrl

      // SET DATA FOR BRANCH PAGE
      // for(var key in response.data.branches){
      //   var dict = this.branches[key] = response.data.branches[key]
      //   dict["dialog"] = false
      // }

      // SET DATA FOR PROFILE PAGE
      this.contactUs["location"] = this.storeInformation.location
      this.contactUs["emails"] = this.storeInformation.emails
      this.contactUs["phones"] = this.storeInformation.phones

      this.loading = false
      this.load = true
    
    })

    .catch(error => {

      try {
        this.snackbarMessage = getErrorMessage(error.response.status, error.response.data)
      }
      catch(err) {
        this.snackbarMessage = 'Can\'t reach the kiosk Site'
      }
        
      this.color = ''
      this.icon = 'error_outline'
      this.loading = false
      this.snackbar = true
    })
  },
  methods: {
    // REMOVE BRANCH FROM BRANCHS
    deleteBranch: function(branchId) {
      this.storeInformation.branches = this.storeInformation.branches.filter(x => x.id !== branchId);
    },
    addNewBranch: function(newBranch) {
      this.storeInformation.branches.push(newBranch);
    },
    editBranch: function(editedBranch) {
      let index = this.storeInformation.branches.findIndex(x => x.id == editedBranch.id);
      this.storeInformation.branches[index] = editedBranch;
    }
  },
}
</script>

<style scoped>
.c-list {
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}
.c-list-header {
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}
.c-height {
  height: 67vh;
}
</style>
