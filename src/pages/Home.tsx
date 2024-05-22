import React from 'react'
import { useAuth } from '../store/useAuthStore'
import { Box, Container } from '@mui/material'
import useDataRecommended from '../hooks/useDataRecommended'
import useDataNewCatalog from '../hooks/useDataNewCatalog'
import Home from '../components/Home'
const HomePage = () => {
  const { user } = useAuth()
  const { data: recommended, isLoading: loadingRecommended } =
    useDataRecommended()
  const { data: newCatalog, isLoading: loadingNewCatalog } = useDataNewCatalog()
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
          {recommended?.['hydra:member'] && (
            <Home.Products
              title={'מוצרים קבועים'}
              array={recommended?.['hydra:member']}
              toShow={5}
              column={1}
              loading={loadingRecommended}
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
              loading={loadingNewCatalog}
            />
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage
