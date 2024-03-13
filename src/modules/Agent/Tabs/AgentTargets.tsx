import { Box } from '@mui/material'
import React from 'react'
import TargetList from '../components/TargetList'

const AgentTargets = () => {
  return (
    <Box>
      <div className="myMarginTop">
        {/* <YearSelectorBanner isDashborad={false} /> */}
      </div>
      <div className="myMarginTop">
        <div className="TargetListCont">
          <TargetList />
        </div>
      </div>
    </Box>
  )
}

export default AgentTargets
