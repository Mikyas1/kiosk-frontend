<template>
  <v-container class="c-body pa-0 mb-5" fluid="true">
    <!-- BODY NAVIGATOR -->
    <Navbar :parent="{name : 'storeInformation', link : 'storeInformation'}" icon="store" />

    <div>
      <v-layout row wrap class="first-card">
        <!-- ABOUT US -->
        <AboutUs/>

        <!-- CUSTOMER SUPPORT -->
        <CustomerSupport/>
      </v-layout>

      <v-layout row wrap>
        <!-- CONTACT US -->
        <ContactUs/>

        <!-- BRANCHES -->
        <Branches/>
        
      </v-layout>

      <v-layout row wrap>
        <!-- PROFILE -->
        <Profile/>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import Navbar from "@/components/BodyNav";

import AboutUs from "../components/AboutUs";
import CustomerSupport from "../components/CustomerSupport";
import Profile from "../components/Profile";
import ContactUs from "../components/ContactUs";
import Branches from "../components/Branches";

export default {
  name: "storeInformation",

  components: {
    Navbar,

    AboutUs,
    CustomerSupport,
    Profile,
    ContactUs,
    Branches
  },

  data() {
    return {};
  },

  created() {
    this.$store.commit("dashboard/SET_ACTIVE_PAGE", "storeInformation");
  },
};
</script>

<style scoped>
.c-list {
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}
.c-list-header {
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}
.c-height {
  height: 67vh;
}
</style>
