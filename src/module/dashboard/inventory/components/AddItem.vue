<template>
    <div>
        <v-card>
            add new item
            <vue-upload-multiple-image
                @upload-success="uploadImageSuccess"
                @before-remove="beforeRemove"
                @edit-image="editImage"
                @data-change="dataChange"
                :data-images="images"
            ></vue-upload-multiple-image>
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
        }
    }
}
</script>

<style>

</style>
