import { routes as auth } from "./auth";
import { routes as dashboard } from "./dashboard";
import { routes as home } from "./home";

import WithNav from "./dashboard/views/WithNav";

var dashboardWithNav = [
    {
        path: '/app/',
        component: WithNav,
        children: [ ...dashboard ],
        redirect: "/app/dashboard"
    }
]

export default [...auth, ...home, ...dashboardWithNav];
