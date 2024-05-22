import React from 'react'
import ProductList from './components/ProductList/ProductList'
import FiltersBlock from './components/FiltersBlock/FiltersBlock'
import { Box, Typography } from '@mui/material'
import PaginationUtil from '../../../../utils/pagination/PaginationUtil'
import useDataCatalog from '../../../../hooks/useDataCatalog'
import { useParams } from 'react-router-dom'
import { findCategoryTitleById } from '../../../../helpers/handleBreadCrumbs'
import useDataCategories from '../../../../hooks/useDataCategories'
import { themeColors } from '../../../../styles/mui'

const LeftSide = () => {
  const { hydraPagination, data: catalog } = useDataCatalog()
  const { lvl1, lvl2, lvl3 } = useParams()
  const { data } = useDataCategories()
  const categoriesArray = data?.['hydra:member'] || []
  const res1 = findCategoryTitleById(+lvl1!, categoriesArray)
  const res2 = findCategoryTitleById(+lvl2!, categoriesArray)
  const res3 = findCategoryTitleById(+lvl3!, categoriesArray)

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
    <Box>
      <FiltersBlock />
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
      <ProductList />
      {hydraPagination && <PaginationUtil hydraPagination={hydraPagination} />}
    </Box>
  )
}

export default LeftSide
