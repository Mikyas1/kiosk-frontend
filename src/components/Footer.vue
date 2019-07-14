<template>

  <v-footer height="58" class="white pa-3 c-footer">
    <span class="subheading c_text_1--text">Kiosic.com &copy; {{ new Date().getFullYear() }}</span>
    <v-spacer></v-spacer>
    <span class="mr-1 c_text_1--text subheading"> Kiosk where your dreams come true!</span>
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
