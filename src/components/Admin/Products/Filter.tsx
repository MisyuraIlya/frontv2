import React from 'react'
import SearchInput from '../../../utils/SearchInput/SearchInput'
import { useProductsEditStore } from '../../../store/AdminProductsEditStore'
import { Box, Typography } from '@mui/material'

const Filter = () => {
  const { search, setSearch } = useProductsEditStore()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5">מוצרים</Typography>
      <Box sx={{ width: '40%' }}>
        <SearchInput
          value={search}
          setValue={setSearch}
          placeholder="חיפוש לפי שם numr"
        />
      </Box>
    </Box>
  )
}

export default Filter
