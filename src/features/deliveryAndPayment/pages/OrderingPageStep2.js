import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
//import { NavLink } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Grid, Box, Typography, Button, Card, CardContent } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { NavLink, useLocation } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import * as productsDuck from '../../products/ducks/products.duck';
import * as SettingsDuck from '../../cart/ducks/settings.duck';

//import { OrderingStep2 } from "../components/OrderingStep2/OrderingStep2";<OrderingStep2 />

const useStyles = makeStyles(theme => ({
  root: {
    width: 200,
    margin: 5,
  },
  textAreaField: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    padding: 2,
  },
  countrySelect: {
    width: 190,
    margin: 5,
  },
  customMargin: {
    margin: 7,
  },
  table: {
    minWidth: 450,
  },
  card: {
    minWidth: 450,
  },
}));

export const OrderingPageStep2 = (props) => {
  const classes = useStyles();
  const items = useSelector(SettingsDuck.selectItems);
  const dispatch = useDispatch();
  let order = null;
  let productsData = useSelector(productsDuck.selectData);
  let productsError = useSelector(productsDuck.selectError);
  let productsIsLoading = useSelector(productsDuck.selectIsLoading);

  useEffect(() => {
    dispatch(productsDuck.load());
  }, [dispatch]);

  let location = useLocation();
  location.state !== undefined && ({ order } = location.state);

  const forTotalPrice = () => {
    let total = 0;
    items.map(item =>
      total = total + (productsData[item.id-1].price*item.quantity)
    );
    return total;
  }

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Box>
          <Typography variant="h5">Step 2</Typography>
        </Box>

        <Box className={classes.customMargin}>
          <TableContainer component={Paper}>
            {productsIsLoading ? (
              <Box pt={10} pb={10} display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : productsError ? (
              <Typography variant="h4" color="secondary">{productsError.message}</Typography>
            ) : (
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { productsData !== null && items.map(item => (
                    <TableRow key={productsData[item.id-1].title}>
                      <TableCell component="th" scope="row">
                        {productsData[item.id-1].title}
                      </TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{productsData[item.id-1].price*item.quantity}</TableCell>
                    </TableRow>
                  )).reverse()}
                </TableBody>
              </Table>
            )}
            <Typography align="right" className={classes.customMargin}>Total price: {forTotalPrice()} $</Typography>
          </TableContainer>
        </Box>

        <Card className={classes.card}>
          <CardContent>
            {location.state !== undefined ? (
            <Box>
              <Typography>Order info</Typography>
              <Typography>FirstName: {order.firstName}</Typography>
              <Typography>LastName: {order.lastName}</Typography>
              <Typography>Country: {order.country}</Typography>
              <Typography>Phone: {order.phone}</Typography>
              <Typography>City: {order.city}</Typography>
              <Typography>Address: {order.address}</Typography>
              {order.address2 !== '' && (<Typography>Address 2: {order.address2}</Typography>)}
              <Typography>email: {order.email}</Typography>
              <Typography>Delivery type: {order.deliveryType}</Typography>
              <Typography>Dont call me: {order.dontCallMe ? 'true' : 'false'}</Typography>
              {order.comment !== '' && (<Typography>comment: {order.comment}</Typography>)}
            </Box>
            ) :
              (<Typography>Make an order first please!</Typography>)
            }
          </CardContent>
        </Card>

        <Box>
          {location.state !== undefined ? (
            <Button className={classes.customMargin} size="small" variant="contained" color="primary"
            component={NavLink} to={{ pathname: "/deliveryAndPayment", state: location.state }} >Prev</Button>)
           : (
             <Button className={classes.customMargin} size="small" variant="contained" color="primary"
             component={NavLink} to="/deliveryAndPayment" >Prev</Button>
           )}
          <Button className={classes.customMargin} size="small" variant="contained" color="primary" component={NavLink} to="/orderingPageStep3" >Next</Button>
        </Box>
      </Grid>
    </>
  );
}
