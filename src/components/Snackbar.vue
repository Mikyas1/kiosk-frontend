<template>
  <v-snackbar
    v-model="snackbar.value"
    v-bind:timeout="snackbar.timeout"
    top
    v-bind:color="color"
    v-bind:multi-line="snackbar.multiline === true"
  >
    <v-icon color="white">{{ icon }}</v-icon>&nbsp;&nbsp;
    <span>{{ snackbar.message }}</span>
    <v-btn color="pink" flat v-on:click="CLOSE_SNCKBAR">
      <v-icon color="secondary_1">clear</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["CLOSE_SNCKBAR"])
  },
  computed: {
    ...mapGetters({
      snackbar: "snackbar"
    }),
    icon() {
      if (this.snackbar.status == "success") {
        return "done";
      } else {
        return "error_outline";
      }
    },
    color() {
      if (this.snackbar.status == "success") {
        return "c_selected_btn";
      } else {
        return "";
      }
    }
  },
};
</script>

<style>
</style>
