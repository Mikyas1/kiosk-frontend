<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <!-- <v-card class="elevation-1 pa-3">
            <v-card-text>-->

            <v-stepper v-model="step">
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-subheader
                    class="mb-3 c_text_1--text"
                    v-bind:class="$vuetify.breakpoint.xsOnly && 'title ml-4' || 'display-1 ml-5'"
                  >
                    <span>Login</span>
                  </v-subheader>

                  <v-form v-on:submit.prevent="next">
                    <v-text-field
                      label="Store Url"
                      type="text"
                      v-model="logData.storeUrl"
                      prepend-icon="language"
                    ></v-text-field>
                    <v-btn router v-bind:to="{ name: 'register' }" flat class="white">Register</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" class="c-btn" block color="primary">Next</v-btn>
                  </v-form>
                </v-stepper-content>
                <v-stepper-content step="2">
                  <v-subheader
                    class="mb-3 c_text_1--text"
                    v-bind:class="$vuetify.breakpoint.xsOnly && 'title ml-4' || 'display-1 ml-5'"
                  >
                    <span>Login</span>
                  </v-subheader>

                  <v-form v-on:submit.prevent="confirm">
                    <v-text-field label="Email" type="text" v-model="logData.email"></v-text-field>
                    <v-btn flat class="white" v-on:click="back">back</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" class="c-btn" block color="primary">Login</v-btn>
                  </v-form>
                </v-stepper-content>
                <v-stepper-content step="3">
                  <v-subheader
                    class="mb-3 c_text_1--text"
                    v-bind:class="$vuetify.breakpoint.xsOnly && 'title ml-4' || 'display-1 ml-5'"
                  >
                    <span>Login</span>
                  </v-subheader>

                  <v-form v-on:submit.prevent="login">
                    <v-text-field label="code" type="text" v-model="logData.code"></v-text-field>
                    <v-btn flat class="white" v-on:click="back">back</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      type="submit"
                      class="c-btn"
                      block
                      color="primary"
                      v-on:click="login"
                    >Confirm</v-btn>
                  </v-form>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
            <!-- </v-card-text>
            </v-card>-->

            <AuthFooter/>
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
    loading: false,
    logData: {
      // storeUrl: '',
      // phoneNo: '+251',
      email: "",
      password: ""
    }
  }),

  methods: {
    next() {
      this.step = 2;
    },
    confirm() {
      this.step = 3;
    },
    back() {
      this.step--;
    },

    login() {
      // this.$router.push({ name: 'dashboard'})
      var data = {
        email: "merrylove@gmail.com",
        password: "hgfds"
      };

      this.$store
        .dispatch("auth/login", data)

        .then(() => {
          // console.log(response);
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
          this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
          // this.$router.push({ name: 'dashboard' })
        });
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
</style>
