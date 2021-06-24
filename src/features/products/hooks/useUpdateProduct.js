import { useMutation, useQueryClient } from "react-query";
import { update } from "../api/ProductsAPI";

export function useUpdateProduct(cb = () => {}) {
  const queryClient = useQueryClient();
  return useMutation(({ id, values: { title, description, price, photo, isNew, isSale, isInStock, categories, rating }}) => {
    return update(id, {
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
    onSuccess: (data, variables) => {
      cb();
      queryClient.invalidateQueries('products');
      queryClient.invalidateQueries(['products', variables.id]);
    },
  })
}
