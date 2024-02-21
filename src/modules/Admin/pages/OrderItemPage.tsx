import React from 'react'
import { useAdminOrders } from '../store/OrdersStore'
import BreadCrumbs from '../../../shared/BreadCrumbs'
import OrderItemList from '../components/OrderItemPage/OrderItemList'
import Loader from '../../../shared/Loader'

const OrderItemPage = () => {
  const { loading, showCalendar } = useAdminOrders()
  return (
    <div className="page-container history admin-history docs agent-docsItems-approvePage">
      <div className="docs-sub-cont">
        {loading && <Loader />}
        {/* <BreadCrumbs/> */}
        <div
          className={
            showCalendar ? 'doc-container active card' : 'doc-container card'
          }
        >
          <div id="lines-main-cont" className="lines-main-cont">
            <OrderItemList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItemPage
