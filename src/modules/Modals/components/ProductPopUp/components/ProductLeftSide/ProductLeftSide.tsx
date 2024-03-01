import React from 'react'
import ProductMainInfo from './components/ProductMainInfo'
import ProductHistoryPurche from './components/ProductHistoryPurche'
import ProductMainInfoTwo from './components/ProductMainInfoTwo'
import ProductAddToCart from './components/ProductAddToCart'
import SubProducts from './components/SubProducts'
import { useSelectedProduct } from '../../../../store/selecterdProduct.store'
import PriceBlock from '../../../../../Catalog/components/LeftSide/components/ProductList/components/PriceBlock'
import { Box, Divider } from '@mui/material'
const ProductLeftSide = () => {
  const { selectedProd } = useSelectedProduct()
  return (
    <Box>
      <ProductMainInfo />
      <Divider />
      <ProductHistoryPurche />
      <Divider />
      <ProductMainInfoTwo />
      <PriceBlock product={selectedProd} />
    </Box>
  )
}

export default ProductLeftSide
