import { CartPage } from './pages/CartPage';
import { featureConf } from "./config";

export const routes = [
  {
    key: `${featureConf}/cart`,
    path: '/cart',
    component: CartPage,
    exact: true,
  },
];
