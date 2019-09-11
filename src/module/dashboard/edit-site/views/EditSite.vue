<template>

    <v-container class="c-body pa-0" fluid="true">
      <Navbar parent="editSite" icon="brush"/>

      <v-card class="mx-4 my-5">
        <template>
          <v-card class="e4">
            <v-responsive
              :style="{ background: `rgb(${red}, ${green}, ${blue})` }"
              height="300px"
            ></v-responsive>

            <v-card-text>
              <v-container
                fluid
                grid-list-lg
              >
                <v-layout
                  row
                  wrap
                >
                  <v-flex xs9>
                    <v-slider
                      v-model="red"
                      :max="255"
                      label="R"
                    ></v-slider>
                  </v-flex>

                  <v-flex xs3>
                    <v-text-field
                      v-model="red"
                      class="mt-0"
                      type="number"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs9>
                    <v-slider
                      v-model="green"
                      :max="255"
                      label="G"
                    ></v-slider>
                  </v-flex>

                  <v-flex xs3>
                    <v-text-field
                      v-model="green"
                      class="mt-0"
                      type="number"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs9>
                    <v-slider
                      v-model="blue"
                      :max="255"
                      label="B"
                    ></v-slider>
                  </v-flex>

                  <v-flex xs3>
                    <v-text-field
                      v-model="blue"
                      class="mt-0"
                      type="number"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </template>
      </v-card>
      
      <v-card height="400" class="mx-4 my-5">
              
            <v-subheader class="pl-0">Always show thumb label</v-subheader>
            <v-slider
              v-model="slider"
              thumb-label="always"
              label="Qulala"
              :max="10"
              :min="1"
              always-dirty
            ></v-slider>
            {{ slider }}
          
      </v-card>

    </v-container>

</template>

<script>

import Navbar from '@/components/BodyNav'

export default {
  name: 'editSite',
  components: {
    Navbar
  },
  created() {
      this.$store.commit('dashboard/SET_ACTIVE_PAGE', 'editSite');
  },
  data () {
      return {
        red: 64,
        green: 128,
        blue: 0,
        slider: null
      }
    }
}
</script>

<style lang="stylus">
  .e4
    width: 400px
    margin: auto
</style>