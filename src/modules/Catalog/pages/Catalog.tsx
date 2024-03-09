import React from 'react'
import RightSide from '../components/RightSide/RightSide'
import LeftSide from '../components/LeftSide/LeftSide'
import { Grid, Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import useDataCategories from '../hook/useDataCategories'
import { findCategoryTitleById } from '../../../helpers/handleBreadCrumbs'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'
const Catalog = () => {
  const { lvl1, lvl2, lvl3 } = useParams()
  const { data } = useDataCategories()
  const categoriesArray = data?.['hydra:member'] || []
  const res1 = findCategoryTitleById(+lvl1!, categoriesArray)
  const res2 = findCategoryTitleById(+lvl2!, categoriesArray)
  const res3 = findCategoryTitleById(+lvl3!, categoriesArray)

  return (
    <Container maxWidth="xl" sx={{ marginTop: '200px' }}>
      <BreadCrumbsUtil
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
        <Grid item xs={3}>
          <RightSide />
        </Grid>
        <Grid item xs={9}>
          <LeftSide />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Catalog
