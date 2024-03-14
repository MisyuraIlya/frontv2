import React from 'react'
import ReactApexChart from 'react-apexcharts'
import MyCard from '../../../shared/MyCard'
import Wrap from '../../../shared/Wrap'
import { useAgentProfileStore } from '../store/agentProfile.store'
import { Box, Card, Grid, Typography } from '@mui/material'
import MyCheapButton from '../../../shared/MyCheapButton'

const VisitsDashboard = () => {
  const { objectivesToday } = useAgentProfileStore()
  const total = objectivesToday?.visitsTotal
  const completed = objectivesToday?.visitsCompleted
  const precent = completed && total ? (completed / total) * 100 : 0
  const totalObj = objectivesToday?.objectiveTotal
  const completedObj = objectivesToday?.objectiveCompleted
  const precentObj =
    totalObj && completedObj ? (completedObj / totalObj) * 100 : 0
  const series2 = [precent]
  const options2 = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
      },
    },
    labels: ['ביקורים'],
    colors: ['#24426b'],
  }

  const series1 = [precentObj]
  const options1 = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
      },
    },
    labels: ['משימות'],
    colors: ['#24426b'],
  }
  return (
    <Card sx={{ padding: '0 50px', marginTop: '50px' }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ display: 'flex', gap: '20px' }}>
          <Box className="centered">
            <Box>
              <Typography variant="h6">ביקורים</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">בוצע</Typography>
                </Grid>
                <Grid item xs={6}>
                  <MyCheapButton>
                    {objectivesToday?.visitsCompleted ?? 0}
                  </MyCheapButton>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                <Grid item xs={6}>
                  <Typography variant="h6">לביצוע</Typography>
                </Grid>
                <Grid item xs={6}>
                  <MyCheapButton>
                    {objectivesToday?.visitsTotal ?? 0}
                  </MyCheapButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <ReactApexChart
            // @ts-ignore
            options={options2}
            series={series2}
            type="radialBar"
            height={250}
          />
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', gap: '20px' }}>
          <Box className="centered">
            <Box>
              <Typography variant="h6">משימות</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">בוצע</Typography>
                </Grid>
                <Grid item xs={6}>
                  <MyCheapButton>
                    {objectivesToday?.objectiveCompleted ?? 0}
                  </MyCheapButton>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                <Grid item xs={6}>
                  <Typography variant="h6">לביצוע</Typography>
                </Grid>
                <Grid item xs={6}>
                  <MyCheapButton>
                    {objectivesToday?.objectiveTotal ?? 0}
                  </MyCheapButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <ReactApexChart
            // @ts-ignore
            options={options1}
            series={series1}
            type="radialBar"
            height={250}
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default VisitsDashboard
