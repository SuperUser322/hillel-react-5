import { BasketPage } from './pages/BasketPage';
import { featureConf } from "./config";

export const routes = [
  {
    key: `${featureConf}/basket`,
    path: '/basket',
    component: BasketPage,
    exact: true,
  },
];
