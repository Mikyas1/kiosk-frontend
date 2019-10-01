<template>
  <div>
    <v-card>
      <p class="px-4 py-4 c-card mb-4">
        To go back to the privious page press
        <strong class="primary--text">ESC</strong> or click on the cancle button at the bottom of this form. 
        Use the form bellow to Update your Item. you have to <strong>resubmit a new listing priority</strong> to update your item.
      </p>
      <v-container>
        <div primary-title>
          <div class="headline mb-3">Edit Item - {{ item.name }}.</div>
        </div>
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
                    v-model="item.name"
                  ></v-text-field>

                  <v-text-field
                    label="* Condition"
                    class="input-group--focused pr-4 pl-2 mt-2"
                    v-model="item.condition"
                  ></v-text-field>

                  <v-text-field
                    label="* Brand"
                    class="input-group--focused pr-4 pl-2 mt-2"
                    v-model="item.brand"
                  ></v-text-field>

                  <!-- branch -->
                  <v-select
                    class="input-group--focused pr-4 pl-2 mt-2"
                    :items="allBranchs"
                    item-text="branchName"
                    item-value="id"
                    label="* Branchs"
                    multiple
                    chips
                    hint="At which branch will this new item exist."
                    persistent-hint
                    v-model="item.branch"
                  ></v-select>

                  <v-text-field
                    label="* Quantity"
                    class="input-group--focused pr-4 pl-2 mt-2"
                    v-model="item.quantity"
                  ></v-text-field>

                  <v-text-field
                    label="* Price"
                    class="input-group--focused pr-4 pl-2 mt-2"
                    hint=" - All price must be in Ethiopian Birr (ETB)"
                    v-model="item.price"
                  ></v-text-field>

                  <v-slider
                    v-model="item.token"
                    thumb-label="always"
                    label="Listing Priority"
                    :max="avaliableTokens"
                    :min="1"
                    always-dirty
                    class="input-group--focused pr-4 pl-2 mt-4 pt-2"
                  ></v-slider>
                  <p
                    class="list-priority"
                  >- listing priority (item token) is used to give listing prioriyt to items. Items with higher listing priority will get higher probability of being found by buyers.</p>
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
                    <v-layout v-for="feature in item.features" :key="feature.id" row wrap>
                        <v-flex xs3 md3 class="pt-4">{{ feature.name }}</v-flex>
                        <v-flex xs9 md9>
                        <v-text-field
                            :label="' ' + feature.name"
                            class="input-group--focused pr-4 pl-2 mt-2"
                            v-model="feature.value"
                        ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout v-for="(field, index) in addedField" :key="index" row wrap>
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

        <v-layout row wrap>
          <v-flex xs12 md12>
            <v-card flat class="mx-2 mt-3 px-4 py-4 c-card mb-4">
              <h2 class="font-weight-regular">3: Item Description</h2>
              <p class="pa-3">Detail Descripiton of your item.</p>
              <quill-editor
                class="quill"
                v-bind:content="item.description"
                v-bind:options="editorOptionOne"
                v-model="item.description"
              ></quill-editor>
            </v-card>
          </v-flex>
        </v-layout>

      </v-container>
      {{ item }}
      {{ addedField }}
    </v-card>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { mapGetters } from "vuex";

export default {
  name: "DetailItem",
  components: {
    quillEditor,
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editItem: {},
      addedField: [],
      editorOptionOne: {
        placeholder: "Item Description!!",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "+1" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }],
            [{ font: [] }],
            [{ align: [] }]
          ]
        }
      },
      //   inputRules: [
      //         v => v.length >= 1 || "Minimum length is 1 characters"
      //         // 'Required',
      //     ],
    };
  },
  computed: {
    ...mapGetters({
      branchs: "dashboard/branchs",
      storeToken: "dashboard/storeToken"
    }),
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
    },
    avaliableTokens() {
      if (this.storeToken > 20) {
        return 20;
      } else {
        return this.storeToken;
      }
    }
  },
  methods:{
    addField() {
      this.addedField.push({ label: "", field: "" });
    },
    removeField(index) {
      this.addedField.splice(index, 1);
    },
  },
  created() {
      
  }
};
</script>

<style scoped>
.quill {
  height: 270px;
  margin-bottom: 4%;
}
.c-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.c-image-btn {
  height: 110px;
  width: 155px !important;
}
@media (max-width: 1268px) {
  .quill {
    margin-bottom: 9%;
  }
}
@media (max-width: 868px) {
  .quill {
    margin-bottom: 9%;
  }
}
@media (max-width: 668px) {
  .quill {
    margin-bottom: 14%;
  }
}
@media (max-width: 524px) {
  .quill {
    margin-bottom: 30%;
  }
}
@media (max-width: 406px) {
  .quill {
    margin-bottom: 40%;
  }
}
@media (max-width: 392px) {
  .quill {
    margin-bottom: 80%;
  }
}
@media (max-width: 320px) {
  .quill {
    margin-bottom: 120%;
  }
}
</style>