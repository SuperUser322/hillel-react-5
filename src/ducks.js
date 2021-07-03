import { ducks as products } from "./features/products/ducks";
import { ducks as aboutUs } from "./features/aboutUs/ducks";
import { ducks as deliveryAndPayment } from "./features/deliveryAndPayment/ducks";
import { ducks as cart } from "./features/cart/ducks";

export const ducks = [
  ...products,
  ...aboutUs,
  ...deliveryAndPayment,
  ...cart
];
