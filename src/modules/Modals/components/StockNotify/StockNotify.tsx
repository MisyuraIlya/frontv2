import React from 'react'
import { useModals } from '../../provider/ModalProvider'

const StockNotify = () => {
  const { stockNotify } = useModals()
  return (
    <div
      className={
        stockNotify ? 'header-popup-main-cont active' : 'header-popup-main-cont'
      }
    >
      <div className="header-popup-sub-cont">
        <h3 id="header-popup-id">כמות מלאי אינה מספקת</h3>
      </div>
    </div>
  )
}

export default StockNotify
