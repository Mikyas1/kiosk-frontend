<template>
  <v-layout row wrap>
    <v-flex xs12 md6>
      <v-card flat class="ma-2 px-4 py-4 c-card">
        <div>
          <h2 class="font-weight-regular mb-3">1: Basic Item info</h2>
          <p>
            <v-icon small color="warning">info</v-icon>
            Listing Priority is a value you put that will be <strong>directly subtracted</strong> from your token ({{ storeToken }}).
            When items are listed for buyers they will appear in a descending order of this Priority value. 
            Items with bigger priority value will be listed first and with lower prioritiy value will be listed last.
          </p>

          <p>
            <v-icon small color="primary">info</v-icon>
            Item with Priority Value graterthan 10 can be posted on <strong>50K+ (users) telegram channel for free</strong>. 
            If you put more than 10 Priority Values for your item, be sure to check on <strong>"post on social-media"</strong> below to post for free. 
          </p>

          <v-form ref="basic">
            <v-text-field
              label="* Item Name"
              class="input-group--focused pr-4 pl-2 mt-2"
              v-bind:rules="inputRules"
              v-model="newItem.name"
            ></v-text-field>

            <v-select
              class="input-group--focused pr-4 pl-2 mt-2"
              v-bind:items="compSellerCategory"
              label="* Root Category"
              item-text="text"
              item-value="val"
              v-model="rootCategory"
              persistent-hint
              v-bind:rules="[(v) => v != null || 'Category is required']"
            ></v-select>

            <v-select
              v-if="rootCategory"
              class="input-group--focused pr-4 pl-2 mt-2"
              v-model="newItem.category"
              v-on:change="changeCategoryFeature"
              :items="subRootCategories"
              item-text="text"
              item-value="val"
              label="* Detail category"
              hint=" - Your item will be listed under the chosen Detail category list."
              persistent-hint
              v-bind:rules="[(v) => v != null || 'Detail Category is required']"
            ></v-select>

            <div v-if="newItem.category">
              <v-select
                class="input-group--focused pr-4 pl-2 mt-2"
                v-model="newItem.condition"
                :items="getTags('Condition')"
                label="* Condition"
                persistent-hint
                v-bind:rules="[(v) => v != null || 'Condition is required']"
              ></v-select>

              <v-select
                class="input-group--focused pr-4 pl-2 mt-2"
                v-model="newItem.brand"
                :items="getTags('Brand')"
                label="* Brand"
                persistent-hint
                v-bind:rules="[(v) => v != null || 'Brand is required']"
              ></v-select>
            </div>

            <!-- branch -->
            <v-select
                    class="input-group--focused pr-4 pl-2 mt-2"
                    v-model="newItem.branchs"
                    :items="allBranchs"
                    item-text="branchName"
                    item-value="id"
                    label="* Branchs"
                    multiple
                    chips
                    hint="At which branch will this item exist."
                    persistent-hint
            ></v-select>

            <v-text-field
              label="* Quantity"
              class="input-group--focused pr-4 pl-2 mt-2"
              v-model="newItem.quantity"
              type="number"
            ></v-text-field>

            <v-text-field
              label="* Price"
              class="input-group--focused pr-4 pl-2 mt-2"
              hint=" - All price must be in Ethiopian Birr (ETB)"
              v-model="newItem.price"
              type="number"
            ></v-text-field>

            <v-slider
              v-model="newItem.priorityVal"
              thumb-label="always"
              label="Listing Priority"
              :max="avaliableTokens"
              :min="1"
              always-dirty
              class="input-group--focused pr-4 pl-2 mt-4 pt-2"
              @change="watchChangeSlider"
            ></v-slider>
            <p class="list-priority">- listing priority (item token) is used to give listing prioriyt to items. Items with higher listing priority will get higher probability of being found by buyers.</p>

            <v-checkbox
            v-if="newItem.priorityVal > 9"
            v-model="newItem.posted"
            :label="'Post on Social-media'"
            >
            </v-checkbox>
          </v-form>
        </div>
      </v-card>
    </v-flex>

    <!-- features -->
    <v-flex xs12 md6>
      <div>
        <v-card flat class="ma-2 px-4 py-4 c-card">
          <h2 class="font-weight-regular mb-3">2: Item Features</h2>
          <p>Click on the "Add Field" button below to add new feature field.</p>
          <v-form ref="featuer">
            <div v-if="newItem.category">
              <p
                v-if="features != {}"
              >Leave out the fields you don't want to specify and they will not be included as your product feature.</p>
              <v-layout v-for="(item, key, index) in features" :key="index" row wrap>
                <v-flex xs3 md3 class="pt-4">{{ key }}</v-flex>
                <v-flex xs9 md9>
                  <v-text-field
                    :label="' ' + key"
                    @input="e => setFeatures(e, key)"
                    class="input-group--focused pr-4 pl-2 mt-2"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </div>

            <v-layout v-for="(field, index) in newItem.addedField" :key="index" row wrap>
              <v-flex xs3 md3>
                <v-text-field
                  label="Feature"
                  class="input-group--focused pr-4 pl-2 mt-2"
                  v-model="field.label"
                ></v-text-field>
              </v-flex>
              <v-flex xs8 md8>
                <v-text-field
                  label="value"
                  class="input-group--focused pr-4 pl-2 mt-2"
                  v-model="field.field"
                ></v-text-field>
              </v-flex>
              <v-flex xs1 md1>
                <v-btn
                  fab
                  depressed
                  small
                  dark
                  class="secondary_1 white--text mt-4"
                  v-on:click="removeField(index)"
                >
                  <v-icon small>clear</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            
            <v-btn
              flat
              dark
              class="c_selected_btn ml-0 text-capitalize"
              v-on:click="addField"
            >Add Feature</v-btn>
          </v-form>
        </v-card>
      </div>
    </v-flex>
    
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { capitalize } from "@/resources/helper";
import { getLastElement } from "@/resources/helper";

export default {
  name: "BasicItemInfo",
  data() {
    return {
      rootCategory: null,
      newItem: {
        name: "",
        category: null,
        branchs: [],
        quantity: null,
        price: null,
        condition: null,
        brand: null,
        priorityVal: 1,
        features: {},
        addedField: [],
        posted: false,
      },
      features: {},
      inputRules: [
        v => v.length >= 1 || "Minimum length is 1 characters"
        // 'Required',
      ],
      addedField: []
    };
  },
  props: {
    category: {
      type: Object,
      required: true
    },
    tags: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      sellerCategory: "dashboard/storeCategory",
      branchs: "dashboard/branchs",
      storeToken: "dashboard/storeToken",
    }),
    avaliableTokens() {
      if (this.storeToken > 20) {
        return 20;
      } else {
        return this.storeToken;
      }
    },
    subRootCategories() {
      return this.category[this.rootCategory].map(x => {
        return {
          val: x,
          text: this.categoryListDisp(x)
        };
      });
    },
    compSellerCategory() {
      return this.sellerCategory.map(x => {
        return {
          val: x,
          text: capitalize(x)
        };
      });
    },
    allBranchs() {
      var allBranchs = [
        {
          branchName: "Main Branch",
          id: "main"
        }
      ];
      for (var index in this.branchs) {
        allBranchs.push({
          branchName: this.branchs[index].branchName,
          id: this.branchs[index].id
        });
      }
      return allBranchs;
    }
  },
  methods: {
    watchChangeSlider(x){
      if(x < 10) {
        this.newItem.posted = false;
      }
    },
    categoryListDisp(catList) {
      var dispCat = "";
      // return catList.length;
      for (var cat in catList) {
        if (dispCat == "") {
          dispCat += capitalize(catList[cat]);
        } else {
          dispCat += " > " + capitalize(catList[cat]);
        }
      }
      return dispCat;
    },
    getTags(tag) {
      var ret = [];
      try {
        ret.push(...this.tags[tag][getLastElement(this.newItem.category)]);
      } catch {}
      ret.push("Not listed");
      return ret;
    },
    addField() {
      this.newItem.addedField.push({ label: "", field: "" });
    },
    removeField(index) {
      this.newItem.addedField.splice(index, 1);
    },
    changeCategoryFeature() {
      this.features = {};
      for (var i of [
        ...this.tags.Feature[getLastElement(this.newItem.category)]
      ]) {
        this.features[i] = "";
      }
    },
    setFeatures(e, key) {
      // console.log(e, key);
      var newFeatures = { ...this.newItem.features };
      newFeatures[key] = e;
      this.newItem.features = { ...newFeatures };
      // console.log(this.newItem.features[key]);
    },
    clearForm() {
      this.newItem = {
        name: "",
        category: null,
        // branchs: [],
        quantity: null,
        price: null,
        condition: null,
        brand: null,
        priorityVal: 1,
        features: {},
        addedField: [],
        posted: false
      };
      this.rootCategory = null;
    }
  },
  watch: {
    newItem: {
      deep: true,
      handler() {
        this.$emit("basicItemInfo", this.newItem);
      }
    }
  },
  created() {
    this.$emit('clearFormHandler', this.clearForm);
  }
};
</script>


<style scoped>
.c-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.list-priority {
  color: rgba(0, 0, 0, 0.6);
  margin-top: -22px;
  font-size: .87em;
  padding-left: 2%;
}
</style>