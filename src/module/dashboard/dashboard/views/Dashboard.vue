<template>
  <div>

    <v-container class="c-body pa-0" fluid="true">
      <Navbar :parent="{name : 'dashboard', link : 'dashboard'}" icon="dashboard" />
      
      <!-- LOADER -->
      <v-progress-linear v-if="loading" v-bind:indeterminate="true" class="my-0"></v-progress-linear>

      <div v-if="show">
        <v-layout row wrap>
          
          <v-flex class="xs12 sm12 md8">
            <div
              class="my-4" 
              v-bind:class="$vuetify.breakpoint.xsOnly && 'mx-1' || 'ml-4 mr-2'"
            >
              
              <v-layout row wrap>

                <v-flex class="xs12 md5 mr-2">
                  <v-card class="mr-3 mb-3 pa-4">
                    <v-layout class="my-4">
                      <v-flex class="xs5 mr-2">
                        <v-card>
                          <div class="red-c box"></div>
                        </v-card>
                      </v-flex>
                      <v-flex class="xs7 ml-2">
                        <h1>Store</h1>
                        <p class="pt-2">
                          - {{storeInfo.storeName}}
                          <!-- {{ storeInfo.categories[0].name }} Store -->
                          </p>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>

                <v-flex class="xs12 md5 ml-1">
                  <v-card class="mr-3 mb-3 pa-4">
                    <v-layout class="my-4">
                      <v-flex class="xs5 mr-2">
                        <v-card>
                          <div class="green-c box"></div>
                        </v-card>
                      </v-flex>
                      <v-flex class="xs7 ml-2">
                        <h1>Theme</h1>
                        <p class="pt-2">- {{storeInfo.theme.themeName}}</p>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>

                <v-flex class="xs12 md5 mr-2">
                  <v-card class="mr-3 mb-3 pa-4">
                    <v-layout class="my-4">
                      <v-flex class="xs5 mr-2">
                        <v-card>
                          <div class="yellow-c box"></div>
                        </v-card>
                      </v-flex>
                      <v-flex class="xs7 ml-2">
                        <h1>Tokens</h1>
                        <p class="pt-2">- {{storeInfo.token}}</p>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>

                <v-flex class="xs12 md5 ml-1">
                  <v-card class="mr-3 mb-3 pa-4">
                    <v-layout class="my-4">
                      <v-flex class="xs5 mr-2">
                        <v-card>
                          <div class="blue-c box"></div>
                        </v-card>
                      </v-flex>
                      <v-flex class="xs7 ml-2">
                        <h1>Url</h1>
                        <p class="pt-2">- {{storeInfo.storeUrl}}</p>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
                
              </v-layout>

            </div>
          </v-flex>

          <v-flex class="xs12 sm12 md4">
            <v-card 
              class="my-4 pa-4 pt-0" 
              v-bind:class="$vuetify.breakpoint.xsOnly && 'mx-1' || 'mx-4'"
            >
              <h1 class="display-1 mb-2 c_text_2--text">Recent actions</h1>
                  
              <div v-for="x in activities" :key="x.date">   

                <div v-for="(val, key) in x" :key="key">
                  
                  <h1 class="headline mb-2 c_text_1--text">{{ moment(key).fromNow() }}</h1>

                  <div v-for="activity in val" :key="activity.date">
                    
                    <v-layout row>

                      <v-flex class="xs2">
                        <v-icon class="mt-3" color="green">cloud_done</v-icon>
                      </v-flex>
                      
                      <v-flex class="xs10">
                        {{ moment(activity.date).format('MM/DD/YYYY HH:mm:ss') }}
                        <br/>
                        - {{ activity.message }}
                        <br/>
                        <br/>
                      </v-flex>

                    </v-layout>

                  </div>

                  <v-layout v-if="load" >
                    <v-flex class="xs7"></v-flex>
                    <v-flex>
                      <div>
                        <v-btn flat class="text-capitalize" :loading='next_loading' v-on:click="next">Load More</v-btn>
                      </div>
                    </v-flex>
                  </v-layout>
                  <div v-else>
                    No more activities to show
                  </div>
                </div>

              </div>
                
            </v-card>
          </v-flex>

        </v-layout>
        
      <!-- VERTICAL SPACER -->
      <div style="height: 85px"></div>

      </div>

      <div v-else>
        <LoadingFailed v-if="error"></LoadingFailed>
        <Loading v-else></Loading>
      </div>

    </v-container>

  </div>

</template>

<script>

import Navbar from '@/components/BodyNav';
import LoadingFailed from '@/components/LoadingFailed';
import Loading from '@/components/Loading';

import { mapGetters } from "vuex";

import { getErrorMessage } from "@/resources/helper";

var moment = require('moment');

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    Loading,
    LoadingFailed
  },
  data() {
    return {
      loading: false,
      show: false,
      error: false,
      activities: [],
      next_loading: false,
      page_list: '',
      load: true,

      // moment
      moment: moment, 
    }
  },
  computed: {
    ...mapGetters({
      storeInfo: "dashboard/storeInfo",
    }),
  },
  methods: {
    next() {
      this.next_loading = true;
      this.$store.dispatch("dashboard/get_activity", "?date=" + this.page_list)
      .then(response => {
        if (this.checker(response)) {
          this.activities.push(response);
          this.page_list = this.looper(response);
        } else {
          this.load = false;
        }
        
        this.next_loading = false;
      })
      .catch(error => {
        this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
      })
    },
    looper(attr) {
      for(var x in attr) {
        return x;
      }
    },
    checker(val) {
      var data = false;
      for(var x in val) {
        data = true;
      }
      return data;
    }
  },
  created() {
      this.$store.commit('dashboard/SET_ACTIVE_PAGE', 'dashboard');

      this.loading = true;
      this.$store.dispatch("dashboard/get_activity", "")
      .then(response => {
        this.activities.push(response);
        this.loading = false;
        this.show = true;
        if (this.checker(response)) {
          this.page_list = this.looper(response);
        }
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

<style>
.c-body {
  padding-top: 0px;
  width: 100%;
}

.red-c {
  background-color: #E53A36;
}

.green-c {
  background-color: #4BA64F;
}

.yellow-c {
  background-color: #FEA23B;
}

.blue-c {
  background-color: #22B2C6;
}

.box {
  height: 85px;
  width: 85px;
  border-radius: 3px;
}
</style>
