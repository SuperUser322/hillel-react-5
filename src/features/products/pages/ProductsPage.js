import React, { useState } from 'react';      // фильтр походу сюда (по product.(и на выбор что там есть))
//import PropTypes from 'prop-types';
import { useQuery } from "react-query";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getList } from "../api/ProductsAPI";
import Typography from "@material-ui/core/Typography";
//import { createStyles } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { ProductsListEl } from "../components/ProductsListEl";
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

function valuetext(value) {
  return `${value}$`;
}

const priceMarks = [
  {
    value: 0,
    label: '0$',
  },
  {
    value: 200,
    label: '200$',
  },
  {
    value: 500,
    label: '500$',
  },
  {
    value: 750,
    label: '750$',
  },
  {
    value: 1000,
    label: '1000$',
  },
];

const ratingMarks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 100,
    label: '100',
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    width: 250,
    padding: 15,
  },
}));

export function ProductsPage() {
  const classes = useStyles();
  const { data, isLoading, error } = useQuery('products', async () => {
    let { data } = await getList();
    return data;
  });

  const [findValue, setFindValue] = useState(''),
    [priceValue, setPriceValue] = useState([0, 1000]),
    [ratingValue, setRatingValue] = useState([0, 100]),
    [isNewSaleStockValues, setIsNewSaleStockValues] = useState({
      new: false,
      sale: false,
      inStock: false,
    });

  const catalogFilter = (product) => {
    let findTitle = findValue,
      minPrice = priceValue[0], maxPrice = priceValue[1],
      minRating = ratingValue[0], maxRating = ratingValue[1],
      newCheck = isNewSaleStockValues.new,
      saleCheck = isNewSaleStockValues.sale,
      inStockCheck = isNewSaleStockValues.inStock,
      {title, price, rating, isNew, isSale, isInStock} = product;     //categories

      return (findTitle !== '' || findTitle === '') ?
        ((title.includes(findTitle) || title.includes(findTitle[0].toUpperCase() + findTitle.slice(1))) ?
          ((price >= minPrice && price <= maxPrice) &&
          ((rating >= minRating && rating <= maxRating) &&
          ((isNew === newCheck || newCheck === false) &&
          ((isSale === saleCheck || saleCheck === false) &&
          ((isInStock === inStockCheck || inStockCheck === false) && true))))) : false )
       : true;
  }

  const handleFindField = (e) => {
    let newValue = e.target.value;
    setFindValue(newValue);
  }

  const handlePriceChange = (e, newValue) => {
    setPriceValue(newValue);
  };

  const handleRatingChange = (e, newValue) => {
    setRatingValue(newValue);
  };

  const handleCheckboxesChange = (e) => {
    setIsNewSaleStockValues({ ...isNewSaleStockValues, [e.target.name]: e.target.checked });
  };

  return (
    <Box>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <Box className={classes.root}>
            <InputLabel htmlFor="title-input">Title filter: </InputLabel>
            <Input id="title-input" value={findValue} onChange={handleFindField} />
          </Box>
          <Box className={classes.root}>
            <Typography id="price-range" gutterBottom>
              Price:
            </Typography>
            <Slider
              value={priceValue}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              aria-labelledby="price-range"
              getAriaValueText={valuetext}
              marks={priceMarks}
              min={0}
              max={1000}
            />
          </Box>
          <Box className={classes.root}>
            <Typography id="rating-range" gutterBottom>
              Rating:
            </Typography>
            <Slider
              value={ratingValue}
              onChange={handleRatingChange}
              valueLabelDisplay="auto"
              aria-labelledby="rating-range"
              getAriaValueText={valuetext}
              marks={ratingMarks}
              min={0}
              max={100}
            />
          </Box>
          <Box className={classes.root}>
            <FormControlLabel
              control={<Switch checked={isNewSaleStockValues.new} onChange={handleCheckboxesChange} name="new" color="primary" />}
              label="New"
            />
            <FormControlLabel
              control={<Switch checked={isNewSaleStockValues.sale} onChange={handleCheckboxesChange} name="sale" color="primary" />}
              label="Is Sale"
            />
            <FormControlLabel
              control={<Switch checked={isNewSaleStockValues.inStock} onChange={handleCheckboxesChange} name="inStock" color="primary" />}
              label="Is in stock"
            />
          </Box>
        </FormGroup>
      </FormControl>
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
              {data?.map(product =>(
                 catalogFilter(product) &&
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
