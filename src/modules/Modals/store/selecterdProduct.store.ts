import { create } from 'zustand'
import { CatalogServices } from '../../Catalog/services/catalog.service'
import { getClientExtId } from '../../Auth/helpers/auth.helper'

interface useSelectedProductState {
  loading: boolean
  onlineLoading: boolean
  purcheseLoading: boolean
  selectedProd: IProduct
  purchesHistoryData: PurchaseHistoryItem[]
  isFetchOnline: boolean
  onlineData: ProductPopUp
}

interface useSelectedProductMethods {
  changeDefaultImage: (imagePath: string) => void
  setSelectedProd: (element: IProduct) => void
  setPurchesHistory: (data: PurchaseHistoryItem[]) => void
  getPurchesHistory: () => Promise<void>
  getProductOnlineData: () => Promise<void>
}

export const useSelectedProduct = create<
  useSelectedProductState & useSelectedProductMethods
>((set, get) => ({
  loading: false,
  onlineLoading: false,
  purcheseLoading: false,
  selectedProd: {} as IProduct,
  onlineData: {} as ProductPopUp,
  changeDefaultImage: (imagePath: string) => {
    const prod = get().selectedProd
    prod.defaultImagePath = imagePath
    set({ selectedProd: prod })
  },
  setSelectedProd: (element: IProduct) => {
    set({ selectedProd: element })
  },
  purchesHistoryData: [],
  setPurchesHistory: (data: PurchaseHistoryItem[]) => {
    set({ purchesHistoryData: data })
  },
  getPurchesHistory: async () => {
    set({ purcheseLoading: true })
    try {
      const data = await CatalogServices.GetPurchaseHistory(
        getClientExtId(),
        get().selectedProd?.sku
      )
      set({ purchesHistoryData: data['hydra:member'] })
    } catch (e) {
      console.log('[selectedProd', e)
    } finally {
      set({ purcheseLoading: false })
    }
  },
  isFetchOnline: false,
  getProductOnlineData: async () => {
    try {
      set({ onlineLoading: true })
      const response = await CatalogServices.GetProductPopUpData(
        get().selectedProd.sku
      )
      if (response.status === 'success') {
        set({ onlineData: response.data })
      }
    } catch (e) {
      console.log('[ERROR]', e)
    } finally {
      set({ onlineLoading: false })
    }
  },
}))
