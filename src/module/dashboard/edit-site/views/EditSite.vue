<template>

    <v-container class="c-body pa-0" fluid="true">
      <Navbar :parent="{name : 'editSite', link : 'editSite'}" icon="brush"/>

      <!-- LOADER -->
      <v-progress-linear v-if="loading" v-bind:indeterminate="true" class="my-0"></v-progress-linear>


      <v-layout row wrap v-if="show"
        class="my-4"
        v-bind:class="$vuetify.breakpoint.xsOnly && 'mx-1' || 'mx-4'"
      >
        <v-flex xs12 sm6  v-for="theme in themes" v-bind:key="theme.name">
          <Theme :theme="theme" :activeTheme="activeTheme"/>
        </v-flex>
      </v-layout>

      <v-layout v-else>
        <LoadingFailed v-if="error"></LoadingFailed>
        <Loading v-else></Loading>
      </v-layout>

      <div style="height: 51px"></div>
      
    </v-container>

</template>

<script>

import Navbar from '@/components/BodyNav'
import Theme from '../components/Theme'
import LoadingFailed from '@/components/LoadingFailed';
import Loading from '@/components/Loading';

import { getErrorMessage } from "@/resources/helper";
import { mapGetters } from "vuex";

export default {
  name: 'editSite',
  components: {
    Navbar, 
    Theme, 
    Loading,
    LoadingFailed
  },
  data() {
    return {
      loading: false,
      show: false,
      error: false,
      themes: null,
    }
  },
  computed: {
    ...mapGetters({
      themeSelected: "dashboard/themeSelected",
    }),
    activeTheme() {
      if(this.themeSelected === null) {
        if(this.themes) {
          return this.themes.filter(x => x.id === 1)[0]
        }
      } else {
        return this.themeSelected;
      }
    }
  },
  methods: {
    
  },
  created() {
      this.$store.commit('dashboard/SET_ACTIVE_PAGE', 'editSite');

      this.loading = true;
      this.$store.dispatch("dashboard/get_themes")
      .then(response => {
        this.themes = response;
        this.loading = false;
        this.show = true;
      })
      .catch(error => {
        this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
        this.loading = false;
        this.error = true;
      })
  },
}
</script>

<style scoped>

</style>