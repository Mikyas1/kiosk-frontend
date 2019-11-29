<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3" v-bind:height="$vuetify.breakpoint.smAndDown && 395 || 350">
              <v-card-text>
                <v-layout align-center justify-center>
                  <v-flex xs6>
                    <v-subheader
                      align-center
                      class="c_text_1--text"
                      v-bind:class="$vuetify.breakpoint.xsOnly && 'headline' || 'mb-3 display-1'"
                    >
                      <span>Login</span>
                    </v-subheader>
                  </v-flex>
                </v-layout>
                
                <v-form v-on:submit.prevent="login" ref="login">
                  <v-layout row wrap>
                    <v-flex xs11>
                      <v-text-field
                        label="Store Url or Email or Phone no"
                        type="text"
                        v-model="logData.url"
                        prepend-icon="language"
                        v-bind:rules="[(v) => v.length > 2 || 'Minimum length is 3 characters' ]"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs10>
                      <v-text-field
                        label="Password"
                        prepend-icon="lock"
                        :type="getPasswordFieldType"
                        v-model="logData.password"
                        v-bind:rules="[(v) => v.length > 7 || 'Password must be at list 8 characters long' ]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs2>
                      <v-btn flat small fab class="mt-3" v-on:click="showpass=!showpass">
                        <v-icon v-if="!showpass">visibility</v-icon>
                        <v-icon v-else>visibility_off</v-icon>
                      </v-btn>
                      <!-- <v-icon>visibility</v-icon> -->
                    </v-flex>
                  </v-layout>
                  <!-- Remember me and forgot password -->
                  <v-layout row wrap>
                    <v-flex xs12 md6>
                      <v-checkbox
                      label="Remember me"
                      ></v-checkbox> 
                    </v-flex>
                    <v-flex v-if="$vuetify.breakpoint.mdAndUp" xs12 md6 class="mt-2">
                      <v-btn
                        type="submit" 
                        class="c-btn align-end text-capitalize" 
                        v-bind:loading="loginbtn"
                        color="primary">
                          Login
                        </v-btn>
                    </v-flex>
                  </v-layout>

                  <v-layout v-if="$vuetify.breakpoint.smAndDown" row wrap justify-end>
                    <v-flex xs8 md6>
                      <v-btn
                        type="submit" 
                        class="c-btn align-end text-capitalize" 
                        v-bind:loading="loginbtn"
                        color="primary">
                          Login
                        </v-btn>
                    </v-flex>
                  </v-layout>
                  <v-layout 
                      row 
                      wrap
                      v-bind:class="$vuetify.breakpoint.xsOnly && 'mt-3' || 'mt-3'"
                     justify-center>
                    <v-flex xs10 md8 lg6>
                      <router-link
                        router
                        v-bind:to="{ name: 'register' }"
                        flat
                        class="auth-links"
                      >New here
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
              </v-card-text>
            </v-card>

            <AuthFooter />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AuthFooter from "../components/AuthFooter";
import { getErrorMessage } from "@/resources/helper";

export default {
  name: "login",
  components: {
    AuthFooter
  },
  data: () => ({
    loading: false,
    logData: {
      url: "",
      password: ""
    },
    loginbtn: false,
    showpass: false
  }),

  methods: {

    login() {
      if (this.$refs.login.validate()) {
        this.loginbtn = true;
        
        // TRIM INPUT
        var inputType = this.checkInputType(this.logData.url.trim());

        if (inputType === 'email') {
          var data = {
            email: this.logData.url,
            password: this.logData.password
          }
        } else if (inputType === 'storeUrl') {
          var data = {
            url: this.logData.url,
            password: this.logData.password
          }
        }
        

        this.$store
          .dispatch("auth/login", data)

          .then(() => {
            // console.log(response);
            this.loginbtn = false;
            this.$router.push({ name: "dashboard" });
            this.$store.commit("SET_SNACKBAR", {
              message: "Successfully logged in. Wellcome back!!",
              value: true,
              status: "success"
            });
        })

        .catch(error => {
          // FOR TESTING PURPOSES
          // console.log(error);
          this.loginbtn = false;
          if (error.response.status == 401) {
            this.$store.commit("SET_SNACKBAR", {
              message: "Store Url and Password don't match!",
              value: true,
              status: "error"
            });
          } else {
            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
          }
        });
      }
    },
    checkInputType(str) {
      if (function(email){
         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(String(email).toLowerCase());
      }(str)) {
        return 'email';
      } else {
        return 'storeUrl';
      }
    }

  },
  computed: {
    getPasswordFieldType() {
      if (this.showpass) {
        return 'text'
      } else {
        return 'password'
      }
    }
  }
};
</script>
<style scoped lang="css">
#login {
  /* background: url("../../../assets/login_1.jpg"); */
  background: 1e88e5;
  background-size: cover;
  height: 100vh;
  /* height: 50%; */
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
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
</style>
