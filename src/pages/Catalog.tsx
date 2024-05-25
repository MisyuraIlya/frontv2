import React from 'react'
import LeftSide from '../modules/Catalog/components/LeftSide/LeftSide'
import { Grid, Container, useMediaQuery, Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import useDataCategories from '../hooks/useClientDataCategories'
import { findCategoryTitleById } from '../helpers/handleBreadCrumbs'
import Utils from '../utils'
import CatalogComponent from '../components/Catalog'

const Catalog = () => {
  const { lvl1, lvl2, lvl3 } = useParams()
  const { data } = useDataCategories()
  const categoriesArray = data?.['hydra:member'] || []
  const res1 = findCategoryTitleById(+lvl1!, categoriesArray)
  const res2 = findCategoryTitleById(+lvl2!, categoriesArray)
  const res3 = findCategoryTitleById(+lvl3!, categoriesArray)
  const isMobile = useMediaQuery('(max-width:800px)')

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
        <Grid item xs={12} sm={9}></Grid>
      </Grid>
    </Container>
  )
}

export default Catalog
