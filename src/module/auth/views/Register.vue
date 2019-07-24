<template>
  <div id="register-page">
    <v-content id="register" class="primary">
      <v-container fluid fill-height class="c-container">
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md10 lg4>
            <v-stepper v-model="step">
              <v-stepper-items height="300">
                <v-stepper-content step="1">
                  <v-subheader
                    class="mb-3 c_text_1--text"
                    v-bind:class="$vuetify.breakpoint.xsOnly && 'title ml-4' || 'display-1 ml-5'"
                  >
                    <!-- <span>Create Store</span> -->
                    <span v-on:click="setLang(getLang().lang)">{{ $t("signup", lang) }}</span>
                  </v-subheader>

                  <v-form class="pr-2" v-on:submit.prevent="goNext" ref="gonext">
                    <v-text-field
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
                      v-bind:items="categoriesDisp"
                      v-model="categoryChoosen"
                      label="* Category"
                      item-text="categories"
                      item-value="abbr"
                      class="input-group--focused"
                      prepend-icon="person_outline"
                      v-bind:rules="[(v) => v.length > 0 || 'Category is required']"
                      required
                    ></v-select>
                    <v-btn color="primary" type="submit" v-bind:loading="loadingOne">continue</v-btn>
                    <v-btn class="ml-5" flat router v-bind:to="{ name: 'login'}">login</v-btn>
                  </v-form>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-subheader class="display-1 mb-3 ml-5 c_text_1--text">
                    <span>Create Profile</span>
                  </v-subheader>

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
                    <v-layout align-center justify-center class="mb-3 ml-3 mt-3">
                      <v-flex>
                        <div class="title pl-5 grey--text">
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
                    <v-btn type="submit" color="primary">continue</v-btn>
                    <v-btn class="ml-5" flat v-on:click="step = 1">Cancle</v-btn>
                  </v-form>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-subheader class="display-1 mb-3 ml-5 c_text_1--text">
                    <span>Confirm Code</span>
                  </v-subheader>

                  <v-card flat height="200">
                    <v-form class="pr-2" v-on:submit.prevent="register" ref="register">
                      <v-text-field
                        label="* Confirm"
                        v-model="code"
                        prepend-icon="check"
                        v-bind:rules="[(v) => v.length > 3 || 'Code must be 4 digits' ]"
                      ></v-text-field>
                      <div class="mt-5">
                        <v-btn type="submit" color="primary">continue</v-btn>
                        <v-btn class="ml-5" flat v-on:click="step = 2">Cancle</v-btn>
                      </div>
                    </v-form>
                  </v-card>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>

            <AuthFooter/>
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
        chosen: 0
      },

      categoryChoosen: [],

      // To be accepted form back-end
      categories: [
        { val: 1, text: "Electronics" },
        { val: 2, text: "Clothing" },
        { val: 3, text: "Automobiles" },
        { val: 4, text: "Machinery" },
        { val: 5, text: "Others" }
      ],

      code: "",

      // Steper
      step: 1,

      // Loaders
      loadingOne: false,
      loadingTwo: false,
      loadingThree: false,

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
      if (this.$refs.register.validate()) {
        this.loadingThree = true;

        if (this.signUpData.chosen == 0) {
          // CHECK FOR CODE
          apiClient.auth
            .validateCode(this.code)

            .then(() => {
              //   console.log(response);

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

          //   console.log(this.signUpData);

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
        }
      }
    },

    // STEP TWO
    confirm: function() {
      if (this.$refs.confirm.validate()) {
        this.loadingTwo = true;

        if (this.signUpData.chosen == 0) {
          apiClient.auth
            .validatePhone(this.signUpData.phoneNumber)

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
            .validateEmail(this.signUpData.email)

            .then(response => {
              alert(response.data);

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
        var categories = [];

        for (var i = 0; i < this.categories.length; i++) {
          if (this.categoryChoosen == this.categories[i].text)
            categories.push(this.categories[i].val);
        }

        this.signUpData.categories = categories;

        // CHECK FOR STORE URL UNIQUENESS
        apiClient.auth
          .validateUrl(this.signUpData.storeUrl)

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
    },

    showEmailField: function() {
      this.showPhone = false;
      this.showEmail = true;
      this.signUpData.phoneNumber = "+251";
      this.signUpData.chosen = 1;
    },

    setLang(lang) {
      this.$store.dispatch("lang/setLang", { vm: this, lang });
    },

    getLang() {
      if (this.lang == "am") {
        return { lang: "en", text: "EN" };
      }
      return { lang: "am", text: "አ" };
    }
  },
  computed: {
    ...mapGetters({
      lang: "lang/lang"
    }),
    categoriesDisp() {
      let categories = [];
      for (var i = 0; i < this.categories.length; i++) {
        categories.push(this.categories[i].text);
      }
      return categories;
    }
  }
};
</script>

<style scoped>
#register {
  /* background: url("../../../assets/login_1.jpg"); */
  background: 1e88e5;
  background-size: cover;
  height: 100vh;
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
</style>
