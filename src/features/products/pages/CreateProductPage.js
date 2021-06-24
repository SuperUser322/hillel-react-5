import React from 'react';
//import PropTypes from 'prop-types';

import { ProductForm } from "../components/ProductForm";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useHistory } from "react-router-dom";

export function CreateProductPage() {
  const history = useHistory();
  const createMutation = useCreateProduct(() => {
    history.push("/products");
  });

  return (
    <ProductForm onSubmit={createMutation.mutate} isSubmitting={createMutation.isLoading} />
  );
}

//CreateProductPage.propTypes = {};
