<template>
  <!-- ABOUT US -->
  <v-flex class="xs12 sm12 md8">
    <v-card
      class="my-4"
      v-bind:class="$vuetify.breakpoint.xsOnly && 'mx-1' || 'ml-4 mr-2'"
    >
      <v-card-title primary-title>
        <div>
          <div class="headline">{{ $t('about_us') }}</div>
          <span class="grey--text">{{ $t('about_us_info') }}</span>
        </div>
      </v-card-title>

      <v-card-text>
        {{ $t('about_us_info_detail') }}
        <v-card height="415" flat class="mt-4">
          <h2 class="font-weight-regular">1: {{ $t('store_description') }}</h2>

          <quill-editor
            class="quill mt-1"
            v-bind:content="tempStoreDescription"
            v-bind:options="editorOptionOne"
            v-model="tempStoreDescription"
          ></quill-editor>

          <v-btn
            flat
            dark
            class="c_selected_btn ml-0 text-capitalize"
            v-bind:class="$vuetify.breakpoint.xsOnly && 'c-btn-large' || 'c-btn'"
            type="submit"
            v-bind:loading="loading"
            v-on:click="uploadDescription"
          >{{ $t('submit') }}</v-btn>
        </v-card>

        <!-- STORE IMAGE -->
        <StoreImg/>

      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

import StoreImg from "./StoreImg"

import { getErrorMessage } from "@/resources/helper";

import { mapGetters } from "vuex";

export default {
  name: "storeInformationAboutUs",

  components: {
    quillEditor,
    StoreImg
  },

  computed: {
    ...mapGetters({
      storeDescription: "dashboard/storeDescription"
    })
  },

  data() {
    return {
      tempStoreDescription: null,

      editorOptionOne: {
        placeholder:
          "Your store description goes here... your can copy and paste a content from a word document!!",
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
      loading: false
    };
  },

  methods: {
    uploadDescription: function() {
      if (
        this.tempStoreDescription !== "" &&
        this.tempStoreDescription !== this.storeDescription &&
        this.tempStoreDescription.length < 20000
      ) {
        this.loading = true;

        var data = {
          data: { description: this.tempStoreDescription },
          type: "description"
        }

        this.$store
          .dispatch("dashboard/update_store", data)

          .then(() => {
            this.$store.commit("SET_SNACKBAR", {
              message: "Successfully uploaded Store Description",
              value: true,
              status: "success"
            });
            this.loading = false;
          })

          .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
              message: getErrorMessage(error),
              value: true,
              status: "error"
            });
            this.loading = false;
          });
      } else if (this.tempStoreDescription == this.storeDescription) {
        this.$store.commit("SET_SNACKBAR", {
          message: "Successfully uploaded Store Description",
          value: true,
          status: "success"
        });
      } else if (this.tempStoreDescription.length >= 20000) {
        this.$store.commit("SET_SNACKBAR", {
          message:
            "Store Description more than 20,000 characters is not allowed!",
          value: true,
          status: "error"
        });
      }
    },
  },

  created() {
    this.tempStoreDescription = this.storeDescription;
    // alert(this.tempStoreDescription.length)
  },

};
</script>

<style scoped>
.quill {
  height: 220px;
}
.c-btn {
  margin-top: 90px;
}
.c-btn-large {
  margin-top: 120px;
}
.c-give-hight {
  margin-top: 100px;
}
</style>
