import React, { FC } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { useModals } from '../../../provider/ModalProvider'
import { themeColors } from '../../../styles/mui'
import { useCart } from '../../../store/cart.store'
import AddToCart from '../../../components/AddToCart'

interface ProductCardProps {
  product: IProduct
  listView?: boolean
}
const ProductCard: FC<ProductCardProps> = ({ product, listView = false }) => {
  const { getCartItem } = useCart()
  const { selectProduct } = useModals()
  const inCart = getCartItem(product)
  return (
    <Card
      sx={{
        border: inCart ? `1px solid ${themeColors.primary}` : `1px solid white`,
        position: 'relative',
      }}
    >
      {product?.discount ? (
        <Chip
          label={`מבצע ${product?.discount}%`}
          color="info"
          sx={{ position: 'absolute', right: '12px', top: '12px', zIndex: 10 }}
        />
      ) : null}
      <CardMedia
        onClick={() => selectProduct(product)}
        component="img"
        height={150}
        sx={{
          cursor: 'pointer',
          objectFit: 'contain',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.2)',
          },
        }}
        image={
          product.defaultImagePath
            ? `${process.env.REACT_APP_MEDIA}/product/${product.defaultImagePath}`
            : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
        }
        alt={product.title}
      />
      <CardContent sx={{ p: '12px 16px' }}>
        <Typography
          variant="subtitle2"
          color={themeColors.primary}
          fontWeight={600}
          lineHeight={'20px'}
          fontStyle={'normal'}
          sx={{ minHeight: '45px' }}
        >
          {product.title}
        </Typography>
        <Grid spacing={0} container sx={{ paddingTop: '10px' }}>
          <Grid item xs={2.5}>
            <Typography variant="caption" color={themeColors.asphalt}>
              מק״ט:
            </Typography>
          </Grid>
          <Grid item xs={9.5}>
            <Typography variant="caption" color={themeColors.asphalt}>
              {product?.sku}
            </Typography>
          </Grid>
          {product?.barcode && (
            <>
              <Grid item xs={2.5}>
                <Typography variant="caption" color={themeColors.asphalt}>
                  ברקוד:
                </Typography>
              </Grid>
              <Grid item xs={9.5}>
                <Typography variant="caption" color={themeColors.asphalt}>
                  {product.barcode}
                </Typography>
              </Grid>
            </>
          )}
          <Grid item xs={2.5}>
            <Typography variant="caption" color={themeColors.asphalt}>
              מארז:
            </Typography>
          </Grid>
          <Grid item xs={9.5}>
            <Typography variant="caption" color={themeColors.asphalt}>
              {`${product?.packQuantity} יח'`}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ margin: '10px 0' }} />
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'end' }}>
          <Typography
            variant="body1"
            color={themeColors.primary}
            fontWeight={500}
            lineHeight={'21px'}
          >
            {product?.finalPrice} ₪
          </Typography>
          <Typography
            variant="body1"
            color={themeColors.primary}
            fontSize={'12px'}
            fontWeight={500}
            lineHeight={'18px'}
            sx={{ textDecoration: 'line-through' }}
          >
            {product?.discount} ₪
          </Typography>
        </Box>
        <Typography variant="caption" color={themeColors.asphalt}>
          {`מחיר יח'`}
        </Typography>
        <Divider sx={{ margin: '10px 0' }} />
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'end' }}>
          <Typography
            variant="body1"
            color={themeColors.primary}
            fontWeight={500}
            lineHeight={'22px'}
          >
            {inCart?.total} ₪
          </Typography>
          <Typography
            variant="caption"
            color={inCart ? themeColors.info : themeColors.asphalt}
            lineHeight={'18px'}
            fontWeight={500}
          >
            {`סה״כ להזמנה ל- `}
            {inCart?.quantity}
            {" יח'"}
          </Typography>
        </Box>
      </CardContent>
      <AddToCart item={product} />
    </Card>
  )
}

export default ProductCard
