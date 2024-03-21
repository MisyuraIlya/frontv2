import React, { FC } from 'react'
import Tags from './LeftSide/components/ProductList/components/Tags'
import BasicInfo from './LeftSide/components/ProductList/components/BasicInfo'
import PriceBlock from './LeftSide/components/ProductList/components/PriceBlock'
import { Box, Card, Grid } from '@mui/material'
import { useAuth } from '../../Auth/store/useAuthStore'
import AgentHandler from './LeftSide/components/ProductList/components/AgentHandler'

interface ProductCardProps {
  product: IProduct
  listView?: boolean
}
const ProductCard: FC<ProductCardProps> = ({ product, listView = false }) => {
  const { isAgent } = useAuth()
  return (
    <Card sx={{ position: 'relative', paddingBottom: '20px' }}>
      {/* <Tags product={product} /> */}
      <Grid container spacing={2}>
        <Grid item xs={listView ? 6 : 12}>
          <BasicInfo product={product} />
        </Grid>
        {isAgent && (
          <Box
            sx={{
              height: '10x',
              marginBottom: '5px',
              borderTop: '1px solid rgba(65,67,106,.43137254901960786);',
              width: '100%',
            }}
          />
        )}

        {isAgent && <AgentHandler product={product} />}
        {isAgent && (
          <Box
            sx={{
              height: '10x',
              marginTop: '5px',
              borderBottom: '1px solid rgba(65,67,106,.43137254901960786);',
              width: '100%',
            }}
          />
        )}

        <Grid item xs={listView ? 6 : 12}>
          <Box>
            <PriceBlock product={product} />
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ProductCard
