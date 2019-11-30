<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card flat>
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
                        <v-flex xs12>
                          <v-subheader
                            align-center
                            class="c_text_1--text headline"
                          >
                            <span>Reset Password</span>
                          </v-subheader>
                        </v-flex>
                      </v-layout>
                    </v-subheader>

                    <v-form class="pr-2" v-on:submit.prevent="resetFirst" ref="email">
                      <v-text-field
                        class="mt-1"
                        label="* Email"
                        v-model="email"
                        prepend-icon="email"
                        v-bind:rules="emailRules"
                      ></v-text-field>
                    
                      <v-layout row wrap class="mt-3" justify-end>
                        <v-flex xs8 md6>
                          <v-btn
                            color="primary c-btn"
                            type="submit"
                            :loading="loadingEmail"
                            class="text-capitalize"
                          >
                            continue
                          </v-btn>
                        </v-flex>
                      </v-layout>

                      </v-form>

                      <v-layout 
                        row 
                        wrap
                        v-bind:class="$vuetify.breakpoint.xsOnly && 'mt-3' || 'mt-4'"
                        justify-center>
                        <v-flex xs6 md5 lg4>
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
                            v-bind:to="{ name: 'register' }"
                            flat
                            class="auth-links"
                          >New here
                          </router-link>
                        </v-flex>
                      </v-layout>

                  </v-stepper-content>
                  
                   <!-- STEPPER THREE -->
                  <v-stepper-content step="2">
                    <v-subheader class="display-1 mb-3 c_text_1--text">
                      
                      <v-layout align-center justify-center>
                        <v-flex xs9>
                          <v-subheader
                            align-center
                            class="c_text_1--text headline"
                          >
                          <span>Reset Password</span>
                          </v-subheader>
                        </v-flex>
                      </v-layout>
                    </v-subheader>

                      <v-form class="pr-2" v-on:submit.prevent="resetComplete" ref="reset">
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
                          v-model="reset.password"
                          v-bind:rules="[(v) => v.length > 7 || 'Password must be at list 8 characters long' ]"
                        ></v-text-field>
                        <v-text-field
                          label="* Confirm Password"
                          prepend-icon="lock"
                          :type="'password'"
                          v-model="reset.confirmPassword"
                        ></v-text-field>
                        <p
                          class="ml-4"
                          v-if="reset.password != reset.confirmPassword && reset.confirmPassword != ''"
                        >
                          <v-icon small color="error">warning</v-icon>
                          <span class="error--text">Password doesn't match.</span>
                        </p>
                        <div class="mt-3">
                          
                          <v-layout row wrap class="mt-3" justify-end>
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
                                :loading="loadingComplete"
                                class="text-capitalize"
                              >
                                Reset
                              </v-btn>
                            </v-flex>
                          </v-layout>

                          <v-layout 
                            row 
                            wrap
                            v-bind:class="$vuetify.breakpoint.xsOnly && 'mt-3' || 'mt-4'"
                            justify-center>
                            <v-flex xs6 md5 lg4>
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
                                v-bind:to="{ name: 'register' }"
                                flat
                                class="auth-links"
                              >New here
                              </router-link>
                            </v-flex>
                          </v-layout>

                        </div>
                      </v-form>
                  </v-stepper-content>

                </v-stepper-items>
              </v-stepper>
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
    step: 1,
    email: '',
    loadingEmail: false,
    loadingComplete: false,
    code: "",
    reset: {
      confirmPassword: "",
      password: ""
    },
    emailRules: [v => v.match(/\S+@\S+\.\S+/) || "Invalid Email Address"]
  }),

  methods: {
    resetFirst() {
      if(this.$refs.email.validate()) {
        
        this.loadingEmail = true;

        this.$store
          .dispatch("auth/forgetPassword", { email: this.email.trim() })
          .then(() => {

            this.$store.commit("SET_SNACKBAR", {
                message:
                  "We have send a 4 digit confirmation code to " + this.email,
                value: true,
                status: "success"
              });

            this.loadingEmail = false;
            this.step = 2;
          })
          .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
            this.loadingEmail = false;

          });
      }
    },
    resetComplete() {
      if(this.$refs.reset.validate()) {
        this.loadingComplete = true;

        this.$store
          .dispatch("auth/updatePassword", { email: this.email.trim(), password: this.reset.password, code: this.code })
          .then(() => {
            this.$store.commit("SET_SNACKBAR", {
                message:
                  "You have reset your password successfully!",
                value: true,
                status: "success"
              });
            this.loadingComplete = false;
            this.$router.push({ name: 'login' });

          })
          .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
            this.loadingComplete = false;

          });
      }
    }
  }
}
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
