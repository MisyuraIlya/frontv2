import React, { useEffect } from 'react'
import BreadCrumbs from '../../../shared/BreadCrumbs'
import ProductsEditList from '../components/ProductsEdit/ProductsEditList'
import { useParams } from 'react-router-dom'
import { useCategories } from '../../Catalog/store/CategoriesStore'
import { Container } from '@mui/material'
import ProductsEditFilters from '../components/ProductsEdit/ProductsEditFilters'
import useSWR from 'swr'
import { AdminProductService } from '../services/products.service'
import { useProductsEditStore } from '../store/ProductsEditStore'
import Loader from '../../../shared/Loader'

const ProductsEdit = () => {
  const { lvl1, lvl2, lvl3 } = useParams()
  const { setProducts } = useProductsEditStore()

  const fetchData = async () => {
    return await AdminProductService.GetProducts(
      lvl1 ?? '0',
      lvl2 ?? '0',
      lvl3 ?? '0'
    )
  }

  const { data, isLoading } = useSWR(
    `api/catalog/catalog/${lvl1}/${lvl2}/${lvl3}`,
    fetchData
  )

  useEffect(() => {
    if (data) {
      setProducts(data['hydra:member'])
    }
  }, [data])

  return (
    <Container maxWidth="lg">
      {isLoading && <Loader />}
      <BreadCrumbs
        array={[
          {
            title: lvl1 || '0',
            link: `/admin/category-edit/${lvl1}/0/0` || '',
          },
          {
            title: lvl2 || '0',
            link: `/admin/category-edit/${lvl1}/${lvl2}/0` || '',
          },
          {
            title: lvl3 || '0',
            link: `/admin/category-edit/${lvl1}/${lvl2}/${lvl3}` || '',
          },
        ]}
      />
      <ProductsEditFilters />
      <ProductsEditList />
    </Container>
  )
}

export default ProductsEdit
