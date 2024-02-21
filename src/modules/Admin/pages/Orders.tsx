import React, { useEffect } from 'react'
import OrdersFilter from '../components/Orders/OrdersFilter'
import OrdersList from '../components/Orders/OrdersList'
import { useAdminOrders } from '../store/OrdersStore'
import Calendar from 'react-calendar'
import moment from 'moment'
import { useLocation, useNavigate } from 'react-router-dom'
import BreadCrumbs from '../../../shared/BreadCrumbs'
const Orders = () => {
  const {
    getOrders,
    choosedDate,
    showCalendar,
    setShowCalendar,
    type,
    setDateFrom,
    setDateTo,
    setSearch,
    setDocumentType,
    setPage,
  } = useAdminOrders()

  const location = useLocation()
  const navigate = useNavigate()
  const handleCalendar = (date: any) => {
    const urlSearchParams = new URLSearchParams(location.search)
    if (type === 'from') {
      urlSearchParams.set('from', moment(date).format('YYYY-MM-DD'))
    } else {
      urlSearchParams.set('to', moment(date).format('YYYY-MM-DD'))
    }
    const updatedUrl = '?' + urlSearchParams.toString()
    navigate(location.pathname + updatedUrl)
    setShowCalendar(false)
  }

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search)
    const page = urlSearchParams.get('page')
    const from = urlSearchParams.get('from')
    const to = urlSearchParams.get('to')
    if (page) {
      setPage(page?.toString())
    }
    if (from) {
      setDateFrom(new Date(from))
    }
    if (to) {
      setDateTo(new Date(to))
    }
    getOrders()
  }, [location.search])
  return (
    <div className="page-container history admin-history docs agent-docs agent-docs-approvePage karteset gviya">
      <div className="docs-sub-cont">
        <BreadCrumbs array={[]} />
        <Calendar
          onChange={(date) => handleCalendar(date)}
          value={new Date(choosedDate)}
          locale="he-IL"
          className={showCalendar ? 'active' : null}
        />
        <OrdersFilter />
        <OrdersList />
      </div>
    </div>
  )
}

export default Orders
