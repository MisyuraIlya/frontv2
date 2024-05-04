import React from 'react'
import ProductMainInfo from './components/ProductMainInfo'
import { useSelectedProduct } from '../../../../store/selecterdProduct.store'
import { Box, Typography } from '@mui/material'
import PriceBlockPopUp from './components/PriceBlockPopUp'
const ProductLeftSide = () => {
  const { selectedProd } = useSelectedProduct()
  return (
    <Box>
      <ProductMainInfo />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '50px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '100px', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ color: '#2196F3' }}>
            סה״כ להזמנה
          </Typography>
          <Typography variant="h5">123</Typography>
        </Box>
        <Box sx={{ width: { sm: '50%', xs: '100%' } }}>
          <PriceBlockPopUp product={selectedProd} />
        </Box>
      </Box>
    </Box>
  )
}

export default ProductLeftSide
