<template>
  <div>
    <v-card>
      <v-container>
        <div primary-title>
          <div class="headline mb-3">Add a New Item.</div>
        </div>
        <BasicItemInfo :category="category" :tags="tags" @basicItemInfo="getbasicItemInfo"></BasicItemInfo>

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
                Upload up to 5 photos that show your item in multiple views (such as front, side, back and close-up). Use white background for a better image result. All images must be
                <strong>.jpg</strong>.
              </p>
              <v-card flat class="c-card">
                <v-layout row wrap>
                  <v-flex xs5 md2 class="mr-0">
                    <v-btn
                      raised
                      dark
                      class="c_selected_btn text-capitalize c-image-btn"
                      @click="onPickFile"
                    >
                      <span v-if="viewImages.length == 0">
                        + Click to
                        <br />add photos
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

                  <v-flex v-for="image in viewImages" :key="image" xs5 md2 class="mt-2 mx-1 mb-1">
                    <v-img
                      :src="image"
                      crossorigin="anonymous"
                      :lazy-src="require('@/assets/loading.png')"
                      max-height="110"
                      max-width="170"
                      aspect-ratio="1.7"
                      width="255"
                      position
                    ></v-img>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-card>
          </v-flex>

          {{ addBasicInfo }}
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
import { mapGetters } from "vuex";

import VueUploadMultipleImage from "vue-upload-multiple-image";

import BasicItemInfo from "./BasicItemInfo";
import { getLastElement } from "@/resources/helper";
import { getErrorMessage } from "@/resources/helper";

export default {
  name: "AddItem",
  components: {
    VueUploadMultipleImage,
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
      submitBtn: false
    };
  },
  computed: {
    ...mapGetters({
      imageString: "dashboard/storeImage"
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
    onFilePicked(event) {
      const files = event.target.files;
      this.images = [];
      this.viewImages = [];
      var index = 0;
      for (var file of files) {
        if (index === 5) {
          break;
        }
        if (file.name.substr(file.name.indexOf(".") + 1) == "jpg") {
          // this.images.push(file.name);
          // console.log(window.URL.createObjectURL(file))
          this.images.push(file);
          this.viewImages.push(window.URL.createObjectURL(file));
          index++;
        }
      }
    },
    // to submit the item
    addItem(){
        let formData = new FormData();
        // 
        // work on validation
        // 
        formData.append("name", this.addBasicInfo.name);
        formData.append("price", this.addBasicInfo.price);
        formData.append("category", getLastElement(this.addBasicInfo.category));
        formData.append("quantity", this.addBasicInfo.quantity);
        formData.append("condition", this.addBasicInfo.condition);
        formData.append("brand", this.addBasicInfo.brand);
        formData.append("description", this.tempStoreDescription);
        formData.append("features", null)
        formData.append("token", this.addBasicInfo.priorityVal);
        for (var image of this.images){
            formData.append("image", image);
        }

        this.submitBtn = true;
        this.$store
          .dispatch("dashboard/add_item", formData)

            .then(() => {
                this.$store.commit("SET_SNACKBAR", {
                    message: "Successfully added an Item!",
                    value: true,
                    status: "success"
                });
                this.submitBtn = false;
            })

            .catch(error => {
                this.$store.commit("SET_SNACKBAR", {
                    message: getErrorMessage(error),
                    value: true,
                    status: "error"
                });
                this.submitBtn = false;
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
