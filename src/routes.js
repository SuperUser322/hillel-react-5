//import { routes as feature } from "./features/feature/routes";
import { routes as products } from "./features/products/routes";
import { routes as aboutUs } from "./features/aboutUs/routes";
import { routes as deliveryAndPayment } from "./features/deliveryAndPayment/routes";
import { routes as cart } from "./features/cart/routes";

export const routes = [
  // put here features' routes
  //...feature,
  ...products,
  ...aboutUs,
  ...deliveryAndPayment,
  ...cart,
];
