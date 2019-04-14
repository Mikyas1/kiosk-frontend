<template>

<v-app class="c_light">


    <!-- NON AUTHINCATED SECTION -->
    <template v-if="!nav">
      
      <!-- PAGE CONTENT -->
      <v-content>
        <router-view></router-view>
      </v-content>

    </template>  



    <!-- AUTHINCATED SECTION -->
    <template v-if="nav">
      
      <!-- LOAD NAVIGATION -->
      <Navbar />

      <!-- PAGE CONTENT -->
      <v-content>
        <router-view></router-view>
        <!-- PAGE FOOTER -->
        <Footer />
      </v-content>
    
    </template>

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
  computed: {
    nav() {
      return this.$store.state.loggedIn;
    }
  }
}
</script>
