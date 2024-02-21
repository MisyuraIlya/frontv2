export const setProductLocalstorage = (arr: ICart[]): void => {
  localStorage.products = JSON.stringify(arr)
}

export const getProductsLocalStorage = (): ICart[] => {
  if (localStorage.products) {
    return JSON.parse(localStorage.products)
  } else {
    return []
  }
}

export const removeProductsFromStorage = (): void => {
  localStorage.removeItem('products')
}
