import { create } from 'zustand'
import { HydraHandler } from '../../../helpers/hydraHandler'
import { DocumentsService } from '../services/document.service'
import { getClientExtId } from '../../Auth/helpers/auth.helper'
import moment from 'moment'

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
  filesOrder: IDocumentItemsFile[]
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
    filesOrder,
    totalTax,
    totalPriceAfterTax,
    totalAfterDiscount,
    totalPrecent,
    itemsLength
  ) =>
    set({
      orderItems,
      filesOrder,
      totalTax,
      totalPriceAfterTax,
      totalAfterDiscount,
      totalPrecent,
      itemsLength,
    }),
  orderItems: [],
  filesOrder: [],
  totalTax: 0,
  totalPriceAfterTax: 0,
  totalAfterDiscount: 0,
  totalPrecent: 0,
  itemsLength: 0,
}))

// handleRestoreCartFunction: async (): Promise<ICart[] | null> => {
//   try {
//     set({ loading: true })
//     let response: ICart[] | null = null

//     if (
//       get().documentType === 'document' ||
//       get().documentType === 'documentItem'
//     ) {
//       response = await DocumentsService.RestoreCart(
//         'online',
//         get().selectedDocument,
//         getClientExtId(),
//         get().documentId,
//         get().selectedPriceMode
//       )
//     }

//     if (
//       get().documentType === 'history' ||
//       get().documentType === 'historyItem'
//     ) {
//       response = await DocumentsService.RestoreCart(
//         'history',
//         get().selectedDocument,
//         getClientExtId(),
//         get().documentId,
//         get().selectedPriceMode
//       )
//     }

//     return response
//   } catch (e) {
//     console.error('[ERROR] fetch restored cart', e)
//     return null
//   } finally {
//     set({ loading: false })
//   }
// },

//========== ITEM DATA ===============
// loadingItemsPage: false,
// orderItems: [],
// filesOrder: [],
// clerOrderItems: () => set({ orderItems: [] }),
// totalTax: 0,
// totalPriceAfterTax: 0,
// totalAfterDiscount: 0,
// totalPrecent: 0,
// itemsLength: 0,
// getOrderItems: async (id: number | string) => {
// set({
//   loadingItemsPage: true,
//   totalTax: 0,
//   totalPriceAfterTax: 0,
//   totalAfterDiscount: 0,
//   totalPrecent: 0,
//   itemsLength: 0,
//   orderItems: [],
// })
// try {
//   let response = null
//   if (get().documentType === 'documentItem') {
//     response = await DocumentsService.GetDocumentsItem(
//       id,
//       get().documentItemType
//     )
//     set({
//       orderItems: response.products['hydra:member'],
//       itemsLength: response.products['hydra:totalItems'],
//       filesOrder: response.files['hydra:member'],
//     })
//     set({
//       totalTax: response.totalTax,
//       totalPriceAfterTax: response.totalPriceAfterTax,
//       totalAfterDiscount: response.totalAfterDiscount,
//       totalPrecent: response.totalPrecent,
//     })
//   } else if (get().documentType === 'historyItem') {
//     response = await DocumentsService.GetHistoryItem(id)
//     set({ orderItems: response.historyDetaileds })
//     set({
//       totalTax: response?.total * 0.17,
//       itemsLength: response.historyDetaileds?.length,
//       totalPriceAfterTax: response?.total,
//       totalAfterDiscount: response?.total,
//       totalPrecent: response?.discount ? response?.discount : 0,
//     })
//   }
// } catch (e) {
//   console.error('[ERROR] fetch documents', e)
// } finally {
//   set({ loadingItemsPage: false })
// }
// },

//===============================
