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
