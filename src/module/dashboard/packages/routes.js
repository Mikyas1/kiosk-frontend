import Packages from "./views/Packages";

export default [
    {
        path: '/packages',
        name: 'packages',
        component: Packages,
        meta: {
            requiresAuth: true,
        },
    },
];