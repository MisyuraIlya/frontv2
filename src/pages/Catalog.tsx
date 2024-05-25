import React from 'react'
import { Grid, Container, useMediaQuery, Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import useDataCategories from '../hooks/useDataCategories'
import { findCategoryTitleById } from '../helpers/handleBreadCrumbs'
import Utils from '../utils'
import CatalogComponent from '../components/Catalog'
import useDataCatalog from '../hooks/useDataCatalog'
import { themeColors } from '../styles/mui'

const Catalog = () => {
  const { lvl1, lvl2, lvl3 } = useParams()
  const { data, data: catalog } = useDataCategories()
  const { hydraPagination } = useDataCatalog()
  const categoriesArray = data?.['hydra:member'] || []
  const res1 = findCategoryTitleById(+lvl1!, categoriesArray)
  const res2 = findCategoryTitleById(+lvl2!, categoriesArray)
  const res3 = findCategoryTitleById(+lvl3!, categoriesArray)
  const isMobile = useMediaQuery('(max-width:800px)')

  const handleTitle = () => {
    if (res3) {
      return res3
    } else if (res2) {
      return res2
    } else if (res3) {
      return res3
    } else {
      return ''
    }
  }

  return (
    <Container maxWidth="xl" sx={{ marginTop: '50px' }}>
      <Utils.BreadCrumbsUtil
        array={[
          {
            title: res1 ?? '',
            link: `/client/catalog/${lvl1}/0/0?page=1` || '',
          },
          {
            title: res2 ?? '',
            link: `/client/catalog/${lvl1}/${lvl2}/0?page=1` || '',
          },
          {
            title: res3 ?? '',
            link: `/client/catalog/${lvl1}/${lvl2}/${lvl3}?page=1` || '',
          },
        ]}
      />

      <Grid container spacing={2}>
        <Grid item xs={0} sm={3}>
          {isMobile ? (
            <Utils.MyDrawer>
              <Box>
                <CatalogComponent.Right.Categories />
              </Box>
            </Utils.MyDrawer>
          ) : (
            <>
              <CatalogComponent.Right.Categories />
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={9}>
          <CatalogComponent.Left.Filter />
          <Box
            sx={{
              pt: '22px',
              pb: '10px',
              display: 'flex',
              gap: '10px',
              alignItems: 'end',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {handleTitle()}
            </Typography>
            <Typography variant="body1" color={themeColors.asphalt}>
              סה"כ מוצרים: {catalog?.['hydra:totalItems']}
            </Typography>
          </Box>
          <CatalogComponent.Left.List />
          {hydraPagination && (
            <Utils.PaginationUtil hydraPagination={hydraPagination} />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Catalog
