import React from 'react'
import { useCart } from '../../store/cart.store'
import AddToCart from '../AddToCart/AddToCart'
import { useModals } from '../../../Modals/provider/ModalProvider'
import {
  calculatePrice,
  getDiscountPrecent,
  getPriceByOriginalPrice,
} from '../../helpers/calculations'
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
} from '@mui/material'
import { themeColors } from '../../../../styles/mui'

const CartList = () => {
  const { cart, CartTitle } = useCart()
  const { selectProduct } = useModals()
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h5">{CartTitle()}</Typography>
      </Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  fontSize={16}
                  fontWeight={700}
                  color={themeColors.primary}
                >
                  פריט
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  fontSize={16}
                  fontWeight={700}
                  color={themeColors.primary}
                >
                  כמות
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  fontSize={16}
                  fontWeight={700}
                  color={themeColors.primary}
                >
                  מחיר
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  fontSize={16}
                  fontWeight={700}
                  color={themeColors.primary}
                >
                  הנחה
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  fontSize={16}
                  fontWeight={700}
                  color={themeColors.primary}
                >
                  סה״כ להזמנה
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.map((element, index) => {
              const price = calculatePrice(element?.product, element?.quantity)
              const discount = getDiscountPrecent(element)
              const priceByOriginal = getPriceByOriginalPrice(element)

              return (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <AddToCart item={element?.product} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: '10px', width: '350px' }}>
                      <img
                        width={80}
                        src={
                          element?.product?.defaultImagePath
                            ? process.env.REACT_APP_MEDIA +
                              '/product/' +
                              element?.product?.defaultImagePath
                            : process.env.REACT_APP_MEDIA + '/placeholder.jpg'
                        }
                        onClick={() => selectProduct(element?.product)}
                      />
                      <Box
                        sx={{
                          textAlign: 'right',
                          display: 'flex',
                          justifyContent: 'right',
                          alignItems: 'center',
                        }}
                      >
                        <Box sx={{ width: '100%', textAlign: 'right' }}>
                          <Typography
                            variant="body1"
                            sx={{ textAlign: 'left' }}
                            color={themeColors.primary}
                          >
                            {' '}
                            #{element?.product?.sku}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ textAlign: 'left' }}
                            fontWeight={800}
                            color={themeColors.primary}
                          >
                            {element?.product?.title}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color={themeColors.primary}>
                      {element?.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color={themeColors.primary}>
                      {element?.product?.finalPrice} ₪{' '}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color={themeColors.primary}>
                      {element?.discount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {priceByOriginal != price.toFixed(1) ? (
                      <Typography variant="body1" color={themeColors.primary}>
                        {price.toFixed(1)} ₪{' '}
                      </Typography>
                    ) : (
                      <Typography variant="body1" color={themeColors.primary}>
                        {price.toFixed(1)} ₪{' '}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CartList
