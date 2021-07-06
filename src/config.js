export const ROUTER_TYPE_BROWSER = 'browser';
export const ROUTER_TYPE_HASH = 'hash';

export const isProd = process.env.NODE_ENV === 'production';

export const appConf = {
  name: 'appName', // todo change this
  isProd,
  router: {
    type: isProd ? ROUTER_TYPE_BROWSER : ROUTER_TYPE_HASH,
  },
  api: {
    baseURL: "https://60e4720a5bcbca001749e9e1.mockapi.io", // todo change this  https://60d3050d858b410017b2eb83.mockapi.io //https://react-js-course-05-05-2021-bkd.herokuapp.com/
  },
};
