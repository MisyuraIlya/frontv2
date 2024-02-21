import React, { useEffect, useState } from 'react'
import { useAdminOrders } from '../../store/OrdersStore'
import moment from 'moment'
import { useDebounce } from 'use-debounce'
import SearchInput from '../../../../shared/SearchInput'

const OrdersFilter = () => {
  const { setSearch, search, dateFrom, dateTo, setType, getOrders } =
    useAdminOrders()
  const [activeSearch, setActiveSearch] = useState(false)
  const [valueDebounced] = useDebounce(search, 1000)

  useEffect(() => {
    if (valueDebounced && activeSearch) {
      getOrders()
    }
  }, [valueDebounced])
  return (
    <div className="for-calendar flex-container card">
      <div className="flex-container right-side-header col-lg-7">
        <div className={'flex-container col-lg-12 docs-agent-header-cls'}>
          <div className="cal-cls  right-side-comp">
            <div className="open-calendar">
              <p className="inline-cls">מתאריך</p>
              <button className="inline-cls" onClick={() => setType('from')}>
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
          <div onClick={() => getOrders()} className="cal-cls searchBtn-cont">
            <p>חפש</p>
          </div>
        </div>
      </div>
      <div className="flex-container left-side-header col-lg-5">
        <div className="userInfo-cls flex-container">
          <div className="left-side-comp header-btn-cont col-pay">
            <div className="clientsAgentSearchWrapper">
              <SearchInput
                search={search}
                setSearch={setSearch}
                onActive={setActiveSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersFilter
