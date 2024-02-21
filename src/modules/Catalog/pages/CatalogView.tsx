import React from 'react'
import { useCategories } from '../store/CategoriesStore'
import ContactFooter from '../../../shared/ContactFooter'
// import BreadCrubms from '../../../SharedComponents/BreadCrubms';
import { useParams, Link } from 'react-router-dom'

const CatalogView = () => {
  const { categoriesLvl1, loading } = useCategories()
  const { lvl1, lvl2, lv3 } = useParams()
  return (
    <div className="page-container category-view">
      <div className="heading">
        {loading && (
          <div className="spinner-wrapper">
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
        )}
      </div>
      <div className="container categories">
        {/* <BreadCrubms/> */}
        <div className="flex-container">
          {categoriesLvl1?.map((element: ICategory, index) => {
            if (element?.parent?.id == lvl1) {
              return (
                <div key={index} className="col-lg-3">
                  <Link to={`/client/catalog/${element.id}/0/0?page=1`}>
                    <div className="wrapper">
                      <img
                        src={
                          element?.MediaObject?.filePath
                            ? `${process.env.REACT_APP_MEDIA}/category/${element?.MediaObject?.filePath}`
                            : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
                        }
                      />
                      <h2>{element?.title}</h2>
                    </div>
                  </Link>
                </div>
              )
            }
          })}
        </div>
      </div>
      <ContactFooter />
    </div>
  )
}

export default CatalogView
