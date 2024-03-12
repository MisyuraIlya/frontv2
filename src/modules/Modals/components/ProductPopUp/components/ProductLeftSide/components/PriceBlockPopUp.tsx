import React, { FC } from 'react'
import { useAuth } from '../../../../../../Auth/store/useAuthStore'
import { useCart } from '../../../../../../Cart/store/cart.store'
import AddToCart from '../../../../../../Cart/components/AddToCart/AddToCart'
import { Typography, Grid, Box, TextField } from '@mui/material'

type PriceBlockProps = {
  product: IProduct
}

const PriceBlockPopUp: FC<PriceBlockProps> = ({ product }) => {
  const { user, isAgent } = useAuth()
  const { getCartItem, selectedMode } = useCart()

  const inCart = getCartItem(product)
  return (
    <Box>
      {user &&
      selectedMode &&
      product.finalPrice &&
      product.finalPrice !== 0 &&
      product.stock !== 0 ? (
        <Box sx={{ margin: '0 20px' }}>
          <Grid container spacing={4}>
            <Grid item xs={4} className="centered">
              <Box>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  {"מחיר יח'"}
                </Typography>
                {isAgent ? (
                  <Box sx={{ marginBottom: '10px' }}>
                    <TextField
                      value={inCart?.price}
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
                  <Typography variant="body1" className="centered">
                    {inCart?.price}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={4} className="centered">
              <Box>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  {'הנחה'}
                </Typography>
                {isAgent ? (
                  <Box sx={{ marginBottom: '10px' }}>
                    <TextField
                      value={inCart?.discount}
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
                  <Typography variant="body1" className="centered">
                    {inCart?.discount}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={4} className="centered">
              <Box>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  {'סה״כ'}
                </Typography>
                {isAgent ? (
                  <Box sx={{ marginBottom: '10px' }}>
                    <TextField
                      value={inCart?.product.finalPrice}
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
                  <Typography variant="body1" className="centered">
                    {inCart?.price}₪
                  </Typography>
                )}
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
      <Box sx={{ margin: '10px 20px' }}>
        <Grid container spacing={4}>
          <Grid item xs={6} className="centered">
            <Box>
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                {"יח' להזמנה"}
              </Typography>
              {isAgent ? (
                <Box sx={{ marginBottom: '10px' }}>
                  <TextField
                    value={inCart?.quantity}
                    sx={{
                      '& input': {
                        textAlign: 'center',
                        width: '60%',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        backgroundColor: '#f3f5f9',
                      },
                    }}
                  />
                </Box>
              ) : (
                <Typography variant="body1" className="centered">
                  {inCart?.quantity}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={6} className="centered">
            <Box>
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                {'סה״כ להזמנה'}
              </Typography>

              <Typography variant="body1" className="centered">
                ₪{inCart?.total}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default PriceBlockPopUp
