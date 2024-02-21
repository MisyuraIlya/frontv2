import React, { FC } from 'react'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import { useSelectedProduct } from '../../store/selecterdProduct.store'
import moment from 'moment'
import { TailSpin } from 'react-loader-spinner'

type TablePopUpProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const TablePopUp: FC<TablePopUpProps> = ({ active, setActive }) => {
  const { selectedProd, purchesHistoryData, purcheseLoading } =
    useSelectedProduct()
  return (
    <ModalWrapper width={50} height={65} active={active} setActive={setActive}>
      <div className="tablePopUp docs">
        <>
          <div className="for-calendar flex-container card">
            <div className="golbal-header">
              <h3 className="mainTitle">{'פירוט היסטוריית רכישה'}</h3>
              <p className="subTitle">{selectedProd?.title}</p>
              <p className="subTitle">{selectedProd?.sku + '#'}</p>
            </div>
          </div>
          <div
            id="lines-main-cont"
            className={true ? 'lines-main-cont openDept' : 'lines-main-cont'}
          >
            <table className="lines-sub-cont">
              <tbody>
                <tr className="heading">
                  <th className="col-cont">
                    <p>{'מסמך'}</p>
                  </th>
                  <th className="col-cont">
                    <p>{'תאריך'}</p>
                  </th>
                  <th className="col-cont">
                    <p>{'כמות'}</p>
                  </th>
                  <th className="col-cont">
                    <p>{'מחיר'}</p>
                  </th>
                  <th className="col-cont">
                    <p>{'מחיר אחרי מע"מ'}</p>
                  </th>
                  <th className="col-cont">
                    <p>{'הנחה'}</p>
                  </th>
                  <th className="col-cont">
                    <p>{'סה"כ בתנועה'}</p>
                  </th>
                  <th className="col-cont">
                    <p>{'סה"כ בתנועה אחרי מע"מ'}</p>
                  </th>
                </tr>
                {!purcheseLoading &&
                  purchesHistoryData?.map((element, index) => {
                    return (
                      <tr key={index} className={'item'}>
                        <th className={false ? 'col-cont color' : 'col-cont'}>
                          <p>{element?.documentNumber}</p>
                        </th>
                        <th className={false ? 'col-cont color' : 'col-cont'}>
                          <p>{moment(element?.date).format('DD-MM-YYYY')}</p>
                        </th>
                        <th className={false ? 'col-cont color' : 'col-cont'}>
                          <p>{element?.quantity}</p>
                        </th>
                        <th className={false ? 'col-cont color' : 'col-cont'}>
                          <p>{element?.price}</p>
                        </th>
                        <th className={false ? 'col-cont color' : 'col-cont'}>
                          <p>{element?.vatPrice}</p>
                        </th>
                        <th className={false ? 'col-cont color' : 'col-cont'}>
                          <p>{element?.discount}</p>
                        </th>
                        <th className={false ? 'col-cont color' : 'col-cont'}>
                          <p>{element?.totalPrice}</p>
                        </th>
                        <th className={false ? 'col-cont color' : 'col-cont'}>
                          <p>{element?.vatTotal}</p>
                        </th>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
            {purcheseLoading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px',
                }}
              >
                <TailSpin height="40" width="40" color="black" visible={true} />
              </div>
            )}
            {purchesHistoryData.length === 0 && !purcheseLoading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px',
                }}
              >
                <p>לא נמצאו הזמנות עם הפריט זה</p>
              </div>
            )}
          </div>
        </>
      </div>
    </ModalWrapper>
  )
}

export default TablePopUp
