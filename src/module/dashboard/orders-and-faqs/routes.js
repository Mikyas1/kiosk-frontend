import OrdersAndFaqs from "./views/OrdersAndFaqs";

export default [
    {
        path: 'orders-faqs',
        name: 'ordersAndFaqs',
        component: OrdersAndFaqs,
        meta: {
            requiresAuth: true,
        },
    },
];