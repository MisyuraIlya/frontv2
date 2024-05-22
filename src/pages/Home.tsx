import React from 'react'
import VideoSection from '../modules/Home/components/VideoSection/VideoSection'
import SliderSection from '../modules/Home/components/SliderSection/SliderSection'
import ProductSection from '../modules/Home/components/SliderSection/ProductSection'
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
      {/* <Box>
        <VideoSection />
      </Box>
      <Container maxWidth="xl" sx={{ marginBottom: '200px' }}>
        <Box sx={{ marginTop: '50px' }}>
          <SliderSection />
        </Box>
        <Box sx={{ marginTop: '120px' }}>
          {recommended?.['hydra:member'] && (
            <ProductSection
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
            <ProductSection
              title={'מוצרים קבועים'}
              array={newCatalog?.['hydra:member']}
              toShow={5}
              column={1}
              loading={loadingNewCatalog}
            />
          )}
        </Box>
      </Container> */}

      <Home.Video />
      <Home.Categories />
      <Home.TopProducts />
      <Home.NewProducts />
    </Box>
  )
}

export default HomePage
