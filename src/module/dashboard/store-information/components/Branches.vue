<template>
  <v-flex class="xs12 sm12 md4">
    <v-card
      min-height="250"
      class="my-4"
      v-bind:class="$vuetify.breakpoint.xsOnly && 'mx-1' || 'mx-4'"
    >
      <v-toolbar color="primary" dark flat>
        <v-icon>store</v-icon>

        <v-toolbar-title>{{ $t('branch') }}</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text class="pa-0">
        <v-list three-line class="pa-0">
          <template>
            <v-subheader class="c-list-header">{{ $t('total') }} {{ branches.length }} {{ $t('branch') }}</v-subheader>

            <v-divider></v-divider>

            <v-list-tile
              avatar
              class="c-list"
              v-for="branch in branches"
              v-bind:key="branch.id"
              ripple
              v-on:click="showEditDialog(branch.id)"
            >
              <v-list-tile-action>
                <v-icon>store</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title class="primary--text">{{ branch.branchName }}</v-list-tile-title>
                <v-list-tile-sub-title class="caption font-weight-light">
                  {{ branch.location.country }} - {{ branch.location.region }}
                  <br>
                  {{ branch.location.city }}
                  <span
                    v-if="branch.location.sub_city"
                  >- {{ branch.location.sub_city }}</span>
                  <br>
                  <span
                    v-if="branch.location.buildingAndRoomNo"
                  >-- {{ checkLengthReturn(branch.location.buildingAndRoomNo) }}</span>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-dialog max-width="600px" v-model="editDialog">
              <div slot="activator"></div>
              <v-card>
                <div primary-title>
                  <div class="headline pt-4 ml-4">{{ $t('edit_branch') }}</div>
                </div>

                <v-card-text>
                  <div class="ml-2">
                    <v-icon small color="primary">info</v-icon>
                    {{ $t('add_new_branch_info') }}
                  </div>

                  <v-form ref="edit">
                    <v-text-field
                      :label="'* ' + $t('branch_name')"
                      class="input-group--focused pr-4 pl-2 mt-2"
                      v-bind:rules="inputRules"
                      v-model="branchEditing.branchName"
                    ></v-text-field>

                    <v-text-field
                      :label="'* ' + $t('branch_phone_no')"
                      class="input-group--focused pr-4 pl-2"
                      v-model="branchEditing.phones[0].phoneNumber"
                      type="number"
                    ></v-text-field>

                    <v-subheader>{{ $t('branch_location') }}</v-subheader>

                    <v-select
                      v-bind:items="countries"
                      :label="'* ' + $t('country')"
                      item-text="Country"
                      item-value="abbr"
                      single-line
                      class="pr-4 pl-2"
                      v-bind:rules="[(v) => v.length > 0 || 'Country is required']"
                      v-model="branchEditing.location.country"
                    ></v-select>

                    <v-select
                      v-bind:rules="[(v) => v.length > 0 || 'Region is required']"
                      v-bind:items="regions"
                      :label="'* ' + $t('region')"
                      item-text="Region"
                      item-value="abbr"
                      single-line
                      class="pr-4 pl-2"
                      v-model="branchEditing.location.region"
                    ></v-select>

                    <v-text-field
                      :label="'* ' + $t('city')"
                      class="input-group--focused pr-4 pl-2"
                      v-bind:rules="inputRules"
                      v-model="branchEditing.location.city"
                    ></v-text-field>

                    <v-text-field
                      :label="$t('sub_city')"
                      class="input-group--focused pr-4 pl-2"
                      v-model="branchEditing.location.sub_city"
                    ></v-text-field>

                    <v-textarea
                      :label="$t('buildingAndRoomNo')"
                      class="pr-4 pl-2"
                      v-model="branchEditing.location.buildingAndRoomNo"
                    ></v-textarea>

                    <v-btn
                      flat
                      dark
                      class="c_selected_btn ml-0 text-capitalize"
                      v-bind:loading="loadingEdit"
                      v-on:click="editBranch"
                    >{{ $t('edit') }}</v-btn>

                    <v-btn
                      flat
                      dark
                      class="error ml-0 text-capitalize"
                      v-bind:loading="loading"
                      v-on:click="removeBranch(branchEditing.id)"
                    >{{ $t('remove') }}</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </template>
        </v-list>
      </v-card-text>

      <v-dialog max-width="600px" v-model="addDialog">
        <v-btn
          fab
          slot="activator"
          dark
          class="secondary_1 white--text mt-5 c-btn"
          right
          absolute
          top
        >
          <v-icon>add</v-icon>
        </v-btn>
        <v-card>
          <div primary-title>
            <div class="headline pt-4 ml-4">{{ $t('add_new_branch') }}</div>
          </div>

          <v-card-text>
            <div class="ml-2">
              <v-icon small color="primary">info</v-icon>
              {{ $t('add_new_branch_info') }}
            </div>
            <v-form ref="add" v-on:submit.prevent="addBranch">
              <v-text-field
                :label="'* ' + $t('branch_name')"
                class="input-group--focused pr-4 pl-2 mt-2"
                v-bind:rules="inputRules"
                v-model="newBranch.branchName"
              ></v-text-field>

              <v-text-field
                :label="'* ' + $t('branch_phone_no')"
                class="input-group--focused pr-4 pl-2"
                v-model="newBranch.phoneData[0].newPhoneNumber"
              ></v-text-field>

              <v-subheader>{{ $t('branch_location') }}</v-subheader>

              <v-select
                v-bind:items="countries"
                :label="'* ' + $t('country')"
                item-text="Country"
                item-value="abbr"
                single-line
                class="pr-4 pl-2"
                v-bind:rules="[(v) => v.length > 0 || 'Country is required']"
                v-model="newBranch.location.country"
              ></v-select>

              <v-select
                v-bind:rules="[(v) => v.length > 0 || 'Region is required']"
                v-bind:items="regions"
                :label="'* ' + $t('region')"
                item-text="Region"
                item-value="abbr"
                single-line
                class="pr-4 pl-2"
                v-model="newBranch.location.region"
              ></v-select>

              <v-text-field
                :label="'* ' + $t('city')"
                class="input-group--focused pr-4 pl-2"
                v-bind:rules="inputRules"
                v-model="newBranch.location.city"
              ></v-text-field>

              <v-text-field
                :label="$t('sub_city')"
                class="input-group--focused pr-4 pl-2"
                v-model="newBranch.location.sub_city"
              ></v-text-field>

              <v-textarea
                :label="$t('buildingAndRoomNo')"
                class="pr-4 pl-2"
                v-model="newBranch.location.buildingAndRoomNo"
              ></v-textarea>

              <v-btn
                flat
                dark
                class="c_selected_btn ml-0 text-capitalize"
                type="submit"
                v-bind:loading="loading"
              >{{ $t('submit') }}</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </v-flex>
</template>

<script>
import apiClient from "@/resources/apiClient";
import { getErrorMessage } from "@/resources/helper";
import { location } from "@/resources/data";

import { mapGetters } from "vuex";

export default {
  name: "storeInformationBranches",
  computed: {
    ...mapGetters({
      branches: "dashboard/branchs"
    }),
    countries() {
      return location.countries;
    },
    regions() {
      return location.regions;
    }
  },
  data() {
    return {
      // email: "",
      // phone: "",
      editDialog: false,
      branchEditing: {
        branchName: "",
        phones: [
          {
            // choice: 1,
            phoneNumber: ""
          },
        ],
        location: {
          country: "",
          region: "",
          city: "",
          sub_city: "",
          buildingAndRoomNo: "",
          latitude: "",
          longitude: ""
        }
      },

      addDialog: false,
      newBranch: {
        branchName: "",
        phoneData: [
          {
            choice: 0,
            newPhoneNumber: ""
          },
        ],
        location: {
          country: "",
          region: "",
          city: "",
          sub_city: "",
          buildingAndRoomNo: "",
          latitude: "",
          longitude: ""
        }
      },

      inputRules: [v => v.length >= 3 || "Minimum length is 3 characters"],

      emailRules: [v => v.match(/\S+@\S+\.\S+/) || "Invalid Email Address"],

      loading: false,
      loadingEdit: false
    };
  },

  methods: {
    removeBranch: function(id) {
      this.loading = true;

        this.$store
        .dispatch("dashboard/delete_branch", id)

        .then(() => {
          this.$store.commit("SET_SNACKBAR", {
            message: "Successfully Removed Branch.",
            value: true,
            status: "success"
          });
          this.loading = false;
          this.editDialog = !this.editDialog;
          // this.$emit("removeBranch", id);
        })

        .catch(error => {
          this.$store.commit("SET_SNACKBAR", {
            message: getErrorMessage(error),
            value: true,
            status: "error"
          });
          this.loading = false;
          // FOR TESTING
          // this.editDialog = !this.editDialog;
          // this.$emit("removeBranch", id);
        });
    },

    addBranch: function() {
      if (this.$refs.add.validate()) {
        this.loading = true;

        this.$store
          .dispatch("dashboard/add_branch", this.newBranch)

          .then(response => {
            // this.$emit("addBranch", response.data);
            this.$store.commit("SET_SNACKBAR", {
              message: "Successfully added Branch.",
              value: true,
              status: "success"
            });
            this.loading = false;
            this.addDialog = !this.addDialog;
            this.clearAddBranch();
          })

          .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
            this.loading = false;
          });
      }
    },

    editBranch: function() {
      if (this.$refs.edit.validate()) {
        this.loadingEdit = true;

        var data = {
          data: {
            branchName: this.branchEditing.branchName,
            location: this.branchEditing.location,
            phoneData: [
              {
                choice: 1,
                newPhoneNumber: this.branchEditing.phones[0].phoneNumber,
                id: this.branchEditing.phones[0].id
              }
            ]
          },
          id: this.branchEditing.id
        }

        this.$store
          .dispatch("dashboard/update_branch", data)

          .then(response => {
            this.$store.commit("SET_SNACKBAR", {
              message: "Successfully Edited Branch.",
              value: true,
              status: "success"
            });
            this.loadingEdit = false;
            this.editDialog = !this.editDialog;
          })

          .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
            this.loadingEdit = false;
          });
      }
    },

    checkLengthReturn: function(val) {
      if (val.length < 26) {
        return val;
      } else if (val.length >= 26) {
        return val.slice(0, 23) + "...";
      }
    },

    // SET THE DIALOG FOR EDITING BRANCH
    showEditDialog: function(id) {
      for (let branch of this.branches) {
        if (branch.id == id) {
          this.branchEditing = JSON.parse(JSON.stringify(branch));
          // this.branchEditing["id"] = id;
          this.editDialog = !this.editDialog;
        }
      }
    },

    clearAddBranch: function() {
      // CLEAR NEWBRANCH
      this.newBranch.branchName = "";
      // this.newBranch.email = "";
      this.newBranch.phoneData[0].newPhoneNumber = "";
      this.newBranch.location.country = "";
      this.newBranch.location.region = "";
      this.newBranch.location.city = "";
      this.newBranch.location.sub_city = "";
      this.newBranch.location.buildingAndRoomNo = "";
      this.newBranch.location.latitude = "";
      this.newBranch.location.longitude = "";
    }
  },

  created() {
      // console.log(this.branches[0])
  }
};
</script>

<style scoped>
.c-btn {
  z-index: 0;
}
.c-list {
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  /* width: 140%; */
}
.c-list-header {
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
