import React from 'react'
import CartOptions from '../components/CartOptions/CartOptions'
import CartList from '../components/CartList/CartList'
import Summary from '../components/Summary/Summary'

const CartPage = () => {
  return (
    <div className="page-container shop-cart docs">
      {/* TODO ADD PRELOADER */}
      <div className="container flex-container prods-main-cont">
        <div className="col-lg-9 right-cont">
          <div className="right-cont-subcont">
            <CartOptions />
            <CartList />
          </div>
        </div>
        <div className="col-lg-3 summary">
          <Summary />
        </div>
      </div>
    </div>
  )
}

export default CartPage
