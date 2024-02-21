import React from 'react'
import { useDocuments } from '../store/DocumentsStore'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import { useModals } from '../../Modals/provider/ModalProvider'

const DocumentCardList = () => {
  const { orderItems, showCalendar, loadingItemsPage } = useDocuments()
  const { selectProduct } = useModals()
  return (
    <div
      className={
        showCalendar ? 'doc-container active card' : 'doc-container card'
      }
    >
      <div id="lines-main-cont" className="lines-main-cont">
        <table className="lines-sub-cont">
          <tbody>
            <tr className="heading">
              <th>
                <p>מוצר</p>
              </th>
              <th className="col-cont sticky-col"></th>
              <th className="col-cont">
                <p>כמות</p>
              </th>
              <th className="col-cont">
                <p>מחיר יח'</p>
              </th>
              <th className="col-cont">
                <p>הנחה</p>
              </th>
              <th className="col-cont">
                <p>סה״כ</p>
              </th>
            </tr>
            {orderItems?.map((element, index) => {
              return (
                <tr
                  key={index}
                  className={'item'}
                  id={'docRow_' + index}
                  onClick={() => selectProduct(element?.product)}
                >
                  <th>
                    <img
                      className="img"
                      width={100}
                      src={
                        element?.product?.defaultImagePath
                          ? process.env.REACT_APP_MEDIA +
                            '/product/' +
                            element?.product?.defaultImagePath
                          : process.env.REACT_APP_MEDIA + '/placeholder.jpg'
                      }
                    />
                  </th>
                  <th className="col-cont sticky-col">
                    <p className="AccountKey  no-margin">
                      {'#' + element?.sku}
                    </p>
                    <p className="AccountName  no-margin">{element?.title}</p>
                  </th>
                  <th className="col-cont">
                    <p>{element?.quantity}</p>
                  </th>
                  <th className="col-cont">
                    <p>{element?.priceByOne}</p>
                  </th>
                  <th className="col-cont">
                    <p>{element?.discount.toFixed(1) + '%'}</p>
                  </th>
                  <th className="col-cont">
                    <p>{numberWithCommas(element?.total.toFixed(1))}</p>
                  </th>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="MyCentered">
          {orderItems?.length === 0 && !loadingItemsPage ? (
            <h1 className="no-products">לא נמצאו פריטים למסמך זה</h1>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default DocumentCardList
