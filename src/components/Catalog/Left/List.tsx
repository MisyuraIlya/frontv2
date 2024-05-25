import React from 'react'
import { useCatalog } from '../../../store/CatalogStore'
import { Box, Grid, Skeleton, Typography } from '@mui/material'
import ProductCard from '../../ProductCard'
import useDataCatalog from '../../../hooks/useClientDataCatalog'

const List = () => {
  const { listView } = useCatalog()
  const { data, isLoading } = useDataCatalog()
  return (
    <Grid container spacing={2}>
      {isLoading ? (
        <>
          {Array.from({ length: 24 }).map((_, index) => (
            <Grid item xs={3} key={index}>
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
          {data?.['hydra:member']?.map((product, index) => (
            <Grid
              item
              xs={listView == 'list' ? 12 : 6}
              key={index}
              sm={listView == 'list' ? 12 : 3}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </>
      )}
      {data?.['hydra:member']?.length == 0 && (
        <Box className="centered">
          <Typography variant="body1">לא נמאו מוצרים</Typography>
        </Box>
      )}
    </Grid>
  )
}

export default List
