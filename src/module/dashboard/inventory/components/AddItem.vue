<template>
    <div>
        <v-card>

        <v-container>
            <div primary-title>
                <div class="headline mb-3">Add a New Item.</div>
            </div>
            <!-- <v-card-text>
                <div class="ml-2">
                    <v-icon small color="primary">info</v-icon>The following Information is gone be displayed in your Contact Us page. Your customers might contact you through them.
                </div>
                <v-form ref="add" v-on:submit.prevent="addItem">
                    <v-text-field
                        label="* Item Name"
                        class="input-group--focused pr-4 pl-2 mt-2"
                    ></v-text-field>

                    <v-text-field
                        label="* Category"
                        class="input-group--focused pr-4 pl-2 mt-2"
                    ></v-text-field>

                    <v-text-field
                        label="* Conditon"
                        class="input-group--focused pr-4 pl-2 mt-2"
                    ></v-text-field>

                    <v-text-field
                        label="* Price"
                        class="input-group--focused pr-4 pl-2 mt-2"
                    ></v-text-field>

                    <v-text-field
                        label="* Images"
                        class="input-group--focused pr-4 pl-2 mt-2"
                    ></v-text-field>

                    <v-text-field
                        label="* Features"
                        class="input-group--focused pr-4 pl-2 mt-2"
                    ></v-text-field>

                    <v-text-field
                        label="* Brand"
                        class="input-group--focused pr-4 pl-2 mt-2"
                    ></v-text-field>

                    <v-text-field
                        label="* Description"
                        class="input-group--focused pr-4 pl-2 mt-2"
                    ></v-text-field>

                    <v-btn
                        flat
                        dark
                        class="c_selected_btn ml-0 text-capitalize"
                        type="submit"
                    >
                        Submit
                    </v-btn>
                    
                    <v-btn
                      flat
                      dark
                      class="warning ml-0 text-capitalize"
                      v-on:click="closeDialog"
                    >
                        Close
                    </v-btn>

                </v-form>

            </v-card-text>     -->

                <v-layout row  wrap>
                    <v-flex xs12 md6>
                        <v-card flat class="ma-2 px-4 py-4 c-card">
                            <BasicItemInfo
                                :category="category"
                                :tags="tags"
                            ></BasicItemInfo>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 md6>
                        <v-card flat height="450" class="ma-2 px-4 py-4 c-card">
                            <h2 class="font-weight-regular mb-3">2: Item Features</h2>
                            category: {{ category }}
                            <br/>
                            tags: {{tags}}
                            <v-text-field
                                label="* Features"
                                class="input-group--focused pr-4 pl-2 mt-2"
                            ></v-text-field>
                        </v-card>
                    </v-flex>
                </v-layout>

                <v-layout row  wrap>
                    <v-flex xs12 md10>
                        <v-card flat height="480" class="mx-2 mt-3 px-4 py-4 c-card mb-4">
                        <h2 class="font-weight-regular">3: Item Description</h2>
                        <p class="pa-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque labore architecto laboriosam omnis fugit nam error provident repellendus eum debitis, odio sit laborum facere, culpa molestiae eaque sequi. Pariatur, possimus?</p>
                            <quill-editor
                                class="quill"
                                v-bind:content="tempStoreDescription"
                                v-bind:options="editorOptionOne"
                                v-model="tempStoreDescription"
                            ></quill-editor>
                        </v-card>
                    </v-flex>
                </v-layout>

                <v-layout row  wrap>
                    <v-flex xs12 md12>
                        <v-btn style="height: 200px" outline block class="primary">
                            4
                        </v-btn>
                        <v-btn
                            flat
                            dark
                            class="c_selected_btn ml-0 text-capitalize"
                        >{{ $t('submit') }}</v-btn>
                        <v-btn
                            flat
                            class="warning text-capitalize"
                            v-on:click="closeDialog"
                        >{{ $t('cancle') }}</v-btn>
                    </v-flex>
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

import VueUploadMultipleImage from 'vue-upload-multiple-image';

import BasicItemInfo from './BasicItemInfo'

export default {
    name: 'AddItem',
    components: {
        VueUploadMultipleImage,
        quillEditor,
        BasicItemInfo
    },
    data(){
        return {
            tempStoreDescription: null,

            editorOptionOne: {
                placeholder:
                "Item Description!!",
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
            images: []
        }
    },
    props:{
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
        uploadImageSuccess(formData, index, fileList) {
            alert('upload called')
            console.log('data', formData, index, fileList)
            // Upload image api
            // axios.post('http://your-url-upload', { data: formData }).then(response => {
            //   console.log(response)
            // })
        },
        beforeRemove (index, done, fileList) {
            console.log('index', index, fileList)
            var r = confirm("remove image")
            if (r == true) {
                done()
            } else {
            }
        },
        editImage (formData, index, fileList) {
            console.log('edit data', formData, index, fileList)
        },
        dataChange (data) {
            alert('data change')
            console.log(data)
        },
        closeDialog() {
            this.$emit('closeDialog');
        }
    },
    created() {
        // console.log(this.tags)
        console.log(this.category)
    }
}
</script>

<style scoped>
.quill {
  height: 270px;
}
.c-card {
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 4px;
}
</style>
