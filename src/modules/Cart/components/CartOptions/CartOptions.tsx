import React from 'react'
import { useCart } from '../../store/cart.store'
import { onAsk } from '../../../../shared/MySweetAlert'
import { removeProductsFromStorage } from '../../helpers/localstorage'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Box, Button } from '@mui/material'

const CartOptions = () => {
  const { cart, setCart, selectedMode, saveDarft } = useCart()
  const navigate = useNavigate()
  let from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  let to = moment().format('YYYY-MM-DD')

  const askDelete = async () => {
    const ask = await onAsk('האם אתה בטוח?', 'כל המוצרים בעגלה יימחקו')
    if (ask) {
      setCart([])
      removeProductsFromStorage()
    }
  }

  const handleSaveAsDraft = async () => {
    const ask = await onAsk(
      'שמור הזמנה כטיוטה?',
      'טיוטה תשמר וסל הקניות הנוכחי יתרוקן'
    )
    if (ask) {
      saveDarft()
      navigate(`/historyPage?page=1&from=${from}&to=${to}`)
      setCart([])
    }
  }

  const handleToDraft = () => {
    navigate(`/historyPage?page=1&from=${from}&to=${to}`)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'end', gap: '20px' }}>
      {cart.length > 0 && (
        <Button
          onClick={() => askDelete()}
          variant="contained"
          sx={{ fontSize: '17px', minWidth: '130px', height: '35px' }}
        >
          מחק סל
        </Button>
      )}
      {cart.length > 0 && selectedMode == 'order' && (
        <Button
          variant="contained"
          onClick={() => handleSaveAsDraft()}
          sx={{ fontSize: '17px', minWidth: '130px', height: '35px' }}
        >
          שמור טיוטה
        </Button>
      )}
      {selectedMode == 'order' && (
        <Button
          variant="contained"
          onClick={() => handleToDraft()}
          sx={{ fontSize: '17px', minWidth: '130px', height: '35px' }}
        >
          טען טיוטה
        </Button>
      )}
    </Box>
  )
}

export default CartOptions
