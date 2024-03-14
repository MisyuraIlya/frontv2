import React from 'react'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import { useAgentProfileStore } from '../store/agentProfile.store'
import { useAuth } from '../../Auth/store/useAuthStore'
import MyCard from '../../../shared/MyCard'
import Wrap from '../../../shared/Wrap'
import { Box, Card, Grid, Typography } from '@mui/material'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import LegendToggleIcon from '@mui/icons-material/LegendToggle'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import GroupIcon from '@mui/icons-material/Group'
import MyCheapButton from '../../../shared/MyCheapButton'

const AgentPerformanceInfo = () => {
  const { user, isAdmin, isSuperAgent } = useAuth()
  const { agentPremormence } = useAgentProfileStore()

  return (
    <Card sx={{ padding: '10px', marginTop: '50px' }}>
      <Grid container spacing={2}>
        <Grid item xs={3} className="centered">
          <Box className="centered" sx={{ gap: '10px' }}>
            <SupportAgentIcon />
            <Box sx={{ marginTop: '5px' }}>
              <Typography>{user?.name}</Typography>
              <Typography>{user?.phone}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Grid container spacing={0} className="centered">
                <Grid item xs={2}>
                  <LegendToggleIcon />
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2">{'סה״כ חודשי'}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <MyCheapButton>
                    {numberWithCommas(agentPremormence?.totalOrderSum)}
                  </MyCheapButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Grid container spacing={0} className="centered">
                <Grid item xs={2}>
                  <LegendToggleIcon />
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2">{'סה״כ שנתי'}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <MyCheapButton>
                    {numberWithCommas(agentPremormence?.totalOrderSum)}
                  </MyCheapButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Grid container spacing={0} className="centered">
                <Grid item xs={2}>
                  <AnalyticsIcon />
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2">{'סל ממוצע'}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <MyCheapButton>
                    {numberWithCommas(agentPremormence?.monthlyAverage)}
                  </MyCheapButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Grid container spacing={0} className="centered">
                <Grid item xs={2}>
                  <GroupIcon />
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2">{'לקוחות'}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <MyCheapButton>
                    {numberWithCommas(agentPremormence?.clientsAssigned)}
                  </MyCheapButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign={'center'}>
                {'סה״כ יומי'}
              </Typography>
              <Box className="centered" sx={{ marginTop: '5px' }}>
                <MyCheapButton>
                  {numberWithCommas(agentPremormence?.dailySalesQuantity)}
                </MyCheapButton>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign={'center'}>
                {'כמות עסקאות יומי'}
              </Typography>
              <Box className="centered" sx={{ marginTop: '5px' }}>
                <MyCheapButton>
                  {numberWithCommas(agentPremormence?.dailySalesQuantity)}
                </MyCheapButton>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign={'center'}>
                {'סה״כ חודשי'}
              </Typography>
              <Box className="centered" sx={{ marginTop: '5px' }}>
                <MyCheapButton>
                  {numberWithCommas(agentPremormence?.monthlySalesSum)}
                </MyCheapButton>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign={'center'}>
                {'עמידה ביעד'}
              </Typography>
              <Box className="centered" sx={{ marginTop: '5px' }}>
                <MyCheapButton>
                  {numberWithCommas(agentPremormence?.targetPercentage)}
                </MyCheapButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default AgentPerformanceInfo
