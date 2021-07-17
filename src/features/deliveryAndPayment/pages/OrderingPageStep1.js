import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { NavLink, useLocation } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Grid, Box, TextField, Input, Button, Checkbox, Radio, RadioGroup, FormControlLabel, FormLabel } from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

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
    margin: 8,
  },
  customMargin: {
    margin: 5,
  }
}));

export const OrderingPageStep1 = () => {
  const classes = useStyles();
  let location = useLocation();

  const [order, setOrder] = useState({
    firstName: '',
    lastName: '',
    country: '',
    phone: '',
    city: '',
    address: '',
    address2: '',
    email: '',
    deliveryType: 'postal service',
    dontCallMe: false,
    comment: '',
   });

  useEffect(() => {
    location.state !== null &&
    (location.state !== undefined && setOrder({ firstName: location.state.order.firstName,
      lastName: location.state.order.lastName, country: location.state.order.country ,
      phone: location.state.order.phone, city: location.state.order.city,
      address: location.state.order.address, address2: location.state.order.address2,
      email: location.state.order.email, deliveryType: location.state.order.deliveryType,
      dontCallMe: location.state.order.dontCallMe, comment: location.state.order.comment
    }))
  }, [location.state]);


  const [customErrors, setCustomErrors] = useState({
    phone: null,
    comment: null,
  });

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    let err = null,
      val = e.target.value,
      regex = new RegExp(/^\d[\d() -]{4,14}\d$/);
    if (val.length && !(regex.test(val))) {
      err = "Enter your phone number please!";
      val = val.replace(/\D/gmi, '')
      setCustomErrors({ ...customErrors, phone: err });
      setOrder({ ...order, [e.target.name]: val });
    } else if (val.length < 1) {
      err = null;
      setOrder({ ...order, [e.target.name]: '' });
      setCustomErrors({ ...customErrors, phone: err });
    } else {
      err = null;
      setOrder({ ...order, [e.target.name]: e.target.value });
      setCustomErrors({ ...customErrors, phone: err });
    }
  };

  const handleCommentChange = (e) => {
    if (e.target.value.length > 500 ) {
      setCustomErrors({ ...customErrors, [e.target.name]: "Max length exceeded!" })
    } else {
      setOrder({ ...order, [e.target.name]: e.target.value });
      setCustomErrors({ ...customErrors, [e.target.name]: null });
    }
  };

  const handleCheck = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.checked });
  };

  const isDisabled = () => {
    return (
      order.firstName === '' ? false :
      order.lastName === '' ? false :
      order.country === '' ? false :
      order.phone === '' || customErrors.phone !== null ? false :
      order.city === '' ? false :
      order.address === '' ? false :
      order.email === '' ? false : true
    )
  };

  const onSubmit = (data) => {
    //console.log(data);
  };

  return (
    <>
      <form className={classes.formControl} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={0}>
          <Box>
            <Input id="first-name" type="text" placeholder="First name" value={order.firstName} onInput={handleChange} {...register("firstName", {required: "Enter your first name please!"})} />
            {errors.firstName && (
              <div style={{color: "red"}}>{errors.firstName.message}</div>
            )}
          </Box>

          <Box>
            <Input type="text" placeholder="Last name" value={order.lastName} onInput={handleChange} {...register("lastName", {required: "Enter your last name please!"})} />
            {errors.lastName && (
              <div style={{color: "red"}}>{errors.lastName.message}</div>
            )}
          </Box>

          <Box>
            <Autocomplete
              id="countries"
              options={countries}
              getOptionSelected={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.cName ? option.cName : ''}
              className={classes.countrySelect}
              inputValue={order.country}
              onInputChange={(event, newInputValue) => {
                setOrder({ ...order, country: newInputValue });
              }}

              renderInput={(params) => <TextField {...params}
                {...register("countries", { required: "Choose country please!" })}
                label="Country" variant="outlined" key={params.cName} />}
            />
            {errors.countries && (
              <div style={{color: "red"}}>{errors.countries.message}</div>
            )}
          </Box>

          <Box>
            <Input type="tel" placeholder="Phone number" value={order.phone} onInput={handlePhoneChange} {...register("phone", {required: "Enter your phone number please!"})} />
            {errors.phone ? (
              <div style={{color: "red"}}>{errors.phone.message}</div>
            ) : (
              customErrors.phone && (
                <div style={{color: "red"}}>{customErrors.phone}</div>
              )
            )}
          </Box>

          <Box>
            <Input type="text" placeholder="City" value={order.city} onInput={handleChange} {...register("city", {required: "Enter your city please!"})} />
            {errors.city && (
              <div style={{color: "red"}}>{errors.city.message}</div>
            )}
          </Box>

          <Box>
            <Input type="text" placeholder="Address" value={order.address} onInput={handleChange} {...register("address", {required: "Enter your address please!"})} />
            {errors.address && (
              <div style={{color: "red"}}>{errors.address.message}</div>
            )}
          </Box>

          <Box>
            <Input type="text" placeholder="Address2" value={order.address2} onInput={handleChange} {...register("address2", {})} />
          </Box>

          <Box>
            <Input type="email" placeholder="Email" value={order.email} onInput={handleChange} {...register("email", {required: "Enter your email please!"})} />
            {errors.email && (
              <div style={{color: "red"}}>{errors.email.message}</div>
            )}
          </Box>

          <Box className={classes.root} >
            <FormLabel component="legend">Delivery type</FormLabel>
            <RadioGroup aria-label="deliveryType" name="deliveryType" value={order.deliveryType} onChange={handleChange} >
              <FormControlLabel value="pickup" control={<Radio variant="outlined" color="primary" />} label="Pickup" />
              <FormControlLabel value="postal service" control={<Radio variant="outlined" color="primary" />} label="Postal service" />
            </RadioGroup>
          </Box>

          <Box>
            <FormControlLabel
              control={<Checkbox checked={order.dontCallMe} onChange={handleCheck} name="dontCallMe" variant="outlined" color="primary" />}
              label="Dont call me"
            />
          </Box>

          <Box>
            <TextField
              className={classes.textAreaField}
              label="Comment"
              variant="outlined"
              multiline
              value={order.comment}
              onInput={handleCommentChange}
              {...register("comment", { max: 500})}
            />
            {customErrors.comment && (
              <div style={{color: "red"}}>{customErrors.comment}</div>
            )}
          </Box>

          <Box>

            <Button className={classes.customMargin} type="submit" variant="contained" color="primary"
            component={NavLink} to={{ pathname: "/orderingPageStep2", state: { order: order } }} disabled={!isDisabled()}>Continue</Button>

            <Button className={classes.customMargin} type="error" variant="contained" color="secondary" component={NavLink} to="/Cart">Cancel</Button>
          </Box>

        </Grid>
      </form>
    </>
  );
}

const countries = [
  { cName: "Австралия" },
  { cName: "Австрия" },
  { cName: "Аргентина" },
  { cName: "Белоруссия" },
  { cName: "Бразилия" },
  { cName: "Великобритания" },
  { cName: "Германия" },
  { cName: "Гондурас" },
  { cName: "Греция" },
  { cName: "Дания" },
  { cName: "Доминиканская Республика" },
  { cName: "Египет" },
  { cName: "Израиль" },
  { cName: "Индия" },
  { cName: "Ирландия" },
  { cName: "Испания" },
  { cName: "Италия" },
  { cName: "Казахстан" },
  { cName: "Канада" },
  { cName: "Китай" },
  { cName: "Республика Корея" },
  { cName: "Куба" },
  { cName: "Люксембург" },
  { cName: "Мексика" },
  { cName: "Новая Зеландия" },
  { cName: "Норвегия" },
  { cName: "Объединённые Арабские Эмираты" },
  { cName: "Португалия" },
  { cName: "Россия" },
  { cName: "Соединённые Штаты Америки" },
  { cName: "Сомали" },
  { cName: "Турция" },
  { cName: "Украина" },
  { cName: "Франция" },
  { cName: "Черногория" },
  { cName: "Чили" },
  { cName: "Швейцария" },
  { cName: "Эстония" },
  { cName: "Южно-Африканская Республика" },
  { cName: "Ямайка" },
  { cName: "Япония" }
];
