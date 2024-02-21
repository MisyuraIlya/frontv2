import React, { FC } from 'react'
import NotificationContainer from '../../../PushNotifications/components/NotificationContainer/NotificationContainer'
type LeftSideBarProps = {
  active: boolean
  setActive: (bool: boolean) => void
}
const LeftSideBar: FC<LeftSideBarProps> = ({ active, setActive }) => {
  return (
    <div
      className={
        active
          ? 'notification-view header-cart opened'
          : 'notification-view header-cart closed'
      }
    >
      <div className="header-cart-wrapp">
        <div className="header-cart-wrapp-head flex-container">
          <div className="close-cart-cont" onClick={() => setActive(false)}>
            <span className="close-cart material-symbols-outlined">close</span>
          </div>
          <div className="col-lg-12 text-cont">
            <p>הודעות</p>
          </div>
        </div>
        <div className="WrapperNotification">
          <NotificationContainer />
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar
