import React, { FC } from 'react'
import { useAuth } from '../../../../../../Auth/store/useAuthStore'
import { useCart } from '../../../../../../Cart/store/cart.store'
import AddToCart from '../../../../../../Cart/components/AddToCart/AddToCart'
import PackageSelect from './PackageSelect'

type PriceBlockProps = {
  product: IProduct
}

const PriceBlock: FC<PriceBlockProps> = ({ product }) => {
  const { user, isAgent } = useAuth()
  const {
    cart,
    getCartItem,
    selectedMode,
    calculateProductByQuantityAndPackage,
    changePackQuantity,
  } = useCart()

  const inCart = getCartItem(product)
  console.log('cart', cart, inCart)
  return (
    <div className="price-and-addtocart-cont">
      {user &&
      selectedMode &&
      product.finalPrice &&
      product.finalPrice != 0 &&
      product.stock != 0 ? (
        <div className="price-cont flex-container">
          <div style={{ width: '100%', height: '40px' }}>
            <PackageSelect product={product} />
          </div>

          <div className="price-cont-sub col-lg-12 flex-container">
            <div className="price-cont-sub-left-box col-lg-6">
              <p className="row-title highlight-p-cls">{"יח' להזמנה"}</p>
              <p className="row-val no-bg highlight-p-cls">
                {inCart?.sku
                  ? inCart.quantity *
                    (inCart?.choosedPackQuantity
                      ? inCart.choosedPackQuantity
                      : inCart.quantity)
                  : '0'}
              </p>
            </div>
            <div className="price-cont-sub-right-box  col-lg-6">
              <p className="row-title">{'סה״כ להזמנה'}</p>
              <p className="row-val no-bg price">
                {inCart &&
                  (inCart?.choosedPackQuantity
                    ? inCart.quantity * inCart.choosedPackQuantity
                    : inCart.quantity) * inCart.price}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {user &&
      selectedMode &&
      product.finalPrice &&
      product.finalPrice != 0 &&
      product.stock != 0 ? (
        <AddToCart item={product} />
      ) : null}
    </div>
  )
}

export default PriceBlock
