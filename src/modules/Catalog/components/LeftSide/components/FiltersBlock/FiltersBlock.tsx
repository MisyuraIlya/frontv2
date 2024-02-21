import React, { useEffect } from 'react'
import { useCatalog } from '../../../../store/CatalogStore'
import { useAuth } from '../../../../../Auth/store/useAuthStore'
import { useDebounce } from 'use-debounce'
import { useNavigate, useLocation } from 'react-router-dom'

const FiltersBlock = () => {
  const {
    prodsPerPage,
    setProdsPerPage,
    activeProdsPerPage,
    setActiveProdsPerPage,
    activeSortPerPage,
    setActiveSortPerPage,
    sortProdSetting,
    setSortProdSetting,
    listView,
    setListView,
    searchParam,
    setSearchParam,
    getCatalog,
    totalItems,
    setSearchParams,
  } = useCatalog()

  const location = useLocation()
  const navigate = useNavigate()
  const [searchDebounce] = useDebounce(searchParam, 1000)

  const handleOrderBy = (val: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('orderBy', val)
    const updatedUrl = '?' + urlSearchParams.toString()
    setSearchParams(updatedUrl)
    navigate(location.pathname + updatedUrl)
    if (val === 'sku') {
      setSortProdSetting('מק״ט')
    } else if (val === 'title') {
      setSortProdSetting('שם')
    } else if (val === 'id') {
      setSortProdSetting('מומלץ')
    }
    setActiveSortPerPage(false)
  }

  const handleChangeItemsPerPage = (number: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('itemsPerPage', number)
    urlSearchParams.set('page', '1')
    const updatedUrl = '?' + urlSearchParams.toString()
    setProdsPerPage(updatedUrl, number)
    navigate(location.pathname + updatedUrl)
  }

  const handleSearchValue = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', '1')
    if (value) {
      urlSearchParams.set('search', value)
    } else {
      urlSearchParams.delete('search')
      setSearchParam('')
    }
    const updatedUrl = '?' + urlSearchParams.toString()
    setSearchParams(updatedUrl)
    navigate(location.pathname + updatedUrl)
  }

  useEffect(() => {
    if (searchDebounce) {
      handleSearchValue(searchDebounce)
    }
  }, [searchDebounce])

  return (
    <div className="view-mode-cont">
      <div className="view-mode-rightcont flex-container">
        <div className="block quant-main">
          <p> {'נמצאו: ' + totalItems + ' מוצרים'}</p>
          {/* {isAgent && ((params.props.match.params.lvl2 && params.props.match.params.lvl2!='0') || params.props.match.params.type.includes('brand')) ?
              <div className="file-main-cont">
                <div className="file-cont" onClick={()=> params.downloadExcelPdf('xls', params.breadCrumbsNav)}>
                  <img src={process.env.REACT_APP_MEDIA + 'icons/excel.svg'} />
                </div>
                <div className="file-cont" onClick={()=> params.downloadExcelPdf('pdf', params.breadCrumbsNav)}>
                  <span className="material-symbols-outlined">picture_as_pdf</span>
                </div>
              </div>
          :null} */}
        </div>
        <div className="search-block block">
          <input
            type="text"
            onChange={(e) => setSearchParam(e.target.value)}
            value={searchParam}
            placeholder={'חיפוש מוצר...'}
          />
          {searchParam == '' ? (
            <span className="material-symbols-outlined search-img">search</span>
          ) : (
            <span
              className="material-symbols-outlined search-img"
              onClick={() => {
                handleSearchValue('')
              }}
            >
              close
            </span>
          )}
        </div>

        <div className="block sort-main">
          <div className="sort-sub">
            <p className="p-title">{'מוצרים:'}</p>
            <div className="drop-down-main">
              <div
                className="select-main"
                onClick={() => setActiveProdsPerPage(!activeProdsPerPage)}
              >
                <p>{prodsPerPage}</p>
                <img
                  src={process.env.REACT_APP_MEDIA + '/icon/down-chevron.svg'}
                  alt=""
                />
              </div>
              {activeProdsPerPage ? (
                <div className="drop-down-open-cont">
                  <ul>
                    <li onClick={() => handleChangeItemsPerPage('2')}>2</li>
                    <li onClick={() => handleChangeItemsPerPage('24')}>24</li>
                    <li onClick={() => handleChangeItemsPerPage('48')}>48</li>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="block sort-main">
          <div className="sort-sub">
            <p className="p-title">{'מיון:'}</p>
            <div className="drop-down-main">
              <div
                className="select-main"
                onClick={() => setActiveSortPerPage(!activeSortPerPage)}
              >
                <p>{sortProdSetting}</p>
                <img
                  src={process.env.REACT_APP_MEDIA + '/icon/down-chevron.svg'}
                  alt=""
                />
              </div>
              {activeSortPerPage ? (
                <div className="drop-down-open-cont">
                  <ul>
                    <li onClick={() => handleOrderBy('id')}>{'מומלץ'}</li>
                    <li onClick={() => handleOrderBy('title')}>{'שם'}</li>
                    <li onClick={() => handleOrderBy('sku')}>{'מק״ט'}</li>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="block check-box-sub-cont check-row view-main">
          <p>{'תצוגה:'}</p>
          <div
            className={
              !listView ? 'view-img-cont actice' : 'view-img-cont  not-active'
            }
            onClick={() => setListView(false)}
          >
            <span
              className="material-symbols-outlined googleIconHover"
              style={{ fontSize: '30px' }}
            >
              grid_view
            </span>
          </div>
          <div
            className={
              listView ? 'view-img-cont actice' : 'view-img-cont not-active'
            }
            onClick={() => setListView(true)}
          >
            <span
              className="material-symbols-outlined googleIconHover"
              style={{ fontSize: '30px' }}
            >
              list
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FiltersBlock
