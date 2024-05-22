import React from 'react'
import ProductsEditList from '../modules/Admin/components/ProductsEdit/ProductsEditList'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'
import ProductsEditFilters from '../modules/Admin/components/ProductsEdit/ProductsEditFilters'
import Loader from '../shared/Loader'
import BreadCrumbsUtil from '../utils/BreadCrumbs/BreadCrumbsUtil'
import useDataProductsEdit from '../hooks/useAdminDataProductsEdit'
import { findCategoryTitleById } from '../helpers/handleBreadCrumbs'
import useDataCategories from '../hooks/useDataCategories'
import Admin from '../components/admin'
const ProductsEdit = () => {
  const { lvl1, lvl2, lvl3 } = useParams()
  const { isLoading } = useDataProductsEdit()
  const { data } = useDataCategories()
  const categoriesArray = data?.['hydra:member'] || []
  const res1 = findCategoryTitleById(+lvl1!, categoriesArray)
  const res2 = findCategoryTitleById(+lvl2!, categoriesArray)
  const res3 = findCategoryTitleById(+lvl2!, categoriesArray)

  return (
    <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
      {/* {isLoading && <Loader />}
      <BreadCrumbsUtil
        array={[
          {
            title: res1 ?? '',
            link: `/admin/category-edit/${lvl1}/0/0` || '',
          },
          {
            title: res2 ?? '',
            link: `/admin/category-edit/${lvl1}/${lvl2}/0` || '',
          },
        ]}
      />
      <ProductsEditFilters />
      <ProductsEditList /> */}
      <Admin.Products.Filter />
      <Admin.Products.List />
    </Container>
  )
}

export default ProductsEdit
