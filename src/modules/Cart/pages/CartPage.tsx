import React from 'react'
import CartOptions from '../components/CartOptions/CartOptions'
import CartList from '../components/CartList/CartList'
import Summary from '../components/Summary/Summary'
import { Grid } from '@mui/material'

const CartPage = () => {
  return (
    <Grid container spacing={1} sx={{ marginTop: '100px' }}>
      <Grid item xs={9} sx={{ marginTop: '20px' }}>
        <CartOptions />
        <CartList />
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          position: 'fixed',
          right: '0px',
          width: '100%',
          height: '85vh',
          boxShadow: '2px 3px 9px 2px #e0e0e0;',
        }}
      >
        <Summary />
      </Grid>
    </Grid>
  )
}

export default CartPage
