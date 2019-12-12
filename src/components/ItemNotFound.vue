<template>
    <div style="height: 100px">
        <v-layout row wrap align-center>
            <div style="height: 210px"
                v-bind:style="$vuetify.breakpoint.smAndDown && 'height: 260px' || 'height: 240px'"            
            ></div>
          <v-flex class="text-xs-center"
          v-bind:class="$vuetify.breakpoint.smAndDown && 'display-1 mt-3 ml-3' || 'display-3 mt-5 ml-5'"
          >
            <span class="grey--text">
                :( Item Not Found!!
            </span>
          </v-flex>
        </v-layout>
    </div>
</template>