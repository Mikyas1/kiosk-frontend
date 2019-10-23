<template>

    <v-container class="c-body pa-0 mb-5" fluid="true">
      <Navbar parent="packages" icon="donut_large" />

      <!-- <v-card height="400" class="mx-4 my-5">
        <h2 class="ml-4 subheading" style="min-width: 100px">
          Tokens in {{ storeToken }} ETB
        </h2>
        <v-btn 
            flat 
            raised 
            dark 
            class="c_selected_btn ml-0 text-capitalize"
            v-on:click="purchaseToken"
            >
              purchase 20 tokens
          </v-btn>
      </v-card> -->
      
      <v-container fluid class="my-0">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="packages in getPackages" v-bind:key="packages.price">
          <v-card flat height="310" class="text-xs-center ma-3 c-card">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <!-- <img src=""> -->
                <v-icon large class="white--text" :class="packages.color">store_mall_directory</v-icon>
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="grey--text">Purchase {{ packages.tokens }} Tokens</div>
              <div class="grey--text mb-1">for</div>
              <div class="headline font-weight-light">{{ packages.price }} ETB</div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                round
                color="c_selected_btn white--text text-capitalize" 
                v-on:click="purchaseToken"
              >
                <v-icon small class="mr-2">shop</v-icon>
                <span class="mr-2">purchase</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
      
      <!-- <v-card height="400" class="mx-4 my-5">

      </v-card> -->
  
    </v-container>

</template>

<script>
import { mapGetters } from "vuex";

import Navbar from '@/components/BodyNav'
import { packages } from "@/resources/data";

export default {
  name: 'packages',
  components: {
    Navbar
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      storeToken: "dashboard/storeToken",
    }),
    getPackages() {
      return packages;
    }
  },
  methods: {
    purchaseToken() {
      this.$store.dispatch('dashboard/buy_tokens')
      .then()
      .catch()
    }
  },
  created() {
      this.$store.commit('dashboard/SET_ACTIVE_PAGE', 'packages');
  },
}
</script>

<style scoped>
.c-card {
  /* border-radius: 4px !important; */
}
</style>