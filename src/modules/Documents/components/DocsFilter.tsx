import React, { useState } from 'react'
import { useDocuments } from '../../../store/DocumentsStore'
import moment from 'moment'
import { useCart } from '../../../store/cart.store'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useModals } from '../../../provider/ModalProvider'
import { useAuth } from '../../../store/useAuthStore'
import Loader from '../../../shared/Loader'

import { documentTypes } from '../../../enums/documentsTypes'
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
import { themeColors } from '../../../styles/mui'
import useDataDocuments from '../../../hooks/useDataDocuments'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const DocsFilter = () => {
  const { handleCalendar } = useDocuments()
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

  // const handleResoreCart = async () => {
  //   try {
  //     setLoadingRestoreCart(true)

  //     // if (!isAdmin || !isAgent || !isSuperAgent) {
  //     //   setRestoreCartModal(true)
  //     // } else {
  //     // if (id) {
  //     const res = await handleRestoreCartFunction()
  //     if (res) {
  //       setCart(res)
  //       navigate('/cart')
  //     }
  //     // }
  //     // }
  //     onSuccessAlert('שחזור בוצע בהצלחה', 'עודכן מחיר עדכני')
  //   } catch (e) {
  //     onErrorAlert('תקלה בשחזור נתונים', 'נסה שנית מאוחר יותר')
  //   } finally {
  //     setLoadingRestoreCart(false)
  //   }
  // }

  // const handleDocument = async (file: string) => {
  //   if (id) {
  //     const link = await downloadDocument(file, id)
  //     // console.log('link',link.url)
  //     // window.open(link.url, '_blank');
  //   }
  // }

  const handleSelect = (parameter: IDocumentTypes) => {
    navigate(`/documentPage/${parameter}/${dateFrom}/${dateTo}?page=1`)
  }

  const { data, mutate } = useDataDocuments()
  const total = data?.['hydra:totalItems'] ?? 0
  return (
    <Paper
      elevation={4}
      sx={{
        display: { sm: 'flex', xs: 'block' },
        justifyContent: 'space-between',
        padding: '15px 20px',
      }}
    >
      <Box
        sx={{
          display: { sm: 'flex', xs: 'block' },
          gap: '20px',
          alignItems: 'center',
        }}
      >
        <DemoContainer
          components={['DatePicker']}
          sx={{
            width: '170px',
            pt: '10px',
            '& .MuiOutlinedInput-input': { padding: '10px 16px' },
            '& .MuiInputLabel-root': { top: '-7px' },
          }}
        >
          <DatePicker label="מתאריך" />
        </DemoContainer>
        <DemoContainer
          components={['DatePicker']}
          sx={{
            pt: '10px',
            width: '170px',
            '& .MuiOutlinedInput-input': { padding: '10px 16px' },
            '& .MuiInputLabel-root': { top: '-7px' },
          }}
        >
          <DatePicker label="לתאריך" />
        </DemoContainer>
        <Button
          variant="contained"
          onClick={() => mutate()}
          sx={{ height: '43px', mt: '8px' }}
        >
          חפש
        </Button>
      </Box>
      <Box
        sx={{
          display: { sm: 'flex', xs: 'block' },
          gap: '20px',
          alignItems: 'center',
          pt: '8px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <FormControl fullWidth sx={{ width: '200px' }}>
            <InputLabel id="demo-simple-select-label">מסמך</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={documentType}
              sx={{ height: '40px' }}
              label="מסמך"
              onChange={(e) => handleSelect(e.target.value as IDocumentTypes)}
            >
              {documentTypes?.map((ele, ind) => {
                return (
                  <MenuItem value={ele.value} key={ind}>
                    {ele.label}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Box>
        <FormControl
          variant="outlined"
          sx={{
            width: { sm: '300px', xs: '100%' },
            marginTop: { sm: '0px', xs: '20px' },
          }}
        >
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
      </Box>
    </Paper>
  )
}

export default DocsFilter
