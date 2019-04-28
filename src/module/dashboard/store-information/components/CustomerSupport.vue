<template>


    <!-- CUSTOMER SUPPORT -->
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
                <v-icon color="secondary_1">clear</v-icon>
            </v-btn>
        </v-snackbar>

        <v-card class="my-4" v-bind:class="$vuetify.breakpoint.xsOnly && 'mx-1' || 'mx-4'">

        <v-toolbar
            color="primary"
            dark
            flat
        >
            <v-icon>toys</v-icon>
            <v-toolbar-title>
            Customer Support
            </v-toolbar-title>

        </v-toolbar>

        <!-- LOADER -->
            <v-progress-linear
                v-if="loading"
                v-bind:indeterminate="true"
                class="my-0"
            ></v-progress-linear>

            <v-list three-line subheader>
            <v-subheader class="c-list-header">Supports you give your Customers.</v-subheader>

            <!-- WARRANTY -->
            <v-list-tile avatar ripple href="javascript:;" class="c-list" v-on:click="copyWarranty">
            <v-list-tile-action>
                <v-checkbox
                v-model="customerSupportInformation.warranty.set"
                readonly
                v-bind:ripple="false"
                ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title class="primary--text">Warranty Information</v-list-tile-title>
                <v-list-tile-sub-title class="caption font-weight-light">This Warranty information will be applied to all your Products.</v-list-tile-sub-title>
                <v-list-tile-sub-title class="caption font-weight-medium" v-if="customerSupportInformation.warranty.set">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> {{ getWarranty }}</v-list-tile-sub-title>
            </v-list-tile-content>
            </v-list-tile>
                
            <v-dialog max-width="600px" v-model="warrantyDialog">
                <v-card>
                    <div primary-title>
                        <div class="headline pt-4 ml-4">Add your Warranty Information.</div>
                    </div>
                    <v-card-text>
                        <v-form class="px-3">
                            <v-textarea label="Warranty Information" v-model="customerSupportInformation.warranty.discription" ></v-textarea>
                            <v-btn flat dark class="c_selected_btn ml-0 text-capitalize" v-on:click="handelWarranty">Submit</v-btn>
                            <v-btn v-if="customerSupportInformation.warranty.set" flat class="warning text-capitalize" v-on:click="removeWarranty">Remove</v-btn>
                        </v-form>
                    </v-card-text>

                </v-card>
                
            </v-dialog>
            

            <!-- RETURN POLICY -->
            <v-list-tile ripple href="javascript:;" class="c-list" v-on:click="copyReturnPolicy">
            <v-list-tile-action>
                <v-checkbox 
                v-model="customerSupportInformation.returnPolicy.set"
                readonly
                v-bind:ripple="false"
                ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title class="primary--text">Return Policy</v-list-tile-title>
                <v-list-tile-sub-title class="caption font-weight-light">This Return Policy information will be applied to all your Products.</v-list-tile-sub-title>
                <v-list-tile-sub-title class="caption font-weight-medium" v-if="customerSupportInformation.returnPolicy.set">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> {{ getReturn }}</v-list-tile-sub-title>
            </v-list-tile-content>
            </v-list-tile>

            <v-dialog max-width="600px" v-model="returnDialog">

                <v-card>

                    <div primary-title>
                        <div class="headline pt-4 ml-4">Add your Return Policy.</div>
                    </div>
                    <v-card-text>
                        <v-form class="px-3">
                            <v-textarea label="Return Policy" v-model="customerSupportInformation.returnPolicy.discription" ></v-textarea>
                            <v-btn flat dark class="c_selected_btn ml-0 text-capitalize" v-on:click="handelReturnPolicy">Submit</v-btn>
                            <v-btn v-if="customerSupportInformation.returnPolicy.set" flat class="warning text-capitalize" v-on:click="removeReturnPolicy">Remove</v-btn>
                        </v-form>
                    </v-card-text>

                </v-card>
            
            </v-dialog>
            
            <!-- CUSTOMER CARE -->
            <v-list-tile ripple href="javascript:;" class="c-list" v-on:click="copyCustomerCare">
            <v-list-tile-action>
                <v-checkbox
                v-model="customerSupportInformation.customerCare.set"
                readonly
                v-bind:ripple="false"
                ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title class="primary--text">Customer Care</v-list-tile-title>
                <v-list-tile-sub-title class="caption font-weight-light">This Customer Care information will be applied to all your Products.</v-list-tile-sub-title>
                <v-list-tile-sub-title class="caption font-weight-medium" v-if="customerSupportInformation.customerCare.set">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> {{ getCare }}</v-list-tile-sub-title>
            </v-list-tile-content>
            </v-list-tile>

            <v-dialog max-width="600px" v-model="careDialog">

                <v-card>

                    <div primary-title>
                        <div class="headline pt-4 ml-4">Add your Customer care brifly.</div>
                    </div>
                    <v-card-text>
                        <v-form class="px-3">
                            <v-textarea label="Customer Care" v-model="customerSupportInformation.customerCare.discription" ></v-textarea>
                            <v-btn flat dark class="c_selected_btn ml-0 text-capitalize" v-on:click="handelCustomerCare">Submit</v-btn>
                            <v-btn v-if="customerSupportInformation.customerCare.set" flat class="warning text-capitalize" v-on:click="removeCustomerCare">Remove</v-btn>
                        </v-form>
                    </v-card-text>

                </v-card>

            </v-dialog>
            
            </v-list>

        </v-card>
    </v-flex>
    
    
</template>

<script>
import apiClient from '@/resources/apiClient';
import { getErrorMessage } from '../../helper';

export default {
  name: 'storeInformationCustomerSupport',
  components: {
  },
  props: {
      customerSupport: {
          type: Object,
          required: true,
      }
  },
  data () {
    return {

      warrantyDialog: false,
      returnDialog: false,
      careDialog: false,

      customerSupportInformation: {
        warranty: {
          set: false,
          discription: '',
        },
        returnPolicy: {
          set: false,
          discription: '',
        },
        customerCare: {
          set: false,
          discription: '',
        },
      },

      showWarranty: '',
      showReturnPolicy: '',
      showCustomerCare: '',

      // Snackbar Messages
      snackbar: false,
      timeout: 7000,
      snackbarMessage: '',
      color: 'c_selected_btn',
      icon: '',

      loading: false,
      
    };
  },

  methods: {
    
    copyWarranty: function(){
        this.customerSupportInformation.warranty.discription = this.showWarranty
        this.warrantyDialog = !this.warrantyDialog
    },

    copyReturnPolicy: function(){
        this.customerSupportInformation.returnPolicy.discription = this.showReturnPolicy
        this.returnDialog = !this.returnDialog
    },

    copyCustomerCare: function(){
        this.customerSupportInformation.customerCare.discription = this.showCustomerCare
        this.careDialog = !this.careDialog
    },

    handelWarranty: function() {
        if(this.customerSupportInformation.warranty.discription.length != "" && this.customerSupportInformation.warranty.discription != this.showWarranty) {
            var data = { warrantyInfo: this.customerSupportInformation.warranty.discription}
            this.customerSupportUploader(this.customerSupport.id, data)
            
            .then(x => {

                if(x) {
                    this.customerSupportInformation.warranty.set = true;
                    this.showWarranty = data.warrantyInfo
                    this.snackbarMessage = "Successfully uploaded Warranty Information"
                    this.snackbar = true
                }
            
            })

            this.warrantyDialog = false;
        } else if(this.customerSupportInformation.warranty.discription == this.showWarranty) {
            this.warrantyDialog = false
        }
    },

    removeWarranty: function() {
        var data = { warrantyInfo: ""}
        this.customerSupportUploader(this.customerSupport.id, data)

        .then(x => {

                if(x) {
                    this.customerSupportInformation.warranty.discription = ""
                    this.showWarranty = ""
                    this.customerSupportInformation.warranty.set = false;
                    this.snackbarMessage = "Successfully removed Warranty Information"
                    this.snackbar = true
                }
            
            })

        this.warrantyDialog = false;
    },

    handelReturnPolicy: function() {
        if(this.customerSupportInformation.returnPolicy.discription != "" && this.customerSupportInformation.returnPolicy.discription != this.showReturnPolicy) {
            var data = { returnPolicy: this.customerSupportInformation.returnPolicy.discription}
            this.customerSupportUploader(this.customerSupport.id, data)

            .then(x => {

                if(x) {
                    this.customerSupportInformation.returnPolicy.set = true;
                    this.showReturnPolicy = data.returnPolicy
                    this.snackbarMessage = "Successfully uploaded Return Policy"
                    this.snackbar = true
                }
            
            })

            this.returnDialog = false;
        } else if(this.customerSupportInformation.returnPolicy.discription == this.showReturnPolicy) {
            this.returnDialog = false
        }
    },
    
    removeReturnPolicy: function() {
        var data = { returnPolicy: ""}
        this.customerSupportUploader(this.customerSupport.id, data)

        .then(x => {

                if(x) {
                    this.customerSupportInformation.returnPolicy.discription = ""
                    this.showReturnPolicy = ""
                    this.customerSupportInformation.returnPolicy.set = false;
                    this.snackbarMessage = "Successfully removed Return Policy"
                    this.snackbar = true
                }
            
            })

        this.returnDialog = false;
    },

    handelCustomerCare: function() {
        if(this.customerSupportInformation.customerCare.discription != "" && this.customerSupportInformation.customerCare.discription != this.showCustomerCare) {
            var data = { customerCare: this.customerSupportInformation.customerCare.discription}
            this.customerSupportUploader(this.customerSupport.id, data)

            .then(x => {

                if(x) {
                    this.customerSupportInformation.customerCare.set = true;
                    this.showCustomerCare = data.customerCare
                    this.snackbarMessage = "Successfully uploaded Customer Care"
                    this.snackbar = true
                }
            
            })
   
            this.careDialog = false;
        } else if(this.customerSupportInformation.customerCare.discription == this.showCustomerCare) {
            this.careDialog = false
        }
    },
    removeCustomerCare: function() {
        var data = { customerCare: ""}
        this.customerSupportUploader(this.customerSupport.id, data)

        .then(x => {

                if(x) {
                    this.customerSupportInformation.customerCare.discription = ""
                    this.showCustomerCare = ""
                    this.customerSupportInformation.customerCare.set = false;
                    this.snackbarMessage = "Successfully removed Customer Care"
                    this.snackbar = true
                }
            
            })

        this.careDialog = false;
    },

    // WARRANTY UPLOADER
    customerSupportUploader: function(id, data) {
        
        return new Promise((resolve, reject) => {
            
            this.loading = true
            
            apiClient.dashboard.store_information.update_customer_support(id, data)

            .then(response => {
                this.snackbar = false
                this.color = 'c_selected_btn'
                this.icon = 'done'
                this.loading = false
                resolve(true)
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
            reject(false)
            })
        })
    },


    // SET FALSE FOR NULL
    checkValue: function(val) {
    
        if (val == "") {
            return false;
        } 
        else {
            return true;
        }
        
    },

    // CHECK STRING LENGTH AND RETURN PROPER STRING
    checkLengthReturn: function(val) {
    
        if(val.length < 26) {
            return val;
        } 
        else if(val.length >= 26) {
            return val.slice(0,23) + '...'
        }
    
    }

  },

  computed: {

      getWarranty() {
          return this.checkLengthReturn(this.showWarranty)
      },

      getReturn() {
          return this.checkLengthReturn(this.showReturnPolicy)
      },

      getCare() {
          return this.checkLengthReturn(this.showCustomerCare)
      },
  },

  created(){

      this.customerSupportInformation.warranty.discription = this.customerSupport.warrantyInfo
      this.customerSupportInformation.warranty.set = this.checkValue(this.customerSupport.warrantyInfo)
      this.showWarranty = this.customerSupportInformation.warranty.discription

      this.customerSupportInformation.returnPolicy.discription = this.customerSupport.returnPolicy
      this.customerSupportInformation.returnPolicy.set = this.checkValue(this.customerSupport.returnPolicy)
      this.showReturnPolicy = this.customerSupportInformation.returnPolicy.discription

      this.customerSupportInformation.customerCare.discription = this.customerSupport.customerCare
      this.customerSupportInformation.customerCare.set = this.checkValue(this.customerSupport.customerCare)
      this.showCustomerCare = this.customerSupportInformation.customerCare.discription
      
  }

}
</script>

<style scoped>
.c-list {
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  /* width: 100%; */
}
.c-list-header {
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
