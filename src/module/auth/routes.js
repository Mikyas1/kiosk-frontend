import Login from "./views/Login";
import Register from "./views/Register";
// import { NonAuth } from "@/resources/auth";
// import { Auth } from "@/resources/auth";

export default [
    { 
        path: '/login',
        name: 'login',
        component: Login,
        // beforeEntry: NonAuth,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        // beforeEntry: NonAuth,
    }
];