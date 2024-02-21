import React, { useEffect } from 'react'
import VideoSection from '../components/VideoSection/VideoSection'
import SliderSection from '../components/SliderSection/SliderSection'
import { useCategories } from '../../Catalog/store/CategoriesStore'
import ContactFooter from '../../../shared/ContactFooter'
import Banner from '../components/Custom/Banner'
import ComapnyActions from '../components/Custom/ComapnyActions'
import ContactUs from '../components/Custom/ContactUs'
import { useCatalog } from '../../Catalog/store/CatalogStore'
import ProductSection from '../components/SliderSection/ProductSection'
import { useAuth } from '../../Auth/store/useAuthStore'
import Partners from '../components/Custom/Partners'
const HomePage = () => {
  const { categoriesLvl1, loading } = useCategories()
  const {
    recommendedPoductsHomePage,
    regularProductsHomePage,
    getRegularProductsHomePage,
    getRecommendedHomePage,
    loadingRecommendedProds,
    loadingRegularProds,
  } = useCatalog()
  const { user } = useAuth()
  useEffect(() => {
    if (recommendedPoductsHomePage?.length == 0) {
      getRecommendedHomePage()
    }
    if (regularProductsHomePage?.length == 0) {
      getRegularProductsHomePage()
    }
  }, [])

  return (
    <div className="home-page">
      <VideoSection />
      <Partners title={''} toShow={5} column={1} />
      <SliderSection
        title={'מחלקות החברה'}
        array={categoriesLvl1}
        toShow={5}
        column={1}
        loading={loading}
      />
      {user && (
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
      )}

      <Banner />
      <ComapnyActions />
      <div className="dnb-cont">
        <img
          src={
            'https://www.duns100.co.il/embed/Duns100_Seal/images/content/Heb_Hor_white.png'
          }
        />
      </div>
      <ContactUs />

      <ContactFooter />
    </div>
  )
}

export default HomePage
