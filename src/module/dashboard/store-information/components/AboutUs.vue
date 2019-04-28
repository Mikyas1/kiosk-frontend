<template>

  <!-- ABOUT US -->        
  <v-flex class="xs12 sm12 md8">

    <!-- SNACK BAR -->
      <v-snackbar
      v-model="snackbar"
      v-bind:timeout="timeout"
      top
      v-bind:color="color"
    >
        <v-icon color="white">{{ icon }}</v-icon>&nbsp;&nbsp;
        <span>{{ snackbarMessage }}</span>
        <v-btn
        color="pink"
        flat
        v-on:click="snackbar = false"
        >
            <v-icon small color="secondary_1">clear</v-icon>
        </v-btn>
    </v-snackbar>

    <v-card height="950" class="my-4" v-bind:class="$vuetify.breakpoint.xsOnly && 'mx-1' || 'ml-4 mr-2'">

      <v-card-title primary-title>
        <div>
          <div class="headline">About Us</div>
          <span class="grey--text">Information about your store.</span>
        </div>
      </v-card-title>

      <v-card-text>
        The following information is gone be displayed in your website's about us page.
        
        <v-card height="335" flat class="mt-4">
          <h2 class="font-weight-regular">1: Store Descreption</h2>
            
            <quill-editor
              class="quill mt-1"
              v-bind:content="storeDescription.description"
              v-bind:options="editorOptionOne"
              v-model="storeDescription.description"
            >
            </quill-editor>

            <v-btn 
                flat 
                dark 
                class="c_selected_btn ml-0 text-capitalize"
                v-bind:class="$vuetify.breakpoint.xsOnly && 'c-btn-large' || 'c-btn'"
                type="submit"
                v-bind:loading="loading"
                v-on:click="uploadDescription"
              >
                  Submit
              </v-btn>
        </v-card>
        
        <v-card height="300" flat class="c-give-hight">
        <h2 class="font-weight-regular">2: Store Picture</h2>
        <div class="grey--text">Picture of your store.</div>
        <div class="my-4">The picture you upload here, is gone be displayed in your website's about us page.</div>

        <div v-if="image">
          <img v-bind:src="imageString" height="120">
        </div>
        <div v-if="!image && imageString">
          <img v-bind:src="'data:image/jpeg;base64, ' + imageString" height="120">
        </div>

        <v-btn
          raised
          dark
          class="c_selected_btn ml-0 text-capitalize"
          v-on:click="onPickFile"
          v-bind:loading="imageBtn"
        >
          Upload Image
        </v-btn>
        
        <input 
          type="file" 
          style="display: none" 
          ref="fileInput" 
          accept="image/*"
          v-on:change="onFilePicked"
        >
        
        </v-card>
      </v-card-text>

    </v-card>

  </v-flex>

</template>

<script>

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';

import apiClient from '@/resources/apiClient';
import { getErrorMessage } from '../../helper';
import http from "@/resources/http";
import { appendFile } from 'fs';

export default {
  name: 'storeInformationAboutUs',
  
  components: {
    quillEditor,
  },

  props: {
      aboutUs: {
          type: Object,
          required: true,
      }
  },

  data () {
    return {
      storeDescription: {},
      
      editorOptionOne: {
        placeholder: 'Your store description goes here... your can copy and paste a content from a word document!!',
        modules: {
          toolbar: [ 
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{'header': 1}, {'header': 2}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'indent': '+1'}],
            [{'header': [1,2,3,4,5,6, false]}],
            [{'color': []}],
            [{'font': []}],
            [{'align': []}],
          ]
        },
      },

      imageString: "",
      image: null,
      imageBtn: false,

      loading: false,

      // Snackbar Messages
      snackbar: false,
      timeout: 7000,
      snackbarMessage: '',
      color: 'c_selected_btn',
      icon: '',
    
    };
  },

  methods: {
    
    uploadDescription: function() {
      if(this.storeDescription !== ""){
        this.loading = true
        this.snackbar = false


        var data = {description: this.aboutUs.description}
        apiClient.dashboard.store_information.update_store(data)

        .then(response => {
            this.snackbarMessage = 'Successfully uploaded Store Description'
            this.snackbar = true
            this.color = 'c_selected_btn'
            this.icon = 'done'
            this.loading = false
        })

        .catch(error => {

          try {
              this.snackbarMessage = getErrorMessage(error.response.status, error.response.data)
          }
          catch(err) {
              this.snackbarMessage = 'Can\'t reach the kiosk Site'
          }
          
          this.color = ''
          this.icon = 'error_outline'
          this.loading = false
          this.snackbar = true

        })

      }
    },


    onPickFile: function() {
      this.$refs.fileInput.click();
    },

    onFilePicked: function(event) {
      const files = event.target.files
      
      let filename = files[0].name
      if (filename.lastIndexOf['.'] <= 0) {
        this.color = ''
        this.icon = 'error_outline'
        this.snackbar = false
        this.snackbarMessage = 'please choose an image'
        this.snackbar = true
        return
      }

      this.image = files[0]

      this.imageBtn = true

      let formData = new FormData()
      formData.append('imageFile', this.image)
      
      apiClient.dashboard.store_information.update_store_img(formData)

      .then(response => {
        this.snackbar = false
        this.color = 'c_selected_btn'
        this.icon = 'done'
        this.snackbarMessage = 'Successfully uploaded Store Image'
        this.snackbar = true
        this.imageBtn = false

        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageString = fileReader.result
        })
        fileReader.readAsDataURL(files[0])

      })


      .catch(error => {
        
        try {
            this.getErrorMessage(error.response.status, error.response.data)
        }
        catch(err) {
            // this.snackbarMessage = 'Can\'t reach the kiosk Site' + error.response.status
            this.snackbarMessage = 'Can\'t reach the kiosk Site'
        }
        
        this.color = ''
        this.icon = 'error_outline'
        this.imageBtn = false
        this.snackbar = true
      
      })
    }
  },

  created() {
    this.storeDescription = this.aboutUs
  },

  mounted() {
    
    apiClient.dashboard.store_information.get_store_img()

    .then(response => 
    {
      this.imageString = response.data.thumbnails
    })
    .catch(e => {

    })
  }

}
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
