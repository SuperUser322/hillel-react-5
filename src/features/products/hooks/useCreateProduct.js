import { useMutation, useQueryClient } from "react-query";
import { create } from "../api/ProductsAPI";

export function useCreateProduct(cb = () => {}) {
  const queryClient = useQueryClient();
  return useMutation(({ title, description, price, photo, isNew, isSale, isInStock, categories, rating, }) => {
    return create({
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
  }, {
    onSuccess: () => {
      cb();
      queryClient.invalidateQueries('products');
    },
  })
}
