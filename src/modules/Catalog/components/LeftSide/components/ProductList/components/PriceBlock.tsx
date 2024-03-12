import React, { FC } from 'react'
import { useAuth } from '../../../../../../Auth/store/useAuthStore'
import { useCart } from '../../../../../../Cart/store/cart.store'
import AddToCart from '../../../../../../Cart/components/AddToCart/AddToCart'
import { Typography, Grid, Box, TextField } from '@mui/material'

type PriceBlockProps = {
  product: IProduct
}

const PriceBlock: FC<PriceBlockProps> = ({ product }) => {
  const { user, isAgent } = useAuth()
  const { getCartItem, selectedMode, changeQuantity } = useCart()

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
              <Box sx={{ marginBottom: '10px' }}>
                <Typography
                  variant="body2"
                  fontWeight={800}
                  sx={{ textAlign: 'center' }}
                >
                  {"יח' להזמנה"}
                </Typography>
                {isAgent ? (
                  <Box sx={{ margin: '2px 15px' }}>
                    <TextField
                      value={inCart?.quantity ?? 0}
                      onChange={(e) =>
                        changeQuantity(product.sku, +e.target.value)
                      }
                      sx={{
                        '& input': {
                          textAlign: 'center',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          backgroundColor: '#f3f5f9',
                        },
                      }}
                    />
                  </Box>
                ) : (
                  <Typography
                    variant="body2"
                    className="centered"
                    sx={{ textAlign: 'center' }}
                  >
                    {inCart?.sku
                      ? inCart.quantity *
                        (inCart?.choosedPackQuantity
                          ? inCart.choosedPackQuantity
                          : inCart.quantity)
                      : '0'}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6} className="centered">
              <Box>
                <Typography variant="body1">{'סה״כ להזמנה'}</Typography>
                <Typography variant="body1" className="centered">
                  ₪{inCart?.total}
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
