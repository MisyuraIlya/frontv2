import React from 'react'
import { useCart } from '../../store/cart.store'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { getUserFromStorage } from '../../../Auth/helpers/auth.helper'
import { useModals } from '../../../Modals/provider/ModalProvider'
const MainSummary = () => {
  const { isUserBlocked } = useAuth()
  const {
    setSpecialSettingsPop,
    selectedMode,
    cart,
    discount,
    totalBasket,
    comment,
    setComment,
    sendOrder,
    sendNoApproval,
    b2bPickupDiscount,
    priceBeforeTax,
    calucalteDiscountTotal,
    calculatePriceAfterDiscount,
    calculateTax,
    calculateFinalPrice,
    getTotalDiscountPrecet,
  } = useCart()

  const { openCartSettings, setOpenCartSettings } = useModals()
  return (
    <>
      <ul className="first-price">
        <li className="li-border">
          <span className="title">{'כמות שורות'}</span>
          <span className="price hidePrice">{cart.length}</span>
        </li>

        <li>
          <span className="title">{'סה״כ לפני מע״מ'}</span>
          <span className="price">{priceBeforeTax().toFixed(1)}</span>
        </li>
        {calucalteDiscountTotal() !== 0 && (
          <div>
            <li className="">
              <span className="title">
                {'הנחה כללית: ' + getTotalDiscountPrecet() + '%'}
              </span>
              <span className="price">
                {calucalteDiscountTotal().toFixed(1)}
              </span>
            </li>
          </div>
        )}

        {calucalteDiscountTotal() !== 0 && (
          <li>
            <span className="title">{'סה״כ אחרי הנחה'}</span>
            <span className="price">
              {calculatePriceAfterDiscount().toFixed(1)}
            </span>
          </li>
        )}

        <li>
          <span className="title">דמי משלוח</span>
          <span className="price">{process.env.DELIVERY_PRICE}</span>
        </li>

        <li>
          <span className="title">{'מע״מ'}</span>
          <span className="price">{calculateTax().toFixed(1)}</span>
        </li>
      </ul>

      <h4>
        <span className="title">{'מחיר לתשלום'}</span>
        <span className="price">{calculateFinalPrice().toFixed(1)}</span>
      </h4>

      {/* <ul className="first-price">
        <li>
          <span className="title black">{'הגדרות לאספקה'}</span>
          <span
            onClick={() => setOpenCartSettings(!openCartSettings)}
            className="icon material-symbols-outlined"
          >
            settings
          </span>
        </li>
      </ul> */}

      {selectedMode == 'quote' && (
        <ul className="first-price">
          <li>
            <span className="title black">{'ללא אישור מנהל'}</span>
            {/* <div 
                        className={sendNoApproval ? "checkBox active" : "checkBox"}
                        onClick={() => setSendNoApproval(!sendNoApproval)}
                    ></div>							 */}
          </li>
        </ul>
      )}

      {/* {totalBasket > getUserFromStorage().MaxObligo &&
        <div className="obligo-alert-cont">
            {totalBasket > getUserFromStorage().MaxObligo &&
                <p>{'חריגת אובליגו. צור קשר עם סוכן / משרד'}</p>
            }
        </div>
        } */}

      {+process.env.MINIMUM_DELIVERY_PRICE! > priceBeforeTax() &&
      selectedMode == 'order' ? (
        <div className="minPrice-class">
          <p>
            {'עליך לצבור עוד ' +
              Math.abs(
                priceBeforeTax() - +process.env.MINIMUM_DELIVERY_PRICE!
              ).toFixed(1) +
              ' ש״ח עד למינימום הזמנה'}
          </p>
        </div>
      ) : null}
    </>
  )
}

export default MainSummary
