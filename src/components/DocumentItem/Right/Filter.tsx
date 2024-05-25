import React, { useState } from 'react'
import { useCart } from '../../../store/cart.store'
import { useModals } from '../../../provider/ModalProvider'
import { useAuth } from '../../../store/auth.store'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ArticleIcon from '@mui/icons-material/Article'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import useDataDocumentsItem from '../../../hooks/useDataDocumentsItem'
import { ExcelGeneratorIDocuments } from '../../../helpers/ExcelGenerator'

const Filter = () => {
  const [search, setSearch] = useState<string>('')
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

  return (
    <Paper
      elevation={0}
      sx={{
        display: { sm: 'flex', xs: 'block' },
        justifyContent: 'space-between',
        padding: '20px 20px',
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        מוצרי מסמכים
      </Typography>
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
        {data && (
          <Button
            sx={{ height: '40px' }}
            variant="outlined"
            startIcon={<ArticleIcon sx={{ fontSize: '30px' }} />}
            onClick={() => ExcelGeneratorIDocuments(data)}
          >
            XL
          </Button>
        )}
        <Button
          sx={{ height: '40px', whiteSpace: 'nowrap' }}
          variant="contained"
          startIcon={<ShoppingCartCheckoutIcon sx={{ fontSize: '30px' }} />}
          onClick={() => handleResoreCart()}
        >
          שחזר הזמנה
        </Button>

        <FormControl
          variant="outlined"
          sx={{
            width: { sm: '200px', xs: '100%' },
            marginTop: { sm: '0px', xs: '20px' },
          }}
        >
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
      </Box>
    </Paper>
  )
}

export default Filter
