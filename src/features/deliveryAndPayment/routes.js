import { DeliveryAndPaymentPage } from './pages/DeliveryAndPaymentPage';
import { OrderingPageStep1 } from './pages/OrderingPageStep1';
import { OrderingPageStep2 } from './pages/OrderingPageStep2';
import { OrderingPageStep3 } from './pages/OrderingPageStep3';
import { featureConf } from "./config";

export const routes = [
  {
    key: `${featureConf}/deliveryAndPayment`,
    path: '/deliveryAndPayment',
    component: DeliveryAndPaymentPage,
    exact: true
  },
  {
    key: `${featureConf}/orderingPageStep1`,
    path: '/orderingPageStep1',
    component: OrderingPageStep1,
    exact: true,
  },
  {
    key: `${featureConf}/orderingPageStep2`,
    path: '/orderingPageStep2',
    component: OrderingPageStep2,
    exact: true,
  },
  {
    key: `${featureConf}/orderingPageStep3`,
    path: '/orderingPageStep3',
    component: OrderingPageStep3,
    exact: true,
  },
];

/*routes: [
  {
    key: `${featureConf}/orderingPageStep1`,
    path: '/deliveryAndPayment/orderingPageStep1',
    component: OrderingPageStep1,
    exact: true,
  },
  {
    key: `${featureConf}/orderingPageStep2`,
    path: '/deliveryAndPayment/orderingPageStep2',
    component: OrderingPageStep2,
    exact: true,
  },
  {
    key: `${featureConf}/orderingPageStep3`,
    path: '/deliveryAndPayment/orderingPageStep3',
    component: OrderingPageStep3,
    exact: false,
  },
]*/
