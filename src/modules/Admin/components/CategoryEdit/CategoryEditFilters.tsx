import { Box, Typography } from '@mui/material'
import React from 'react'
import SearchInput from '../../../../utils/SearchInput/SearchInput'
import { useAdminCategories } from '../../../../store/AdminCategoriesStore'

const CategoryEditFilters = () => {
  const { search, setSearch } = useAdminCategories()
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
          value={search}
          setValue={setSearch}
          placeholder="חיפוש לפי שם קטגוריה"
        />
      </Box>
    </Box>
  )
}

export default CategoryEditFilters
