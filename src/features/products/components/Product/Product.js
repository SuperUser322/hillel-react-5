import React from 'react';      //развернутый вид продукта VIEW
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import format from "date-fns/format";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CardActions from "@material-ui/core/CardActions";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { useHistory } from "react-router-dom";
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

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

  const history = useHistory();

  const classes = useStyles();

  const deleteMutation = useDeleteProduct(() => {
    history.push("/products");
  });

  const handleDelete = () => {
    deleteMutation.mutate(id);
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
          {categories?.map(category => (
            <Typography variant="body2" key={category} >{category}</Typography>
          ))}
        </Box>
        <Typography variant="body2"><span className={classes.star}> &#9733;</span>{rating}</Typography>
      </Box>
      <Box my={2}>
        <CardActions>
          <Button size="small" disabled={deleteMutation.isLoading} variant="outlined" component={Link} color="primary" to={`/edit-product/${id}`}>Edit</Button>
          <Button size="small" disabled={deleteMutation.isLoading} variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>
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
