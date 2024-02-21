import { create } from 'zustand'
import { AdminProductService } from '../services/products.service'

interface useProductsEditStoreState {
  loading: boolean
  products: IProduct[]
  setProducts: (arr: IProduct[]) => void
  lvls: { lvl1: number | string; lvl2: number | string; lvl3: number | string }
  setLvls: (
    lvl1: number | string,
    lvl2: number | string,
    lvl3: number | string
  ) => void
  getProducts: (
    lvl1: number | string,
    lvl2: number | string,
    lvl3: number | string
  ) => Promise<void>
  selectedProduct: IProduct | null
  setSelectedProduct: (product: IProduct | null) => void
  deleteImageFunc: (imageId: number | string) => Promise<void>
  updateProduct: (product: any) => Promise<void>
}

export const useProductsEditStore = create<useProductsEditStoreState>(
  (set, get) => ({
    loading: false,
    products: [],
    setProducts: (arr) => set({ products: arr }),
    getProducts: async (
      lvl1: string | number,
      lvl2: string | number,
      lvl3: string | number
    ) => {
      const response = await AdminProductService.GetProducts(lvl1, lvl2, lvl3)
      set({ products: response['hydra:member'] })
    },
    lvls: {
      lvl1: 0,
      lvl2: 0,
      lvl3: 0,
    },
    setLvls: (lvl1, lvl2, lvl3) =>
      set({ lvls: { lvl1: lvl1, lvl2: lvl2, lvl3: lvl3 } }),
    selectedProduct: null,
    setSelectedProduct: (product) => set({ selectedProduct: product }),
    deleteImageFunc: async (imageId: number | string) => {
      let newSelected = get().selectedProduct
      if (newSelected) {
        let newImages = newSelected?.imagePath.filter(
          (item) => item.id !== imageId
        )
        newSelected.imagePath = newImages
        set({ selectedProduct: newSelected })
      }
      await AdminProductService.deleteImage(imageId)
    },
    updateProduct: async (product: any) => {
      try {
        const res = await AdminProductService.updateProduct(product)
        set({ selectedProduct: res })
      } catch (e) {
        console.log('error', e)
      }
    },
  })
)
