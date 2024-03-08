import React, { useEffect } from 'react'
import VideoSection from '../components/VideoSection/VideoSection'
import SliderSection from '../components/SliderSection/SliderSection'
import ContactFooter from '../../../shared/ContactFooter'
import { useCatalog } from '../../Catalog/store/CatalogStore'
import ProductSection from '../components/SliderSection/ProductSection'
import { useAuth } from '../../Auth/store/useAuthStore'
import { Box, Container } from '@mui/material'
const HomePage = () => {
  const { user } = useAuth()

  return (
    <Box>
      <VideoSection />
      <Container maxWidth="lg">
        {/* <SliderSection
          title={'מחלקות החברה'}
          array={categoriesLvl1}
          toShow={5}
          column={1}
          loading={loading}
        /> */}
        {/* {user && (
          <>
            <ProductSection
              title={'מומלצים עבורך'}
              array={recommendedPoductsHomePage}
              toShow={5}
              column={1}
              loading={loadingRecommendedProds}
            />

            <ProductSection
              title={'מוצרים קבועים'}
              array={regularProductsHomePage}
              toShow={5}
              column={1}
              loading={loadingRegularProds}
            />
          </>
        )} */}
      </Container>
      <ContactFooter />
    </Box>
  )
}

export default HomePage
