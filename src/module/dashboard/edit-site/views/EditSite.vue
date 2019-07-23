<template>

    <v-container class="c-body pa-0" fluid="true">
      <Navbar parent="Edit Web-Site" icon="brush"/>

      <v-card height="400" class="mx-4 my-5">

      </v-card>
      
      <v-card height="400" class="mx-4 my-5">

      </v-card>

    </v-container>

</template>

<script>

import Navbar from '@/components/BodyNav'

export default {
  name: 'editSite',
  components: {
    Navbar
  },
  created() {
      this.$store.commit('dashboard/SET_ACTIVE_PAGE', 'editSite');
  },
}
</script>
