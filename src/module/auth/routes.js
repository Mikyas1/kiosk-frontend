import Login from "./views/Login";
import Register from "./views/Register";

export default [
    { 
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresVisitor: true,
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            requiresVisitor: true,
        },
    }
];