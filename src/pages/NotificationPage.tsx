import React from 'react'
import RightSide from '../modules/PushNotifications/components/NotificationPage/RightSide'
import LeftSide from '../modules/PushNotifications/components/NotificationPage/LeftSide'
import { Container, Grid } from '@mui/material'
import BreadCrumbsUtil from '../utils/BreadCrumbsUtil'
import Admin from '../components/Admin'
const NotificationPage = () => {
  return (
    <Container maxWidth="lg">
      <BreadCrumbsUtil
        array={[
          {
            title: 'הודעות',
            link: '/admin/notification',
          },
        ]}
      />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Admin.Notification.Filter />
          <Admin.Notification.List />
        </Grid>
        <Grid item xs={4}>
          <Admin.Notification.Edit />
          {/* <LeftSide /> */}
        </Grid>
      </Grid>
    </Container>
  )
}

export default NotificationPage
