import React, { useState, useEffect } from 'react';      //карточки в каталоге (PRODUCTS)
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
//import { connect } from 'react-redux';
import * as categoriesDuck from '../../ducks/categories.duck';
//import { addToCart } from '../../../cart/ducks/cartActions';
//import { CategoryData } from "../../utils/CategoryData";

//import { getCategoriesList } from "../../api/CategoriesAPI";
import { useSelector, useDispatch } from "react-redux";
import * as SettingsDuck from '../../../cart/ducks/settings.duck';

const useStyles = makeStyles({
  root: {

  },
  date: {
    fontSize: 14,
  },
  title: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  body: {
    height: 100,
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  star: {
    color: '#fdd835',
  },
  media: {
    width: 200,
    height: 200,
  }
});

export function ProductsListEl({ id, title, description, photo, price, isNew, isSale, isInStock, categories, rating, createdAt }) {
  const classes = useStyles();
  const deleteMutation = useDeleteProduct();
  const items = useSelector(SettingsDuck.selectItems);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  let categoryData = useSelector(categoriesDuck.selectData);
  let categoryError = useSelector(categoriesDuck.selectError);
  let categoryIsLoading = useSelector(categoriesDuck.selectIsLoading);
  useEffect(() => {
      dispatch(categoriesDuck.load());
    }, [dispatch]);

  const addItem = ({  id, title, photo, price }) => {
    dispatch(SettingsDuck.addItem({
      id,
      title,
      photo,
      price,
      quantity: 1,
    }));
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const controlReason = (isInStock) => {
    let checkItem = items.find(x => x.id === `${id}`) ? true : false;
    return isInStock ? ((!checkItem) ? "In cart" : "Already in cart") : "Out of stock";
  };

  const isDisabled = (id, isInStock) => {
    let checkItem = items.find(x => x.id === `${id}`) ? true : false;
    return (!isInStock) === (!checkItem);
  };

  const categoriesTransform = (categoryNumber) => {
    return (categoryNumber !== null) ? categoryData[categoryNumber-1].name : null;
  };

////////////////////////////////////////////////////////////////////////////// это всё бред, потому что категорий всего 16, а id в районе от 1 до 33 в дате категорий
  /*const categoryTransformation = (category) => {
    console.log(category);
    let cat = data.find(x => x.id === `${category}`).name;
    return cat.replace(/"/g);
  }*/

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h6" component="h2">
         {title}
        </Typography>
        <Typography variant="body2">Description: {description}</Typography>
        <Typography variant="body2" component="p">
          Price: {price} $
        </Typography>
        <Box my={1}>
          <CardMedia
            className={classes.media}
            image={photo}
            title={title}
          />
        </Box>
        <Typography variant="body2" component="p">New product: {isNew === true ? `yes` : `no`}</Typography>
        <Typography variant="body2">Is it sale: {isSale === true ? `yes` : `no`}</Typography>
        <Typography variant="body2">Is it in stock: {isInStock === true ? `yes` : `no`}</Typography>
        <Box variant="body2">Categories:
          {categoryIsLoading ? (
            <Box pt={10} pb={10} display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : categoryError ? (
            <Typography variant="h4" color="secondary">{categoryError.message}</Typography>
          ) : (categoryData &&
            categories?.map(category => (
              <Typography variant="body2" key={category}><span>{categoriesTransform(category)}</span>
              </Typography>
            ))
          )}
        </Box>
        <span><span className={classes.star}> &#9733;</span>{rating}</span>
      </CardContent>
      <CardActions>
        <Button disabled={deleteMutation.isLoading} size="small" variant="outlined" component={Link} color="default" to={`/products/${id}`}>View</Button>
        {/*<Button disabled={deleteMutation.isLoading} size="small" variant="outlined" component={Link} color="primary" to={`/edit-product/${id}`}>Edit</Button>
        <Button disabled={deleteMutation.isLoading} size="small" variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>
        закомменченное для корректировки даты, она каличная*/}
        <Button to="/cart" onClick={() => addItem({ id: id, title: title, photo: photo, price: price, })} disabled={isDisabled(id, isInStock)} size="small" variant="outlined" color="primary">{controlReason(isInStock)}</Button>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
            Product {title} was added to the cart!
          </MuiAlert>
        </Snackbar>
      </CardActions>
    </Card>
  );
}
