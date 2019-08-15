<template>
    <div>
        <v-card>

        <v-container>
            <div primary-title>
                <div class="headline">Add a New Item.</div>
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
                        <v-btn style="height: 400px" outline block class="primary">
                            1
                        </v-btn>
                    </v-flex>
                    <v-flex xs12 md6>
                        <v-btn style="height: 400px" outline block class="primary">
                            2
                        </v-btn>
                    </v-flex>
                </v-layout>

                <v-layout row  wrap>
                    <v-flex xs12 md12>
                        <v-btn style="height: 200px" outline block class="primary">
                            3
                        </v-btn>
                    </v-flex>
                </v-layout>

                <v-layout row  wrap>
                    <v-flex xs12 md12>
                        <v-btn style="height: 200px" outline block class="primary">
                            4
                        </v-btn>
                    </v-flex>
                </v-layout>
                
            </v-container>



        </v-card>
    </div>
</template>

<script>
import VueUploadMultipleImage from 'vue-upload-multiple-image'

export default {
    name: 'AddItem',
    components: {
        VueUploadMultipleImage
    },
    data(){
        return {
            images: []
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
        this.$store.dispatch("dashboard/get_inventory")
        .then(response=>{
            console.log(response);
        })
        .catch(e=> {
            console.log(e);
        })
    }
}
</script>

<style>

</style>
