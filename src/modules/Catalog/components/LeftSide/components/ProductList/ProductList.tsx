import React from 'react'
import { useCatalog } from '../../../../store/CatalogStore'
import { useSearchStore } from '../../../../store/SearchStore'
import { useParams } from 'react-router-dom'
import { Box, Grid, Skeleton, Typography } from '@mui/material'
import ProductCard from '../../../ProductCard'

const ProductList = () => {
  const { products, loading } = useCatalog()
  const { documentType } = useParams()
  const { productsFilter } = useSearchStore()
  return (
    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
      {loading ? (
        <>
          {Array.from({ length: 24 }).map((_, index) => (
            <Grid item xs={3}>
              <Skeleton
                variant="rounded"
                height={120}
                sx={{ margin: '5px 0' }}
              />
              <Skeleton
                variant="rounded"
                height={120}
                sx={{ margin: '5px 0' }}
              />
              <Skeleton variant="rounded" height={60} />
            </Grid>
          ))}
        </>
      ) : (
        <>
          {(productsFilter?.length > 0 && documentType === 'search'
            ? productsFilter
            : products
          )?.map((product, index) => (
            <Grid item xs={3} key={index}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </>
      )}
      {(productsFilter?.length > 0 && documentType === 'search'
        ? productsFilter
        : products
      )?.length == 0 && (
        <Box className="centered">
          <Typography variant="body1">לא נמאו מוצרים</Typography>
        </Box>
      )}
    </Grid>
  )
}

export default ProductList
