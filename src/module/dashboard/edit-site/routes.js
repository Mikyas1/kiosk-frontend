import EditSite from "./views/EditSite";

export default [
    {
        path: '/edit-site',
        name: 'editSite',
        component: EditSite,
        meta: {
            requiresAuth: true,
        },
    },
];