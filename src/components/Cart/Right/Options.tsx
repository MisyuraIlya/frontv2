import React from 'react'
import { useCart } from '../../../store/cart.store'
import { onAsk } from '../../../utils/MySweetAlert'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Box, Button, Container, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { useAuth } from '../../../store/useAuthStore'
import { themeColors } from '../../../styles/mui'
import { useModals } from '../../../provider/ModalProvider'

const Options = () => {
  const { cart, setCart, selectedMode, saveDarft } = useCart()

  const { user } = useAuth()
  const navigate = useNavigate()
  let from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  let to = moment().format('YYYY-MM-DD')

  const askDelete = async () => {
    const ask = await onAsk('האם אתה בטוח?', 'כל המוצרים בעגלה יימחקו')
    if (ask) {
      setCart([])
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

  const handleMode = () => {
    if (selectedMode == 'order') {
      return ' סיכום הזמנה'
    } else if (selectedMode === 'draft') {
      return ' סיכום הצעת מחיר'
    } else if (selectedMode === 'quote') {
      return 'טיוטה'
    } else {
      return ''
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 20px',
      }}
    >
      <Box>
        <Typography variant="h5">{handleMode()}</Typography>
        <Typography variant="subtitle1" color={themeColors.asphalt}>
          {user?.name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          gap: '20px',
        }}
      >
        {cart.length > 0 && selectedMode == 'order' && (
          <Button
            variant="outlined"
            onClick={() => handleSaveAsDraft()}
            sx={{
              fontSize: '14px',
              whiteSpace: 'nowrap',
              minWidth: {
                sm: { minWidth: '130px' },
                xs: { minWidth: '100px' },
              },
              height: '35px',
            }}
            startIcon={<SaveAsIcon />}
          >
            שמור טיוטה
          </Button>
        )}
        {selectedMode == 'order' && (
          <Button
            variant="outlined"
            onClick={() => handleToDraft()}
            sx={{
              fontSize: '14px',
              whiteSpace: 'nowrap',
              minWidth: {
                sm: { minWidth: '130px' },
                xs: { minWidth: '100px' },
              },
              height: '35px',
            }}
            startIcon={<FileUploadIcon />}
          >
            טען טיוטה
          </Button>
        )}
        {cart.length > 0 && (
          <Button
            onClick={() => askDelete()}
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{
              fontSize: '14px',
              whiteSpace: 'nowrap',
              minWidth: {
                sm: { minWidth: '130px' },
                xs: { minWidth: '100px' },
              },
              height: '39px',
            }}
          >
            מחק סל
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Options
