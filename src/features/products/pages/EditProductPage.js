import React from 'react';
//import PropTypes from 'prop-types';

import { useHistory } from "react-router-dom";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { ProductForm } from "../components/ProductForm";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { get } from "../api/ProductsAPI";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

export function EditProductPage() {
  const { id } = useParams();
  const history = useHistory();
  const updateMutation = useUpdateProduct(() => {
    history.push(`/products/${id}`);
  });

  const { data, isLoading, error } = useQuery(['products', id], async () => {
    let { data } = await get(id);
    return data;
  });

  const handleSubmit = (values) => {
    updateMutation.mutate({ id, values });
  };

  return (
    <Box>
      {isLoading ? (
        <Box pt={10} pb={10} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="h4" color="secondary">{error.message}</Typography>
      ) : (
        <Box>
          <ProductForm
            editProduct={data}
            onSubmit={handleSubmit}
            isSubmitting={updateMutation.isLoading} />
        </Box>
      )}
    </Box>
  );
}

//EditProductPage.propTypes = {};
