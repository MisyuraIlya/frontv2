import React, { useState } from 'react'
import { useDocuments } from '../store/DocumentsStore'
import moment from 'moment'
import { useCart } from '../../Cart/store/cart.store'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useModals } from '../../Modals/provider/ModalProvider'
import { useAuth } from '../../Auth/store/useAuthStore'
import Loader from '../../../shared/Loader'
import { onErrorAlert, onSuccessAlert } from '../../../shared/MySweetAlert'
const DocsFilter = () => {
  const {
    dateFrom,
    dateTo,
    setType,
    // handleSearchClick,
    searchValue,
    setSearchValue,
    downloadDocument,
    handleRestoreCartFunction,
    getItems,
    documentTypes,
    selectedDocument,
    setSelectedDocument,
    filesOrder,
  } = useDocuments()
  const navigate = useNavigate()
  const location = useLocation()
  const { isAdmin, isAgent, isSuperAgent } = useAuth()
  // const {location,push} = useHistory()
  const isDocumentPage = location.pathname.includes('documentPage')
  const isKartessetPage = location.pathname.includes('kartessetPage')
  const isHistoryPage = location.pathname.includes('historyPage')
  const isDocumentItemPage = location.pathname.includes('documentItemPage')
  const isHistoryItemPage = location.pathname.includes('historyItemPage')
  const { id } = useParams()
  const { cart, setCart } = useCart()
  const { setRestoreCartModal } = useModals()
  const { handlePdfViwer } = useModals()
  const [loadingRestoreCart, setLoadingRestoreCart] = useState(false)

  const handleResoreCart = async () => {
    try {
      setLoadingRestoreCart(true)

      // if (!isAdmin || !isAgent || !isSuperAgent) {
      //   setRestoreCartModal(true)
      // } else {
      // if (id) {
      const res = await handleRestoreCartFunction()
      if (res) {
        setCart(res)
        navigate('/cart')
      }
      // }
      // }
      onSuccessAlert('שחזור בוצע בהצלחה', 'עודכן מחיר עדכני')
    } catch (e) {
      onErrorAlert('תקלה בשחזור נתונים', 'נסה שנית מאוחר יותר')
    } finally {
      setLoadingRestoreCart(false)
    }
  }

  const handleDocument = async (file: string) => {
    if (id) {
      const link = await downloadDocument(file, id)
      // console.log('link',link.url)
      // window.open(link.url, '_blank');
    }
  }

  console.log('filesOrderr', filesOrder)

  return (
    <div className="for-calendar flex-container card">
      <div className="flex-container right-side-header col-lg-7">
        {loadingRestoreCart && <Loader />}
        <div className={'flex-container col-lg-12 docs-agent-header-cls'}>
          {!isHistoryItemPage && !isDocumentItemPage && (
            <>
              <div className="cal-cls  right-side-comp">
                <div className="open-calendar">
                  <p className="inline-cls">מתאריך</p>
                  <button
                    className="inline-cls"
                    onClick={() => setType('from')}
                  >
                    <span
                      className="material-symbols-outlined googleHoverIcon"
                      style={{ fontSize: '30px' }}
                    >
                      calendar_month
                    </span>
                    {moment(dateFrom).format('DD/MM/YYYY')}
                  </button>
                </div>
              </div>
              <div className="cal-cls  right-side-comp">
                <div className="open-calendar">
                  <p className="inline-cls">לתאריך</p>
                  <button className="inline-cls" onClick={() => setType('to')}>
                    <span
                      className="material-symbols-outlined googleHoverIcon"
                      style={{ fontSize: '30px' }}
                    >
                      calendar_month
                    </span>
                    {moment(dateTo).format('DD/MM/YYYY')}
                  </button>
                </div>
              </div>
              <div
                onClick={() => getItems()}
                className="cal-cls searchBtn-cont"
              >
                <p>חפש</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex-container left-side-header col-lg-5">
        <div className="userInfo-cls flex-container">
          <div className="left-side-comp header-btn-cont col-pay">
            {/* {!isKartessetPage && !isDocumentPage &&
                        <>
                        <div className="clientsAgentSearchWrapper">
                            <div className="search-cont">
                                <input
                                onChange={(e) => setSearchValue(e.target.value)}
                                value={searchValue}
                                type="text"
                                placeholder="חיפוש..."
                                />
                                {searchValue ?
                                <span className="material-symbols-outlined search-img"
                                    onClick={() => setSearchValue('')}>close</span>
                                :
                                <span className="material-symbols-outlined search-img">search</span>
                                }
                            </div>
                        </div>
                        </>
                    } */}
            {isDocumentPage && (
              <div className="select-cont">
                <select
                  value={selectedDocument}
                  onChange={(e) => setSelectedDocument(e.target.value)}
                >
                  {documentTypes?.map((ele, ind) => {
                    return (
                      <option key={ind} value={ele.value}>
                        {ele.label}
                      </option>
                    )
                  })}
                </select>
              </div>
            )}
            {(isDocumentItemPage || isHistoryItemPage) && (
              <>
                {/* <div className="select-cont first">
                  <div
                    className="file-cont"
                    onClick={() => handleDocument('pdf')}
                  >
                      <div className='flex-container'>
                        <span className="material-symbols-outlined">
                          picture_as_pdf
                        </span>
                        <p style={{display:'flex', justifyContent:'center', alignItems:'center', paddingRight:'5px',paddingTop:'5px'}}>{'הזמנה'}</p>
                      </div>
                  </div>
                </div> */}
                {/* <div className="select-cont second">
                            <div className="file-cont" onClick={()=> downloadDocument('xls',id)}>
                                <span className="material-symbols-outlined">description</span>
                            </div>
                        </div> */}
                <div className="select-cont">
                  <div className="file-cont" onClick={() => handleResoreCart()}>
                    <div className="flex-container">
                      <span className="material-symbols-outlined">
                        cloud_sync
                      </span>
                      <p
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingRight: '5px',
                          paddingTop: '5px',
                        }}
                      >
                        {'שחזר הזמנה'}
                      </p>
                    </div>
                  </div>
                </div>
                {filesOrder.length > 0 &&
                  filesOrder?.map((item) => (
                    <div className="select-cont first">
                      <div
                        className="file-cont"
                        onClick={() => handlePdfViwer(item.base64)}
                      >
                        <div className="flex-container">
                          <span className="material-symbols-outlined">
                            picture_as_pdf
                          </span>
                          <p
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingRight: '5px',
                              paddingTop: '5px',
                            }}
                          >
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                {/* {base64PdfTitle && base64Pdf && isDocumentItemPage &&
                  <div className="select-cont first">
                    <div
                      className="file-cont"
                      onClick={() => handlePdfViwer(base64Pdf)}
                    >
                      <div className='flex-container'>
                        <span className="material-symbols-outlined">
                          picture_as_pdf
                        </span>
                        <p style={{display:'flex', justifyContent:'center', alignItems:'center', paddingRight:'5px',paddingTop:'5px'}}>{base64PdfTitle}</p>
                      </div>
                    </div>
                  </div>
                } */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocsFilter
