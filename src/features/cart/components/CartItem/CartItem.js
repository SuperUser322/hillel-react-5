/*import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
//import { addDelivery } from '../ducks/cartActions'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import * as SettingsDuck from '../../ducks/settings.duck';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

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

export const CartItem = ({ id, title, photo, price, createdAt, quantity }) => {
  console.log({ id, title, photo, price, createdAt, quantity })
  const classes = useStyles();
  //console.log(props);
    const items = useSelector(SettingsDuck.selectItems);
    const dispatch = useDispatch();

    const updateItem = (id, values) => {
      dispatch(SettingsDuck.updateItem(id, values));
    };

    const deleteItem = (id) => {
      dispatch(SettingsDuck.removeItem(id));
    };


    return(
      <Card className={classes.cardRoot}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid container>
              <CardMedia
                className={classes.media}
                image={photo}
                title={title}
              />
              <Box m={2} mr={3}>
                <Typography className={classes.title} variant="h6" component="h2">
                 {title}
                </Typography>
                <Typography variant="body2" component="p">
                  Quantity: {quantity}
                </Typography>
                <Typography variant="body2" component="p">
                  Price: {price*quantity} $
                </Typography>
              </Box>
              <CardActions>
                <Button onClick={() => deleteItem(id)} size="small" variant="outlined" color="secondary" >Delete item</Button>
                <Button onClick={() => updateItem(id, { quantity: item.quantity+1 })} size="small" variant="outlined" color="primary">Increase quantity</Button>
                <Button onClick={() => updateItem(id, { quantity: (item.quantity === 1) ? deleteItem(item.id) : item.quantity-1 })} size="small" variant="outlined" color="primary">Decrease quantity</Button>
              </CardActions>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
}*/
