import React, { useEffect } from 'react'
import CategoriesEditList from '../components/CategoryEdit/CategoriesEditList'
import CategoryEditFilters from '../components/CategoryEdit/CategoryEditFilters'
import BreadCrumbs from '../../../shared/BreadCrumbs'
import { useCategories } from '../../Catalog/store/CategoriesStore'
import Loader from '../../../shared/Loader'
import { useParams } from 'react-router-dom'
const CategoryEdit = () => {
  const { documentType, lvl1, lvl2, lvl3 } = useParams()
  const {
    loading,
    getDynamicCategories,
    setLvls,
    categoriesLvl1,
    categoriesLvl2,
    categoriesLvl3,
  } = useCategories()
  const lvl1Bread = categoriesLvl1?.filter((item) => item.identify == lvl1!)
  const lvl2Bread = categoriesLvl2?.filter((item) => item.extId == lvl2!)
  const lvl3Bread = categoriesLvl3?.filter((item) => item.extId == lvl3!)

  useEffect(() => {
    setLvls(lvl1!, lvl2!, lvl3!)
    getDynamicCategories()
  }, [lvl1, lvl2, lvl3])

  return (
    <div className="category-edit">
      <div className="container">
        <BreadCrumbs
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
        />
      </div>
      {loading && <Loader />}
      <div className="container items-container">
        <CategoryEditFilters />
        <CategoriesEditList />
      </div>
    </div>
  )
}

export default CategoryEdit
