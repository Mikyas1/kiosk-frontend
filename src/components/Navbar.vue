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
        <v-toolbar-side-icon v-on:click="drawer = !drawer"></v-toolbar-side-icon>

      </v-toolbar-title>

      <!-- SEARCH FIELD -->
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down ml-3"
        >
      </v-text-field>

      <!-- SPACER TO SEPARATE HORIZONTALLY -->
      <v-spacer></v-spacer>

      <!-- USER INFO -->
      <v-menu>
        <v-btn
          flat
          class="px-3"
          large
          slot="activator"
        >
          <div class="c-btn-div">
            <v-avatar class="mr-2" size="30px">
              <img src="../assets/avatar/man_4.jpg" alt="Michael Wang"/>
            </v-avatar>
            <span class="subheading text-capitalize white--text hidden-sm-and-up" v-if="!drawer">{{ fullName }}</span>
            <span class="subheading text-capitalize white--text hidden-sm-and-down">{{ fullName }} </span>
          </div>  
        </v-btn>
        <v-list>
          <v-list-tile v-for="menu in menus" v-bind:key="menu.text" router v-bind:to="menu.route">
            <v-list-tile-action>
              <v-list-tile-title>
                <v-icon>
                  {{ menu.icon }}
                </v-icon>
              </v-list-tile-title>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ menu.text }}
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
          <div>
            <span>KIOSK</span>
            <span class="font-weight-light body-1"> com</span>
          </div>
        </v-toolbar-title>
      </v-toolbar>

      <!-- NAVIGATION DRAWER LIST -->
      <v-list class="mt-1">
        <v-list-tile v-for="link in links" v-bind:key="link.route" class="mt-2 mx-2 c_text--text" v-bind:class="{active: getActive(link.name)}" ripple router v-bind:to="link.route">
          <v-list-tile-action>
            <v-badge overlap top v-bind:value='link.notif' color="rgba(244, 67, 54, 0.65)">
              <span slot="badge" class="white--text">{{ link.notif_val }}</span>
              <v-icon v-bind:class="{'white--text': getActive(link.name)}" >{{ link.icon }}</v-icon> 
              </v-badge>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-light text-capitalize subheading" v-bind:class="{'white--text': getActive(link.name)}">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> 
      </v-list>

    </v-navigation-drawer>

  </nav>

</template>

<script>
  export default {
    data: () => ({
      drawer: true,
      links: [
        { icon: 'dashboard', text: 'Dashboard', route: '/dashboard', name: 'dashboard', notif: 0, notif_val: 0 },
        { icon: 'notifications', text: 'Orders and FAQs', route: '/orders-faqs', name: 'ordersAndFaqs', notif: 1, notif_val: 3 },
        { icon: 'widgets', text: 'Inventory', route: '/inventory', name: 'inventory', notif: 0, notif_val: 0 },
        { icon: 'brush', text: 'Edit Site', route: '/edit-site', name: 'editSite', notif: 0, notif_val: 0 },
        { icon: 'store', text: 'Store Information', route: '/store-information',name: 'storeInformation', notif: 0, notif_val: 0 },
        { icon: 'donut_large', text: 'Packages', route: '/packages', name: 'packages', notif: 0, notif_val: 0 },
      ],
      menus: [
        // { icon: 'dashboard', text: 'Setting', route: '/profile' },
        { icon: 'power_settings_new', text: 'Logout', route: '/logout' },
      ],
    }),
    computed: {
      fullName() {
        // return this.$store.state.store.owner.firtName + ' ' + this.$store.state.store.owner.lastName; 
        return "Mikyas Alemayehu"
      }
    },
    methods: {
      getActive: function(page) {
        if (this.$store.getters['dashboard/active'] == page){
          return true
        } else {
          return false
        }
      }
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
</style>
