<template>

      <v-toolbar 
        color="white"
        height="86"
        class="c-body-nav"
      >
        <v-toolbar-title>
          <v-layout column>
            <v-flex class="primary--text title font-weight-light">
              <v-icon class="primary--text">{{ icon }}</v-icon> {{ $t(parent) }}
            </v-flex>
            <v-flex>
                <span class="primary--text body-2 font-weight-light">{{ $t('home') }} </span><span class="grey--text body-2 font-weight-light"> <v-icon small>keyboard_arrow_right</v-icon> {{ $t(parent) }}</span>
            </v-flex>
          </v-layout>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn 
          class="secondary_1 white--text text-capitalize font-weight-light" 
          href="http://localhost:8080" 
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
}
</script>

<style>
.c-body-nav {  
  box-shadow: 0 3px 3px -3px rgba(0, 0, 0, 0.2);
}
</style>
