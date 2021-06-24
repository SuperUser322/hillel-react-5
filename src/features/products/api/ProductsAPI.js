import { axiosInstance } from "../../../services/axios";

export function getList() {
  return axiosInstance.get('/Products');
}

export function get(id) {
  return axiosInstance.get(`/Products/${id}`);
}

export function create({
  title = 'Test title',
  description = 'Test body',
  price = '100.00',
  photo = 'http://blablabla.com',
  isNew = true,
  isSale = true,
  isInStock = true,
  categories = [],
  rating = '50',
 }) {
  return axiosInstance.post(`/Products`, {
    title,
    description,
    price,
    photo,
    isNew,
    isSale,
    isInStock,
    categories,
    rating,
  });
}

export function update(id, {
  title = 'Test title',
  description = 'Test body',
  price = '100.00',
  photo = 'http://blablabla.com',
  isNew = true,
  isSale = true,
  isInStock = true,
  categories = [],
  rating = '50',
  }) {
    return axiosInstance.put(`/Products/${id}`, {
      title,
      description,
      price,
      photo,
      isNew,
      isSale,
      isInStock,
      categories,
      rating,
    });
}

export function remove(id) {
  return axiosInstance.delete(`/Products/${id}`);
}
