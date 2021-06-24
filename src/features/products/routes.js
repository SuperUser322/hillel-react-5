import { ProductPage } from './pages/ProductPage';
import { ProductsPage } from './pages/ProductsPage';
import { CreateProductPage } from './pages/CreateProductPage';
import { EditProductPage } from './pages/EditProductPage';
import { featureConf } from "./config";

export const routes = [
  {
    key: `${featureConf}/catalog`,
    path: '/catalog',
    component: ProductsPage,
    exact: true,
  },
  {
    key: `${featureConf}/product`,
    path: '/products/:id',
    component: ProductPage,
    exact: true,
  },
  {
    key: `${featureConf}/new-product`,
    path: '/new-product',
    component: CreateProductPage,
    exact: true,
  },  {
    key: `${featureConf}/edit-product`,
    path: '/edit-product/:id',
    component: EditProductPage,
    exact: true,
  },

];
