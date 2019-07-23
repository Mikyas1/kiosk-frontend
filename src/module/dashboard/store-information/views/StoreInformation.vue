<template>
  <v-container class="c-body pa-0" fluid="true">
    <!-- BODY NAVIGATOR -->
    <Navbar parent="Store Information" icon="store" />

    <!-- LOADER -->
    <!-- <v-progress-linear v-if="loading" v-bind:indeterminate="true" class="my-0"></v-progress-linear> -->

    <!-- some height if no page content -->

    <!-- <div v-if="!load" class="c-height"></div> -->

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
        <Branches
          v-on:removeBranch="deleteBranch($event)"
          v-on:addBranch="addNewBranch($event)"
          v-on:editBranch="editBranch($event)"
        />
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
  methods: {
    // REMOVE BRANCH FROM BRANCHS
    deleteBranch: function(branchId) {
      this.storeInformation.branches = this.storeInformation.branches.filter(
        x => x.id !== branchId
      );
    },
    addNewBranch: function(newBranch) {
      this.storeInformation.branches.push(newBranch);
    },
    editBranch: function(editedBranch) {
      let index = this.storeInformation.branches.findIndex(
        x => x.id == editedBranch.id
      );
      this.storeInformation.branches[index] = editedBranch;
    }
  }
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
