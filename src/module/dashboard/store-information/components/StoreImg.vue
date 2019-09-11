<template>

    <div>
        <v-card flat class="c-give-hight">
          <h2 class="font-weight-regular">2: {{ $t('store_picture') }}</h2>
          <div class="grey--text">{{ $t('store_picture_info') }}</div>
          <div
            class="my-4"
          >{{ $t('store_picture_info_detail') }}</div>

          <div v-if="imageString != ''">
            <v-img
                :src="imageString"
                crossorigin="anonymous"
                :lazy-src="require('@/assets/loading.png')"
                max-height="155"
                aspect-ratio="1.7"
                width="255"
                position=""
            >
            </v-img>  
          </div>

          <div v-else>
              <p><v-icon small color="primary">info</v-icon>{{ $t('no_store_image') }}</p>
          </div>

          <v-btn
            raised
            dark
            class="c_selected_btn ml-0 text-capitalize"
            v-on:click="onPickFile"
            v-bind:loading="imageBtn"
          >
          <span v-if="imageString == ''">
            {{ $t('upload_image') }}   
          </span>
          <span v-else>
            {{ $t('change_image') }}
          </span>
          </v-btn>

          <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/*"
            v-on:change="onFilePicked"
          />
        </v-card>
    </div>

</template>

<script>
import apiClient from "@/resources/apiClient";
import { getErrorMessage } from "@/resources/helper";

import { mapGetters } from "vuex";

export default {
    name: "storeProfileImage",
    data(){
        return {
            image: null,
            imageBtn: false,
        }
    },

    computed: {
        ...mapGetters({
            imageString: "dashboard/storeImage"
        })
    },

    methods: {
        onPickFile: function() {
        this.$refs.fileInput.click();
        },

        onFilePicked: function(event) {
        const files = event.target.files;

        let filename = files[0].name;
        if (filename.lastIndexOf["."] <= 0) {
            this.$store.commit("SET_SNACKBAR", {
            message: "please choose an image",
            value: true,
            status: "error"
            });
            return;
        }

        this.image = files[0];

        this.imageBtn = true;

        let formData = new FormData();
        formData.append("file", this.image);

        this.$store
          .dispatch("dashboard/update_image", formData)

            .then(() => {
                this.$store.commit("SET_SNACKBAR", {
                    message: "Successfully uploaded Store Image",
                    value: true,
                    status: "success"
                });
                this.imageBtn = false;
            })

            .catch(error => {
                this.$store.commit("SET_SNACKBAR", {
                    message: getErrorMessage(error),
                    value: true,
                    status: "error"
                });
                this.imageBtn = false;
            });
        }
    }
}
</script>

<style>

</style>
