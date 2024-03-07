import React, { useEffect } from 'react'
import RightSide from '../components/NotificationPage/RightSide'
import LeftSide from '../components/NotificationPage/LeftSide'
import { useNotificationStore } from '../store/notificationStore'
import { useClientStore } from '../../Admin/store/ClientsStore'
import { Container, Grid } from '@mui/material'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'

const NotificationPage = () => {
  const { createItem, fetchItems } = useNotificationStore()
  useEffect(() => {
    fetchItems()
  }, [])
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
