import { create } from 'zustand'
import { HydraHandler } from '../../../helpers/hydraHandler'
import { DocumentsService } from '../services/document.service'
import { getClientExtId } from '../../Auth/helpers/auth.helper'
import moment from 'moment'

interface DocumentsItemStore {
  loading: boolean
  setLoading: (value: boolean) => void
  orderItems: Array<IDocumentItem>
  setOrderItems: (arr: IDocumentItem[]) => void
  filesOrder: IDocumentItemsFile[]
  setFilesOrder: (arr: IDocumentItemsFile[]) => void
}

export const useDocumentsItem = create<DocumentsItemStore>((set, get) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  orderItems: [],
  setOrderItems: (arr) => set({ orderItems: arr }),
  filesOrder: [],
  setFilesOrder: (arr) => set({ filesOrder: arr }),
}))
