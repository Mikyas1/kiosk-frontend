<template>

    <v-container class="c-body pa-0" fluid="true">
      <Navbar parent="packages" icon="donut_large" />

      <v-card height="400" class="mx-4 my-5">

      </v-card>
      
      <v-card height="400" class="mx-4 my-5">

      </v-card>
  
    </v-container>

</template>

<script>

import Navbar from '@/components/BodyNav'

export default {
  name: 'packages',
  components: {
    Navbar
  },
  created() {
      this.$store.commit('dashboard/SET_ACTIVE_PAGE', 'packages');
  },
}
</script>
