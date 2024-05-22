import React from 'react'
import AgentsList from '../modules/Agent/components/AgentList'
import { Box, Container, Grid } from '@mui/material'
import { Tab, Tabs } from '../utils/tabs'
import AgentMissions from '../modules/Agent/Tabs/AgentMissions'
import AgentVisits from '../modules/Agent/Tabs/AgentVisits'
import AgentTargets from '../modules/Agent/Tabs/AgentTargets'
import AgentDashBoard from '../modules/Agent/Tabs/AgentDashBoard'
import BreadCrumbsUtil from '../utils/BreadCrumbs/BreadCrumbsUtil'

const AgentDashboard = () => {
  const components = [
    {
      title: 'דאשבורד',
      component: <AgentDashBoard />,
    },
    {
      title: 'משימות',
      component: <AgentMissions />,
    },
    {
      title: 'תבניות ביקורים',
      component: <AgentVisits />,
    },
    {
      title: 'יעדים',
      component: <AgentTargets />,
    },
  ]

  return (
    <Container maxWidth="xl">
      <BreadCrumbsUtil array={[]} />
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          {/* {(isSuperAgent || isAdmin) &&  */}
          <AgentsList />
          {/* // } */}
        </Grid>
        <Grid item sm={9} xs={12}>
          <Tabs baseRoute="/agentDashboard" params={['tab', 'id']}>
            {components.map((tab, index) => (
              <Tab key={index} label={tab.title}>
                <Box sx={{ margin: '20px 0' }}>{tab.component}</Box>
              </Tab>
            ))}
          </Tabs>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AgentDashboard
