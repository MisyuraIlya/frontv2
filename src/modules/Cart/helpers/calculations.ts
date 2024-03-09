export const calculatePrice = (product: IProduct, quantity: number) => {
  if (product?.finalPrice) {
    const totalPriceBeforeDiscount = quantity * product.finalPrice
    const discountAmount = (product.discount / 100) * totalPriceBeforeDiscount
    const finalPrice = totalPriceBeforeDiscount - discountAmount
    return finalPrice
  } else {
    return 0
  }
}
