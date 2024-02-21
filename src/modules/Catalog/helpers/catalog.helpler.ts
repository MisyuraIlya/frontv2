export const setProductLocalstorage = (arr: IProduct[]) => {
  localStorage.products = JSON.stringify(arr)
}

export const getProductsLocalStorage = (): IProduct | [] => {
  if (localStorage.products) {
    return JSON.parse(localStorage.products)
  } else {
    return []
  }
}

export const removeProductsFromStorage = (): void => {
  localStorage.removeItem('products')
}
