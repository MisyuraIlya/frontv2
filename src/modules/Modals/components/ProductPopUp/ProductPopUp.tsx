import React, { FC } from 'react'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import ProductLeftSide from './components/ProductLeftSide/ProductLeftSide'
import ProductRightSide from './components/ProductRightSide/ProductRightSide'

type ProductPopUpProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const ProductPopUp: FC<ProductPopUpProps> = ({ active, setActive }) => {
  return (
    <ModalWrapper active={active} setActive={setActive} height={90} width={80}>
      <div className="product-page">
        <div className="product-wrapper flex-container">
          <div className="col-lg-5 image flex-container">
            <ProductRightSide />
          </div>
          <div className="col-lg-7 info-p">
            <ProductLeftSide />
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ProductPopUp
