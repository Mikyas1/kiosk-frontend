<template>

<v-app class="c_light">
 
<template>
    
    <!-- LOAD NAVIGATION -->
    <Navbar />

    <!-- PAGE CONTENT -->
    <v-content>
        <!-- CHILDREN COMPONENT -->
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
}
</script>