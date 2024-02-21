import React from 'react'
import WareHouseComponent from './components/WareHouseComponent'
import ProductAttributes from './components/ProductAttributes'
import ProductMainInfo from './components/ProductMainInfo'
import ProductHistoryPurche from './components/ProductHistoryPurche'
import ProductMainInfoTwo from './components/ProductMainInfoTwo'
import ProductAddToCart from './components/ProductAddToCart'
import SubProducts from './components/SubProducts'
import { useSelectedProduct } from '../../../../store/selecterdProduct.store'
import OnlineData from './components/OnlineData'
import PriceBlock from '../../../../../Catalog/components/LeftSide/components/ProductList/components/PriceBlock'
const ProductLeftSide = () => {
  const { selectedProd } = useSelectedProduct()
  console.log('selectedProd', selectedProd)
  return (
    <div className="product-details">
      <div className="share"></div>
      <div className="name">
        <ProductMainInfo />
        <ProductAttributes />
        <WareHouseComponent />
        <div className="devider"></div>
        <ProductHistoryPurche />
        <div className="devider"></div>

        <ProductMainInfoTwo />
        <OnlineData />
      </div>
      <div className="flex-container">
        <div className="col-lg-6"></div>
        <div className="col-lg-6">
          <PriceBlock product={selectedProd} />
        </div>
      </div>
    </div>
  )
}

export default ProductLeftSide
