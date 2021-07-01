import React from 'react';      //карточки в каталоге (PRODUCTS)
//import { useQuery } from "react-query";//
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';
//import CircularProgress from "@material-ui/core/CircularProgress";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
//import format from 'date-fns/format'
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
//import { connect } from 'react-redux';
import { addToCart } from '../../../cart/ducks/cartActions';
//import { CategoryData } from "../../utils/CategoryData";

//import { getCategoriesList } from "../../api/CategoriesAPI";

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

  //const { data, isLoading, error } = CategoryData();
  const classes = useStyles();

    /*const { data, isLoading, error  } = useQuery('category', async () => { // нифига не доступно в компоненте
      let { data } = await getCategoriesList();
      return data;
    });*/

  /*const date = format(new Date(createdAt), "dd.MM.yyyy"),
    time = format(new Date(createdAt), "HH:mm");*/

  const deleteMutation = useDeleteProduct();

  const handleClick = (id) => {
    addToCart({ id, title, description, photo, price, isNew, isSale, isInStock, categories, rating, createdAt });
  }

  /*const categoryTransformation = (category) => {
    console.log(category);
    let cat = data.find(x => x.id === `${category}`).name;
    return cat.replace(/"/g);
  }*/
  //console.log(data);
/*  const handleDelete = () => {
    deleteMutation.mutate(id);
  };*/

  return (
    <Card className={classes.root}>
      <CardContent>
        {/*<Typography className={classes.date} color="textSecondary" gutterBottom>                  categoryTransformation()
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
        {/*<Button disabled={deleteMutation.isLoading} size="small" variant="outlined" component={Link} color="primary" to={`/edit-product/${id}`}>Edit</Button>
        <Button disabled={deleteMutation.isLoading} size="small" variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>
        закомменченное для корректировки даты, она каличная*/}
        <Button to="/cart" onClick={()=>{handleClick(id)}} disabled={!isInStock} size="small" variant="outlined" color="primary">In cart</Button>
      </CardActions>
    </Card>
  );
}
/*
const mapStateToProps = (state)=>{
  return {
    items: state.items
  }
}
const mapDispatchToProps= (dispatch)=>{
  return{
    addToCart: (id)=>{dispatch(addToCart(id))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductsListEl);*/
