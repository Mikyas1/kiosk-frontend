<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3" height="360">
              <v-card-text>
                <v-subheader
                  class="mb-3 c_text_1--text"
                  v-bind:class="$vuetify.breakpoint.xsOnly && 'title ml-4' || 'display-1 ml-5'"
                >
                  <span>Login</span>
                </v-subheader>

                <v-form v-on:submit.prevent="login" ref="login">
                  <v-text-field
                    label="Store Url"
                    type="text"
                    v-model="logData.url"
                    prepend-icon="language"
                    v-bind:rules="[(v) => v.length > 3 || 'Minimum length is 3 characters' ]"
                  ></v-text-field>
                  <v-text-field
                    label="* Password"
                    prepend-icon="lock"
                    :type="'password'"
                    v-model="logData.password"
                    v-bind:rules="[(v) => v.length > 7 || 'Password must be at list 8 characters long' ]"
                  ></v-text-field>
                  <v-layout row wrap class="mt-4">
                    <v-flex xs6 md6>
                      <v-btn type="submit" class="c-btn" block color="primary">Login</v-btn>
                    </v-flex>
                    <v-flex xs6 md6 class="mt-3">
                      <router-link
                        router
                        v-bind:to="{ name: 'register' }"
                        flat
                        class="white"
                      >Register
                      </router-link>
                    </v-flex>
                    <v-flex xs6 md6 class="mt-3">
                      <router-link
                        router
                        v-bind:to="{ name: 'register' }"
                        flat
                        class="white"
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
    }
  }),

  methods: {

    login() {
      if (this.$refs.login.validate()) {
      this.$store
        .dispatch("auth/login", this.logData)

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
        });
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
</style>
