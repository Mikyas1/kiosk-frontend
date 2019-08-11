<template>
  <v-app class="c_light">
    <Snackbar/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

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
  },
  computed: {
    ...mapGetters({
      lang: "lang/lang"
    }),
  },
  created() {
    this.$store.dispatch("lang/setLang", { vm: this, lang: this.lang });
  }
};
</script>
