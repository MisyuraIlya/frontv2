import React from 'react'
import IosHandler from './IosHandler/IosHandler'
import AndroidHandler from './AndroidHandler/AndroidHandler'
import { useMobile } from '../../../store/mobile.store'

const PushNotificationHandlers = () => {
  const { isAndroid, isIPhone } = useMobile()
  return (
    <div>
      {isIPhone && <IosHandler />}
      {isAndroid && <AndroidHandler />}
    </div>
  )
}

export default PushNotificationHandlers
