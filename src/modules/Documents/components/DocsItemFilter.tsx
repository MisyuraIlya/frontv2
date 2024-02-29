import React, { useState } from 'react'
import { useDocuments } from '../store/DocumentsStore'
import moment from 'moment'
import { useCart } from '../../Cart/store/cart.store'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useModals } from '../../Modals/provider/ModalProvider'
import { useAuth } from '../../Auth/store/useAuthStore'
import Loader from '../../../shared/Loader'
import { onErrorAlert, onSuccessAlert } from '../../../shared/MySweetAlert'
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SearchIcon from '@mui/icons-material/Search'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ArticleIcon from '@mui/icons-material/Article'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'

const DocsItemFilter = () => {
  const {
    // handleSearchClick,
    searchValue,
    setSearchValue,
    downloadDocument,
    handleRestoreCartFunction,
    getItems,
    documentTypes,
    selectedDocument,
    filesOrder,
    handleCalendar,
    setSelectedDocument,
  } = useDocuments()
  const navigate = useNavigate()
  const location = useLocation()
  const { documentType, dateFrom, dateTo } = useParams()
  const searchParams = new URLSearchParams(location.search)
  const pageNumber = searchParams.get('page')

  const { isAdmin, isAgent, isSuperAgent } = useAuth()
  // const {location,push} = useHistory()
  const { id } = useParams()
  const { cart, setCart } = useCart()
  const { setRestoreCartModal, handlePdfViwer } = useModals()
  const [loadingRestoreCart, setLoadingRestoreCart] = useState(false)
  // const { handleCalendar } = useDocumentsProvider()

  const handleResoreCart = async () => {
    try {
      setLoadingRestoreCart(true)

      // if (!isAdmin || !isAgent || !isSuperAgent) {
      //   setRestoreCartModal(true)
      // } else {
      // if (id) {
      const res = await handleRestoreCartFunction()
      if (res) {
        setCart(res)
        navigate('/cart')
      }
      // }
      // }
      onSuccessAlert('שחזור בוצע בהצלחה', 'עודכן מחיר עדכני')
    } catch (e) {
      onErrorAlert('תקלה בשחזור נתונים', 'נסה שנית מאוחר יותר')
    } finally {
      setLoadingRestoreCart(false)
    }
  }

  const handleDocument = async (file: string) => {
    if (id) {
      const link = await downloadDocument(file, id)
      // console.log('link',link.url)
      // window.open(link.url, '_blank');
    }
  }

  return (
    <Paper
      elevation={4}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 20px',
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Button
          sx={{ height: '40px' }}
          variant="outlined"
          startIcon={<PictureAsPdfIcon sx={{ fontSize: '30px' }} />}
        >
          PDF
        </Button>
        <Button
          sx={{ height: '40px' }}
          variant="outlined"
          startIcon={<ArticleIcon sx={{ fontSize: '30px' }} />}
        >
          XL
        </Button>
        <Button
          sx={{ height: '40px' }}
          variant="outlined"
          startIcon={<ShoppingCartCheckoutIcon sx={{ fontSize: '30px' }} />}
        >
          שחזר הזמנה
        </Button>
      </Box>
      <FormControl variant="outlined" sx={{ width: '200px' }}>
        <OutlinedInput
          id="outlined-adornment-password"
          type={'text'}
          placeholder="חיפוש..."
          sx={{ height: '40px' }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Paper>
  )
}

export default DocsItemFilter
