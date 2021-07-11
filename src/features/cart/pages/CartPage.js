import React,{ useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import * as SettingsDuck from '../ducks/settings.duck';
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { NavLink } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import * as productsDuck from '../../products/ducks/products.duck';

const useStyles = makeStyles({
  cardRoot: {
    width: 550,
    padding: 15,
  },
  smallText: {
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
  media: {
    width: 200,
    height: 200,
  }
});

export const CartPage = () => {
  const classes = useStyles();
//to remove the item completely
  const items = useSelector(SettingsDuck.selectItems);
  const dispatch = useDispatch();

  let productsData = useSelector(productsDuck.selectData);
  let productsError = useSelector(productsDuck.selectError);
  let productsIsLoading = useSelector(productsDuck.selectIsLoading);
  //console.log(productsData);
  console.log('-----------------', {
    items,
    //dispatch,
  });

  useEffect(() => {
    dispatch(productsDuck.load());
  }, [dispatch]);

  const updateItem = (id, values) => {
    dispatch(SettingsDuck.updateItem(id, values));
  };

  const deleteItem = (id) => {
    dispatch(SettingsDuck.removeItem(id));
  };

  const forTotalQuantity = () => {
    let total=0;
    items.map(item =>
      total = total + item.quantity
    );
    return total;
  };

  const forTotalPrice = () => {
    let total = 0;
    items.map(item =>
      total = total + (item.price*item.quantity)
    );
    return total;
  }


  return (
    <>
      <Typography variant="h4">Cart:</Typography>
      <Box py={2}>
        <Grid container spacing={3}>
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
                { productsData !== null && items.map(item => (
                  <Grid item key={item.id} xs={12} sm={8} md={6}>
                  {console.log(productsData[item.id-1].title)}
                    <Card className={classes.cardRoot}>
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid container>
                            <CardMedia
                              className={classes.media}
                              image={productsData[item.id-1].photo}
                              title={productsData[item.id-1].title}
                            />
                            <Box m={2} mr={3}>
                              <Typography className={classes.title} variant="h6" component="h2">
                               {productsData[item.id-1].title}
                              </Typography>
                              <Typography variant="body2" component="p">
                                Quantity: {item.quantity}
                              </Typography>
                              <Typography variant="body2" component="p">
                                Price: {productsData[item.id-1].price*item.quantity} $
                              </Typography>
                            </Box>
                            <CardActions>
                              <Button onClick={() => deleteItem(item.id)} size="small" variant="outlined" color="secondary" >Delete item</Button>
                              <Button onClick={() => updateItem(item.id, { quantity: item.quantity+1 })} size="small" variant="outlined" color="primary">Increase quantity</Button>
                              <Button onClick={() => updateItem(item.id, { quantity: (item.quantity === 1) ? deleteItem(item.id) : item.quantity-1 })} size="small" variant="outlined" color="primary">Decrease quantity</Button>
                            </CardActions>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                )).reverse()}
              </Grid>
            </Box>
          </Box>
        )}
        </Grid>
      </Box>
      <Box>
        <Typography>Total quantity: {forTotalQuantity()}</Typography>
        <Typography>Total price: {forTotalPrice()} $</Typography>
        <Button size="small" variant="outlined" color="primary" component={NavLink} to="/deliveryAndPayment" disabled={items.length===0} >checkout your order</Button>
      </Box>
    </>
  );
}
