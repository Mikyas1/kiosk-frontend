<template>
  <v-app class="c_light">
      <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      //
    }
  },
}
</script>
