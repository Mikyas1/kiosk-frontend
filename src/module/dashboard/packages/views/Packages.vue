<template>

    <v-container class="c-body pa-0" fluid="true">
      <Navbar parent="packages" icon="donut_large" />

      <v-card height="400" class="mx-4 my-5">
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
      </v-card>
      
      <!-- <v-card height="400" class="mx-4 my-5">

      </v-card> -->
  
    </v-container>

</template>

<script>
import { mapGetters } from "vuex";

import Navbar from '@/components/BodyNav'

export default {
  name: 'packages',
  components: {
    Navbar
  },
  computed: {
    ...mapGetters({
      storeToken: "dashboard/storeToken",
    }),
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
