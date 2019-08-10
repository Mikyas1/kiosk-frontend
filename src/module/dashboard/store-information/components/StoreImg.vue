<template>

    <div>
        <v-card flat class="c-give-hight">
          <h2 class="font-weight-regular">2: Store Picture</h2>
          <div class="grey--text">Picture of your store.</div>
          <div
            class="my-4"
          >The picture you upload here, is gone be displayed in your website's about us page.</div>

          <div v-if="imageString != ''">
            <v-img
                src="https://picsum.photos/510/300?random"
                :lazy-src="require('@/assets/loading.png')"
                max-height="155"
                aspect-ratio="1.7"
                width="255"
                position=""
            >
            </v-img>
          </div>
          <div v-else>
              <p><v-icon small color="primary">info</v-icon> You haven't added store image.</p>
          </div>

          <v-btn
            raised
            dark
            class="c_selected_btn ml-0 text-capitalize"
            v-on:click="onPickFile"
            v-bind:loading="imageBtn"
          >
          <span v-if="imageString == ''">
            Upload Image    
          </span>
          <span v-else>
            Change Image
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
