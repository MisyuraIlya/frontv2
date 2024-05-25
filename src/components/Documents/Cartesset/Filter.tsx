import React from 'react'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Paper } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import hooks from '../../../hooks'

const Filter = () => {
  const { dateFrom, dateTo } = useParams()
  const navigate = useNavigate()

  const handleDateFrom = (e: moment.Moment | null) => {
    if (e) {
      const updatedPathname = `/cartesset/${e.format('YYYY-MM-DD')}/${dateTo}?page=1`
      navigate(updatedPathname)
    }
  }

  const handleDateTo = (e: moment.Moment | null) => {
    if (e) {
      const updatedPathname = `/cartesset/${dateFrom}/${e.format('YYYY-MM-DD')}?page=1`
      navigate(updatedPathname)
    }
  }

  const { data, mutate } = hooks.useDataCartesset()
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
          <DatePicker
            label="מתאריך"
            value={moment(dateFrom)}
            onChange={(e) => handleDateFrom(e)}
          />
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
          <DatePicker
            label="לתאריך"
            value={moment(dateTo)}
            onChange={(e) => handleDateTo(e)}
          />
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
      ></Box>
    </Paper>
  )
}

export default Filter
