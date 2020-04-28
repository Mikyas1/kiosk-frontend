<template>
    <v-app>
        <!-- <div class="content">
            <nav>
                <v-toolbar flat class="transparent">
                    <v-toolbar-title>
                        <div>
                            <span class="white--text">KIOSK</span>
                            <span class="white--text font-weight-light body-1"> com</span>
                        </div>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn flat router v-bind:to="{ name: 'login'}">
                        <span class="white--text">Login</span>
                        <v-icon class="white--text">exit_to_app</v-icon>
                    </v-btn>
                    <v-btn flat router v-bind:to="{ name: 'register'}">
                        <span class="white--text">sign up</span>
                        <v-icon class="white--text">exit_to_app</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-container class="my-5">
                    <v-layout row wrap>
                        <v-flex xs12 md6>
                            <img src="../../../assets/iphone3.png" alt="" width="300">
                        </v-flex>
                        <v-flex xs12 md6>
                            <h1 class="display-1 white--text mb-4">The Future Is Here.</h1>
                            <p class="white--text subheading">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad voluptates consequuntur odit libero ipsum illum, rerum aliquam numquam veniam at dolorum suscipit facilis, ab nam incidunt cupiditate in! Amet, doloremque.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. In molestiae provident porro natus iusto? Iste, quas expedita enim omnis, ipsum doloribus deleniti fugiat similique dolore, at vel velit incidunt ducimus.
                            </p>
                            <v-btn depressed>Appstore</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </nav>
        </div> -->
        <v-container fluid class="pa-0 pt-4">
            <v-layout class="justify-center" :class="{'pl-4': $vuetify.breakpoint.smAndUp}">
                <v-flex xs10 md6>
                    <v-layout column>
                        <v-flex>
                            <v-layout row class="justify-center">
                                <v-flex xs7 sm3>
                                       
                                    <!-- CAMPANY LOGO -->
                                    <img :src="require('@/assets/logo-192x192.png')" height="152" alt="KiosK">
                                        
                                </v-flex>

                            </v-layout>
                        </v-flex>
                        <v-flex>
                            <v-layout row class="justify-center">
                                <v-flex xs12 sm7 lg6>
                                    
                                    <p class="font-weight-regular font-italic subheading moto">KiosK.et your reliable ecommerce solution!</p>

                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex>
                            <v-layout row class="justify-center">
                                <v-flex :xs11="$vuetify.breakpoint.mdAndUp" :xs7="$vuetify.breakpoint.smAndDown" sm9>
                                    <v-layout 
                                        :row="$vuetify.breakpoint.mdAndUp" 
                                        :column="$vuetify.breakpoint.smAndDown"
                                        wrap
                                        >
                                        <v-flex :class="{'mb-2': $vuetify.breakpoint.smAndDown}">
                                            <router-link class="home-nav" v-bind:to="{ name: 'login'}">
                                               <v-icon class="home-nav" small>vpn_key</v-icon> login
                                            </router-link>
                                        </v-flex>
                                        <v-flex :class="{'mb-2': $vuetify.breakpoint.smAndDown}">
                                            <router-link class="home-nav" v-bind:to="{ name: 'register'}">
                                                <v-icon class="home-nav" small>exit_to_app</v-icon> new here (sign up)
                                            </router-link>
                                        </v-flex>
                                        <v-flex :class="{'mb-2': $vuetify.breakpoint.smAndDown}">
                                            <router-link class="home-nav" v-bind:to="{ name: 'register'}">
                                                <v-icon class="home-nav" small>help_outline</v-icon> help
                                            </router-link>
                                        </v-flex>
                                        <v-flex :class="{'mb-2': $vuetify.breakpoint.smAndDown}">
                                            <router-link class="home-nav" v-bind:to="{ name: 'register'}">
                                                <v-icon class="home-nav" small>verified_user</v-icon> terms and conditions
                                            </router-link>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout class="home mt-3">
                
            </v-layout>

            <v-layout class="homef mt-3">
                
            </v-layout>
        </v-container>

    </v-app>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.home {
    /* background-image: url('../../../assets/bg3.jpg'); */
    background-color: #1e88e5;
    /* background-size: cover; */
    /* height: 96vh; */
    height: 500px;
}

.home p {
    color: white;
}

.homef {
    height: 500px;
}

.moto {
    color: rgba(0, 0, 0, .7);
}

.home-nav {
    color: #1e88e5;
    text-decoration: none;
}
.content {

}

</style>