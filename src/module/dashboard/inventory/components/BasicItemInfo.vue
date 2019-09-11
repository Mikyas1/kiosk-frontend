<template>
  <v-layout row wrap>
    <v-flex xs12 md6>
      <v-card flat class="ma-2 px-4 py-4 c-card">
        <div>
          <h2 class="font-weight-regular mb-3">1: Basic Item info</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur earum officia deserunt, corporis reprehenderit nisi atque eligendi dolor! Ratione ipsum, ducimus molestias nam corporis expedita porro est consequuntur quam sit?</p>

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
            <!-- <v-select
                    class="input-group--focused pr-4 pl-2 mt-2"
                    v-model="newItem.branchs"
                    :items="allBranchs"
                    item-text="branchName"
                    item-value="id"
                    label="* Branchs"
                    multiple
                    chips
                    hint="At which branch will this new item exist."
                    persistent-hint
            ></v-select>-->

            <v-text-field
              label="* Quantity"
              class="input-group--focused pr-4 pl-2 mt-2"
              v-model="newItem.quantity"
            ></v-text-field>

            <v-text-field
              label="* Price"
              class="input-group--focused pr-4 pl-2 mt-2"
              v-model="newItem.price"
            ></v-text-field>

            <v-slider
              v-model="newItem.priorityVal"
              thumb-label="always"
              label="Listing Priority"
              :max="10"
              :min="1"
              always-dirty
              class="input-group--focused pr-4 pl-2 mt-4 pt-2"
            ></v-slider>

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
                v-if="features.length > 0"
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
        // branchs: [],
        quantity: null,
        price: null,
        condition: null,
        brand: null,
        priorityVal: 1,
        features: {},
        addedField: []
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
      branchs: "dashboard/branchs"
    }),
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
      for (var i of [
        ...this.tags.Feature[getLastElement(this.newItem.category)]
      ]) {
        this.features[i] = "";
      }
    },
    setFeatures(e, key) {
      console.log(e, key);
      var newFeatures = { ...this.newItem.features };
      newFeatures[key] = e;
      this.newItem.features = { ...newFeatures };
      console.log(this.newItem.features[key]);
    }
  },
  watch: {
    newItem: {
      deep: true,
      handler() {
        this.$emit("basicItemInfo", this.newItem);
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
</style>