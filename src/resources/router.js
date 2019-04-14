import Vue from "vue";
import Router from "vue-router";
import { routes as module } from "../module";


Vue.use(Router);

const baseRoutes = [{ path: "*", redirect: "/" }];
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

export default router;
