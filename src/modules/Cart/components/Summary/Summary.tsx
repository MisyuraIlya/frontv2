import React from 'react'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { useCart } from '../../store/cart.store'
// import { getCurrentUserId } from '../../../Auth/helpers/getCurrentUserId';
import MainSummary from '../MainSummary/MainSummary'
import CustomSummary from '../CustomSummary/CustomSummary'
import SendOrderButton from '../SendOrderButton/SendOrderButton'
import { Box, Container, Paper, Typography } from '@mui/material'

const Summary = () => {
  const { isUserBlocked } = useAuth()

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        width: '300px',
        position: 'fixed',
        marginTop: '500px',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={400} fontSize={24}>
          {'פרטי מסמך'}
        </Typography>
        {/* <CustomSummary /> */}
        <MainSummary />
        <SendOrderButton />
      </Box>
    </Paper>
  )
}

export default Summary
