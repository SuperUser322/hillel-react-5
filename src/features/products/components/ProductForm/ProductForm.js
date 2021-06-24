import React from 'react';      //EDIT и ADD
import PropTypes from 'prop-types';
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  field: {
    width: "100%",
  }
}));

export function ProductForm({ editProduct = null, onSubmit = console.log, isSubmitting = false }) {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: editProduct ? {
      title: editProduct.title,
      description: editProduct.description,
      price: editProduct.price,
      photo: editProduct.photo,
      isNew: editProduct.isNew,
      isSale: editProduct.isSale,
      isInStock: editProduct.isInStock,
      categories: editProduct.categories,
      rating: editProduct.rating,
    } : {},
  });

  const classes = useStyles();

  const submit = (values) => {
    onSubmit(values);
  };

  return (
    <Box className={classes.root} mx="auto">
      <Paper>
        <Box p={3}>
          <form onSubmit={handleSubmit(submit)}>
            <Typography variant="h6">{editProduct ? `Editing "${editProduct.title}" Product` : 'Creating a new Product'}</Typography>
            <Box mt={3}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "This field is required." }}
                render={({ field }) => (
                  <TextField
                    inputProps={field}
                    className={classes.field}
                    error={!!errors.title}
                    label="Title"
                    helperText={errors.title?.message}
                    disabled={isSubmitting}
                  />
                )}
              />
            </Box>
            <Box mt={1}>
              <Controller
                name="description"
                control={control}
                rules={{ required: "This field is required." }}
                render={({ field }) => (
                  <TextField
                    inputProps={field}
                    className={classes.field}
                    error={!!errors.description}
                    label="Description"
                    multiline
                    rows={5}
                    helperText={errors.description?.message}
                    disabled={isSubmitting}
                  />
                )}
              />
            </Box>
            <Box mt={1}>
              <Controller
                name="price"
                control={control}
                rules={{ required: "This field is required." }}
                render={({ field }) => (
                  <TextField
                    inputProps={field}
                    className={classes.field}
                    error={!!errors.price}
                    label="Price"
                    helperText={errors.price?.message}
                    disabled={isSubmitting}
                  />
                )}
              />
            </Box>
            <Box mt={1}>
              <Controller
                name="photo"
                control={control}
                render={({ field }) => (
                  <TextField
                    inputProps={field}
                    className={classes.field}
                    error={!!errors.photo}
                    label="Photo"
                    helperText={errors.photo?.message}
                    disabled={isSubmitting}
                  />
                )}
              />
            </Box>
            <Box mt={1}>
              <>
                <span>New product: </span>
                <Controller
                  name="isNew"
                  control={control}
                  defaultChecked={false}
                  render={({ field }) => <Checkbox {...field} />
                  }
                />
              </>
            </Box>
            {/*<Box mt={1}>
              <>
                <span>Is it sale: </span>
                <Controller
                  name="isSale"
                  control={control}
                  defaultChecked={false}
                  render={({ field }) => <Checkbox {...field} checked={editProduct.isSale} />
                  }
                />
              </>
            </Box>
            <Box mt={1}>
              <>
                <span>Is it in stock: </span>
                <Controller
                  name="isInStock"
                  control={control}
                  defaultChecked={false}
                  render={({ field }) => <Checkbox {...field} checked={editProduct.isInStock} />
                  }
                />
              </>
            </Box>*/}

            <Box mt={4}>
              <Button component={Link} disabled={isSubmitting} to="/catalog">Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>{editProduct ? "Save" : "Create"}</Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}

ProductForm.propTypes = {
  editProduct: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
};
