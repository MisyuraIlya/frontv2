import React, { useEffect } from 'react'
import CategoriesEditList from '../components/CategoryEdit/CategoriesEditList'
import CategoryEditFilters from '../components/CategoryEdit/CategoryEditFilters'
import BreadCrumbs from '../../../shared/BreadCrumbs'
import { useCategories } from '../../Catalog/store/CategoriesStore'
import Loader from '../../../shared/Loader'
import { useParams } from 'react-router-dom'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'
import { Container } from '@mui/material'
import useSWR from 'swr'
import { AdminCatalogService } from '../services/catalog.service'
import { useAdminCategories } from '../store/CategoriesStore'
const CategoryEdit = () => {
  const { lvl1, lvl2 } = useParams()
  const { setCategories } = useAdminCategories()

  const fetchData = async () => {
    return await AdminCatalogService.getAdminCategoory(lvl1 ?? '0', lvl2 ?? '0')
  }

  const { data, isLoading } = useSWR(
    `api/adminCategories/${lvl1}/${lvl2}`,
    fetchData
  )

  useEffect(() => {
    if (data) {
      setCategories(data['hydra:member'])
    }
  }, [data])

  return (
    <Container maxWidth="lg">
      {/* <BreadCrumbsUtil
        array={[
          {
            title: lvl1Bread[0]?.title || '',
            link: `/admin/category-edit/${lvl1Bread[0]?.id}/0/0` || '',
          },
          {
            title: lvl2Bread[0]?.title || '',
            link:
              `/admin/category-edit/${lvl1Bread[0]?.id}/${lvl2Bread[0]?.id}/0` ||
              '',
          },
          { title: lvl3Bread[0]?.title || '', link: '' },
        ]}
      /> */}
      {isLoading && <Loader />}
      {/* <CategoryEditFilters /> */}
      <CategoriesEditList />
    </Container>
  )
}

export default CategoryEdit
