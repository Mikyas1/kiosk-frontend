<template>
  <div>
    <v-card>
      <p class="px-4 py-4 c-card mb-4">
        To close this item edit form
        <!-- <strong class="primary--text">ESC</strong> -->
        click on the <strong class="primary--text"> Close This Form </strong> button bellow. 
        Use the form bellow to Update your Item. you have to <strong>resubmit a new listing priority</strong> to update your item.
        To edit item photos use the bottom section of this page.
      </p>
      <v-container>
        <div primary-title>
          <div class="headline mb-3">Edit Item Detail. You have {{ storeToken }} Tokens</div>
        </div>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <v-card flat class="ma-2 px-4 py-4 c-card">
              <div>
                <h2 class="font-weight-regular mb-3">1: Basic Item info</h2>
                <p>Editing items is computationally intensive task. That is why we request you to resubmit the priority value when editing an item.</p>

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
                    disabled
                  ></v-text-field>

                  <v-text-field
                    label="* Brand"
                    class="input-group--focused pr-4 pl-2 mt-2"
                    v-model="item.brand"
                    disabled
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
                    type="number"
                  ></v-text-field>

                  <v-text-field
                    label="* Price"
                    class="input-group--focused pr-4 pl-2 mt-2"
                    hint=" - All price must be in Ethiopian Birr (ETB)"
                    v-model="item.price"
                    type="number"
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
                <v-form ref="feature">
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

        <p class="ml-4"><v-icon small color="c_selected_btn">info</v-icon> If you update any item information above, use the button bellow to submit.</p>
        <v-btn 
          flat 
          raised 
          dark 
          class="c_selected_btn ml-4 mb-5 text-capitalize"
          v-bind:loading="editDataBtn"
          v-on:click="submitEdit"
          >
            Edit item data
        </v-btn>
         



      <!-- EDIT ITEM IMAGE -->

      <v-layout row wrap>
          <v-flex xs12 md12>
            <v-card flat class="mx-2 mt-3 px-4 py-4 c-card mb-4">
              <h2 class="font-weight-regular">4: Edit Item Images</h2>
              <p class="pa-3">
                Upload up to 5 photos that show your item in multiple views (such as front, side, back and close-up). 
                Use white background for a better image result. All images must be
                <strong>.jpg</strong>. Main photo will be included in your item listing 
                and it is the one that will be posted to social media.
              </p>
              <v-card flat class="c-card">
                <h2 class="font-weight-regular ml-2">Main Photo:</h2>
                <v-layout row wrap class="mb-2">
                  <v-flex v-if="getMainImageHere(item).path" xs5 md2 class="mt-2 mx-2 mb-1">
                    <EditImage
                      v-bind:image="getMainImageHere(item)"
                      v-bind:main="true"
                      v-bind:itemId="item.id"
                      v-bind:imageList="getListImageHere(item)"
                      v-on:removeImage="removeImage"
                    >
                  </EditImage>
                  </v-flex>
                </v-layout>

                <div style="border-top: 1px solid rgba(0,0,0,.1);"></div>
                <h2 class="font-weight-regular ml-2">List Photos:</h2>

                <v-layout row wrap>

                  <v-flex 
                    v-if="getListImageHere(item).length < 4"
                    xs5 md2 class="mt-2 mx-2 mb-1">
                    <!-- main image -->
                    <v-btn
                      raised
                      dark
                      class="c_selected_btn text-capitalize c-image-btn"
                      v-on:click="AddImageDialog=!AddImageDialog"
                    >
                      <span>
                        + Click to
                        <br />Add More Photos
                      </span>
                    </v-btn>
                  </v-flex>


                  <v-flex v-for="image in getListImageHere(item)" :key="image.id" xs5 md2 class="mt-2 mx-2 mb-1">
                    <EditImage
                      v-bind:image="image"
                      v-bind:main="false"
                      v-bind:itemId="item.id"
                      v-on:removeImage="removeImage"
                    >
                    </EditImage>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-card>
          </v-flex>

        </v-layout>

        <v-btn flat class="warning text-capitalize" v-on:click="closeDialog">Close This Form</v-btn>

        <v-dialog v-model="AddImageDialog" 
          v-bind:max-width="$vuetify.breakpoint.xsOnly && '100%' || '60%'"        
        >
          
          <div slot="activator"></div>
          

          <v-card flat class="c-card">
             <h2 class="font-weight-regular ml-2">List Photos: Max {{ allowedUploadImages }}</h2>

                <v-layout row wrap>
                  <v-flex xs12 md2 class="mr-5">
                    <!-- list images -->
                    <v-btn
                      raised
                      dark
                      class="c_selected_btn text-capitalize c-image-btn"
                      @click="onPickFile"
                    >
                      <span v-if="viewImages.length == 0">
                        + Click to
                        <br />add photos List
                      </span>
                      <span v-else>
                        Change Photo
                        <br />list
                      </span>
                    </v-btn>
                    <input
                      type="file"
                      style="display: none;"
                      ref="fileInput"
                      accept="image/*"
                      multiple
                      @change="onFilePicked"
                    />
                  </v-flex>

                  <v-flex v-for="image in viewImages" :key="image" xs12 md2 class="mt-2 mx-2 mb-1">
                    <v-img
                      :src="image"
                      crossorigin="anonymous"
                      :lazy-src="require('@/assets/loading.png')"
                      max-height="90"
                      max-width="140"
                      aspect-ratio="1.7"
                      contain
                      width="255"
                      position
                    ></v-img>
                  </v-flex>
                </v-layout>
                <v-btn
                  v-if="viewImages.length != 0"
                  flat 
                  raised 
                  dark 
                  class="c_selected_btn my-2 text-capitalize"
                  v-bind:loading="uploadImageBtn"
                  v-on:click="uploadNewImages"
                  >
                    Upload Photo list
                </v-btn>
                <v-btn flat class="warning text-capitalize" v-on:click="AddImageDialog=!AddImageDialog">Cancle</v-btn>
              </v-card>
        </v-dialog>
        
      </v-container>
    </v-card>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import imageCompression from 'browser-image-compression';
import { quillEditor } from "vue-quill-editor";
import { mapGetters } from "vuex";

import { getMainImage } from "@/resources/helper";
import { getListImage } from "@/resources/helper";
import { getErrorMessage } from "@/resources/helper";

import EditImage from './EditImage'

export default {
  name: "DetailItem",
  components: {
    quillEditor,
    EditImage
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    branch: {
      type: Array,
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
      editDataBtn: false,
      AddImageDialog: false,
      images: [],
      viewImages: [],
      uploadImageBtn: false,
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
    },
    allowedUploadImages() {
      if(this.item.images) {
        return 5 - this.item.images.length;
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
    closeDialog() {
      this.$emit("closeDialog");
    },
    getMainImageHere(item) {
      return getMainImage(item);
    },
    getListImageHere(item) {
      return getListImage(item);
    },
    submitEdit() {
      this.editDataBtn = true;
      var description = "";
      if (this.item.description != null) {
        description = this.item.description;
      }
      if (this.item.branch.length < 1) {
        this.editDataBtn = false;
        this.$store.commit("SET_SNACKBAR", {
            message: "You Have to sellect at list one branch.",
            value: true,
            status: "error"
        });
        return;
      }
      if (this.item.name == '') {
        this.editDataBtn = false;
        this.$store.commit("SET_SNACKBAR", {
            message: "Item name can't be empity.",
            value: true,
            status: "error"
        });
        return;
      }
      if (this.item.quantity == '') {
        this.editDataBtn = false;
        this.$store.commit("SET_SNACKBAR", {
            message: "Item quantity can't be empity.",
            value: true,
            status: "error"
        });
        return;
      }
      if (this.item.price == '') {
        this.editDataBtn = false;
        this.$store.commit("SET_SNACKBAR", {
            message: "Item price can't be empity.",
            value: true,
            status: "error"
        });
        return;
      }
      var branch = this.composeBranch();
      var data = {
        name: this.item.name,
        brand: this.item.brand,
        price: this.item.price,
        itemId: this.item.id,
        description: description,
        condition: this.item.condition,
        quantity: this.item.quantity,
        category: this.item.category.name,
        token: this.item.token,
        newBranch: branch.newBranch,
        deleteBranch: branch.deleteBranch,
        onMainBranch: branch.onMainBranch,
      };
      var features = {};
      for (var itemFeature of this.item.features) {
        features[itemFeature.name] = itemFeature.value;
      }      
      for(var feature of this.addedField) {
        features[feature.label] = feature.field;
      }
      data.features = [features];
      
      // SEND TO SERVER
      this.$store.dispatch('dashboard/update_item_data', data)
      .then(response => {
        this.$store.commit("SET_SNACKBAR", {
            message: "Successfully Edited Item " + data.name,
            value: true,
            status: "success"
        });
        this.$emit('editItemSuc', response);
        this.closeDialog();
        this.editDataBtn = false;
      })
      .catch(e => {
        this.$store.commit("SET_SNACKBAR", {
            message: getErrorMessage(e),
            value: true,
            status: "error"
        });
        this.editDataBtn = false;
      })
    },
    resetFeatures() {
      this.addedField = [];
      this.images = [];
      this.viewImages = [];
    },
    removeImage(data) {
      if (data.replaceImageId == null) {
        this.item.images = this.item.images.filter(x => x.id != data.imageId);
        this.$emit("removeImage", { itemId: this.item.id, imageId: data.imageId, replaceImageId: null });
      } else {
        this.item.images = this.item.images.filter(x => x.id != data.imageId);
        var index = this.item.images.findIndex(x => x.id == data.replaceImageId);
        if (index != -1) {
          this.item.images[index].isMain = true;
        }
        this.$emit("removeImage", { itemId: this.item.id, imageId: data.imageId, replaceImageId: data.replaceImageId });
      }
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      this.images = [];
      this.viewImages = [];
      var index = 0;
      for (var file of files) {
        if (index === this.allowedUploadImages) {
          break;
        }
          if (true){
            var options = {
              maxSizeMb: 1,
              maxWidthOrHeight: 720,
              useWebWorker: true
            }
            imageCompression(file, options)
            .then(compressedFile => {
              this.images.push(compressedFile);
              this.viewImages.push(window.URL.createObjectURL(compressedFile));
            })
            .catch(error => {
              console.log(error.message);
            })
          index++;
        }
      }
    },
    uploadNewImages() {
      this.uploadImageBtn = true;
      let formData = new FormData();
      for (var image of this.images){
        formData.append("image", image);
      }
      formData.append("itemId", this.item.id);
      this.$store
        .dispatch("dashboard/upload_item_image", formData)
        .then((response) => {
          this.$store.commit("SET_SNACKBAR", {
            message: "Successfully Uploaded a Photo list!",
            value: true,
            status: "success"
          });
          this.images = [];
          this.viewImages = [];
          this.uploadImageBtn = false;
          this.AddImageDialog =! this.AddImageDialog;
          this.item.images = response;
          this.$emit("updateImageList", {data: response, itemId: this.item.id});
        })
        .catch(error => {
          this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
          });
          this.uploadImageBtn = false;
        });
    },
    composeBranch() {
      var data = {
        newBranch: [],
        deleteBranch: [],
        onMainBranch: false,
      };
      const oldBranchs = this.branch.map(x => x.id).filter(x => !isNaN(x));
      let newBranchs = [];
      if (this.item.branch[0].id == undefined) {
        if (this.item.branch.filter(x => x == 'main').length > 0) {
          data.onMainBranch = true;
        } else {
          data.onMainBranch = false;
        }
        newBranchs = this.item.branch.filter(x => !isNaN(x));
      } else {
        if (this.item.branch.filter(x => x.id == 'main').length > 0) {
          data.onMainBranch = true;
        } else {
          data.onMainBranch = false;
        }
        newBranchs = this.item.branch.map(x => x.id).filter(x => !isNaN(x));
      }
      
      // proud of the code bellow
      oldBranchs.forEach(old => {
        if (newBranchs.findIndex(x => x == old) == -1) {
          data.deleteBranch.push(old);
        }
      });

      newBranchs.forEach(newB => {
        if (oldBranchs.findIndex(x => x == newB) == -1) {
          data.newBranch.push(newB);
        }
      })


      return data;
    }
  },
  created() {
      this.$emit('resetFeaturesHandler', this.resetFeatures);
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
    margin-bottom: 25%;
  }
}
@media (max-width: 406px) {
  .quill {
    margin-bottom: 40%;
  }
}
@media (max-width: 392px) {
  .quill {
    margin-bottom: 45%;
  }
}
@media (max-width: 320px) {
  .quill {
    margin-bottom: 50%;
  }
}
@media (max-width: 300px) {
  .quill {
    margin-bottom: 70%;
  }
}
@media (max-width: 280px) {
  .quill {
    margin-bottom: 100%;
  }
}
@media (max-width: 265px) {
  .quill {
    margin-bottom: 150%;
  }
}
@media (max-width: 230px) {
  .quill {
    margin-bottom: 220%;
  }
}
</style>