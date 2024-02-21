import React from 'react'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { useCart } from '../../store/cart.store'
import { useModals } from '../../../Modals/provider/ModalProvider'
import Select from 'react-select'
import AtarSelection from '../../../Auth/components/AtarSelection'

const SendOrderButton = () => {
  const { isUserBlocked } = useAuth()
  const { selectedMode, cart, comment, setComment, sendOrder, priceBeforeTax } =
    useCart()

  const { openPopUpPay, setOpenPopUpPay } = useModals()

  const handlePay = () => {
    setOpenPopUpPay(true)
  }

  const handleSendOrder = () => {
    sendOrder()
  }

  return (
    <div>
      {!isUserBlocked &&
      ((cart.length > 0 &&
        +process.env.MINIMUM_DELIVERY_PRICE! <= priceBeforeTax()) ||
        selectedMode != 'order') ? (
        <div className="pay-btn-cont">
          <div>
            <AtarSelection />
          </div>
          <div className={!comment ? 'comments empty' : 'comments'}>
            <textarea
              placeholder={'הערות למסמך'}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="btn-container flex-container">
            <div className="btn-subcontainer col-lg-12">
              <button onClick={() => handleSendOrder()} className="to-pay">
                {'שלח'}
              </button>
            </div>
          </div>

          <div className="btn-container flex-container">
            <div className="btn-subcontainer col-lg-12">
              <button onClick={() => handlePay()} className="to-pay">
                {'שלם'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default SendOrderButton
