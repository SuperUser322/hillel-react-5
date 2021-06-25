import React, { useState } from 'react';      // фильтр походу сюда (по product.(и на выбор что там есть))
//import PropTypes from 'prop-types';
import { useQuery } from "react-query";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getList } from "../api/ProductsAPI";
//import { getCategoriesList } from "../api/CategoriesAPI";
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
  /*const { categoryData, isCategoryLoading, categoryError } = useQuery('category', async () => { // нифига не доступно в компоненте
    let { data } = await getCategoriesList(),
    categoriesList = data;
    return categoriesList;
  });*/

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
    }),
    [isCategoryValues, setIsCategoryValues] = useState({
      Ergonomic: false,
      Unbranded: false,
      Intelligent: false,
      Fantastic: false,
      Gorgeous: false,
      Rustic: false,
      Handmade: false,
      Refined: false,
      Small: false,
      Incredible: false,
      Practical: false,
      Generic: false,
      Sleek: false,
      Licensed: false,
      Awesome: false,
      Handcrafted: false,
    });

  const catalogFilter = (product) => {
    let findTitle = findValue,
      minPrice = priceValue[0], maxPrice = priceValue[1],
      minRating = ratingValue[0], maxRating = ratingValue[1],
      newCheck = isNewSaleStockValues.new,
      saleCheck = isNewSaleStockValues.sale,
      inStockCheck = isNewSaleStockValues.inStock,

      ErgonomicCheck = isCategoryValues.Ergonomic,//1
      /*UnbrandedCheck = isCategoryValues.Unbranded,//2
      IntelligentCheck = isCategoryValues.Intelligent,//3
      FantasticCheck = isCategoryValues.Fantastic,//4
      GorgeousCheck = isCategoryValues.GorgeousCheck,//5
      RusticCheck = isCategoryValues.RusticCheck,//7
      HandmadeCheck = isCategoryValues.HandmadeCheck,//8
      RefinedCheck = isCategoryValues.RefinedCheck,//10
      SmallCheck = isCategoryValues.SmallCheck,//12
      IncredibleCheck = isCategoryValues.IncredibleCheck,//14
      PracticalCheck = isCategoryValues.PracticalCheck,//17
      GenericCheck = isCategoryValues.GenericCheck,//18
      SleekCheck = isCategoryValues.SleekCheck,//21
      LicensedCheck = isCategoryValues.LicensedCheck,//22
      AwesomeCheck = isCategoryValues.AwesomeCheck,//32
      HandcraftedCheck = isCategoryValues.HandcraftedCheck,//33*/
      {title, price, rating, isNew, isSale, isInStock, categories} = product;    //categories

      return (findTitle !== '' || findTitle === '') ?
        ((title.includes(findTitle) || title.includes(findTitle[0].toUpperCase() + findTitle.slice(1))) ?
        ((price >= minPrice && price <= maxPrice) &&
        ((rating >= minRating && rating <= maxRating) &&
        ((isNew === newCheck || newCheck === false) &&
        ((isSale === saleCheck || saleCheck === false) &&
        ((isInStock === inStockCheck || inStockCheck === false) &&
        ((categories.includes('1') || ErgonomicCheck === false) && true
        )))))) : false): true;

       /*return (categories.includes('1') || ErgonomicCheck === false) ?
          ((categories.includes('2') || UnbrandedCheck === false) &&
          ((categories.includes('3') || IntelligentCheck === false) &&
          ((categories.includes('4') || FantasticCheck === false) &&
          ((categories.includes('5') || GorgeousCheck === false) &&
          ((categories.includes('7') || RusticCheck === false) &&
          ((categories.includes('8') || HandmadeCheck === false) &&
          ((categories.includes('10') || RefinedCheck === false) &&
          ((categories.includes('12') || SmallCheck === false) &&
          ((categories.includes('14') || IncredibleCheck === false) &&
          ((categories.includes('17') || PracticalCheck === false) &&
          ((categories.includes('18') || GenericCheck === false) &&
          ((categories.includes('21') || SleekCheck === false) &&
          ((categories.includes('22') || LicensedCheck === false) &&
          ((categories.includes('32') || AwesomeCheck === false) &&
          ((categories.includes('33') || HandcraftedCheck === false) && true
        )))))))))))))))
         : false;*/

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
              <Box className={classes.root}>
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Ergonomic} onChange={handleCategoryChange} name="Ergonomic" color="primary" />}
                  label="Ergonomic"
                />
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Unbranded} onChange={handleCategoryChange} name="Unbranded" color="primary" />}
                  label="Unbranded"
                />
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Intelligent} onChange={handleCategoryChange} name="Intelligent" color="primary" />}
                  label="Intelligent"
                />
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Fantastic} onChange={handleCategoryChange} name="Fantastic" color="primary" />}
                  label="Fantastic"
                />
              </Box>
              <Box className={classes.root}>
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Gorgeous} onChange={handleCategoryChange} name="Gorgeous" color="primary" />}
                  label="Gorgeous"
                />
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Rustic} onChange={handleCategoryChange} name="Rustic" color="primary" />}
                  label="Rustic"
                />
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Handmade} onChange={handleCategoryChange} name="Handmade" color="primary" />}
                  label="Handmade"
                />
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Refined} onChange={handleCategoryChange} name="Refined" color="primary" />}
                  label="Refined"
                />
              </Box>
              <Box className={classes.root}>
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Small} onChange={handleCategoryChange} name="Small" color="primary" />}
                  label="Small"
                />
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Incredible} onChange={handleCategoryChange} name="Incredible" color="primary" />}
                  label="Incredible"
                />
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Practical} onChange={handleCategoryChange} name="Practical" color="primary" />}
                  label="Practical"
                />
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Generic} onChange={handleCategoryChange} name="Generic" color="primary" />}
                  label="Generic"
                />
              </Box>
              <Box className={classes.root}>
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Sleek} onChange={handleCategoryChange} name="Sleek" color="primary" />}
                  label="Sleek"
                />
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Licensed} onChange={handleCategoryChange} name="Licensed" color="primary" />}
                  label="Licensed"
                />
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Awesome} onChange={handleCategoryChange} name="Awesome" color="primary" />}
                  label="Awesome"
                />
                <FormControlLabel
                  control={<Switch checked={isCategoryValues.Handcrafted} onChange={handleCategoryChange} name="Handcrafted" color="primary" />}
                  label="Handcrafted"
                />
              </Box>
            </FormGroup>
          </FormControl>
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
