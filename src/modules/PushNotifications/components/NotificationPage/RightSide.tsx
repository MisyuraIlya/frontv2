import React from 'react'
import { useNotificationStore } from '../../store/notificationStore'
import moment from 'moment'
import NotificationItem from './notificationItem'
import { Box } from '@mui/material'

const RightSide = () => {
  const { items } = useNotificationStore()
  return (
    <Box>
      {items.map((element, index) => {
        return <NotificationItem element={element} index={index} />
      })}
    </Box>
  )
}

export default RightSide
