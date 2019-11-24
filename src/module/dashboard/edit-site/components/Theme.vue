<template>
    <div>
        <v-card flat class="text-xs-center ma-3 c-card"
            :class="{'c-active': theme.active}"
        >
             <v-card-text>
                <v-img
                    :src="require('@/assets/mint.png')"
                    crossorigin="anonymous"
                    :lazy-src="require('@/assets/loading.png')"
                    aspect-ratio="1.7"
                    class="theme-img"
                    position=""
                    contain
                >
                </v-img> 
                <div class="mt-3">Theme - {{theme.name}}</div>
                <p class="grey--text">{{theme.description}}</p>
                <v-btn
                    v-if="!theme.active"
                    round
                    color="c_selected_btn white--text text-capitalize c-btn my-2" 
                >
                    <v-icon small class="mr-2">brush</v-icon>
                    <span class="mr-2">Use this theme</span>
                </v-btn>
                <v-btn
                    v-if="theme.active"
                    disabled
                    round
                    color="c_selected_btn white--text text-capitalize c-btn my-2" 
                >
                    <v-icon small class="mr-2">brush</v-icon>
                    <span class="mr-2">Using This Theme</span>
                </v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
  props: {
    theme: {
      type: Object,
      required: true
    }
  },   
}
</script>

<style scoped>
.c-btn {
    min-width:   130px;
}
.theme-img {
    width: 100%;
}
.c-active {
    border: .1em solid #fc4b6c;
    border-radius: 4px;
}
</style>