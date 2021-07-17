import React, { useState, useEffect } from 'react';
//import { useQuery } from "react-query";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
//import { getList } from "../api/ProductsAPI";
import Typography from "@material-ui/core/Typography";
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
import { productsFilter } from "./productsFilter";
import * as categoriesDuck from '../ducks/categories.duck';
import * as productsDuck from '../ducks/products.duck';
import { useSelector, useDispatch } from "react-redux";


function valuetext(value) {
  return `${value}$`;
}

const priceMarks = [
  {
    value: 0,
    label: '0$',
  },
  {
    value: 250,
    label: '250$',
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
  const dispatch = useDispatch();

  /*const { data, isLoading, error } = useQuery('products', async () => {
    const { data } = await getList();
    return data;
  });*/

  let productsData = useSelector(productsDuck.selectData);
  let productsError = useSelector(productsDuck.selectError);
  let productsIsLoading = useSelector(productsDuck.selectIsLoading);

  let categoryData = useSelector(categoriesDuck.selectData);
  let categoryError = useSelector(categoriesDuck.selectError);
  let categoryIsLoading = useSelector(categoriesDuck.selectIsLoading);

  useEffect(() => {
    dispatch(categoriesDuck.load());
    dispatch(productsDuck.load());
  }, [dispatch]);

  const [findValue, setFindValue] = useState(''),
    [priceValue, setPriceValue] = useState([100, 600]),
    [ratingValue, setRatingValue] = useState([0, 100]),
    [isNewSaleStockValues, setIsNewSaleStockValues] = useState({
      new: false,
      sale: false,
      inStock: false,
    }),
    [isCategoryValues, setIsCategoryValues] = useState({
      Ergonomic: true,
      Unbranded: true,
      Intelligent: true,
      Fantastic: true,
      Gorgeous: true,
      Rustic: true,
      Handmade: true,
      Refined: true,
      Small: true,
      Incredible: true,
      Practical: true,
      Generic: true,
      Sleek: true,
      Licensed: true,
      Awesome: true,
      Handcrafted: true,
    });

  const catalogFilter = (product) => {
    let {title, price, rating, isNew, isSale, isInStock, categories} = product;

    return productsFilter(findValue, priceValue, ratingValue,
      isNewSaleStockValues, isCategoryValues,
      title, price, rating, isNew, isSale, isInStock, categories/*,
      categoryData*/
    );
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

  const handleCategoryChange = (e) => {
    setIsCategoryValues({...isCategoryValues, [e.target.name]: e.target.checked});
  }

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
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <Box className={classes.root}>
                <Typography gutterBottom>
                  Categories:
                </Typography>
              </Box>
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  {categoryIsLoading ? (
                    <Box pt={10} pb={10} display="flex" justifyContent="center">
                      <CircularProgress />
                    </Box>
                  ) : categoryError ? (
                    <Typography variant="h4" color="secondary">{categoryError.message}</Typography>
                  ) : (
                    categoryData?.map(category => (
                      <FormControlLabel key={category.id}
                        control={<Switch checked={isCategoryValues.[category.name]} onChange={handleCategoryChange} name={category.name} color="primary" />}
                        label={category.name}
                      />
                    ))
                  )}
                </FormGroup>
              </FormControl>
            </FormGroup>
          </FormControl>
        </FormGroup>
      </FormControl>
      {productsIsLoading ? (
        <Box pt={10} pb={10} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : productsError ? (
        <Typography variant="h4" color="secondary">{productsError.message}</Typography>
      ) : (
        <Box>
          <Typography variant="h4">Latest products:</Typography>
          <Box py={2}>
            <Grid container spacing={3}>
              { productsData !== null && productsData?.map(product =>(catalogFilter(product) &&
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
