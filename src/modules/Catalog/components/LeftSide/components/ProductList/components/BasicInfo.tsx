import React, { FC } from 'react'
import { useAuth } from '../../../../../../Auth/store/useAuthStore'
import { useModals } from '../../../../../../Modals/provider/ModalProvider'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useCatalog } from '../../../../../store/CatalogStore'
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Box,
} from '@mui/material'

type BasicInfoProps = {
  product: IProduct
}

const BasicInfo: FC<BasicInfoProps> = ({ product }) => {
  const { user } = useAuth()
  const { selectProduct } = useModals()
  const { loading } = useCatalog()

  return (
    <Card elevation={0}>
      <CardMedia
        onClick={() => selectProduct(product)}
        component="img"
        height={120}
        sx={{
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
      <CardContent>
        <Typography variant="body1">{product?.title}</Typography>
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Typography variant="body1">מק״ט:</Typography>
          <Typography variant="body1">{product?.sku}</Typography>
        </Box>
        {product?.barcode && (
          <Box sx={{ display: 'flex', gap: '5px' }}>
            <Typography variant="body1">ברקוד:</Typography>
            <Typography variant="body1">{product.barcode}</Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Typography variant="body1">מארז:</Typography>
          <Typography variant="body1">
            {`${product?.packQuantity} יח'`}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Typography variant="body1" fontWeight={900}>
            {`מחיר ליחידה: `}
          </Typography>
          <Typography variant="body1" fontWeight={900}>
            {` ${product?.finalPrice} ₪`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default BasicInfo
