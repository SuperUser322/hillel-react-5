import React from 'react';      //карточки в каталоге (PRODUCTS)
import PropTypes from 'prop-types';
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
//import format from 'date-fns/format'
import { useDeleteProduct } from "../../hooks/useDeleteProduct";

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
  /*const date = format(new Date(createdAt), "dd.MM.yyyy"),
    time = format(new Date(createdAt), "HH:mm");*/

  const deleteMutation = useDeleteProduct();

  const handleDelete = () => {
    deleteMutation.mutate(id);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        {/*<Typography className={classes.date} color="textSecondary" gutterBottom>
          Posted {date} at {time}
        </Typography>*/}
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
          {categories?.map(category => (
            <Typography variant="body2" key={category}><span>{category}</span>
            </Typography>
          ))}
        </Box>
        <span><span className={classes.star}> &#9733;</span>{rating}</span>
      </CardContent>
      <CardActions>
        <Button disabled={deleteMutation.isLoading} size="small" variant="outlined" component={Link} color="default" to={`/products/${id}`}>View</Button>
        <Button disabled={deleteMutation.isLoading} size="small" variant="outlined" component={Link} color="primary" to={`/edit-product/${id}`}>Edit</Button>
        <Button disabled={deleteMutation.isLoading} size="small" variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>
        <Button disabled={isSale} size="small" variant="outlined" color="primary">In basket</Button>
      </CardActions>
    </Card>
  );
}

ProductsListEl.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  createdAt: PropTypes.string,
};
