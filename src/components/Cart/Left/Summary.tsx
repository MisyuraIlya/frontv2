import React from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  Button,
  TextField,
} from '@mui/material'
import { useCart } from '../../../store/cart.store'
import { themeColors } from '../../../styles/mui'
import { useModals } from '../../../provider/ModalProvider'
import { useAuth } from '../../../store/useAuthStore'

const Summary = () => {
  const { user } = useAuth()
  const {
    selectedMode,
    cart,
    totalBeforeTax,
    totalTax,
    totalAfterTax,
    finalPrice,
    comment,
    setComment,
  } = useCart()

  const { openPopUpPay, setOpenPopUpPay } = useModals()

  const handlePay = () => {
    setOpenPopUpPay(true)
  }

  const handleSendOrder = () => {
    // sendOrder()
  }

  return (
    <Container>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={400} fontSize={24}>
          {'פרטי מסמך'}
        </Typography>
      </Box>
      <List>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" color={themeColors.primary}>
            כמות שורות
          </Typography>
          <Typography variant="body1" color={themeColors.primary}>
            {cart.length}
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="body1"
            color={themeColors.primary}
          >{`סה"כ לפני מע"מ`}</Typography>
          <Typography variant="body1" color={themeColors.primary}>
            {`${totalBeforeTax().toFixed(1)}`} ₪
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="body1"
            color={themeColors.primary}
          >{`דמי משלוח`}</Typography>
          <Typography variant="body1" color={themeColors.primary}>
            {process.env.DELIVERY_PRICE} ₪
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="body1"
            color={themeColors.primary}
          >{`מע"מ`}</Typography>
          <Typography variant="body1" color={themeColors.primary}>
            {`${totalTax().toFixed(1)}`} ₪
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="body1"
            color={themeColors.primary}
          >{`מחיר אחרי מע״מ`}</Typography>
          <Typography variant="body1" color={themeColors.primary}>
            {`${totalAfterTax().toFixed(1)}`} ₪
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" color={themeColors.primary}>
            {'מחיר לתשלום'}
          </Typography>
          <Typography variant="h6" fontWeight={900} color={themeColors.primary}>
            {finalPrice().toFixed(1)} ₪
          </Typography>
        </ListItem>
      </List>

      {selectedMode === 'quote' && (
        <List>
          <ListItem>
            <ListItemText primary={`ללא אישור מנהל`} />
          </ListItem>
        </List>
      )}

      {+process.env.MINIMUM_DELIVERY_PRICE! > totalBeforeTax() &&
      selectedMode === 'order' ? (
        <Typography color={themeColors.primary}>
          {'עליך לצבור עוד ' +
            Math.abs(
              totalBeforeTax() - +process.env.MINIMUM_DELIVERY_PRICE!
            ).toFixed(1) +
            ' ש"ח עד למינימום הזמנה'}
        </Typography>
      ) : null}

      {!user?.isBlocked &&
      ((cart.length > 0 && +process.env.MINIMUM_DELIVERY_PRICE! <= 100) ||
        selectedMode !== 'order') ? (
        <>
          <Box sx={{ margin: '0px' }}>
            <TextField
              label="הערה"
              rows={4}
              fullWidth
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>
          <Box sx={{ justifyContent: 'center', display: 'flex' }}>
            <Button
              onClick={handleSendOrder}
              variant="contained"
              sx={{
                borderRadius: '20px',
                fontSize: '18px',
                marginTop: '20px',
                minWidth: '150px',
                padding: '12px 24px',
              }}
            >
              {'שלח'}
            </Button>
          </Box>
          <Box sx={{ justifyContent: 'center', display: 'flex' }}>
            <Button
              onClick={handlePay}
              variant="contained"
              sx={{
                borderRadius: '20px',
                fontSize: '18px',
                marginTop: '20px',
                minWidth: '150px',
                padding: '12px 24px',
              }}
            >
              {'שלם'}
            </Button>
          </Box>
        </>
      ) : null}
    </Container>
  )
}

export default Summary
