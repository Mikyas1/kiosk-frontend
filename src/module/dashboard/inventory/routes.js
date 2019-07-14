import Inventory from "./views/Inventory";

export default [
    {
        path: 'inventory',
        name: 'inventory',
        component: Inventory,
        meta: {
            requiresAuth: true,
        },
    },
];