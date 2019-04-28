import { routes as dashboard } from "./dashboard";
import { routes as editSite } from "./edit-site";
import { routes as inventory } from "./inventory";
import { routes as ordersAndFaqs } from "./orders-and-faqs";
import { routes as packages } from "./packages";
import { routes as storeInformation } from "./store-information";

export default [...dashboard, ...editSite, ...inventory, ...ordersAndFaqs, ...packages, ...storeInformation];
