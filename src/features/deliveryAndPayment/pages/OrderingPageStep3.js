import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Grid, Box, Typography, Button } from '@material-ui/core';
import { NavLink } from "react-router-dom";
//import { OrderingStep3 } from "../components/OrderingStep3/OrderingStep3"; <OrderingStep3 />

const useStyles = makeStyles(theme => ({
  root: {
    width: 200,
    margin: 5,
  },
  customMargin: {
    margin: 5,
  },
}));

export const OrderingPageStep3 = () => {
  const generateID = () => {
  	const time = Date.now().toString();
  	//const salt = performance.now().toString();
  	return time;//time.concat(salt);
  }
  const classes = useStyles();

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
          <Typography variant="h5">Step 3</Typography>
        </Box>

        <Box>
          <Typography>Your order #{generateID()} is completed. Our manager will contact you soon.</Typography>
        </Box>

        <Button className={classes.customMargin} size="small" variant="contained" color="primary" component={NavLink} to="/catalog" >Catalog</Button>
      </Grid>
    </>
  );
}

/*
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

export const OrderingPageStep3 = () => {
  return (
    <>
    <p>blablabla</p>
    <Router>
      <div>
        <OldSchoolMenuLink
          activeOnlyWhenExact={true}
          to="/"
          label="Home"
        />
        <OldSchoolMenuLink to="/about" label="About" />

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
    </>
  );
}

function OldSchoolMenuLink({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return (
    <div className={match ? "active" : ""}>
      {match && "> "}
      <Link to={to}>{label}</Link>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}*/
