import React from 'react'
import { useCart } from '../../store/cart.store'
import { onAsk } from '../../../../shared/MySweetAlert'
import { removeProductsFromStorage } from '../../helpers/localstorage'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const CartOptions = () => {
  const { cart, setCart, selectedMode, saveDarft } = useCart()
  const navigate = useNavigate()
  let from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  let to = moment().format('YYYY-MM-DD')

  const askDelete = async () => {
    const ask = await onAsk('האם אתה בטוח?', 'כל המוצרים בעגלה יימחקו')
    if (ask) {
      setCart([])
      removeProductsFromStorage()
    }
  }

  const handleSaveAsDraft = async () => {
    const ask = await onAsk(
      'שמור הזמנה כטיוטה?',
      'טיוטה תשמר וסל הקניות הנוכחי יתרוקן'
    )
    if (ask) {
      saveDarft()
      navigate(`/historyPage?page=1&from=${from}&to=${to}`)
      setCart([])
    }
  }

  const handleToDraft = () => {
    navigate(`/historyPage?page=1&from=${from}&to=${to}`)
  }

  return (
    <div className="first-line-cont">
      {cart.length > 0 && (
        <div className="draft-btn-cont reset">
          <p onClick={() => askDelete()}>מחק סל</p>
        </div>
      )}
      {cart.length > 0 && selectedMode == 'order' ? (
        <div className="draft-btn-cont">
          <p onClick={() => handleSaveAsDraft()}>שמור טיוטה</p>
        </div>
      ) : null}
      {selectedMode == 'order' ? (
        <div className="draft-btn-cont">
          <p onClick={() => handleToDraft()}>טען טיוטה</p>
        </div>
      ) : null}
    </div>
  )
}

export default CartOptions
