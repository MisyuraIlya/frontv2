import React from 'react'
import NotificationCard from '../NotificationCard/NotificationCard'
import './NotificationContainer.styles.scss'
import { Box } from '@mui/material'
import useDataNotificationUser from '../../hooks/useDataNotificationUser'

const NotificationContainer = () => {
  // const { oneSignalNotifications } = useOneSignalStore()
  const { data } = useDataNotificationUser()

  return (
    <Box sx={{ width: '100%' }}>
      {data?.['hydra:member']?.map((item, index) => (
        <Box key={index}>
          <NotificationCard element={item} />
        </Box>
      ))}
    </Box>
  )
}

export default NotificationContainer
