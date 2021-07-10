import React,{ useState, useEffect } from 'react';      //развернутый вид продукта VIEW
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import format from "date-fns/format";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CardActions from "@material-ui/core/CardActions";
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector, useDispatch } from "react-redux";
import * as SettingsDuck from '../../../cart/ducks/settings.duck';

import * as categoriesDuck from '../../ducks/categories.duck';

import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  media: {
    maxWidth: 640,
    height: 480,
  },
  star: {
    color: '#fdd835',
  }
}));

export function Product({ id, title, description, price, photo, isNew, isSale, isInStock, categories, rating, createdAt }) {
  const date = format(new Date(createdAt), "dd.MM.yyyy"),
    time = format(new Date(createdAt), "HH:mm");

  const classes = useStyles();
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

  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body2"> Posted {date} at {time}</Typography>
      <Box my={2}>
        <Typography variant="body2">{description}</Typography>
        <Typography variant="body2">Price: {price} $</Typography>
        <Box my={1}>
          <CardMedia
            className={classes.media}
            image={photo}
            title={title}
          />
        </Box>
        <Typography variant="body2">New product: {isNew === true ? `yes` : `no`}</Typography>
        <Typography variant="body2">Is it sale: {isSale === true ? `yes` : `no`}</Typography>
        <Typography variant="body2">Is it in stock: {isInStock === true ? `yes` : `no`}</Typography>
        <Box variant="body2"><span>Categories: </span>
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
        <Typography variant="body2"><span className={classes.star}> &#9733;</span>{rating}</Typography>
      </Box>
      <Box my={2}>
        <CardActions>
          <Button to="/cart" onClick={() => addItem({ id: id, title: title, photo: photo, price: price, })} disabled={isDisabled(id, isInStock)} size="small" variant="outlined" color="primary">{controlReason(isInStock)}</Button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
              Product {title} was added to the cart!
            </MuiAlert>
          </Snackbar>
          {/*<Button size="small" disabled={deleteMutation.isLoading} variant="outlined" component={Link} color="primary" to={`/edit-product/${id}`}>Edit</Button>
          <Button size="small" disabled={deleteMutation.isLoading} variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>*/}
        </CardActions>
      </Box>
    </Box>
  );
}

Product.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  createdAt: PropTypes.string,
};
