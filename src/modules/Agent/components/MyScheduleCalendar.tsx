import moment from 'moment'
import React, { useEffect, useState } from 'react'
import MobileMyScheduleCalendar from './MobileMyScheduleCalendar'
import {
  HourOfDay,
  useMyScheduleCalendar,
} from '../store/ScheduleCalendar.store'
import Loader from '../../../shared/Loader'
import { ConvertHebrewNameDayToWeekDateByWeekName } from '../helpers/ScheduleCalendar.helper'
import { useModals } from '../../Modals/provider/ModalProvider'
import { useMobile } from '../../Mobile/store/mobile.store'

const MyScheduleCalendar = () => {
  const {
    daysOfWeek,
    hoursOfDay,
    ScheduleCalendarInfo,
    fetchAgentCalendar,
    weekFrom,
    weekTo,
    loading,
  } = useMyScheduleCalendar()
  const { setTaskModal, setObjectItemModal } = useModals()
  const { isMobile } = useMobile()
  useEffect(() => {
    fetchAgentCalendar()
  }, [])
  return (
    <>
      {!isMobile ? (
        <div className="weekly-scheduler myMarginBottom">
          <div className="header">
            <div className="cell img_time">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            {daysOfWeek.map((day, index) => (
              <div key={day} className="cell day">
                <p>
                  {day} -{' '}
                  {ConvertHebrewNameDayToWeekDateByWeekName(index, weekFrom)}
                </p>
              </div>
            ))}
          </div>
          <div className="body">
            {loading ? (
              <div className="myCenterAlign loaderHeightMin">
                <Loader />
              </div>
            ) : (
              hoursOfDay.map((hour) => (
                <div key={hour} className="row">
                  <div className="cell hour">
                    <p>{hour}</p>
                  </div>
                  {daysOfWeek.map((day) => (
                    <div key={`${day}-${hour}`} className="cell">
                      {ScheduleCalendarInfo.map((event) => {
                        if (
                          event.choosedDay == day &&
                          moment(event.hourFrom).format('HH:mm') == hour
                        ) {
                          const eventDuration =
                            hoursOfDay.indexOf(
                              moment(event.hourTo).format('HH:mm') as HourOfDay
                            ) -
                            hoursOfDay.indexOf(
                              moment(event.hourFrom).format(
                                'HH:mm'
                              ) as HourOfDay
                            )
                          return (
                            <div
                              key={`${day}-${hour}-${event.hourFrom} event`}
                              className={`event_1`}
                              style={{ height: `${eventDuration * 100}px` }}
                              onClick={() => setObjectItemModal(event)}
                            >
                              <div className={`entire`}>
                                <div className="head">
                                  <div className="hour_card">
                                    {moment(event.hourTo).format('HH:mm')}
                                  </div>
                                  <div className="hour_card">
                                    {moment(event.hourFrom).format('HH:mm')}
                                  </div>
                                </div>
                                <div className="cont_block">
                                  <div className="heading">
                                    {event.subTusk ? (
                                      <h3>{event.subTusk.length} משולב</h3>
                                    ) : (
                                      <h3>
                                        {event.objectiveType == 'task'
                                          ? 'משימה'
                                          : 'ביקור'}
                                      </h3>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <MobileMyScheduleCalendar />
      )}
    </>
  )
}

export default MyScheduleCalendar
