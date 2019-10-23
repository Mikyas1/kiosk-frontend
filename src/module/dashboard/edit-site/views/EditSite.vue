<template>

    <v-container class="c-body pa-0" fluid="true">
      <Navbar parent="editSite" icon="brush"/>

      <v-card class="mx-4 my-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo hic ullam ipsam sapiente eveniet nisi dolorum dicta provident! Perferendis alias voluptatem veritatis nisi libero deserunt est nemo quia odio qui.  
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

<style lang="stylus">
  .e4
    width: 400px
    margin: auto
</style>