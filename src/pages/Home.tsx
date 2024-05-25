import React from 'react'
import { useAuth } from '../store/useAuthStore'
import { Box, Container } from '@mui/material'
import Home from '../components/Home'
import useDataCatalog from '../hooks/useDataCatalog'
const HomePage = () => {
  const { user } = useAuth()

  const { data: specialCatalog, isLoading: specialLoading } = useDataCatalog(
    '',
    'special'
  )
  const { data: newCatalog, isLoading: newLoading } = useDataCatalog('', 'new')
  return (
    <Box>
      <Box>
        <Home.Video />
      </Box>
      <Container maxWidth="xl" sx={{ marginBottom: '200px' }}>
        <Box sx={{ marginTop: '50px' }}>
          <Home.Categories />
        </Box>
        <Box sx={{ marginTop: '120px' }}>
          {specialCatalog?.['hydra:member'] && (
            <Home.Products
              title={'מוצרים קבועים'}
              array={specialCatalog?.['hydra:member']}
              toShow={5}
              column={1}
              loading={specialLoading}
            />
          )}
        </Box>
        <Box sx={{ marginTop: '120px' }}>
          {newCatalog?.['hydra:member'] && (
            <Home.Products
              title={'מוצרים קבועים'}
              array={newCatalog?.['hydra:member']}
              toShow={5}
              column={1}
              loading={newLoading}
            />
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage
