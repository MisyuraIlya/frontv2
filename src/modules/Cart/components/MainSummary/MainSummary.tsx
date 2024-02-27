import React from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import { useCart } from '../../store/cart.store'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { useModals } from '../../../Modals/provider/ModalProvider'
import { themeColors } from '../../../../styles/mui'

const MainSummary = () => {
  const { isUserBlocked } = useAuth()
  const {
    setSpecialSettingsPop,
    selectedMode,
    cart,
    discount,
    totalBasket,
    comment,
    setComment,
    sendOrder,
    sendNoApproval,
    b2bPickupDiscount,
    priceBeforeTax,
    calucalteDiscountTotal,
    calculatePriceAfterDiscount,
    calculateTax,
    calculateFinalPrice,
    getTotalDiscountPrecet,
  } = useCart()

  const { openCartSettings, setOpenCartSettings } = useModals()

  return (
    <>
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
          <Typography
            variant="body1"
            color={themeColors.primary}
          >{`${priceBeforeTax().toFixed(1)}`}</Typography>
        </ListItem>
        {calucalteDiscountTotal() !== 0 && (
          <>
            <Divider />
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                variant="body1"
                color={themeColors.primary}
              >{`הנחה כללית: ${getTotalDiscountPrecet()}%`}</Typography>
              <Typography
                variant="body1"
                color={themeColors.primary}
              >{`${calucalteDiscountTotal().toFixed(1)}`}</Typography>
            </ListItem>
          </>
        )}
        {calucalteDiscountTotal() !== 0 && (
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="body1"
              color={themeColors.primary}
            >{`סה"כ אחרי הנחה`}</Typography>
            <Typography
              variant="body1"
              color={themeColors.primary}
            >{`${calculatePriceAfterDiscount().toFixed(1)}`}</Typography>
          </ListItem>
        )}
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="body1"
            color={themeColors.primary}
          >{`דמי משלוח`}</Typography>
          <Typography variant="body1" color={themeColors.primary}>
            {process.env.DELIVERY_PRICE}
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="body1"
            color={themeColors.primary}
          >{`מע"מ`}</Typography>
          <Typography
            variant="body1"
            color={themeColors.primary}
          >{`${calculateTax().toFixed(1)}`}</Typography>
        </ListItem>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" color={themeColors.primary}>
            {' '}
            {'מחיר לתשלום'}
          </Typography>
          <Typography variant="h6" fontWeight={900} color={themeColors.primary}>
            {calculateFinalPrice().toFixed(1)}
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

      {+process.env.MINIMUM_DELIVERY_PRICE! > priceBeforeTax() &&
      selectedMode === 'order' ? (
        <Typography color={themeColors.primary}>
          {'עליך לצבור עוד ' +
            Math.abs(
              priceBeforeTax() - +process.env.MINIMUM_DELIVERY_PRICE!
            ).toFixed(1) +
            ' ש"ח עד למינימום הזמנה'}
        </Typography>
      ) : null}
    </>
  )
}

export default MainSummary
