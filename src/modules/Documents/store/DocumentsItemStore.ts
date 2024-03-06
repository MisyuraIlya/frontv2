import { create } from 'zustand'

interface DocumentsItemStore {
  loading: boolean
  setLoading: (value: boolean) => void
  setSwrHandler: (
    orderItems: IDocumentItem[],
    filesOrder: IDocumentItemsFile[],
    totalTax: number,
    totalPriceAfterTax: number,
    totalAfterDiscount: number,
    totalPrecent: number,
    itemsLength: number
  ) => void
  orderItems: IDocumentItem[]
  rezervedItems: IDocumentItem[]
  search: string
  setSearch: (search: string) => void
  files: IDocumentItemsFile[]
  totalTax: number
  totalPriceAfterTax: number
  totalAfterDiscount: number
  totalPrecent: number
  itemsLength: number
}

export const useDocumentsItem = create<DocumentsItemStore>((set, get) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  setSwrHandler: (
    orderItems,
    files,
    totalTax,
    totalPriceAfterTax,
    totalAfterDiscount,
    totalPrecent,
    itemsLength
  ) =>
    set({
      orderItems,
      rezervedItems: orderItems,
      files,
      totalTax,
      totalPriceAfterTax,
      totalAfterDiscount,
      totalPrecent,
      itemsLength,
    }),
  orderItems: [],
  rezervedItems: [],
  search: '',
  setSearch: (search: string) => {
    if (search) {
      const filtered = get().orderItems.filter(
        (item) => item.title.includes(search) || item.sku.includes(search)
      )
      set({ orderItems: filtered })
    } else {
      set({ orderItems: get().rezervedItems })
    }
    set({ search })
  },
  files: [],
  totalTax: 0,
  totalPriceAfterTax: 0,
  totalAfterDiscount: 0,
  totalPrecent: 0,
  itemsLength: 0,
}))
