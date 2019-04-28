import StoreInformation from "./views/StoreInformation";

export default [
    {
        path: 'store-information',
        name: 'storeInformation',
        component: StoreInformation,
        meta: {
            requiresAuth: true,
        },
    },
];