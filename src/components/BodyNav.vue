<template>

      <v-toolbar 
        color="white"
        height="86"
        class="c-body-nav"
      >
        <v-toolbar-title>
          <v-layout column>
            <v-flex class="primary--text title font-weight-light">
              <v-icon class="primary--text">{{ icon }}</v-icon> {{ $t(parent.name) }}
            </v-flex>
            <v-flex>
              <v-layout row wrap>
                <v-flex>
                  <span class="primary--text body-2 font-weight-light">{{ $t('home') }} </span>
                </v-flex>
                <v-flex v-if="$vuetify.breakpoint.smAndUp">
                  <router-link v-if="child" router v-bind:to="{ name: parent.link }" class="primary--text body-2 font-weight-light c-link"> <v-icon small>keyboard_arrow_right</v-icon> {{ $t(parent.name) }}</router-link>
                  <span v-else class="grey--text body-2 font-weight-light"> <v-icon small>keyboard_arrow_right</v-icon> {{ $t(parent.name) }}</span>
                </v-flex>
                <v-flex v-if="child">
                  <span class="grey--text body-2 font-weight-light"> <v-icon small>keyboard_arrow_right</v-icon> {{ $t(child.name) }}</span>                  
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn 
          class="secondary_1 white--text text-capitalize"
          href="http://198.251.64.103/store" 
          flat
          target="_blank"
        >
            {{ $t('visit_your_site') }}
        </v-btn>

      </v-toolbar>

</template>

<script>

export default {
  name: 'BodyNav',
  props: [
      'parent',
      'icon'
  ],
  props: {
    parent: {
      type: Object,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    child: {
      type: Object,
      required: false
    }
  },
}
</script>

<style>
.c-body-nav {  
  box-shadow: 0 3px 3px -3px rgba(0, 0, 0, 0.2);
}
.c-link {
  text-decoration: none;
}
</style>
