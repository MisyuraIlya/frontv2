import React from 'react'
import { useDocuments } from '../store/DocumentsStore'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
const DocumentList = () => {
  const { showCalendar, items, searchValue, loading, clerOrderItems } =
    useDocuments()
  const navigate = useNavigate()

  return (
    <div
      className={
        showCalendar ? 'doc-container active card' : 'doc-container card'
      }
    >
      {!showCalendar && items.length === 0 ? (
        <h1 className="no-products">בחר טווח תאריכים ובצע חיפוש</h1>
      ) : null}
      {items.length === 0 && !loading ? (
        <h1 className="no-products">לא נמצאו מסמכים בטווח תאריכים</h1>
      ) : null}
      {searchValue && searchValue.length == 0 ? (
        <h1 className="no-products">לא נמצאו מסמכים בתאריכים אלו</h1>
      ) : null}
      {items.length > 0 ? (
        <div id="lines-main-cont" className="lines-main-cont">
          <table className="lines-sub-cont">
            <tbody>
              <tr className="heading">
                <th className="col-cont sticky-col">
                  <p>#</p>
                </th>
                <th className="col-cont sticky-col">
                  <p>לקוח</p>
                </th>
                <th className="col-cont">
                  <p>סוג</p>
                </th>
                <th className="col-cont">
                  <p>ת.ערך</p>
                </th>
                <th className="col-cont">
                  <p>ת.תשלום</p>
                </th>

                <th className="col-cont">
                  <p>סה״כ</p>
                </th>
                <th className="col-cont">
                  <p>סטאטוס</p>
                </th>
              </tr>
              {(items as IDocument[])?.map(
                (element: IDocument, index: number) => {
                  let docAllowed = true
                  if (docAllowed == true) {
                    return (
                      <tr
                        key={index}
                        className={'item'}
                        onClick={() => {
                          if (element.type === 'טיוטה') {
                            navigate(
                              `/historyItemPage/${element?.document_number}`
                            )
                          } else {
                            navigate(
                              `/documentItemPage/${element?.document_type}/${element?.document_number}`
                            )
                          }
                          clerOrderItems()
                        }}
                      >
                        <th className="col-cont sticky-col">
                          <p className="AccountKey no-margin">
                            {'#' + element?.document_number}
                          </p>
                        </th>
                        <th className="col-cont sticky-col">
                          <p className="AccountKey no-margin">
                            {'#' + element?.userExId}
                          </p>
                          <p className="AccountName  no-margin">
                            {element?.user_name}
                          </p>
                        </th>
                        <th className="col-cont">
                          <p>{element?.type}</p>
                        </th>
                        <th className="col-cont">
                          <p>{moment(element?.date).format('DD-MM-YYYY')}</p>
                        </th>
                        <th className="col-cont">
                          <p>
                            {moment(element?.date_payed).format('DD-MM-YYYY')}
                          </p>
                        </th>
                        <th className="col-cont">
                          <p>{element?.total.toFixed(1)}</p>
                        </th>
                        <th className="col-cont col-approved">
                          {element?.status ? (
                            <p className="Active">
                              {element?.status ? element?.status : 'אושר'}
                            </p>
                          ) : (
                            <p className="NotActive">ממתין</p>
                          )}
                        </th>

                        {/* <th className="col-cont">
                              {element?.DocumentID != '31' && element?.DocumentID != '3' ?
                                <div className="file-cont" onClick={()=> downloadFile(element, 'pdf')}>
                                  <span className="material-symbols-outlined">picture_as_pdf</span>
                                </div>
                              :null}
                            </th> */}
                      </tr>
                    )
                  }
                }
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}

export default DocumentList
