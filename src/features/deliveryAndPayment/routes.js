import { DeliveryAndPaymentPage } from './pages/DeliveryAndPaymentPage';
import { featureConf } from "./config";

export const routes = [
  {
    key: `${featureConf}/deliveryAndPayment`,
    path: '/deliveryAndPayment',
    component: DeliveryAndPaymentPage,
    exact: true,
  },
];
