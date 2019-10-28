<template>
  <div>
    <v-flex xs5 md2 class="mt-2 mx-1 mb-1">
      <v-img
        :src="image.path"
        crossorigin="anonymous"
        :lazy-src="require('@/assets/loading.png')"
        max-height="110"
        max-width="170"
        contain
        width="255"
        position
      ></v-img>
      <v-layout>
        <v-flex>
          <v-btn flat small fab depressed :href="image.path" target="_blank">
            <v-icon>zoom_in</v-icon>
          </v-btn>
        </v-flex>
        <v-flex :class="{'ml-3': $vuetify.breakpoint.smAndUp}">
          <v-btn flat small fab depressed v-on:click="deleteItemDialog=!deleteItemDialog">
            <v-icon small>delete</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>

    <!-- DELETE ITEM DIALOG -->
    <v-dialog v-model="deleteItemDialog" 
      v-bind:max-width="$vuetify.breakpoint.xsOnly && '100%' || '70%'"
    >
      <div slot="activator"></div>

      <v-card v-if="!main">
        <div primary-title>
          <div class="headline pt-4 ml-4">
            <v-icon class="error--text">delete</v-icon>Delete Image
          </div>
        </div>
        <v-card-text>
          <div class="ml-3 mb-2 mt-0 warning--text">
            <v-icon small color="warning">info</v-icon>Deleting your item requires you to reset the item token.
            This token will be the new listing priority value of your item.
          </div>
          <v-img
            :src="image.path"
            crossorigin="anonymous"
            :lazy-src="require('@/assets/loading.png')"
            max-height="110"
            max-width="170"
            contain
            width="255"
            position
            class="ml-4 mt-4"
          ></v-img>

          <!-- <v-slider
              thumb-label="always"
              label="Listing Priority"
              :max="avaliableTokens"
              :min="1"
              always-dirty
              class="input-group--focused pr-4 pl-2 mt-5 pt-2"
              :class="{'c-slider': $vuetify.breakpoint.mdAndUp}"
          ></v-slider>-->

          <div class="ml-0 mb-2 mt-4">
            <v-icon small color="warning">warning</v-icon>
            {{ $t('delete_store_info_prompt') }}
          </div>
          <v-btn
            flat
            dark
            class="error ml-0 text-capitalize"
            v-bind:loading="deleteBtn"
            v-on:click="deleteItemFn"
          >{{ $t('delete') }}</v-btn>
          <v-btn
            flat
            class="c_selected_btn text-capitalize white--text"
            v-on:click="deleteItemDialog=!deleteItemDialog"
          >{{ $t('cancle') }}</v-btn>
        </v-card-text>
      </v-card>

      <v-card v-if="main">
        <div primary-title>
          <div class="headline pt-4 ml-4">
            <v-icon class="error--text">delete</v-icon>Replace Main Image
          </div>
        </div>
        <v-card-text>
          <div class="ml-3 mb-2 mt-0 warning--text">
            <v-icon small color="warning">info</v-icon>Deleting your item's main Image requires you to set a new image form your item image list and set a new token.
            This token will be the new listing priority value of your item.
          </div>
          <v-img
            :src="image.path"
            crossorigin="anonymous"
            :lazy-src="require('@/assets/loading.png')"
            max-height="110"
            max-width="170"
            contain
            width="255"
            position
            class="ml-4 mt-4"
          ></v-img>

          <div v-if="imageList.length > 0" class="ml-0 mb-2 mt-4">
            <v-icon small color="c_selected_btn">info</v-icon>Please choose an image below to replace the main image.
          </div>

          <v-layout row wrap>
            <v-flex v-for="image in imageList" :key="image.id">
              <v-img
                :src="image.path"
                crossorigin="anonymous"
                :lazy-src="require('@/assets/loading.png')"
                max-height="55"
                max-width="85"
                contain
                width="255"
                position
                class="ml-4 mt-4 c-image"
                :class="{'c-active-image': checkActive(image.id)}"
                v-on:click="setActiveImage(image)"
              ></v-img>
            </v-flex>
          </v-layout>

          <!-- {{ activeImage }} -->

          <!-- <v-slider
              thumb-label="always"
              label="Listing Priority"
              :max="avaliableTokens"
              :min="1"
              always-dirty
              class="input-group--focused pr-4 pl-2 mt-5 pt-2"
              :class="{'c-slider': $vuetify.breakpoint.mdAndUp}"
          ></v-slider>-->

          <div v-if="imageList.length > 0" class="ml-0 mb-2 mt-4">
            <v-icon small color="warning">warning</v-icon>Are you sure, you want to replace the main image?
          </div>
          <div v-if="imageList.length == 0" class="ml-0 mb-2 mt-4">
            <v-icon small color="warning">warning</v-icon>This item has no list images to substitue as a main image.
          </div>
          <v-btn
            v-if="imageList.length > 0"
            flat
            dark
            class="error ml-0 text-capitalize"
            v-bind:loading="deleteBtn"
            v-on:click="deleteItemFn"
          >Replace</v-btn>
          <v-btn
            flat
            class="c_selected_btn text-capitalize white--text"
            v-on:click="deleteItemDialog=!deleteItemDialog"
          >{{ $t('cancle') }}</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getErrorMessage } from "@/resources/helper";

import { mapGetters } from "vuex";

export default {
  name: "EditItem",
  data() {
    return {
      deleteItemDialog: false,
      deleteBtn: false,
      activeImage: null
    };
  },
  props: {
    image: {
      type: Object,
      required: true
    },
    main: {
      type: Boolean,
      required: true
    },
    itemId: {
      type: Number,
      required: true
    },
    imageList: {
      type: Array,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      imageString: "dashboard/storeImage",
      storeToken: "dashboard/storeToken"
    }),
    avaliableTokens() {
      if (this.storeToken > 20) {
        return 20;
      } else {
        return this.storeToken;
      }
    }
  },
  methods: {
    deleteItemFn() {
      this.deleteBtn = true;

      var data = null;
      if (!this.main) {
        data = {
          itemId: this.itemId,
          imageId: [this.image.id],
          mainImage: null
        };
      } else if (this.main) {
        if (
          this.activeImage != null &&
          this.imageList.findIndex(x => x.id == this.activeImage.id) != -1
        ) {
          data = {
            itemId: this.itemId,
            imageId: [this.image.id],
            mainImage: this.activeImage.id
          };
        } else {
          this.$store.commit("SET_SNACKBAR", {
            message: "Please Select a picture form the image list.",
            value: true,
            status: "error"
          });
          this.deleteBtn = false;
          return;
        }
      }
      this.$store
        .dispatch("dashboard/delete_item_image", data)
        .then(response => {
          var message = this.main ? "Successfully Replaced an Image!" : "Successfully deleted an Image!";
          this.$store.commit("SET_SNACKBAR", {
            message: message,
            value: true,
            status: "success"
          });
          this.$emit("removeImage", {imageId: this.image.id, replaceImageId: data.mainImage});
          this.deleteBtn = false;
          this.deleteItemDialog = !this.deleteItemDialog;
        })
        .catch(error => {
          this.$store.commit("SET_SNACKBAR", {
            message: getErrorMessage(error),
            value: true,
            status: "error"
          });
          this.deleteBtn = false;
        });
    },
    setActiveImage(image) {
      this.activeImage = image;
    },
    checkActive(imageId) {
      if (this.activeImage == null) {
        return false;
      } else if (this.activeImage.id == imageId) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {}
};
</script>

<style scoped>
.center {
  margin: auto !important;
  width: 50% !important;
}
.c-slider {
  width: 65%;
}
.c-image {
  border: 1px solid rgba(0, 0, 0, 0.3) !important;
  border-radius: 2px;
  padding: 25px;
}
.c-active-image {
  border: 2px solid red !important;
  border-radius: 2px;
  padding: 25px;
}
</style>