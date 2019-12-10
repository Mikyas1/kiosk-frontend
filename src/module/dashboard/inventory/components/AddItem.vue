<template>
  <div>
    <v-card>
      <p class="px-4 py-4 c-card mb-4">
        To close this add item form
        <!-- <strong class="primary--text">ESC</strong>  -->
        click on the <strong class="primary--text"> Cancle </strong> button bellow.
        Please fill the provided form carefully and to the extent of your knowledge truthfully. 
        When you add an item with a token value that token value will be substracted from your store tokens.
      </p>
      <v-container>
        <div primary-title>
          <div class="headline mb-3">Add a New Item. You have {{ storeToken }} Tokens</div>
        </div>
        <BasicItemInfo 
          :category="category" 
          :tags="tags" 
          @basicItemInfo="getbasicItemInfo"
          @clearFormHandler="setClearFormHandler"  
        ></BasicItemInfo>

        <v-layout row wrap>
          <v-flex xs12 md12>
            <v-card flat class="mx-2 mt-3 px-4 py-4 c-card mb-4">
              <h2 class="font-weight-regular">3: Item Description</h2>
              <p class="pa-3">Detail Descripiton of your item.</p>
              <quill-editor
                class="quill"
                v-bind:content="tempStoreDescription"
                v-bind:options="editorOptionOne"
                v-model="tempStoreDescription"
              ></quill-editor>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12 md12>
            <v-card flat class="mx-2 mt-3 px-4 py-4 c-card mb-4">
              <h2 class="font-weight-regular">4: Add Item Images</h2>
              <p class="pa-3">
                Upload up to 5 photos that show your item in multiple views (such as front, side, back and close-up). 
                Use white background for a better image result. All images must be
                <strong>.jpg</strong>. Main photo will be included in your item listing 
                and it is the one that will be posted to social media.
              </p>
              <v-card flat class="c-card">
                <h2 class="font-weight-regular ml-2">Main Photo:</h2>
                <v-layout row wrap class="mb-2">
                  <v-flex xs12 md2 class="mr-0">
                    <!-- main image -->
                    <v-btn
                      raised
                      dark
                      class="c_selected_btn text-capitalize c-image-btn"
                      @click="onMainPickFile"
                    >
                      <span v-if="!mainImage">
                        + Click to
                        <br />Add Main Photo
                      </span>
                      <span v-else>
                        Change Main Photo
                      </span>
                    </v-btn>
                    <input
                      type="file"
                      style="display: none;"
                      ref="mainImage"
                      accept="image/*"
                      @change="onMainFilePicked"
                    />
                  </v-flex>
                  <v-flex v-if="mainImage" xs12 md2 class="mt-2 mx-1 mb-1">
                    <v-img
                      :src="mainImageUrl"
                      crossorigin="anonymous"
                      :lazy-src="require('@/assets/loading.png')"
                      max-height="110"
                      max-width="170"
                      aspect-ratio="1.7"
                      contain
                      width="255"
                      position
                    ></v-img>
                  </v-flex>
                </v-layout>

                <div style="border-top: 1px solid rgba(0,0,0,.1);"></div>
                <h2 class="font-weight-regular ml-2">List Photos:</h2>

                <v-layout row wrap>
                  <v-flex xs12 md2 class="mr-0">
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

                    <v-flex v-for="image in viewImages" :key="image" xs md2 class="mt-2 mx-1 mb-1">
                      <v-img
                        :src="image"
                        crossorigin="anonymous"
                        :lazy-src="require('@/assets/loading.png')"
                        max-height="110"
                        max-width="170"
                        aspect-ratio="1.7"
                        contain
                        width="255"
                        position
                      ></v-img>
                    </v-flex>
                </v-layout>
              </v-card>
            </v-card>
          </v-flex>

          <v-btn 
            flat 
            raised 
            dark 
            class="c_selected_btn ml-0 text-capitalize"
            v-on:click="addItem"
            v-bind:loading="submitBtn"
            >
                {{ $t('submit') }}
            </v-btn>
          <v-btn flat class="warning text-capitalize" v-on:click="closeDialog">{{ $t('cancle') }}</v-btn>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import imageCompression from 'browser-image-compression';
import { mapGetters } from "vuex";

// import VueUploadMultipleImage from "vue-upload-multiple-image";

import BasicItemInfo from "./BasicItemInfo";
import { getLastElement } from "@/resources/helper";
import { getErrorMessage } from "@/resources/helper";

export default {
  name: "AddItem",
  components: {
    // VueUploadMultipleImage,
    quillEditor,
    BasicItemInfo
  },
  data() {
    return {
      tempStoreDescription: null,

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
      images: [],
      viewImages: [],
      addBasicInfo: null,
      mainImage: null,
      mainImageUrl: null,
      submitBtn: false,
      // clearFormHandlerFn
      fnClearFormHandler: null,
    };
  },
  computed: {
    ...mapGetters({
      imageString: "dashboard/storeImage",
      storeToken: "dashboard/storeToken"
    })
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
  methods: {
    // for closing the popup
    closeDialog() {
      this.$emit("closeDialog");
    },
    // for reciving basic item data from child components
    getbasicItemInfo(data) {
      this.addBasicInfo = data;
    },
    // for image
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onMainPickFile() {
      this.$refs.mainImage.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      this.images = [];
      this.viewImages = [];
      var index = 0;
      for (var file of files) {
        if (index === 4) {
          break;
        }
        // if (file.name.substr(file.name.indexOf(".") + 1) == "jpg") {
        // pass all images
        if (true){
          // this.images.push(file.name);
          // console.log(window.URL.createObjectURL(file))
          // console.log('OriginalFile instanceof Blob', file instanceof Blob);
          // console.log(`OriginalFile size ${file.size / 1024 /1024 } MB`);
          var options = {
            maxSizeMb: 1,
            maxWidthOrHeight: 720,
            useWebWorker: true
          }
          imageCompression(file, options)
          .then(compressedFile => {
            // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob);
            // console.log(`compressedFile size ${compressedFile.size /1024 /1024} MB`);
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
    onMainFilePicked(event) {
      const file = event.target.files[0];
      // if (file.name.substr(file.name.indexOf(".") + 1) == "jpg") {
        if (true) {
          // console.log('OriginalFile instanceof Blob', file instanceof Blob);
          // console.log(`OriginalFile size ${file.size / 1024 /1024 } MB`);
          var options = {
            maxSizeMb: 1,
            maxWidthOrHeight: 720,
            useWebWorker: true
          }
          imageCompression(file, options)
          .then(compressedFile => {
            // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob);
            // console.log(`compressedFile size ${compressedFile.size /1024 /1024} MB`);
            this.mainImage = compressedFile;
            this.mainImageUrl = window.URL.createObjectURL(compressedFile);
          })
          .catch(error => {
            console.log(error.message);
          })
          // this.mainImage = file;
          // this.mainImageUrl = window.URL.createObjectURL(file);
      }
    },
    // to submit the item
    addItem(){
      let formData = new FormData();
      // 
      // work on validation
      try {
        var features = {}
        // console.log(this.addBasicInfo.addedField)
        for (var feature of this.addBasicInfo.addedField) {
          if (feature.field != "" && feature.label) {
            features[feature.label] = feature.field;
          }
        }
        for(var key in this.addBasicInfo.features){
          if(this.addBasicInfo.features.hasOwnProperty(key) && this.addBasicInfo.features[key] != "") {
            features[key] = this.addBasicInfo.features[key]
          }
        }
        const blobFeature = new Blob([JSON.stringify(features)], {type: 'application/json'});
        
        // FEATURES
        formData.append("features", blobFeature);
        
        // ITEM NAME
        if (this.addBasicInfo.name == "") {
          this.showError('Please provide item name.')
          return;
        } else {
          formData.append("name", this.addBasicInfo.name);
        }
        
        // ITEM PRICE
        if(this.addBasicInfo.price == null) {
          this.showError('Please provide item price.')
          return;
        } else {
          formData.append("price", this.addBasicInfo.price);
        }
      
        // ITEM CATEGORY
        if(this.addBasicInfo.category == null) {
          this.showError('Please provide item category.')
          return;
        } else {
          formData.append("category", getLastElement(this.addBasicInfo.category));
        }
        
        // ITEM QUANTITY
        if(this.addBasicInfo.quantity == null) {
          this.showError('Please provide item Quantity.')
          return;
        } else {
          formData.append("quantity", this.addBasicInfo.quantity);
        }
        
        // ITEM CONDITION
        if(this.addBasicInfo.condition == null) {
          this.showError('Please provide item Condition.')
          return;
        } else {
          formData.append("condition", this.addBasicInfo.condition);
        }
        
        // ITEM BRAND
        if(this.addBasicInfo.brand == null) {
          this.showError('Please provide item Brand.')
          return;
        } else {
          formData.append("brand", this.addBasicInfo.brand);
        }
        
        // ITEM DESCRIPTION
        if (this.tempStoreDescription != null) {
          formData.append("description", this.tempStoreDescription);
        } else {
          formData.append("description", "");
        }

        // ITME TOKEN
        formData.append("token", this.addBasicInfo.priorityVal);

        // THE MAIN IMAGE
        if(this.mainImage == null) {
          this.showError('Please provide Main image.')
          return;
        } else {
          formData.append("mainImage", this.mainImage);
        }
        
        // LIST IMAGES
        for (var image of this.images){
            formData.append("image", image);
        }

        // ITEM POSTED
        formData.append("posted", this.addBasicInfo.posted);

        // ITEM BRANCH
        if(this.addBasicInfo.branchs.length < 1) {
          this.showError('Please select at list one branch')
          return;
        } else {
          if(this.addBasicInfo.branchs.findIndex(x => x == 'main') != -1) {
            if (this.addBasicInfo.branchs.filter(x => x != 'main').length > 0) {
              formData.append("branch", this.addBasicInfo.branchs.filter(x => x != 'main'));
            }
            formData.append("onMainBranch", true);
          } else {
            formData.append("branch", this.addBasicInfo.branchs);
            formData.append("onMainBranch", false);
          }
        }
      
      } catch(err) {
        this.showError();
        return;
      }

      this.submitBtn = true;
      this.$store
        .dispatch("dashboard/add_item", formData)

        .then((response) => {
            this.$store.commit("SET_SNACKBAR", {
                message: "Successfully added an Item!",
                value: true,
                status: "success"
            });
            this.submitBtn = false;
            this.$emit('newItem', response);
            this.closeDialog()
            this.images = [];
            this.viewImages = [];
            this.mainImage = null;
            this.mainImageUrl = null;
            this.tempStoreDescription = null;
            this.fnClearFormHandler();
        })

        .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
                message: getErrorMessage(error),
                value: true,
                status: "error"
            });
            this.submitBtn = false;
        });
    },
    setClearFormHandler(fn){
      this.fnClearFormHandler = fn;
    },
    showError(message) {
      var mess = message || 'Please fill out the form properly.';
      this.$store.commit("SET_SNACKBAR", {
        message: mess,
        value: true,
        status: "error"
      });
    }
  },
  created() {
    // console.log(this.tags)
    // console.log(this.category)
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
