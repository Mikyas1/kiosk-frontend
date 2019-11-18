<template>
  <div id="register-page">
    <v-content id="register" class="primary">
      <v-container fluid fill-height class="c-container">
        <v-layout justify-center>
          <v-flex xs12 sm10 md10 lg4>
            <v-card flat height="300">
            <v-stepper v-model="step">
              <v-stepper-items>
                <!-- STEPPER ONE -->
                <v-stepper-content step="1">
                  <v-subheader
                    class="mb-3 c_text_1--text"
                    v-bind:class="$vuetify.breakpoint.xsOnly && 'title ml-4' || 'display-1 ml-5'"
                  >
                    <!-- <span>Create Store</span> -->
                    
                    <v-layout align-center justify-center>
                      <v-flex xs10 md9>
                        <v-subheader
                          align-center
                          class="c_text_1--text"
                          v-bind:class="$vuetify.breakpoint.xsOnly && 'headline' || 'display-1'"
                        >
                          <span>{{ $t("signup") }}</span>
                        </v-subheader>
                      </v-flex>
                    </v-layout>
                  </v-subheader>

                  <!-- <v-card flat height="300"> -->
                    <v-form class="pr-2" v-on:submit.prevent="goNext" ref="gonext">
                      <v-text-field
                        class="mt-2"
                        label="* Store Name"
                        v-model="signUpData.storeName"
                        prepend-icon="store"
                        v-on:keyup="updateUrl"
                        v-bind:rules="inputRules"
                      ></v-text-field>
                      <v-text-field
                        label="* Store Url"
                        v-model="signUpData.storeUrl"
                        prepend-icon="language"
                        v-bind:rules="inputRules"
                      ></v-text-field>
                      <v-select
                        v-if="loadCata"
                        v-bind:items="categories"
                        v-model="categoryChoosen"
                        label="* Category"
                        item-text="categories"
                        item-value="abbr"
                        class="input-group--focused mb-3"
                        prepend-icon="person_outline"
                        v-bind:rules="[(v) => v.length > 0 || 'Category is required']"
                        required
                      ></v-select>

                      <v-flex v-if="!loadCata" class="my-5">
                        <div class="circular-progress">
                          <v-progress-circular :size="30" color="primary" indeterminate></v-progress-circular>
                        </div>
                      </v-flex>

                      <v-layout row wrap class="mt-3" justify-end>
                        <v-flex xs8 md6>
                          <v-btn
                            color="primary c-btn"
                            type="submit"
                            :loading="loadingOne || !loadCata"
                            class="text-capitalize"
                          >
                            continue
                          </v-btn>
                        </v-flex>
                      </v-layout>

                      <v-layout 
                        row 
                        wrap
                        v-bind:class="$vuetify.breakpoint.xsOnly && 'mt-3' || 'mt-4'"
                        justify-center>
                        <v-flex xs8 md8 lg6>
                          <router-link
                            router
                            v-bind:to="{ name: 'login' }"
                            flat
                            class="auth-links"
                          >Login
                          </router-link> 
                          | 
                          <router-link
                            router
                            v-bind:to="{ name: 'forgot' }"
                            flat
                            class="auth-links"
                          >Forgot password
                          </router-link>
                        </v-flex>
                      </v-layout>

                    </v-form>
                  <!-- </v-card> -->
                </v-stepper-content>

                <!-- STEPPER TWO -->
                <v-stepper-content step="2">
                  <v-subheader class="display-1 c_text_1--text">
                    
                    <v-layout align-center justify-center>
                      <v-flex xs11>
                        <v-subheader
                          align-center
                          class="c_text_1--text"
                          v-bind:class="$vuetify.breakpoint.xsOnly && 'headline' || 'display-1'"
                        >
                          <span>Create Profile</span>
                        </v-subheader>
                      </v-flex>
                    </v-layout>
                  </v-subheader>

                  <!-- <v-card flat height="300"> -->
                    <v-form class="pr-2" v-on:submit.prevent="confirm" ref="confirm">
                      <v-text-field
                        label="* First Name"
                        v-model="signUpData.firstName"
                        prepend-icon="person_outline"
                        v-bind:rules="inputRules"
                      ></v-text-field>
                      <v-text-field
                        label="* Last Name"
                        v-model="signUpData.lastName"
                        prepend-icon="person_outline"
                        v-bind:rules="inputRules"
                      ></v-text-field>
                      <v-layout align-center justify-center class="mb-3 ml-3 mt-3"
                        v-bind:class="$vuetify.breakpoint.xsOnly && 'ml-0' || 'ml-3'"
                      >
                        <v-flex>
                          <div class="title grey--text"
                            v-bind:class="$vuetify.breakpoint.xsOnly && 'pl-0' || 'pl-5'"
                          >
                            <span
                              class="auth-choose"
                              v-bind:class="{'active-auth-choose': showPhone}"
                              v-on:click="showPhoneField"
                            >Phone No</span>
                          </div>
                        </v-flex>
                        <v-flex>
                          <div class="title grey--text">
                            <span
                              class="auth-choose"
                              v-bind:class="{'active-auth-choose': showEmail}"
                              v-on:click="showEmailField"
                            >Email</span>
                          </div>
                        </v-flex>
                      </v-layout>
                      <v-text-field
                        class="mt-1"
                        label="* Phone Number"
                        v-if="showPhone"
                        v-model="signUpData.phoneNumber"
                        prepend-icon="phone"
                      ></v-text-field>
                      <v-text-field
                        class="mt-1"
                        label="* Email"
                        v-bind:rules="emailRules"
                        v-if="showEmail"
                        v-model="signUpData.email"
                        prepend-icon="email"
                      ></v-text-field>

                      <v-layout row wrap justify-end
                        v-bind:class="$vuetify.breakpoint.xsOnly && 'mt-0' || 'mt-3'"
                      >
                        <v-flex xs5 md>
                          <v-btn class="text-capitalize" flat v-on:click="step = 1"
                          >
                            Back
                          </v-btn>
                        </v-flex>
                        <v-flex xs7 md6>
                          <v-btn
                            color="primary c-btn"
                            type="submit"
                            :loading="loadingTwo"
                            class="text-capitalize"
                          >
                            continue
                          </v-btn>
                        </v-flex>
                      </v-layout>
                      
                      <v-layout 
                        row 
                        wrap
                        v-bind:class="$vuetify.breakpoint.xsOnly && 'mt-3' || 'mt-4'"
                        justify-center>
                        <v-flex xs8 md8 lg6>
                          <router-link
                            router
                            v-bind:to="{ name: 'login' }"
                            flat
                            class="auth-links"
                          >Login
                          </router-link> 
                          | 
                          <router-link
                            router
                            v-bind:to="{ name: 'forgot' }"
                            flat
                            class="auth-links"
                          >Forgot password
                          </router-link>
                        </v-flex>
                      </v-layout>

                    </v-form>
                  <!-- </v-card> -->
                </v-stepper-content>

                <!-- STEPPER THREE -->
                <v-stepper-content step="3">
                  <v-subheader class="display-1 mb-3 c_text_1--text">
                    
                    <v-layout align-center justify-center>
                      <v-flex xs9>
                        <v-subheader
                          align-center
                          class="c_text_1--text"
                          v-bind:class="$vuetify.breakpoint.xsOnly && 'headline' || 'display-1'"
                        >
                         <span>Confirm Code</span>
                        </v-subheader>
                      </v-flex>
                    </v-layout>
                  </v-subheader>

                  <!-- <v-card flat height="300"> -->
                    <v-form class="pr-2" v-on:submit.prevent="register" ref="register">
                      <v-text-field
                        label="* Confirm"
                        v-model="code"
                        prepend-icon="check"
                        type="number"
                        v-bind:rules="[(v) => v.length > 3 || 'Code must be 4 digits' ]"
                      ></v-text-field>
                      <v-text-field
                        label="* Password"
                        prepend-icon="lock"
                        :type="'password'"
                        v-model="signUpData.password"
                        v-bind:rules="[(v) => v.length > 7 || 'Password must be at list 8 characters long' ]"
                      ></v-text-field>
                      <v-text-field
                        label="* Confirm Password"
                        prepend-icon="lock"
                        :type="'password'"
                        v-model="signUpData.confirmPassword"
                      ></v-text-field>
                      <p
                        class="ml-4"
                        v-if="signUpData.password != signUpData.confirmPassword && signUpData.confirmPassword != ''"
                      >
                        <v-icon small color="error">warning</v-icon>
                        <span class="error--text">Password doesn't match.</span>
                      </p>
                      <div class="mt-3">
                        
                        <v-layout row wrap justify-end
                          v-bind:class="$vuetify.breakpoint.xsOnly && 'mt-0' || 'mt-3'"
                        >
                          <v-flex xs5 md>
                            <v-btn class="text-capitalize" flat v-on:click="step = 2"
                            >
                              Back
                            </v-btn>
                          </v-flex>
                          <v-flex xs7 md6>
                            <v-btn
                              color="primary c-btn"
                              type="submit"
                              :loading="loadingThree"
                              class="text-capitalize"
                            >
                              continue
                            </v-btn>
                          </v-flex>
                        </v-layout>

                        <v-layout 
                          row 
                          wrap
                          v-bind:class="$vuetify.breakpoint.xsOnly && 'mt-3' || 'mt-4'"
                          justify-center>
                          <v-flex xs8 md8 lg6>
                            <router-link
                              router
                              v-bind:to="{ name: 'login' }"
                              flat
                              class="auth-links"
                            >Login
                            </router-link> 
                            | 
                            <router-link
                              router
                              v-bind:to="{ name: 'forgot' }"
                              flat
                              class="auth-links"
                            >Forgot password
                            </router-link>
                          </v-flex>
                        </v-layout>

                      </div>
                    </v-form>
                  <!-- </v-card> -->
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>

            <AuthFooter />
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { getErrorMessage } from "@/resources/helper";
import { urlify } from "@/resources/helper";
import apiClient from "@/resources/apiClient";

import AuthFooter from "../components/AuthFooter";

export default {
  name: "signUp",
  components: {
    AuthFooter
  },
  data() {
    return {
      showPhone: true,
      showEmail: false,

      signUpData: {
        storeName: "",
        storeUrl: "",
        categories: [],
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "+251",
        chosen: 0,
        registeredBy: "PHONE",
        password: "",
        confirmPassword: ""
      },

      categoryChoosen: [],

      // To be accepted form back-end
      categories: [],

      code: "",

      // Steper
      step: 1,

      // Loaders
      loadingOne: false,
      loadingTwo: false,
      loadingThree: false,
      loadCata: false,

      // Rules for Inputs
      inputRules: [
        v => v.length >= 3 || "Minimum length is 3 characters"
        // 'Required',
      ],

      // Rule for Email
      emailRules: [v => v.match(/\S+@\S+\.\S+/) || "Invalid Email Address"]
    };
  },
  methods: {
    // STEP THREE
    register: function() {
      // console.log(this.signUpData)
      if (
        this.$refs.register.validate() &&
        this.signUpData.password === this.signUpData.confirmPassword
      ) {
        this.loadingThree = true;

        if (this.signUpData.chosen == 0) {
          // CHECK FOR CODE
          apiClient.auth
            .validateCode(this.code)

            .then(response => {
              // REGISTER AND AUTHENCATE THE USER
              this.$store
                .dispatch("auth/register", this.signUpData)

                .then(() => {
                  //   console.log(response);

                  this.$store.commit("SET_SNACKBAR", {
                    message:
                      "Registeration Successfull!! Wellcome to Kiosk.et, Start selling online.",
                    value: true,
                    status: "success"
                  });

                  this.loadingThree = false;

                  this.$router.push({ name: "dashboard" });
                })

                .catch(error => {
                  this.$store.commit("SET_SNACKBAR", {
                    message: getErrorMessage(error),
                    value: true,
                    status: "error"
                  });

                  this.loadingThree = false;

                  //   console.log(error.response.data);
                });
            })

            .catch(error => {
              this.$store.commit("SET_SNACKBAR", {
                message: getErrorMessage(error),
                value: true,
                status: "error"
              });

              this.loadingThree = false;

              //   console.log(error);
            });
        } else if (this.signUpData.chosen == 1) {
          this.signUpData.phoneNumber = "";

          // CHECK FOR CODE
          apiClient.auth
            .validateCode(this.code)

            .then(response => {
          
              // REGISTER AND AUTHENCATE THE USER
              // quick fix
              var regdata = {
                "email": this.signUpData.email,
                "firstName": this.signUpData.firstName,
                "lastName": this.signUpData.lastName,
                "storeUrl": this.signUpData.storeUrl,
                "storeName": this.signUpData.storeName,
                "categories": this.signUpData.categories,
                "registeredBy": "EMAIL",
                "password": this.signUpData.password,
                "confirmPassword": this.signUpData.confirmPassword
              }

              this.$store
                .dispatch("auth/register", regdata)

                .then(() => {
                  //   console.log(response);

                  this.$store.commit("SET_SNACKBAR", {
                    message:
                      "Registeration Successfull!! Wellcome to Kiosk.et, Start selling online.",
                    value: true,
                    status: "success"
                  });

                  this.loadingThree = false;

                  this.$router.push({ name: "dashboard" });
                })

                .catch(error => {
                  this.$store.commit("SET_SNACKBAR", {
                    message: getErrorMessage(error),
                    value: true,
                    status: "error"
                  });

                  this.loadingThree = false;

                  //   console.log(error.response.data);
                });
            })

            .catch(error => {
              this.$store.commit("SET_SNACKBAR", {
                message: getErrorMessage(error),
                value: true,
                status: "error"
              });

              this.loadingThree = false;

              //   console.log(error);
            });
        }
      }
    },

    // STEP TWO
    confirm: function() {
      if (this.$refs.confirm.validate()) {
        this.loadingTwo = true;

        if (this.signUpData.chosen == 0) {
          apiClient.auth
            .validatePhone(this.signUpData.phoneNumber.trim())

            .then(response => {
              alert(response.data);

              this.loadingTwo = false;

              this.step = 3;
            })

            .catch(error => {
              this.$store.commit("SET_SNACKBAR", {
                message: getErrorMessage(error),
                value: true,
                status: "error"
              });

              this.loadingTwo = false;

              //   console.log(error.response.data);
            });
        } else if (this.signUpData.chosen == 1) {
          apiClient.auth
            .validateEmail(this.signUpData.email.trim())

            .then(response => {
              // alert(response.data);

              this.$store.commit("SET_SNACKBAR", {
                message:
                  "We have send a 4 digit confirmation code to " + this.signUpData.email,
                value: true,
                status: "success"
              });

              this.loadingTwo = false;

              this.step = 3;
            })

            .catch(error => {
              // for test
              // this.step = 3;

              this.$store.commit("SET_SNACKBAR", {
                message: getErrorMessage(error),
                value: true,
                status: "error"
              });

              this.loadingTwo = false;

              //   console.log(error.response.data);
            });
        }
      }
    },

    // STEP ONE
    goNext() {
      if (this.$refs.gonext.validate()) {
        this.loadingOne = true;

        // SET THE CORRECT VALUE FOR CHOSEN CATEGORIES
        var categories = [this.categoryChoosen];

        this.signUpData.categories = categories;

        // CHECK FOR STORE URL UNIQUENESS
        apiClient.auth
          .validateUrl(this.signUpData.storeUrl.trim())

          .then(() => {
            // console.log(response);

            this.loadingOne = false;

            this.step = 2;
          })

          .catch(error => {
            // for test
            // this.step = 2;
            // console.log(error)

            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });

            this.loadingOne = false;

            // console.log(error.response.data);
            // console.log(error.response.status);
          });
      }
    },

    updateUrl: function() {
      this.signUpData.storeUrl = urlify(this.signUpData.storeName);
    },

    showPhoneField: function() {
      this.showPhone = true;
      this.showEmail = false;
      this.signUpData.email = "";
      this.signUpData.chosen = 0;
      this.signUpData.registeredBy = "PHONE";
    },

    showEmailField: function() {
      this.showPhone = false;
      this.showEmail = true;
      this.signUpData.phoneNumber = "+251";
      this.signUpData.chosen = 1;
      this.signUpData.registeredBy = "EMAIL";
    }
  },
  created() {
    this.loadCata = false;
    this.$store
      .dispatch("auth/getCategory")
      .then(response => {
        this.categories = response.data;
        this.loadCata = true;
      })
      .catch(error => {
        this.$store.commit("SET_SNACKBAR", {
          message: getErrorMessage(error),
          value: true,
          status: "error"
        });
      });
  }
};
</script>

<style scoped>
#register {
  /* background: url("../../../assets/login_1.jpg"); */
  background: #1e88e5;
  background-size: cover;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
.auth-choose:hover {
  cursor: pointer;
  color: #1e88e5;
}
.active-auth-choose {
  color: rgba(0, 0, 0, 0.8);
  color: #1e88e5;
  text-decoration: underline;
}
.circular-progress {
  margin-left: 45% !important;
}
.c-container {
  padding-top: 115px;
}
.c-btn {
  width: 150px;
}
.auth-links {
  text-decoration: none;
}
.auth-links:hover {
  text-decoration: underline;
}
@media (max-width: 824px) {
  #register {
    height: 110vh;
  }
  .c-container {
    padding-top: 27px;
  }
}
</style>
