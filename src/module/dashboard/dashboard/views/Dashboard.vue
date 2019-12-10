<template>
  <div>

    <v-container class="c-body pa-0" fluid="true">
      <Navbar :parent="{name : 'dashboard', link : 'dashboard'}" icon="dashboard" />
      
      <v-card height="400" class="mx-4 my-5">

      </v-card>
      
      <v-card height="400" class="mx-4 my-5">

      </v-card>

    </v-container>

  </div>

</template>

<script>

import Navbar from '@/components/BodyNav'

export default {
  name: 'Dashboard',
  components: {
    Navbar
  },
  created() {
      this.$store.commit('dashboard/SET_ACTIVE_PAGE', 'dashboard');
  },
}
</script>

<style>
.c-body {
  
  padding-top: 0px;
  width: 100%;
}
</style>
