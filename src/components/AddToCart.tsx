import React, { FC, useState } from 'react'
import { Input, Grid, IconButton, Box, Typography } from '@mui/material'
import { useCart } from '../store/cart.store'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { themeColors } from '../styles/mui'
import Snackbar from '@mui/material/Snackbar'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'

interface AddToCartProps {
  item: IProduct
}

const AddToCart: FC<AddToCartProps> = ({ item }) => {
  const {
    cart,
    addToCart,
    increaseCart,
    decreaseCart,
    deleteFromCart,
    changeQuantity,
  } = useCart()
  const find = cart?.filter((itemCart) => itemCart?.sku === item?.sku)
  const Quantity = find[0]?.quantity
  const isInCart = find[0]?.sku ? true : false

  const [notifyAddToCart, setNotifyAddTocart] = useState<boolean>(false)
  const [notifyStock, setNotifyStock] = useState<boolean>(false)

  const addToCartFunc = () => {
    if (item?.stock >= item.packQuantity) {
      addToCart(item)
      setNotifyAddTocart(true)
    } else {
      setNotifyStock(true)
    }
  }

  const increaseCartFunc = () => {
    if (item?.stock > Quantity) {
      increaseCart(item.sku)
    } else {
      setNotifyStock(true)
    }
  }

  const onChangeQuantityFunc = (value: number) => {
    if (item?.stock >= value * item.packQuantity) {
      changeQuantity(item.sku, value)
    } else {
      setNotifyStock(true)
    }
  }

  return (
    <Grid className="centered" style={{ padding: '0px', margin: '0px' }}>
      <Snackbar
        sx={{ marginTop: '150px' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={notifyAddToCart}
        onClose={() => setNotifyAddTocart(false)}
        autoHideDuration={2000}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: themeColors.primary,
            borderRadius: '10px',
            padding: '10px 20px',
          }}
        >
          <Typography variant="body2" sx={{ color: 'white', fontSize: '18px' }}>
            {'מוצר התווסף לסל הקניות'}
          </Typography>
          <AddShoppingCartIcon sx={{ color: 'white' }} />
        </Box>
      </Snackbar>

      <Snackbar
        sx={{ marginTop: '150px' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={notifyStock}
        onClose={() => setNotifyStock(false)}
        autoHideDuration={2000}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: themeColors.primary,
            borderRadius: '10px',
            padding: '10px 20px',
          }}
        >
          <Typography variant="body2" sx={{ color: 'white', fontSize: '18px' }}>
            {'כמות מלאי אינה מספקת'}
          </Typography>
          <RemoveShoppingCartIcon sx={{ color: 'white' }} />
        </Box>
      </Snackbar>

      {isInCart ? (
        <>
          <Grid
            item
            xs={12}
            container
            sx={{ backgroundColor: themeColors.primary, borderRadius: '4px' }}
          >
            <Grid
              item
              xs={4}
              className="centered"
              sx={{ borderRight: '1px solid white' }}
            >
              <IconButton
                onClick={() => increaseCartFunc()}
                sx={{ borderRadius: '0px', width: '100%' }}
              >
                <AddIcon sx={{ color: 'white' }} />
              </IconButton>
            </Grid>
            <Grid item xs={4} className="centered">
              <Input
                type="text"
                value={Quantity}
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  '& input': {
                    textAlign: 'center',
                    justifyContent: 'center',
                  },
                  '&::before': {
                    borderBottom: '0px !important',
                  },
                  '&::after': {
                    borderBottom: '0px',
                  },
                  '&:hover': {
                    borderBottom: '0px',
                  },
                }}
                onChange={(e) => onChangeQuantityFunc(parseInt(e.target.value))}
              />
            </Grid>
            <Grid
              item
              xs={4}
              className="centered"
              sx={{ borderLeft: '1px solid white' }}
            >
              <IconButton
                onClick={
                  isInCart && Quantity > 1
                    ? () => decreaseCart(item.sku)
                    : () => deleteFromCart(item.sku)
                }
                sx={{ borderRadius: '0px', width: '100%' }}
              >
                <RemoveIcon sx={{ color: 'white' }} />
              </IconButton>
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid
          item
          container
          style={{ padding: '0px' }}
          onClick={isInCart ? undefined : () => addToCartFunc()}
        >
          <Grid
            item
            xs={12}
            className="centered"
            sx={{
              bgcolor: '#F6F6F6',
              cursor: 'pointer',
              height: '40px',
              color: themeColors.primary,
              '&:hover': {
                background: themeColors.primary,
                color: 'white',
              },
            }}
          >
            <Typography variant="button">{'הוספה לסל'}</Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default AddToCart
