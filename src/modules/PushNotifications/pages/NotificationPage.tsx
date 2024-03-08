import React, { useEffect } from 'react'
import RightSide from '../components/NotificationPage/RightSide'
import LeftSide from '../components/NotificationPage/LeftSide'
import { useNotificationStore } from '../store/notificationStore'
import { useClientStore } from '../../Admin/store/ClientsStore'
import { Container, Grid } from '@mui/material'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'
import { NotificationsServices } from '../services/notifications.service'
import useSWR from 'swr'
import useDataNotification from '../hooks/useDataNotification'

const NotificationPage = () => {
  const { data } = useDataNotification()
  return (
    <Container maxWidth="lg">
      <BreadCrumbsUtil array={[]} />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <RightSide />
        </Grid>
        <Grid item xs={4}>
          <LeftSide />
        </Grid>
      </Grid>
    </Container>
  )
}

export default NotificationPage
