import React, { FC } from 'react'
import { Input, Grid, IconButton } from '@mui/material'
import { useCart } from '../../store/cart.store'
import { useModals } from '../../../Modals/provider/ModalProvider'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { themeColors } from '../../../../styles/mui'
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
    avoidNullInCart,
  } = useCart()
  const { openStockNotify, openAddToCartTotify } = useModals()
  const find = cart?.filter((itemCart) => itemCart?.sku === item?.sku)
  const Quantity = find[0]?.quantity
  const isInCart = find[0]?.sku ? true : false

  const addToCartFunc = () => {
    if (item?.stock >= item.packQuantity) {
      addToCart(item)
      openAddToCartTotify(true)
    } else {
      openStockNotify(true)
    }
  }

  const increaseCartFunc = () => {
    if (item?.stock > Quantity) {
      increaseCart(item.sku)
    } else {
      openStockNotify(true)
    }
  }

  const onChangeQuantityFunc = (value: number) => {
    if (item?.stock >= value * item.packQuantity) {
      changeQuantity(item.sku, value)
    } else {
      openStockNotify(true)
    }
  }

  return (
    <Grid className="centered" style={{ padding: '0px', margin: '0px' }}>
      {isInCart ? (
        <>
          <Grid
            item
            xs={11}
            container
            sx={{ border: '1px solid black' }}
            style={{ padding: '0px' }}
          >
            <Grid
              item
              xs={4}
              className="centered"
              sx={{ borderRight: '1px solid black' }}
            >
              <IconButton
                onClick={() => increaseCartFunc()}
                sx={{ borderRadius: '0px', width: '100%' }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4} className="centered">
              <Input
                type="number"
                value={Quantity}
                sx={{
                  '& input': {
                    textAlign: 'center',
                    justifyContent: 'center', // for number input
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
                onBlur={() => avoidNullInCart(item.sku)}
              />
            </Grid>
            <Grid
              item
              xs={4}
              className="centered"
              sx={{ borderLeft: '1px solid black' }}
            >
              <IconButton
                onClick={
                  isInCart && Quantity > 1
                    ? () => decreaseCart(item.sku)
                    : () => deleteFromCart(item.sku)
                }
                sx={{ borderRadius: '0px', width: '100%' }}
              >
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid
          item
          xs={11}
          container
          sx={{ border: '1px solid black' }}
          style={{ padding: '0px' }}
          onClick={isInCart ? undefined : () => addToCartFunc()}
        >
          <Grid
            item
            xs={12}
            className="centered"
            sx={{
              cursor: 'pointer',
              height: '40px',
              color: themeColors.primary,
              '&:hover': {
                background: themeColors.primary,
                color: 'white',
              },
            }}
          >
            {'הוספה לסל'}
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default AddToCart
