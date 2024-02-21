import React, { useEffect, useState } from 'react'

import MyCard from '../../../shared/MyCard'
import Wrap from '../../../shared/Wrap'
import { useAgentProfileStore } from '../store/agentProfile.store'
import Loader from '../../../shared/Loader'
import { useAuth } from '../../Auth/store/useAuthStore'
import { useModals } from '../../Modals/provider/ModalProvider'
import moment from 'moment'
const VisitsList = () => {
  const { loading, visits } = useAgentProfileStore()
  const { isSuperAgent, isAdmin } = useAuth()
  const { setVisitModalItem } = useModals()

  return (
    <div className="VisitsList">
      <div className="head">
        <div className="flex-container">
          <div className="col-lg-5">
            <p>לקוח</p>
          </div>
          <div className="col-lg-2">
            <p>כתובת</p>
          </div>
          <div className="col-lg-2">
            <p>טלפון</p>
          </div>
          <div className="col-lg-1">
            <p>שעות</p>
          </div>
          <div className="col-lg-1 myCenterAlign">
            <p>יום</p>
          </div>
          <div className="col-lg-1 myCenterAlign">
            <p>פעולות</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loaderHeightMin myCenterAlign myWidth">
          <div className="myCenterAlign">
            <Loader />
          </div>
        </div>
      ) : (
        visits.map((item, index) => {
          return (
            <MyCard key={index}>
              <div className="flex-container">
                {item?.client && (
                  <div className="col-lg-5 colMobile6 mobileAlign">
                    <p>
                      {item?.client.extId} - {item?.client.name}
                    </p>
                  </div>
                )}
                <div className="col-lg-2 colMobile6 mobileAlign">
                  {/* <p>{item.client}</p> */}
                </div>
                <div className="col-lg-2 colMobile6 mobileAlign">
                  {/* <p>{item.clientContact}</p> */}
                </div>
                <div className="col-lg-1 colMobile3 mobileAlign">
                  {item.hourFrom && item.hourTo ? (
                    <p>
                      {moment(item.hourFrom).format('HH')} -{' '}
                      {moment(item.hourTo).format('HH')}
                    </p>
                  ) : (
                    <p>אין תאריכים</p>
                  )}
                </div>
                <div className="col-lg-1 colMobile3 myCenterAlign mobileAlign">
                  <p>{item.choosedDay}</p>
                </div>
                {(isSuperAgent || isAdmin) && (
                  <div className="col-lg-1 colMobile3 myCenterAlign mobileAlign modalBtn">
                    <Wrap onClick={() => setVisitModalItem(item)}>
                      <span className="material-symbols-outlined">draw</span>
                    </Wrap>
                  </div>
                )}
              </div>
            </MyCard>
          )
        })
      )}
    </div>
  )
}

export default VisitsList
