<template>
    <v-app class="home">
        <div class="content">
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
                            <h1 class="display-1 white--text">Awesome landing page.</h1>
                            <p class="white--text subheading">Be amazed by the best looking bootstrap landing page on the web! Your new app deserves an amazing page to show all of its features. Clear visual, light colours and beautifully aligned elements - they all try to make the users aware of your great app features!</p>
                            <v-btn depressed>Appstore</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </nav>
        </div>
    </v-app>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.home {
    background-image: url('../../../assets/bg3.jpg');
    background-size: cover;
    height: 96vh;
}
.content {

}

</style>