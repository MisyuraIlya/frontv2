import React from 'react'
import { useDocumentsItem } from '../store/DocumentsItemStore'
import {
  Container,
  Typography,
  List,
  ListItem,
  Paper,
  Box,
} from '@mui/material'
import { themeColors } from '../../../styles/mui'

const DocsTotal = () => {
  const {
    totalTax,
    totalPriceAfterTax,
    totalAfterDiscount,
    totalPrecent,
    itemsLength,
  } = useDocumentsItem()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        marginTop: '20px',
        marginBottom: '100px',
      }}
    >
      <Paper
        sx={{ width: '350px', boxShadow: '0px 2px 40px rgba(132,147,168,.15)' }}
      >
        <Typography
          sx={{ paddingTop: '20px', paddingLeft: '15px' }}
          fontWeight={800}
          variant="h5"
        >
          סיכום
        </Typography>
        <List>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color={themeColors.primary}>כמות שורות</Typography>
            <Typography color={themeColors.primary}>{itemsLength}</Typography>
          </ListItem>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: '#f0f0f0',
            }}
          >
            <Typography color={themeColors.primary}>סה״כ</Typography>
            <Typography color={themeColors.primary}>
              {totalPriceAfterTax.toFixed(2) ?? '0'} ₪
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color={themeColors.primary}>הנחה כללית</Typography>
            <Typography color={themeColors.primary}>
              {totalPrecent !== undefined ? totalPrecent + '%' : ''}
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: '#f0f0f0',
            }}
          >
            <Typography color={themeColors.primary}>אחרי הנחה</Typography>
            <Typography color={themeColors.primary}>
              {totalAfterDiscount.toFixed(2) ?? '0'} ₪
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color={themeColors.primary}>מע״מ</Typography>
            <Typography color={themeColors.primary}>
              {totalTax.toFixed(2) ?? '0'} ₪
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: '#f0f0f0',
            }}
          >
            <Typography color={themeColors.primary}>לתשלום</Typography>
            <Typography color={themeColors.primary}>
              {(totalPriceAfterTax + totalTax).toFixed(2) ?? '0'} ₪
            </Typography>
          </ListItem>
        </List>
      </Paper>
    </Box>
  )
}

export default DocsTotal
