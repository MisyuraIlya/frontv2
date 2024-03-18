import React, { FC, useState } from 'react'
import { HourOfDay } from '../../store/ScheduleCalendar.store'
import MissionModal from './UpdateMissionModal'

type DayOfWeek = 'ראשון' | 'שני' | 'שלישי' | 'רביעי' | 'חמישי' | 'שישי' | 'שבת'

interface MySheduleCalendarItemProps {
  event: IAgentObjective
  day: DayOfWeek
  hour: HourOfDay
  eventDuration: number
}
const MySheduleCalendarItem: FC<MySheduleCalendarItemProps> = ({
  event,
  day,
  hour,
  eventDuration,
}) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        key={`${day}-${hour}-${event.hourFrom} event`}
        className={`event_1`}
        style={{ height: `${eventDuration * 100}px` }}
        onClick={() => setOpen(!open)}
      >
        <div className={`entire`}>
          <div className="head">
            <div className="hour_card">{event.hourTo}</div>
            <div className="hour_card">{event.hourFrom}</div>
          </div>
          <div className="cont_block">
            <div className="heading">
              {event.subTusk ? (
                <h3>{event.subTusk.length} משולב</h3>
              ) : (
                <h3>{event.objectiveType == 'task' ? 'משימה' : 'ביקור'}</h3>
              )}
            </div>
          </div>
        </div>
      </div>
      <MissionModal item={event} open={open} setOpen={setOpen} />
    </>
  )
}

export default MySheduleCalendarItem
