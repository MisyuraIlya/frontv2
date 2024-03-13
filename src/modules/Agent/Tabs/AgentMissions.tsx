import { Box } from '@mui/material'
import React from 'react'
import MyScheduleCalendar from '../components/MyScheduleCalendar'
import WeekFilter from '../components/WeekFilter'

const AgentMissions = () => {
  // const { fetchAgentCalendar, weekFrom, weekTo } = useMyScheduleCalendar()
  // const { setObjectCreate } = useModals()
  // const { id } = useParams()
  // useEffect(() => {
  //   fetchAgentCalendar()
  // }, [weekFrom, weekTo, id])

  return (
    <Box>
      <div>
        <div className="myCenterAlign myWidth">
          <WeekFilter />
        </div>
        <div className="myMarginTop">
          <MyScheduleCalendar />
        </div>
      </div>
      {/* <SideButton onClickBtn={() => setObjectCreate(true)} imgLink="" /> */}
    </Box>
  )
}

export default AgentMissions
