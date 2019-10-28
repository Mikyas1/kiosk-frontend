<template>
  
  <!--  NAVIGATION -->
  <nav>

    <v-toolbar 
      dark 
      color="primary"
      app
      height='70'
    >

      <!-- TOOLBAR TITLE -->
      <v-toolbar-title class="white--text ml-0 pl-0">
        
        <!-- NAV DRAWER ICON -->
        <v-toolbar-side-icon :class="{'drawer-icon': drawer}" v-on:click="drawer = !drawer"></v-toolbar-side-icon>

      </v-toolbar-title>

      <!-- SEARCH FIELD -->
      <!-- <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down ml-3"
        >
      </v-text-field> -->

      <!-- SPACER TO SEPARATE HORIZONTALLY -->
      <v-spacer></v-spacer>

      <!-- TOKEN VALUE -->
      <div class="">
        <v-icon>monetization_on</v-icon>
        <router-link ripple router v-bind:to='"/app/packages"' class="white--text c-token">
        {{ storeToken }} <span class="hidden-sm-and-down">Tokens</span>
        </router-link>
      </div>

      <!-- USER INFO -->
      <v-menu bottom offset-y>
        <v-btn
          flat
          class="px-3"
          large
          slot="activator"
        >
          <div class="c-btn-div">
            <v-avatar class="mr-2 hidden-sm-and-down" size="30px">
              <v-icon>person_outline</v-icon>
            </v-avatar>
            <!-- <span class="subheading text-capitalize white--text hidden-sm-and-up" v-if="!drawer">{{ fullName }}</span> -->
            <span class="subheading text-capitalize white--text hidden-sm-and-down">{{ fullName }} </span>
            <v-avatar class="mr-2" size="30px">
               <v-icon>expand_more</v-icon>
               <v-icon class="hidden-md-and-up">person_outline</v-icon>
            </v-avatar>
          </div>  
        </v-btn>
        <v-list>
          <v-list-tile v-for="menu in menus" v-bind:key="menu.text" router v-bind:to="menu.route">
            <v-list-tile-action>
              <v-list-tile-title>
                <v-icon right>
                  {{ menu.icon }}
                </v-icon>
              </v-list-tile-title>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="pr-4">
                {{ $t(menu.name) }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      
    </v-toolbar>

    <!-- THE NAVIGATION DRAWER -->
    <v-navigation-drawer 
      v-model="drawer" 
      fixed
      app
      width="240"
      floating
      class="c-drawer"
    >

      <!-- NAVIGATION DRAWER TOOLBAR -->
      <v-toolbar
        height="70"
        color="c_primary_dark"
        dark
      >
        <!-- CAMPANY LOGO -->
        <img src="../assets/m.png" height="36" alt="KiosK">

        <!-- NAVIGATION DRAWER TITLE -->
        <v-toolbar-title>
          <router-link class="c-logo" tag="div" to="/">
            <span>KIOSK</span>
            <span class="font-weight-light body-1"> com</span>
          </router-link>
        </v-toolbar-title>
      </v-toolbar>

      <!-- NAVIGATION DRAWER LIST -->
      <v-layout column align-content-start>
        <v-flex>
          <v-list class="mt-1">
            <v-list-tile v-for="link in links" v-bind:key="link.route" class="mt-2 mx-2 c_text--text" v-bind:class="{active: getActive(link.name)}" ripple router v-bind:to="link.route">
              <v-list-tile-action>
                <v-badge overlap top v-bind:value='link.notif' color="rgba(244, 67, 54, 0.65)">
                  <span slot="badge" class="white--text">{{ link.notif_val }}</span>
                  <v-icon right v-bind:class="{'white--text': getActive(link.name)}" >{{ link.icon }}</v-icon> 
                  </v-badge>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="font-weight-light text-capitalize subheading" v-bind:class="{'white--text': getActive(link.name)}">{{ $t(link.name) }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
          </v-list>
        </v-flex>
      </v-layout>


        <!-- BOTTOM DRAWER FOR LANG, ANDROID   ....  -->
      <v-bottom-nav
        :value="true"
        absolute
        mandatory
        class="bottom-nav"
      >

          <v-menu top offset-y>
            <template v-slot:activator="{ on }">

              <v-btn
                color="teal"
                flat
                value="recent"
                v-on="on"
              >
                <span>{{ $t('language') }}</span>
                <v-icon>language</v-icon>
              </v-btn>
            </template>
            <v-list class="language-popup">
              <v-list-tile
                ripple
                v-for="(lang, index) in langs"
                :key="index"
                class="lang-choice"
                v-on:click="setLang(lang)"
              >
                <v-list-tile-title>
                    <v-icon>language</v-icon>
                    {{ lang.text }}
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>

          <v-btn
            color="teal"
            flat
            value="favorites"
          >
            <span>Favorites</span>
            <v-icon>favorite</v-icon>
          </v-btn>

          <v-btn
            color="teal"
            flat
            value="nearby"
          >
        <span>{{ $t('android') }}</span>
        <v-icon>phone_android</v-icon>
      </v-btn>
    </v-bottom-nav>

    </v-navigation-drawer>

  </nav>

</template>

<script>
import { mapGetters } from "vuex";

  export default {
    data: () => ({
      bottomNav: 'recent',
      drawer: true,
      links: [
        { icon: 'dashboard', text: 'dashboard', route: '/app/dashboard', name: 'dashboard', notif: 0, notif_val: 0 },
        // { icon: 'notifications', text: 'Orders and FAQs', route: '/app/orders-faqs', name: 'ordersAndFaqs', notif: 1, notif_val: 3 },
        { icon: 'widgets', text: 'Inventory', route: '/app/inventory', name: 'inventory', notif: 0, notif_val: 0 },
        { icon: 'brush', text: 'Edit Web-Site', route: '/app/edit-site', name: 'editSite', notif: 0, notif_val: 0 },
        { icon: 'store', text: 'Store Information', route: '/app/store-information',name: 'storeInformation', notif: 0, notif_val: 0 },
        { icon: 'donut_large', text: 'Packages', route: '/app/packages', name: 'packages', notif: 0, notif_val: 0 },
      ],
      menus: [
        // { icon: 'dashboard', text: 'Setting', route: '/profile' },
        { icon: 'dashboard', text: 'Dashboard', route: '/app/dashboard', name: 'dashboard' },
        // { icon: 'notifications', text: 'Orders and FAQs', route: '/app/orders-faqs', name: 'ordersAndFaqs' },
        { icon: 'widgets', text: 'Inventory', route: '/app/inventory', name: 'inventory' },
        { icon: 'brush', text: 'Edit Web-Site', route: '/app/edit-site', name: 'editSite' },
        { icon: 'store', text: 'Store Information', route: '/app/store-information', name: 'storeInformation' },
        { icon: 'donut_large', text: 'Packages', route: '/app/packages', name: 'packages' },
        { icon: 'power_settings_new', text: 'Logout', route: '/logout', name: 'logout' },
      ],
      langs: [
        { text: 'English', val: 'en' },
        { text: 'Amharic', val: 'am' }
      ],
      home: '',
    }),
    computed: {
      ...mapGetters({
        storeToken: "dashboard/storeToken",
        owner: "dashboard/owner",
      }),
      fullName() {
        return this.owner.firtName + ' ' + this.owner.lastName;
      }
    },
    methods: {
      getActive: function(page) {
        if (this.$store.getters['dashboard/active'] == page){
          return true
        } else {
          return false
        }
      },
      setLang(lang) {
        this.$store.dispatch("lang/setLang", { vm: this, lang });
      },
    },
    created() {
      var width = window.window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (width < 1250) {
        this.drawer = false;
      }
    },
  }
</script>

<style>
.c-drawer {
  box-shadow: rgba(0, 0, 0, 0.08) 1px 0px 20px 0px;
}
.active {
  background: #26C6DA;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.14) 1px 0px 20px 0px;
}
.c-bottom-drawar {
  background: #F2F6F8;
  height: 58px;
  border-top: solid 1px rgba(0, 0, 0, .08)
}
.c-bottom-drawar-mobile {
  margin-top: 25vh;
}
.c-bottom-drawar-desktop {
  margin-top: 77%;
}
.c-logo {
  color: white;
  text-decoration: none;
}
.language-popup {
  min-width: 170px;
}
.lang-choice:hover {
  background-color: rgba(0, 0, 0, 0.06) !important;
  cursor: pointer;
}
.bottom-nav {
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  background-color: #F2F6F8 !important;
}
.drawer-icon {
  margin-left: 0px !important;
}
.c-token{
  text-decoration: none;
}
.c-token:hover {
  text-decoration: underline !important;
}
</style>
