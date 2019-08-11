<template>
  <!-- CUSTOMER SUPPORT -->
  <v-flex class="xs12 sm12 md4">
    <v-card class="my-4" v-bind:class="$vuetify.breakpoint.xsOnly && 'mx-1' || 'mx-4'">
      <v-toolbar color="primary" dark flat>
        <v-icon>toys</v-icon>
        <v-toolbar-title>{{ $t('customer_support') }}</v-toolbar-title>
      </v-toolbar>

      <!-- LOADER -->
      <v-progress-linear v-if="loading" v-bind:indeterminate="true" class="my-0"></v-progress-linear>

      <v-list three-line subheader>
        <v-subheader class="c-list-header">{{ $t('customer_support_info') }}</v-subheader>

        <!-- WARRANTY -->
        <v-list-tile avatar ripple class="c-list" v-on:click="copyWarranty">
          <v-list-tile-action>
            <v-checkbox
              v-model="customerSupportInformation.warranty.set"
              readonly
              v-bind:ripple="false"
            ></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="primary--text">{{ $t('warranty_information') }}</v-list-tile-title>
            <v-list-tile-sub-title
              class="caption font-weight-light"
            >{{ $t('warranty_information_info') }}</v-list-tile-sub-title>
            <v-list-tile-sub-title
              class="caption font-weight-medium"
              v-if="customerSupportInformation.warranty.set"
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-icon small>arrow_right_alt</v-icon>
              {{ getWarranty }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-dialog max-width="600px" v-model="warrantyDialog">
          <v-card>
            <div primary-title>
              <div class="headline pt-4 ml-4">{{ $t('add_warranty_information') }}</div>
            </div>
            <v-card-text>
              <v-form class="px-3">
                <v-textarea
                  :label="$t('warranty_information')"
                  v-model="customerSupportInformation.warranty.discription"
                ></v-textarea>
                <v-btn
                  flat
                  dark
                  class="c_selected_btn ml-0 text-capitalize"
                  v-on:click="handelWarranty"
                >{{ $t('submit') }}</v-btn>
                <v-btn
                  v-if="customerSupportInformation.warranty.set"
                  flat
                  class="warning text-capitalize"
                  v-on:click="removeWarranty"
                >{{ $t('remove') }}</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- RETURN POLICY -->
        <v-list-tile ripple class="c-list" v-on:click="copyReturnPolicy">
          <v-list-tile-action>
            <v-checkbox
              v-model="customerSupportInformation.returnPolicy.set"
              readonly
              v-bind:ripple="false"
            ></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="primary--text">{{ $t('return_policy') }}</v-list-tile-title>
            <v-list-tile-sub-title
              class="caption font-weight-light"
            >{{ $t('return_policy_info') }}</v-list-tile-sub-title>
            <v-list-tile-sub-title
              class="caption font-weight-medium"
              v-if="customerSupportInformation.returnPolicy.set"
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-icon small>arrow_right_alt</v-icon>
              {{ getReturn }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-dialog max-width="600px" v-model="returnDialog">
          <v-card>
            <div primary-title>
              <div class="headline pt-4 ml-4">{{ $t('add_return_policy') }}</div>
            </div>
            <v-card-text>
              <v-form class="px-3">
                <v-textarea
                  :label="$t('return_policy')"
                  v-model="customerSupportInformation.returnPolicy.discription"
                ></v-textarea>
                <v-btn
                  flat
                  dark
                  class="c_selected_btn ml-0 text-capitalize"
                  v-on:click="handelReturnPolicy"
                >{{ $t('submit') }}</v-btn>
                <v-btn
                  v-if="customerSupportInformation.returnPolicy.set"
                  flat
                  class="warning text-capitalize"
                  v-on:click="removeReturnPolicy"
                >{{ $t('remove') }}</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- CUSTOMER CARE -->
        <v-list-tile ripple class="c-list" v-on:click="copyCustomerCare">
          <v-list-tile-action>
            <v-checkbox
              v-model="customerSupportInformation.customerCare.set"
              readonly
              v-bind:ripple="false"
            ></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="primary--text">{{ $t('customer_care') }}</v-list-tile-title>
            <v-list-tile-sub-title
              class="caption font-weight-light"
            >{{ $t('customer_care_info') }}</v-list-tile-sub-title>
            <v-list-tile-sub-title
              class="caption font-weight-medium"
              v-if="customerSupportInformation.customerCare.set"
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-icon small>arrow_right_alt</v-icon>
              {{ getCare }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-dialog max-width="600px" v-model="careDialog">
          <v-card>
            <div primary-title>
              <div class="headline pt-4 ml-4">{{ $t('add_customer_care') }}</div>
            </div>
            <v-card-text>
              <v-form class="px-3">
                <v-textarea
                  :label="$t('customer_care')"
                  v-model="customerSupportInformation.customerCare.discription"
                ></v-textarea>
                <v-btn
                  flat
                  dark
                  class="c_selected_btn ml-0 text-capitalize"
                  v-on:click="handelCustomerCare"
                >{{ $t('submit') }}</v-btn>
                <v-btn
                  v-if="customerSupportInformation.customerCare.set"
                  flat
                  class="warning text-capitalize"
                  v-on:click="removeCustomerCare"
                >{{ $t('remove') }}</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import { getErrorMessage } from "@/resources/helper";

import { mapGetters } from "vuex";

export default {
  name: "storeInformationCustomerSupport",
  components: {},
  data() {
    return {
      warrantyDialog: false,
      returnDialog: false,
      careDialog: false,

      customerSupportInformation: {
        warranty: {
          set: false,
          discription: ""
        },
        returnPolicy: {
          set: false,
          discription: ""
        },
        customerCare: {
          set: false,
          discription: ""
        }
      },

      showWarranty: "",
      showReturnPolicy: "",
      showCustomerCare: "",

      loading: false
    };
  },

  computed: {
    ...mapGetters({
      customerSupport: "dashboard/customerSupport"
    }),
    getWarranty() {
      return this.checkLengthReturn(this.showWarranty);
    },

    getReturn() {
      return this.checkLengthReturn(this.showReturnPolicy);
    },

    getCare() {
      return this.checkLengthReturn(this.showCustomerCare);
    }
  },

  methods: {
    copyWarranty: function() {
      this.customerSupportInformation.warranty.discription = this.showWarranty;
      this.warrantyDialog = !this.warrantyDialog;
    },

    copyReturnPolicy: function() {
      this.customerSupportInformation.returnPolicy.discription = this.showReturnPolicy;
      this.returnDialog = !this.returnDialog;
    },

    copyCustomerCare: function() {
      this.customerSupportInformation.customerCare.discription = this.showCustomerCare;
      this.careDialog = !this.careDialog;
    },

    handelWarranty: function() {
      if (
        this.customerSupportInformation.warranty.discription.length != 0 &&
        this.customerSupportInformation.warranty.discription !=
          this.showWarranty
      ) {
        var data = {
          warrantyInfo: this.customerSupportInformation.warranty.discription
        };
        this.customerSupportUploader(this.customerSupport.id, data, "W").then(
          x => {
            if (x) {
              this.customerSupportInformation.warranty.set = true;
              this.showWarranty = data.warrantyInfo;
              this.$store.commit("SET_SNACKBAR", {
                message: "Successfully uploaded Warranty Information",
                value: true,
                status: "success"
              });
            }
          }
        );

        this.warrantyDialog = false;
      } else if (
        this.customerSupportInformation.warranty.discription ==
        this.showWarranty
      ) {
        this.warrantyDialog = false;
      }
    },

    removeWarranty: function() {
      var data = { warrantyInfo: "" };
      this.customerSupportUploader(this.customerSupport.id, data, "W").then(
        x => {
          if (x) {
            this.customerSupportInformation.warranty.discription = "";
            this.showWarranty = "";
            this.customerSupportInformation.warranty.set = false;
            this.$store.commit("SET_SNACKBAR", {
              message: "Successfully removed Warranty Information",
              value: true,
              status: "success"
            });
          }
        }
      );

      this.warrantyDialog = false;
    },

    handelReturnPolicy: function() {
      if (
        this.customerSupportInformation.returnPolicy.discription != "" &&
        this.customerSupportInformation.returnPolicy.discription !=
          this.showReturnPolicy
      ) {
        var data = {
          returnPolicy: this.customerSupportInformation.returnPolicy.discription
        };
        this.customerSupportUploader(this.customerSupport.id, data, "R").then(
          x => {
            if (x) {
              this.customerSupportInformation.returnPolicy.set = true;
              this.showReturnPolicy = data.returnPolicy;
              this.$store.commit("SET_SNACKBAR", {
                message: "Successfully uploaded Return Policy",
                value: true,
                status: "success"
              });
            }
          }
        );

        this.returnDialog = false;
      } else if (
        this.customerSupportInformation.returnPolicy.discription ==
        this.showReturnPolicy
      ) {
        this.returnDialog = false;
      }
    },

    removeReturnPolicy: function() {
      var data = { returnPolicy: "" };
      this.customerSupportUploader(this.customerSupport.id, data, "R").then(
        x => {
          if (x) {
            this.customerSupportInformation.returnPolicy.discription = "";
            this.showReturnPolicy = "";
            this.customerSupportInformation.returnPolicy.set = false;
            this.$store.commit("SET_SNACKBAR", {
              message: "Successfully removed Return Policy",
              value: true,
              status: "success"
            });
          }
        }
      );

      this.returnDialog = false;
    },

    handelCustomerCare: function() {
      if (
        this.customerSupportInformation.customerCare.discription != "" &&
        this.customerSupportInformation.customerCare.discription !=
          this.showCustomerCare
      ) {
        var data = {
          customerCare: this.customerSupportInformation.customerCare.discription
        };
        this.customerSupportUploader(this.customerSupport.id, data, "C").then(
          x => {
            if (x) {
              this.customerSupportInformation.customerCare.set = true;
              this.showCustomerCare = data.customerCare;
              this.$store.commit("SET_SNACKBAR", {
                message: "Successfully uploaded Customer Care",
                value: true,
                status: "success"
              });
            }
          }
        );

        this.careDialog = false;
      } else if (
        this.customerSupportInformation.customerCare.discription ==
        this.showCustomerCare
      ) {
        this.careDialog = false;
      }
    },
    removeCustomerCare: function() {
      var data = { customerCare: "" };
      this.customerSupportUploader(this.customerSupport.id, data, "C").then(
        x => {
          if (x) {
            this.customerSupportInformation.customerCare.discription = "";
            this.showCustomerCare = "";
            this.customerSupportInformation.customerCare.set = false;
            this.$store.commit("SET_SNACKBAR", {
              message: "Successfully removed Customer Care",
              value: true,
              status: "success"
            });
          }
        }
      );

      this.careDialog = false;
    },

    // WARRANTY UPLOADER
    customerSupportUploader: function(id, data, type) {
      return new Promise((resolve, reject) => {
        this.loading = true;

        let newData = {
          data: data,
          id: id,
          type: type
        };

        this.$store
          .dispatch("dashboard/update_customer_support", newData)

          .then(() => {
            this.loading = false;
            resolve(true);
          })

          .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
            this.loading = false;
            reject(false);
          });
      });
    },

    // SET FALSE FOR NULL
    checkValue: function(val) {
      if (val == "") {
        return false;
      } else {
        return true;
      }
    },

    // CHECK STRING LENGTH AND RETURN PROPER STRING
    checkLengthReturn: function(val) {
      if (val.length < 26) {
        return val;
      } else if (val.length >= 26) {
        return val.slice(0, 23) + "...";
      }
    }
  },

  created() {
    this.customerSupportInformation.warranty.discription = this.customerSupport.warrantyInfo;
    this.customerSupportInformation.warranty.set = this.checkValue(
      this.customerSupport.warrantyInfo
    );
    this.showWarranty = this.customerSupportInformation.warranty.discription;

    this.customerSupportInformation.returnPolicy.discription = this.customerSupport.returnPolicy;
    this.customerSupportInformation.returnPolicy.set = this.checkValue(
      this.customerSupport.returnPolicy
    );
    this.showReturnPolicy = this.customerSupportInformation.returnPolicy.discription;

    this.customerSupportInformation.customerCare.discription = this.customerSupport.customerCare;
    this.customerSupportInformation.customerCare.set = this.checkValue(
      this.customerSupport.customerCare
    );
    this.showCustomerCare = this.customerSupportInformation.customerCare.discription;
  }
};
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
