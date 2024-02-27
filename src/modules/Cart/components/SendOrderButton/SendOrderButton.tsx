import React from 'react'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { useCart } from '../../store/cart.store'
import { useModals } from '../../../Modals/provider/ModalProvider'
import { Button, Container, Grid } from '@mui/material'

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
    <Container>
      {!isUserBlocked &&
      ((cart.length > 0 &&
        +process.env.MINIMUM_DELIVERY_PRICE! <= priceBeforeTax()) ||
        selectedMode !== 'order') ? (
        <>
          <textarea
            placeholder={'הערות למסמך'}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            onClick={handleSendOrder}
            variant="contained"
            sx={{
              borderRadius: '20px',
              width: '200px',
              fontSize: '18px',
              marginTop: '20px',
            }}
          >
            {'שלח'}
          </Button>
          <Button
            onClick={handlePay}
            variant="contained"
            sx={{
              borderRadius: '20px',
              width: '200px',
              fontSize: '18px',
              marginTop: '20px',
            }}
          >
            {'שלם'}
          </Button>
        </>
      ) : null}
    </Container>
  )
}

export default SendOrderButton
