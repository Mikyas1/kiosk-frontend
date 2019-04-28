import Vue from "vue";
import Router from "vue-router";
import { routes as module } from "../module";

import store from "./store"; // your vuex store


Vue.use(Router);

const baseRoutes = [{ path: "*", redirect: "/app/dashboard" }];
const routes = baseRoutes.concat(module);

const router = new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes,

    linkActiveClass: "is-active",
    linkExactActiveClass: "is-exact-active",
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
    
});

// NAVIGATION GUARDS
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(!store.getters["auth/loggedIn"]){
            next({
                name: 'login'
            })
        } else {
            next()
        }
    } else if(to.matched.some(record => record.meta.requiresVisitor)){
        if(store.getters["auth/loggedIn"]){
            next({
                name: 'dashboard'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;
