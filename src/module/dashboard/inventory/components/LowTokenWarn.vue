<template>
    <v-card>
        <div primary-title>
            <div class="headline pt-4 ml-4"><v-icon class="error--text">bubble_chart</v-icon> No enouth tokens.</div>
          </div>
          <v-card-text>
            <div class="ml-3 mb-2 mt-0 primary--text">
              <v-icon small color="primary">info</v-icon>
                <slot></slot>
            </div>
            <p>
                
            </p>
            <div class="ml-3 mb-2 mt-4">
                <v-icon small color="primary">check</v-icon>
                Go to packages page to purchase tokens?
            </div>
              <v-btn
                flat
                dark
                class="c_selected_btn ml-0 text-capitalize"
                v-on:click="goToPackages"
              >Yes</v-btn>
              <v-btn
                flat
                class="warning text-capitalize white--text"
                v-on:click="closeDialog"
              >{{ $t('cancle') }}</v-btn>
            </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'LowTokenWarn',
    methods: {
      // for closing the popup
      closeDialog() {
          this.$emit("closeDialog");
      },
      goToPackages() {
        this.$router.push({name: "packages"})
      }
    },
}
</script>

<style scoped>

</style>