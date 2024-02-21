import React from 'react'
import BreadCrumbs from '../../../shared/BreadCrumbs'
import Heading from '../components/ProductsEdit/Heading'
import ProductsEditList from '../components/ProductsEdit/ProductsEditList'
import { useParams } from 'react-router-dom'
import { useCategories } from '../../Catalog/store/CategoriesStore'

const ProductsEdit = () => {
  const { documentType, lvl1, lvl2, lvl3 } = useParams()
  const {
    loading,
    getAllCategories,
    categoriesLvl1,
    categoriesLvl2,
    categoriesLvl3,
  } = useCategories()
  const lvl1Bread = categoriesLvl1?.filter((item) => item.identify == lvl1!)
  const lvl2Bread = categoriesLvl2?.filter((item) => item.extId == lvl2!)
  const lvl3Bread = categoriesLvl3?.filter((item) => item.extId == lvl3!)

  return (
    <div className="category-edit blog-edit">
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

      <div className="container items-container">
        <div className="items" style={{ paddingTop: '20px' }}>
          <Heading />
          <ProductsEditList />
        </div>
      </div>
    </div>
  )
}

export default ProductsEdit
