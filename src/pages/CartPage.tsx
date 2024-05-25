import React from 'react'
import { Container, Grid } from '@mui/material'
import Cart from '../components/Cart'
import Utils from '../utils'

const CartPage = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={9}>
        <Container sx={{ mt: '20px' }}>
          <Utils.BreadCrumbsUtil
            array={[
              {
                title: 'עגלה',
                link: '',
              },
            ]}
          />
        </Container>
        <Cart.Right.Options />
        <Cart.Right.List />
      </Grid>
      <Grid
        item
        xs={12}
        sm={3}
        sx={{
          position: {
            xs: { position: 'fixed' },
            sm: { position: 'relative' },
          },
          right: '0px',
          top: '0px',
          width: '100%',
          height: '100vh',
          boxShadow: '2px 3px 9px 2px #e0e0e0;',
        }}
      >
        <Cart.Left.Summary />
      </Grid>
    </Grid>
  )
}

export default CartPage
