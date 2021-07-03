import React, { Fragment } from 'react';      // менюха сверху
//import PropTypes from 'prop-types';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import EcoIcon from '@material-ui/icons/Eco';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { useSelector } from "react-redux";
import * as SettingsDuck from '../../../../src/features/cart/ducks/settings.duck';

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  eco: {
    width: 30,
    height: 30,
    color: "#ffea00",
  },
  badge: {
    top: '50%',
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
}));

export function Header() {
  const classes = useStyles();
  const items = useSelector(SettingsDuck.selectItems);

  const forTotalQuantity = () => {
    let total=0;
    items.map(item =>
      total = total + item.quantity
    );
    return total;
  };

  return (
    <Fragment>
      <div className={classes.offset} />
      <Box mt={3} />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <EcoIcon className={classes.eco} /> Products App
          </Typography>
          <Button color="inherit" component={NavLink} to="/">About us</Button>
          <Button color="inherit" component={NavLink} to="/deliveryAndPayment">Delivery&payment</Button>
          <Button color="inherit" component={NavLink} to="/catalog">Catalog</Button>
          <Button color="inherit" component={NavLink} to="/cart">Cart
            <Badge badgeContent={forTotalQuantity()} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Button>
          {/*<Button color="inherit" component={NavLink} to="/new-product">Add Product</Button>* на случай если понадобится*/}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

//Header.propTypes = {};
