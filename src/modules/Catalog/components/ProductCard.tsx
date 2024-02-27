import React, { FC } from 'react'
import Tags from './LeftSide/components/ProductList/components/Tags'
import BasicInfo from './LeftSide/components/ProductList/components/BasicInfo'
import PriceBlock from './LeftSide/components/ProductList/components/PriceBlock'
import { Box, Card, Grid } from '@mui/material'

interface ProductCardProps {
  product: IProduct
  listView?: boolean
}
const ProductCard: FC<ProductCardProps> = ({ product, listView = false }) => {
  return (
    <Card sx={{ height: '400px', position: 'relative' }}>
      {/* <Tags product={product} /> */}
      <Grid container spacing={2}>
        <Grid item xs={listView ? 6 : 12}>
          <BasicInfo product={product} />
        </Grid>
        <Grid item xs={listView ? 6 : 12}>
          <Box
            sx={
              listView
                ? { position: 'relative' }
                : { position: 'absolute', bottom: '10px', width: '100%' }
            }
          >
            <PriceBlock product={product} />
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ProductCard
