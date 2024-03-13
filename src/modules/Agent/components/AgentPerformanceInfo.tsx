import React from 'react'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import { useAgentProfileStore } from '../store/agentProfile.store'
import { useAuth } from '../../Auth/store/useAuthStore'
import MyCard from '../../../shared/MyCard'
import Wrap from '../../../shared/Wrap'
import { Card, Grid, Typography } from '@mui/material'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import LegendToggleIcon from '@mui/icons-material/LegendToggle'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import GroupIcon from '@mui/icons-material/Group'

const AgentPerformanceInfo = () => {
  const { user, isAdmin, isSuperAgent } = useAuth()
  const { agentPremormence } = useAgentProfileStore()

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6} className="centered" sx={{ gap: '5px' }}>
              <SupportAgentIcon />
              <Typography>{user?.name}</Typography>
            </Grid>
            <Grid item xs={6} className="centered" sx={{ gap: '5px' }}>
              <LegendToggleIcon />
              <Typography>{'סה״כ שנתי'}</Typography>
              <Typography>
                {numberWithCommas(agentPremormence?.totalOrderSum)}
              </Typography>
            </Grid>
            <Grid item xs={6} className="centered" sx={{ gap: '5px' }}>
              <AnalyticsIcon />
              <Typography>{'סל ממוצע'}</Typography>
              <Typography>
                {numberWithCommas(agentPremormence?.monthlyAverage)}
              </Typography>
            </Grid>
            <Grid item xs={6} className="centered" sx={{ gap: '5px' }}>
              <GroupIcon />
              <Typography>{'לקוחות'}</Typography>
              <Typography>
                {numberWithCommas(agentPremormence?.clientsAssigned)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography>{'סה״כ יומי'}</Typography>
              <Typography>
                {numberWithCommas(agentPremormence?.dailySalesQuantity)}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography>{'כמות עסקאות יומי'}</Typography>
              <Typography>
                {numberWithCommas(agentPremormence?.dailySalesQuantity)}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography>{'סה״כ חודשי'}</Typography>
              <Typography>
                {numberWithCommas(agentPremormence?.monthlySalesSum)}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography>{'עמידה ביעד'}</Typography>
              <Typography>
                {numberWithCommas(agentPremormence?.targetPercentage)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className="col-lg-8 info-box-right-maincont">
              <div className="flex-container col-lg-12 info-box-right-cont">
                <div className="flex-container col-lg-2 agent-name">
                  <div className="agent-name-subcont">
                    <span className="material-symbols-outlined">
                      support_agent
                    </span>
                    <h4 className="mainName">{user?.name}</h4>
                  </div>
                  {(isSuperAgent || isAdmin) && (
                    <div className="agentsListMobBtn">
                      <span className="material-symbols-outlined">
                        list_alt
                      </span>
                    </div>
                  )}
                </div>
                <div className="col-lg-10 info-box-left-cont">
                  <div className="info-box">
                    <span className="material-symbols-outlined">
                      monitoring
                    </span>
                    <p className="title">סה״כ שנתי</p>
                    <p className="desc">
                      {numberWithCommas(agentPremormence?.totalOrderSum)}
                    </p>
                  </div>
                  <div className="info-box">
                    <span className="material-symbols-outlined">analytics</span>
                    <p className="title">סל ממוצע</p>
                    <p className="desc">
                      {numberWithCommas(agentPremormence?.monthlyAverage)}
                    </p>
                  </div>
                  <div className="info-box">
                    <span className="material-symbols-outlined">group</span>
                    <p className="title">לקוחות</p>
                    <p className="desc">
                      {numberWithCommas(agentPremormence?.clientsAssigned)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 flex-container info-box-left-cont main-ttls">
              <div className="col-lg-6 myCenterAlign">
                <div>
                  <h3 className="title">סה״כ יומי</h3>
                  <Wrap>
                    {numberWithCommas(agentPremormence?.dailySalesSum)}
                  </Wrap>
                </div>
              </div>
              <div className="col-lg-6 myCenterAlign">
                <div>
                  <h3 className="title">כמות עסקאות יומי</h3>
                  <Wrap>
                    {numberWithCommas(agentPremormence?.dailySalesQuantity)}
                  </Wrap>
                </div>
              </div>
              <div className="col-lg-6 myCenterAlign">
                <div>
                  <h3 className="title">סה״כ חודשי</h3>
                  <Wrap>
                    {numberWithCommas(agentPremormence?.monthlySalesSum)}
                  </Wrap>
                </div>
              </div>
              <div className="col-lg-6 myCenterAlign">
                <div>
                  <h3 className="title">עמידה ביעד</h3>
                  <Wrap>
                    {numberWithCommas(agentPremormence?.targetPercentage)}
                  </Wrap>
                </div>
              </div>
            </div> */}
    </Card>
  )
}

export default AgentPerformanceInfo
