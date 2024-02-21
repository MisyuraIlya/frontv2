import React, { useState, useEffect } from 'react'
// import { NavLink, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Filters from './components/Filters'
// import useCategories from '../../store/CategoriesStore';
// import useSearchStore from '../../store/SearchStore';
import { useCatalog } from '../../store/CatalogStore'
import { useCategories } from '../../store/CategoriesStore'
import { useSearchStore } from '../../store/SearchStore'
import { useParams } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { checkIsBlockedForView } from '../../helpers/checkIsBlockedForView'
const RightSide = () => {
  const { categories } = useCategories()
  const { categoriesFilter } = useSearchStore()
  const [open, setOpen] = useState(false)
  const { lvl1, lvl2, lvl3, page, parent, type, documentType } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const isSearchDocument = documentType === 'search'
  const isAllProds = location?.pathname.includes('/0/0/0')

  const handlePush = (
    lvl1: ICategory,
    lvl2: ICategory,
    currentItem: ICategory
  ) => {
    if (currentItem.lvlNumber === 2) {
      const check = checkIsBlockedForView(currentItem)
      if (!check) {
        isSearchDocument
          ? navigate(
              `/client/${documentType}/${lvl1.identify}/${lvl2.extId}/0${location.search}`
            )
          : navigate(
              `/client/${documentType}/${lvl1.identify}/${lvl2.extId}/0?page=1`
            )
      }
    }

    if (currentItem.lvlNumber === 3) {
      const check = checkIsBlockedForView(lvl2)
      if (!check) {
        isSearchDocument
          ? navigate(
              `/client/${documentType}/${lvl1.identify}/${lvl2.extId}/${currentItem?.extId}/${location.search}`
            )
          : navigate(
              `/client/${documentType}/${lvl1.identify}/${lvl2.extId}/${currentItem?.extId}?page=1`
            )
      }
    }
  }

  return (
    <>
      <div
        className={
          open
            ? 'category-slidebar-super-main-cont open'
            : 'category-slidebar-super-main-cont closed'
        }
      >
        <div onClick={() => setOpen(!open)} className="close-cont">
          {open ? (
            <span className="material-symbols-outlined">close</span>
          ) : (
            <span className="material-symbols-outlined">filter_list</span>
          )}
        </div>
        <div className="category-slidebar-main-cont">
          <div className="category-slidebar-fixed-cont">
            <div className="category-slidebar-cont">
              <div className="slide-head-cont">
                <h2>{'סינון מוצרים'}</h2>
              </div>
              <div className="category-slidebar-subcont">
                <div className="category-list-cont">
                  <div
                    className="category-list-subcont"
                    onClick={() => setOpen(!open)}
                  >
                    <div className="lvl-cont">
                      <div
                        onClick={() =>
                          navigate(`/client/${documentType}/0/0/0`)
                        }
                      >
                        <h3 className={`lvl1 ${isAllProds ? 'active' : ''}`}>
                          הכל
                        </h3>
                      </div>
                    </div>
                    {(categoriesFilter?.length > 0
                      ? categoriesFilter
                      : categories
                    ).map((categoryLvl1, index1) => {
                      if (categoryLvl1.lvlNumber === 1) {
                        return (
                          <div className="lvl-cont" key={index1}>
                            <div
                              onClick={() => {
                                isSearchDocument
                                  ? navigate(
                                      `/client/${documentType}/${categoryLvl1.identify}/0/0${location.search}`
                                    )
                                  : navigate(
                                      `/client/${documentType}/${categoryLvl1.identify}/0/0?page=1`
                                    )
                              }}
                            >
                              <h3
                                className={
                                  lvl1 == categoryLvl1.identify
                                    ? 'lvl1 active'
                                    : 'lvl1'
                                }
                              >
                                {categoryLvl1.title}
                              </h3>
                            </div>
                            {categoryLvl1?.categories?.map(
                              (categoryLvl2, index2) => {
                                return (
                                  <div
                                    key={index2}
                                    className={
                                      categoryLvl1.identify.toString() === lvl1
                                        ? 'col active'
                                        : 'col'
                                    }
                                  >
                                    <div
                                      onClick={() =>
                                        handlePush(
                                          categoryLvl1,
                                          categoryLvl2,
                                          categoryLvl2
                                        )
                                      }
                                    >
                                      <h3
                                        className={
                                          lvl2 == categoryLvl2.extId
                                            ? 'active'
                                            : ''
                                        }
                                      >
                                        {categoryLvl2.title}
                                      </h3>
                                    </div>
                                    <ul
                                      className={
                                        categoryLvl2.extId == lvl2
                                          ? 'active'
                                          : ''
                                      }
                                    >
                                      {categoryLvl2?.categories?.map(
                                        (categoryLvl3, index3) => {
                                          return (
                                            <li
                                              key={index3}
                                              className={
                                                lvl3 == categoryLvl3.extId
                                                  ? 'active-a'
                                                  : ''
                                              }
                                            >
                                              <span
                                                className={
                                                  lvl3 == categoryLvl3.extId
                                                    ? 'active-a'
                                                    : ''
                                                }
                                                onClick={() =>
                                                  handlePush(
                                                    categoryLvl1,
                                                    categoryLvl2,
                                                    categoryLvl3
                                                  )
                                                }
                                              >
                                                {categoryLvl3.title}
                                              </span>
                                            </li>
                                          )
                                        }
                                      )}
                                    </ul>
                                  </div>
                                )
                              }
                            )}
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              </div>
              <Filters />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RightSide
