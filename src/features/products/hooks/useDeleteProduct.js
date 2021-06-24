import { useMutation, useQueryClient } from "react-query";
import { remove } from "../api/ProductsAPI";

export function useDeleteProduct(cb = () => {}) {
  const queryClient = useQueryClient();
  return useMutation((id) => {
    return remove(id);
  }, {
    onSuccess: () => {
      cb();
      queryClient.invalidateQueries('posts');
    },
  })
}
