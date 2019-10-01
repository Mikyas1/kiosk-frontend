<template>
  <div>
    <!-- <v-layout row wrap>
      <v-flex xs-3>
        <v-img
          :src="item.images[0].path"
          crossorigin="anonymous"
          :lazy-src="require('@/assets/loading.png')"
          max-height="110"
          max-width="170"
          aspect-ratio="1.7"
          width="255"
          position
        ></v-img>
      </v-flex>

      <v-flex xs-9>
        <v-layout row>
          <v-flex>{{ item.name }}</v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>{{ item.price }} ETB</v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>{{ item.quantity }}x</v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>{{ item.category.name }}</v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>{{ item.condition }}</v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>{{ item.brand }}</v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>{{ item.token }}</v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row v-if="item.description != null">
      <p>{{item.description}}</p>
    </v-layout>
    <v-layout row v-for="feature in item.features" :key="feature.id">
      <v-flex>{{feature.name}}</v-flex>
      <v-flex>{{feature.value}}</v-flex>
    </v-layout> -->
    <v-card>
      {{ item }}
    </v-card>
  </div>
</template>

<script>
export default {
  name: "DetailItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
</style>