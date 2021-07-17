import React from 'react';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
import { OrderingPageStep1 } from "./OrderingPageStep1";

export function DeliveryAndPaymentPage() {

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
          <Typography variant="h4">Delivery & Payment</Typography>
        </Box>
        <Box>
          <Typography variant="h5">Step 1</Typography>
        </Box>
          <Grid xs={3} item >
            <Box>
              <OrderingPageStep1 />
            </Box>
          </Grid>
      </Grid>
    </>
  );
}
