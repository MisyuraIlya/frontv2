import React, { FC } from 'react'
import Tags from './LeftSide/components/ProductList/components/Tags'
import BasicInfo from './LeftSide/components/ProductList/components/BasicInfo'
import PriceBlock from './LeftSide/components/ProductList/components/PriceBlock'
import { Box, Card } from '@mui/material'

interface ProductCardProps {
  product: IProduct
}
const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Card sx={{ height: '400px', position: 'relative' }}>
      {/* <Tags product={product} /> */}
      <BasicInfo product={product} />
      <Box sx={{ position: 'absolute', bottom: '10px', width: '100%' }}>
        <PriceBlock product={product} />
      </Box>
    </Card>
  )
}

export default ProductCard
