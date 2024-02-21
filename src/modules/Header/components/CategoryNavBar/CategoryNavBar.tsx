import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCategories } from '../../../Catalog/store/CategoriesStore'
import { checkIsBlockedForView } from '../../../Catalog/helpers/checkIsBlockedForView'
const CategoryNavBar = () => {
  const { categories, getCategories } = useCategories()
  const [active, setActeve] = useState('')
  const navigate = useNavigate()

  const handlePush = (
    lvl1: ICategory,
    lvl2: ICategory,
    currentItem: ICategory
  ) => {
    if (currentItem.lvlNumber === 2) {
      const check = checkIsBlockedForView(currentItem)
      if (!check) {
        navigate(`/client/catalog/${lvl1.identify}/${lvl2.extId}/0`)
      }
    }

    if (currentItem.lvlNumber === 3) {
      const check = checkIsBlockedForView(lvl2)
      if (!check) {
        navigate(
          `/client/catalog/${lvl1.identify}/${lvl2.extId}/${currentItem.extId}`
        )
      }
    }
  }

  useEffect(() => {
    if (categories.length === 0) {
      getCategories()
    }
  }, [])

  return (
    <nav
      id="cat-nav"
      className={
        true ? 'active header-cats-main-desktop' : 'header-cats-main-desktop'
      }
    >
      <div className="container">
        <ul className="main-menu-ecare">
          {categories?.map((element, index) => {
            if (element.lvlNumber === 1 && element.isPublished) {
              return (
                <li
                  key={index}
                  className={
                    active === element.id.toString()
                      ? 'active main-li'
                      : 'main-li'
                  }
                >
                  <Link to={`/client/catalog/${element.identify}/0/0?page=1`}>
                    <p>{element.title}</p>
                  </Link>

                  <div
                    id={'sub_menu_' + element.id}
                    className={
                      active === element.id.toString()
                        ? 'wide-sub-menu active'
                        : 'wide-sub-menu'
                    }
                  >
                    {element?.categories && element.categories.length > 0 && (
                      <div className="sub-menu-wrapp scrollbar animated fadeIn">
                        <div className="flex-container">
                          <div className="col-lg-12 flex-container sub-menu-container">
                            {element.categories?.map((elem, ind) => {
                              return (
                                <div
                                  key={ind}
                                  className="item"
                                  onClick={() =>
                                    handlePush(element, elem, elem)
                                  }
                                >
                                  <a>
                                    <h2>{elem.title}</h2>
                                  </a>
                                  <div className="children">
                                    <ul>
                                      {elem?.categories?.map((e, i) => {
                                        return (
                                          <li
                                            key={i}
                                            onClick={() =>
                                              handlePush(element, elem, e)
                                            }
                                          >
                                            <a>{e.title}</a>
                                          </li>
                                        )
                                      })}
                                    </ul>
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          <div className="col-lg-3">
                            <div className="banner animated pulse">
                              {/* <Link to={element.Link ? element.Link : '/'}> */}
                              {/* <img src={`${process.env.REACT_APP_MEDIA}/banner/${element.Banner}`} alt="" /> */}
                              {/* </Link> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              )
            }
          })}
          <li>
            <Link to={`/client/medi-special`}>
              <p style={{ color: '#c52a43' }}>{'MEDI SPECIAL'}</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default CategoryNavBar
