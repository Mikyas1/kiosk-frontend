<template>
  <v-app class="c_light">
    <Snackbar/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Snackbar from "@/components/Snackbar";
export default {
  name: "App",
  data() {
    return {
      //
    };
  },
  components: {
    Snackbar
  }
};
</script>
