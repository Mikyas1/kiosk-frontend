<template>

  <v-footer height="55" class="white pa-3 c-footer" absolute>
    <span class="subheading c_text_1--text">{{ $t('footer') }} &copy; {{ new Date().getFullYear() }}</span>
    <v-spacer></v-spacer>
    <span class="mr-1 c_text_1--text subheading">{{ $t('footer_message') }}</span>
    <!-- <span class="mr-1 c_text_1--text subheading"> Kiosk where your dreams come true!</span> -->
  </v-footer>

</template>

<script>

export default {
  name: 'Footer',
}
</script>

<style>
.c-footer {
  box-shadow: 0 -2px 2px -2px rgba(0, 0, 0, 0.1);
}
</style>
