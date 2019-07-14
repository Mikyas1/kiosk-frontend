import Login from "./views/Login";
import Register from "./views/Register";
import LogOut from "./views/Logout";

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
    },
    {
      path: '/logout',
      name: 'logOut',
      component: LogOut,
      meta: {
        requiresAuth: true,
      }
    },
];