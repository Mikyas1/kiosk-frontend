<template>
  <div>
    <div primary-title>
      <div class="headline mb-3 ml-4 pt-4">Item Detail - <span class="c_selected_btn--text">{{ reduceText(item.name) }}</span></div>
    </div>

    <v-layout row wrap>
      <v-flex md5>
        <div class="pt-1 pb-4 pl-2 ml-3 mb-3" 
        :class="{' mr-3': $vuetify.breakpoint.smAndDown}"
        >
        <div primary-title>
          <div class="headline mb-3 ml-2 c-underline">Item Photos</div>
        </div>
        <v-layout row wrap>
          <v-flex xs-3 class="mt-2 mx-2 mb-1">
            <v-img
              :src="getMainImageHere(item).path"
              crossorigin="anonymous"
              :lazy-src="require('@/assets/loading.png')"
              max-height="500"
              max-width="1000"
              aspect-ratio="1.7"
              width="255"
              contain
              position
            ></v-img>
          </v-flex>
        </v-layout>

        <v-layout row wrap class="mt-4">
          <v-flex v-for="image in getListImageHere(item)" :key="image.id" md2 class="mt-2 mx-3 mb-1">
            <v-img
              :src="image.path"
              crossorigin="anonymous"
              :lazy-src="require('@/assets/loading.png')"
              max-height="50"
              max-width="90"
              aspect-ratio="1.7"
              contain
              width="255"
              position
            ></v-img>
          </v-flex>
        </v-layout>
        </div>
      </v-flex>

      <v-flex md7>
        <div class="pt-1 pb-4 pl-2 ml-3 mr-3" 
        :class="{'pl-4 c-hl': $vuetify.breakpoint.smAndUp}">
        <v-layout row wrap>
          <v-flex xs-9>
            <div class="pt-1 pl-2">
              <div primary-title>
                <div class="headline mb-2 c-underline">Item information</div>
              </div>
              <div class="ml-2">
                <span class="c-detail-name">Name: </span><span class="c_selected_btn--text">{{ item.name }}</span>
                <br>
                <span class="c-detail-name">Price: </span><span class="c_selected_btn--text">{{ item.price }} ETB</span>
                <br>
                <span class="c-detail-name">Quantity: </span><span class="c_selected_btn--text">{{ item.quantity }}x</span>
                <br>
                <span class="c-detail-name">Category: </span><span class="c_selected_btn--text">{{ getCategory }}</span>
                <br>
                <span class="c-detail-name">Condition: </span><span class="c_selected_btn--text">{{ item.condition }}</span> 
                <br>
                <span class="c-detail-name">Brand: </span><span class="c_selected_btn--text">{{ item.brand }}</span>
                <br>
                <span class="c-detail-name">Listing Priority: </span><span class="c_selected_btn--text">{{ item.token }}</span>
              </div>
              <div v-if="getFeatureLength">
                <div primary-title>
                  <div class="headline mt-3 mb-2 c-underline">Item features</div>
                </div>
                <div class="ml-2" v-for="feature in item.features" :key="feature.id">
                  <span class="c-detail-name">{{feature.name}}: </span><span class="orange--text">{{feature.value}}</span>
                </div>
              </div>
              <div v-if="getItemDescription">
                <div primary-title>
                  <div class="headline mt-3 mb-2 c-underline">Item description</div>
                </div>
                <div class="ml-2 mr-3 px-3 py-3 c-card" v-html="getItemDescription"></div>
              </div>
                <div v-if="item.isOnMainBranch" class="ml-2 mb-2">
                  <div primary-title>
                    <div class="headline mt-3 mb-2 c-underline">Item on Main Branch</div>
                  </div>
                    <span class="c-detail-name">Branch Name: </span><span class="orange--text">Main branch</span>
                    <br>
                    <div v-if="storeInfo.location.country">
                      <span class="c-detail-name">Country: </span><span class="orange--text">{{storeInfo.location.country}}</span>
                      <br>
                    </div>
                    <div v-if="storeInfo.location.region">
                      <span class="c-detail-name">Region: </span><span class="orange--text">{{storeInfo.location.region}}</span>
                      <br>
                    </div>
                    <div v-if="storeInfo.location.city">
                      <span class="c-detail-name">City: </span><span class="orange--text">{{storeInfo.location.city}}</span>
                      <br>
                    </div>
                    <div v-if="storeInfo.location.sub_city">
                      <span class="c-detail-name">Sub City: </span><span class="orange--text">{{storeInfo.location.sub_city}}</span>
                      <br>
                    </div>
                    <div v-if="storeInfo.location.buildingAndRoomNo">
                      <span class="c-detail-name">Description: </span><span class="orange--text">{{storeInfo.location.buildingAndRoomNo}}</span>
                      <br>
                    </div>
                    <div v-for="(phone_no, index) in storeInfo.phones" :key="phone_no.phoneNumber">
                      <span class="c-detail-name">Phone no ({{ index + 1}}): </span><span class="orange--text">{{phone_no.phoneNumber}}</span>
                      <br>
                    </div>
                    <div v-for="(email, index) in storeInfo.emails" :key="email.email">
                      <span class="c-detail-name">Email ({{ index + 1}}): </span><span class="orange--text">{{email.email}}</span>
                      <br>
                    </div>
                    <div v-if="!storeInfo.location.country || !storeInfo.location.region || !storeInfo.location.city">
                      <p class="my-3 ml-1"><v-icon small color="primary">info</v-icon>Please add more information about your store location, so interested buyers can contact you.</p>
                      <v-btn
                        flat
                        class="c_selected_btn text-capitalize white--text mb-3" 
                        v-on:click="moveToStorInfo"
                      >
                        Edit Store Info
                      </v-btn>
                    </div>
                </div>
                <div 
                  v-for="(branch, index) in getBranch"
                  :key="branch.id"
                  class="ml-2 mb-2">
                  <div primary-title>
                    <div class="headline mt-3 mb-2 c-underline">On branch ({{ index + 1 }})</div>
                  </div>
                    <span class="c-detail-name">Branch Name: </span><span class="orange--text">{{branch.branchName}}</span>
                    <br>
                    <span class="c-detail-name">Country: </span><span class="orange--text">{{branch.location.country}}</span>
                    <br>
                    <span class="c-detail-name">Region: </span><span class="orange--text">{{branch.location.region}}</span>
                    <br>
                    <span class="c-detail-name">City: </span><span class="orange--text">{{branch.location.city}}</span>
                    <br>
                    <span class="c-detail-name">Sub City: </span><span class="orange--text">{{branch.location.sub_city}}</span>
                    <br>
                    <span class="c-detail-name">Description: </span><span class="orange--text">{{branch.location.buildingAndRoomNo}}</span>
                    <br>
                    <span class="c-detail-name">Phone no: </span><span class="orange--text">{{branch.phones[0].phoneNumber}}</span>
                </div>
            </div>
          </v-flex>
        </v-layout>
        </div>
      </v-flex>
      <v-flex xs12 offset-md8 offset-lg10 class="mt-2">
        <!-- <v-btn 
          flat 
          class="warning text-capitalize white--text my-4 ml-4"
          v-on:click="print"
        >
          Print
        </v-btn> -->
        <v-btn
          flat 
          class="c_selected_btn text-capitalize white--text my-4 ml-3" 
          v-on:click="closeDialog"
        >
          Close
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { getMainImage } from "@/resources/helper";
import { getListImage } from "@/resources/helper";
import { mapGetters } from "vuex";

export default {
  name: "DetailItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    getMainImageHere(item) {
      return getMainImage(item);
    },
    getListImageHere(item) {
      return getListImage(item);
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    // print() {
    //   window.print();
    // }
    moveToStorInfo() {
      this.$router.push({name: "storeInformation"});
    },
    reduceText(text) {
      if(text) {
        if(text.length < 61) {
          return text;
        } else if (text.length >= 61) {
          return text.slice(0, 58) + "...";
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      storeInfo: "dashboard/storeInfo",
    }),
    getCategory() {
      if (this.item.category) {
        return this.item.category.name;
      } else {
        return "";
      }
    },
    getFeatureLength() {
      if (this.item.features) {
        return this.item.features.length > 0;
      } else {
        return false;
      }
    },
    getBranch() {
      if (this.item.branch) {
        return this.item.branch;
      } else {
        return [];
      }
    },
    getItemDescription() {
      if (this.item.description) {
        return this.item.description;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.c-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.c-detail-name {
  font-weight: 400;
  font-size: 1.23em;
}
.c-hl {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}
.c-underline {
  text-decoration: underline;
}
</style>