import React from 'react'
import NotificationCard from '../NotificationCard/NotificationCard'
import './NotificationContainer.styles.scss'
import { useOneSignalStore } from '../../store/oneSignalStore'

const NotificationContainer = () => {
  const { oneSignalNotifications } = useOneSignalStore()
  return (
    <div className="NotificationContainer">
      <div className="notificationWrapper">
        {oneSignalNotifications?.map((element, index) => (
          <NotificationCard element={element} index={index} />
        ))}
      </div>
    </div>
  )
}

export default NotificationContainer
