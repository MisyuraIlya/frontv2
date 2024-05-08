import React from 'react'
import VideoSection from '../components/VideoSection/VideoSection'
import SliderSection from '../components/SliderSection/SliderSection'
import ContactFooter from '../../../shared/ContactFooter'
import ProductSection from '../components/SliderSection/ProductSection'
import { useAuth } from '../../Auth/store/useAuthStore'
import { Box, Container } from '@mui/material'
import useDataRecommended from '../../Catalog/hook/useDataRecommended'
import useDataNewCatalog from '../../Catalog/hook/useDataNewCatalog'

const HomePage = () => {
  const { user } = useAuth()
  const { data: recommended, isLoading: loadingRecommended } =
    useDataRecommended()
  const { data: newCatalog, isLoading: loadingNewCatalog } = useDataNewCatalog()
  console.log('recommended', recommended, newCatalog)
  return (
    <Box>
      <Box sx={{ marginTop: '35px' }}>
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
      </Container>
      <ContactFooter />
    </Box>
  )
}

export default HomePage
