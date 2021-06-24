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
}));

export function Header() {
  const classes = useStyles();

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
          <Button color="inherit" component={NavLink} to="/basket">Basket</Button>
          {/*<Button color="inherit" component={NavLink} to="/new-product">Add Product</Button>* на случай если понадобится*/}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

//Header.propTypes = {};
