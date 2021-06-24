import React from 'react';      // фильтр походу сюда (по product.(и на выбор что там есть))
//import PropTypes from 'prop-types';
import { useQuery } from "react-query";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getList } from "../api/ProductsAPI";
import Typography from "@material-ui/core/Typography";
//import { createStyles } from "@material-ui/core";
import { ProductsListEl } from "../components/ProductsListEl";
import Grid from '@material-ui/core/Grid';

export function ProductsPage() {
  const { data, isLoading, error } = useQuery('products', async () => {
    let { data } = await getList();
    return data;
  });

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
          <Typography variant="h4">Latest products:</Typography>
          <Box py={2}>
            <Grid container spacing={3}>
              {data?.map(product => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <ProductsListEl
                    {...product}
                  />
                </Grid>
              )).reverse()}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
}

//ProductsPage.propTypes = {};
