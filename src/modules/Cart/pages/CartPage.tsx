import React from 'react'
import CartOptions from '../components/CartOptions/CartOptions'
import CartList from '../components/CartList/CartList'
import Summary from '../components/Summary/Summary'
import { Grid } from '@mui/material'

const CartPage = () => {
  return (
    <Grid container spacing={1} sx={{ marginTop: '100px' }}>
      <Grid item xs={9}>
        <CartOptions />
        <CartList />
      </Grid>
      <Grid item xs={3} className="centered">
        <Summary />
      </Grid>
    </Grid>
  )
}

export default CartPage
