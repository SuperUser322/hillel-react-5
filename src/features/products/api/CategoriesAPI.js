import { axiosInstance } from "../../../services/axios";

export function getCategoriesList() {
  return axiosInstance.get('/category');
}

export function getCategory(id) {
  return axiosInstance.get(`/category/${id}`);
}
