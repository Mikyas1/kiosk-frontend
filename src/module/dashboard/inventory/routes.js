import Inventory from "./views/Inventory";
import AddItem from "./views/AddItem";
import EditItem from "./views/EditItem";

export default [
    {
        path: 'inventory',
        name: 'inventory',
        component: Inventory,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: 'inventory/add-item',
        name: 'addItem',
        component: AddItem,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: 'inventory/edit-item/:id',
        name: 'editItem',
        component: EditItem,
        meta: {
            requiresAuth: true,
        },
    },
];