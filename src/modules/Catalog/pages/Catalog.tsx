import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Loader from '../../../shared/Loader'
import RightSide from '../components/RightSide/RightSide'
import LeftSide from '../components/LeftSide/LeftSide'
import { useCatalog } from '../store/CatalogStore'
import { getProductsLocalStorage } from '../helpers/catalog.helpler'
import { useSearchStore } from '../store/SearchStore'
// import BreadCrumbs from '../../../shared/BreadCrumbs'
import { useCategories } from '../store/CategoriesStore'
import {
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  Box,
  Container,
} from '@mui/material'
const Catalog = () => {
  const { documentType, lvl1, lvl2, lvl3 } = useParams()
  const location = useLocation()
  const {
    loading,
    setCatalogParameters,
    getCatalog,
    setUrlSearch,
    getAttributes,
    setDocumentType,
  } = useCatalog()
  const {
    loading: filterLoading,
    findCategoriesFilter,
    setSavedValue,
    searchValue,
    savedValue,
    setCategoriesFilter,
    clearPaginationSearch,
    findProductsByValue,
  } = useSearchStore()

  const isSearchDocument = documentType === 'search'
  const isRecommendedDocument = documentType === 'recommended'
  const isRegularDocument = documentType === 'regular'
  const { categoriesLvl1, categoriesLvl2, categoriesLvl3 } = useCategories()
  const lvl1Bread = categoriesLvl1?.filter((item) => item.identify == lvl1)
  const lvl2Bread = categoriesLvl2?.filter((item) => item.extId == lvl2!)
  const lvl3Bread = categoriesLvl3?.filter((item) => item.extId == lvl3!)

  useEffect(() => {
    setCatalogParameters(lvl1 ?? '0', lvl2 ?? '0', lvl3 ?? '0', location.search)
    if (!isSearchDocument && !isRecommendedDocument && !isRegularDocument) {
      setDocumentType('catalog')
      setSavedValue('')
      setCategoriesFilter([])
      clearPaginationSearch()
      getCatalog()
    }
    if (isSearchDocument) {
      setDocumentType('search')
      findCategoriesFilter()
      findProductsByValue(
        lvl1 ?? '0',
        lvl2 ?? '0',
        lvl3 ?? '0',
        location.search
      )
    }

    if (isRecommendedDocument) {
      setDocumentType('recommended')
      setSavedValue('')
      setCategoriesFilter([])
      clearPaginationSearch()
      getCatalog()
    }

    if (isRegularDocument) {
      setDocumentType('regular')
      setSavedValue('')
      setCategoriesFilter([])
      clearPaginationSearch()
      getCatalog()
    }
    getAttributes(searchValue)
  }, [location.pathname, location.search])

  return (
    <Container maxWidth="xl" sx={{ marginTop: '200px' }}>
      {/* <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href={`/client/catalog/${lvl1Bread[0]?.identify}/0/0`}>
          {lvl1Bread[0]?.title || ''}
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`/client/catalog/${lvl1Bread[0]?.identify}/${lvl2Bread[0]?.extId}/0`}
        >
          {lvl2Bread[0]?.title || ''}
        </Link>
        <Typography variant='h5'>
          {lvl3Bread[0]?.title || ''}
        </Typography>
      </Breadcrumbs> */}
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
