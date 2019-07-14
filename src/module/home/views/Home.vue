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
                            <h1 class="display-1 white--text mb-4">The Future Is Here.</h1>
                            <p class="white--text subheading">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad voluptates consequuntur odit libero ipsum illum, rerum aliquam numquam veniam at dolorum suscipit facilis, ab nam incidunt cupiditate in! Amet, doloremque.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. In molestiae provident porro natus iusto? Iste, quas expedita enim omnis, ipsum doloribus deleniti fugiat similique dolore, at vel velit incidunt ducimus.
                            </p>
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