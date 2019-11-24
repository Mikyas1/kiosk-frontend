<template>

    <v-container class="c-body pa-0" fluid="true">
      <Navbar parent="editSite" icon="brush"/>

      <v-layout row wrap
        class="my-4"
        v-bind:class="$vuetify.breakpoint.xsOnly && 'mx-1' || 'mx-4'"
      >
        <v-flex xs12 sm6  v-for="theme in themes" v-bind:key="theme.name">
          <Theme :theme="theme"/>
        </v-flex>
      </v-layout>

      <div style="height: 51px"></div>
      
    </v-container>

</template>

<script>

import Navbar from '@/components/BodyNav'
import Theme from '../components/Theme'

export default {
  name: 'editSite',
  components: {
    Navbar, Theme
  },
  data() {
    return {
      themes: [{name: 'Mint', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam enim ab fugit illum sed exercitationem, quos quo. Delectus beatae exercitationem quibusdam doloribus aliquid alias ad omnis. Magnam doloremque perferendis error.', active: false},
               {name: 'Mint2', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam enim ab fugit illum sed exercitationem, quos quo. Delectus beatae exercitationem quibusdam doloribus aliquid alias ad omnis. Magnam doloremque perferendis error?', active: true}]
    }
  },
  created() {
      this.$store.commit('dashboard/SET_ACTIVE_PAGE', 'editSite');
  },
}
</script>

<style scoped>

</style>