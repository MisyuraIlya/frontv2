import React from 'react'
import { Box, Typography } from '@mui/material'
import SearchInput from '../../../utils/SearchInput/SearchInput'
import { useAdminStore } from '../../../store/admin.store'

const Filter = () => {
  const { searchCategories, setSearchCategories } = useAdminStore()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5">קטגוריות</Typography>
      <Box sx={{ width: '40%' }}>
        <SearchInput
          value={searchCategories}
          setValue={setSearchCategories}
          placeholder="חיפוש לפי שם קטגוריה"
        />
      </Box>
    </Box>
  )
}

export default Filter
