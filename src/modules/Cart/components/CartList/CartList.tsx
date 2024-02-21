import React from 'react'
import { useCart } from '../../store/cart.store'
import AddToCart from '../AddToCart/AddToCart'
import { useModals } from '../../../Modals/provider/ModalProvider'
import {
  calculatePrice,
  getDiscountPrecent,
  getPriceByOriginalPrice,
} from '../../helpers/calculations'

const CartList = () => {
  const { cart, CartTitle } = useCart()
  const { selectProduct } = useModals()
  return (
    <div>
      <div className="h1-cont">
        <h1 className="title">{CartTitle()}</h1>
      </div>
      <div className="products doc-container">
        <div id="lines-main-cont" className="lines-main-cont shop-cart-table">
          <table className="lines-sub-cont">
            <tbody>
              <tr className="heading">
                <th className="col-cont  sticky-col">
                  <p></p>
                </th>
                <th className="col-cont">
                  <p></p>
                </th>
                <th className="col-cont">
                  <p>פריט</p>
                </th>
                <th className="col-cont">
                  <p>כמות</p>
                </th>
                <th className="col-cont">
                  <p>מחיר</p>
                </th>
                <th className="col-cont">
                  <p>הנחה</p>
                </th>
                <th className="col-cont">
                  <p>סה״כ להזמנה</p>
                </th>
                <th className="col-cont">
                  <p></p>
                </th>
              </tr>
              {cart.length > 0 ? (
                cart?.map((element, index) => {
                  let price = calculatePrice(
                    element?.product,
                    element?.quantity
                  )
                  let discount = getDiscountPrecent(element)
                  let priceByOriginal = getPriceByOriginalPrice(element)
                  return (
                    <tr key={index} className={'item'}>
                      <th
                        className="col-cont  sticky-col"
                        style={{ padding: '10px' }}
                      >
                        <AddToCart item={element?.product} />
                      </th>

                      <th className="col-cont">
                        {element?.product?.defaultImagePath ? (
                          <img
                            className="img"
                            src={
                              process.env.REACT_APP_MEDIA +
                              '/product/' +
                              element?.product?.defaultImagePath
                            }
                            onClick={() => selectProduct(element?.product)}
                          />
                        ) : (
                          <img
                            className="img"
                            src={
                              process.env.REACT_APP_MEDIA + '/placeholder.jpg'
                            }
                            onClick={() => selectProduct(element?.product)}
                          />
                        )}
                      </th>

                      <th
                        className="col-cont"
                        onClick={() => selectProduct(element?.product)}
                      >
                        <p className="catalog">{'#' + element?.product?.sku}</p>
                        <p>{element?.product?.title}</p>
                      </th>

                      <th className="col-cont">
                        <p className="row-val percent">{element?.quantity}</p>
                      </th>

                      <th className="col-cont">
                        <p className="row-val percent">
                          {element?.product?.finalPrice}
                        </p>
                      </th>

                      <th className="col-cont">
                        <p className="row-val percent">{element?.discount}</p>
                      </th>

                      <th className="col-cont">
                        {priceByOriginal != price.toFixed(1) ? (
                          <>
                            <p
                              className="price price-p-cls"
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              {price.toFixed(1)}
                            </p>
                          </>
                        ) : (
                          <p
                            className="price price-p-cls"
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            {price.toFixed(1)}
                          </p>
                        )}
                      </th>
                    </tr>
                  )
                })
              ) : (
                <h1 className="empty">{'עגלת הקניות שלך ריקה'} </h1>
              )}

              {/* <FreeList/> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CartList
