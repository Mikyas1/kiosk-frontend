<template>
    <div>
        <v-card flat class="text-xs-center ma-3 c-card"
            :class="{'c-active': theme.id === activeTheme.id}"
        >
             <v-card-text>
                <v-img
                    :src="theme.themePath"
                    crossorigin="anonymous"
                    :lazy-src="require('@/assets/loading.png')"
                    aspect-ratio="1.7"
                    class="theme-img"
                    position=""
                    contain
                >
                </v-img> 
                <div class="mt-3">Theme - {{theme.themeName}}</div>
                <p class="grey--text">
                    {{theme.description}}
                    <br>
                    <span class="theme-token">{{get_theme_token}}</span>
                </p>
                <v-btn
                    v-if="theme.id != activeTheme.id"
                    round
                    color="c_selected_btn white--text text-capitalize c-btn my-2"
                    v-on:click="selectTheme(theme)"
                    :loading="loading"
                >
                    <v-icon small class="mr-2">brush</v-icon>
                    <span class="mr-2">Use this theme</span>
                </v-btn>
                <v-btn
                    v-if="theme.id === activeTheme.id"
                    disabled
                    round
                    color="c_selected_btn white--text text-capitalize c-btn my-2" 
                >
                    <v-icon small class="mr-2">brush</v-icon>
                    <span class="mr-2 text-capitalize">This Theme Selected</span>
                </v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { getErrorMessage } from "@/resources/helper";

export default {
  props: {
    theme: {
      type: Object,
      required: true
    },
    activeTheme: {
        type: Object,
        required: true
    }
  },
  data() {
      return {
          loading: false,
      }
  },
  computed: {
      get_theme_token() {
          if (this.theme.tokenRquired === 0) {
              return 'Free';
          } else {
              return this.theme.tokenRquired + ' Tokens';
          }
      }
  },
  methods: {
      selectTheme(theme) {
          this.loading = true;
          this.$store
            .dispatch("dashboard/update_theme", theme)
            .then(() => {
                this.$store.commit("SET_SNACKBAR", {
                    message: "Successfully selected a theme!",
                    value: true,
                    status: "success"
                });
                this.loading = false;
            })
            .catch(() => {
                this.$store.commit("SET_SNACKBAR", {
                    message: getErrorMessage(error),
                    value: true,
                    status: "error"
                });
                this.loading = false;
            })
      }
  }
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
.theme-token {
    font-size: 1.2em;
    color: #1e88e5;
}
</style>