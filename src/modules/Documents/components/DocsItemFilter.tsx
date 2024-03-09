import React, { useState } from 'react'
import { useCart } from '../../Cart/store/cart.store'
import { useLocation } from 'react-router-dom'
import { useModals } from '../../Modals/provider/ModalProvider'
import { useAuth } from '../../Auth/store/useAuthStore'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ArticleIcon from '@mui/icons-material/Article'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import useDataDocumentsItem from '../hook/useDataDocumentsItem'

const DocsItemFilter = () => {
  const [search, setSearch] = useState<string>('')
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const { isAdmin, isAgent, isSuperAgent } = useAuth()
  const { cart, setCart } = useCart()
  const { setRestoreCartModal, handlePdfViwer } = useModals()
  const { data } = useDataDocumentsItem()
  const handleResoreCart = async () => {
    // try {
    //   setLoadingRestoreCart(true)
    //   // if (!isAdmin || !isAgent || !isSuperAgent) {
    //   //   setRestoreCartModal(true)
    //   // } else {
    //   // if (id) {
    //   const res = await handleRestoreCartFunction()
    //   if (res) {
    //     setCart(res)
    //     navigate('/cart')
    //   }
    //   // }
    //   // }
    //   onSuccessAlert('שחזור בוצע בהצלחה', 'עודכן מחיר עדכני')
    // } catch (e) {
    //   onErrorAlert('תקלה בשחזור נתונים', 'נסה שנית מאוחר יותר')
    // } finally {
    //   setLoadingRestoreCart(false)
    // }
  }

  const handleDocument = async () => {
    // if (id) {
    //   const link = await downloadDocument(file, id)
    //   // console.log('link',link.url)
    //   // window.open(link.url, '_blank');
    // }
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
        {data?.files['hydra:member']?.map((file, index) => (
          <Button
            key={index}
            onClick={() => handlePdfViwer(file.base64)}
            sx={{ height: '40px' }}
            variant="outlined"
            startIcon={<PictureAsPdfIcon sx={{ fontSize: '30px' }} />}
          >
            {file.name}
          </Button>
        ))}

        <Button
          sx={{ height: '40px' }}
          variant="outlined"
          startIcon={<ArticleIcon sx={{ fontSize: '30px' }} />}
          onClick={() => handleDocument()}
        >
          XL
        </Button>
        <Button
          sx={{ height: '40px' }}
          variant="outlined"
          startIcon={<ShoppingCartCheckoutIcon sx={{ fontSize: '30px' }} />}
          onClick={() => handleResoreCart()}
        >
          שחזר הזמנה
        </Button>
      </Box>
      <FormControl variant="outlined" sx={{ width: '200px' }}>
        <OutlinedInput
          id="outlined-adornment-password"
          type={search}
          placeholder="חיפוש..."
          onChange={(e) => setSearch(e.target.value)}
          sx={{ height: '40px' }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility">
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
