import React, { FC } from 'react'
import { useAuth } from '../../../../../../Auth/store/useAuthStore'
import { useCart } from '../../../../../../Cart/store/cart.store'
import AddToCart from '../../../../../../Cart/components/AddToCart/AddToCart'
import { Typography, Grid, Box } from '@mui/material'

type PriceBlockProps = {
  product: IProduct
}

const PriceBlock: FC<PriceBlockProps> = ({ product }) => {
  const { user } = useAuth()
  const { getCartItem, selectedMode } = useCart()

  const inCart = getCartItem(product)
  return (
    <Box>
      {user &&
      selectedMode &&
      product.finalPrice &&
      product.finalPrice !== 0 &&
      product.stock !== 0 ? (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6} className="centered">
              <Box>
                <Typography variant="body1">{"יח' להזמנה"}</Typography>
                <Typography variant="body1" className="centered">
                  {inCart?.sku
                    ? inCart.quantity *
                      (inCart?.choosedPackQuantity
                        ? inCart.choosedPackQuantity
                        : inCart.quantity)
                    : '0'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} className="centered">
              <Box>
                <Typography variant="body1">{'סה״כ להזמנה'}</Typography>
                <Typography variant="body1" className="centered">
                  {inCart
                    ? (inCart?.choosedPackQuantity
                        ? inCart.quantity * inCart.choosedPackQuantity
                        : inCart.quantity) * inCart.price
                    : 0}{' '}
                  ₪
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : null}

      {user &&
      selectedMode &&
      product.finalPrice &&
      product.finalPrice !== 0 &&
      product.stock !== 0 ? (
        <AddToCart item={product} />
      ) : null}
    </Box>
  )
}

export default PriceBlock
