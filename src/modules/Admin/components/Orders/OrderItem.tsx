import moment from 'moment'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
interface OrderItemProps {
  element: IHistory
  index: number
}
const OrderItem: FC<OrderItemProps> = ({ element, index }) => {
  const navigate = useNavigate()
  return (
    <tr
      key={index}
      className={'item'}
      id={'docRow_' + element?.id}
      onClick={() => navigate(`/admin/approveDocItems/${element.id}`)}
    >
      <th className="col-cont sticky-col">
        <p className="AccountKey no-margin">{'#' + element?.user?.extId}</p>
        <p className="AccountName  no-margin">{element?.user?.name}</p>
      </th>
      <th className="col-cont">
        {!element?.user ? (
          <span className="material-symbols-outlined search-img">
            {'support_agent'}
          </span>
        ) : (
          <span className="material-symbols-outlined search-img">
            {'person'}
          </span>
        )}
      </th>
      <th className="col-cont">
        <p>{element?.id}</p>
      </th>
      <th className="col-cont">{/* <p>{DocType}</p> */}</th>
      <th className="col-cont">
        <p>{moment(element?.createdAt).format('DD-MM-YYYY')}</p>
      </th>
      <th className="col-cont">{/* <p>{element.AgentName}</p> */}</th>
      <th className="col-cont">
        <p>{element?.total.toFixed(1)}</p>
      </th>
      <th className="col-cont">
        <p className="docId  no-margin">
          {element.orderExtId ? '#' + element.orderExtId : '-'}
        </p>
        <p className="docNumber  no-margin">
          {element?.orderStatus ? '#' + element?.orderStatus : ''}
        </p>
      </th>
      <th className="col-cont col-approved">
        <p className={''}>{element?.orderStatus}</p>
      </th>
      <th className="col-cont">
        {/* <p>{element.SuperAgentName ? element.SuperAgentName : '-'}</p> */}
      </th>
      <th className="col-cont">
        {element?.sendErpAt && (
          <p>{moment(element?.sendErpAt).format('DD-MM-YYYY HH:mm')}</p>
        )}
      </th>
      <th className="col-cont col-approved">
        <p>{element?.isSendErp ? 'נמצא' : 'לא נמצא'}</p>
      </th>
    </tr>
  )
}

export default OrderItem
