import { AboutUsPage } from './pages/AboutUsPage';
import { featureConf } from "./config";

export const routes = [
  {
    key: `${featureConf}/aboutUs`,
    path: '/',
    component: AboutUsPage,
    exact: true,
  },
];
