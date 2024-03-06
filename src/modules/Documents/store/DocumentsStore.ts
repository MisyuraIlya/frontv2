import { create } from 'zustand'
import { HydraHandler } from '../../../helpers/hydraHandler'
import { DocumentsService } from '../services/document.service'
import { getClientExtId, getClientId } from '../../Auth/helpers/auth.helper'
import moment from 'moment'

interface DocumentsStore {
  loading: boolean

  //========== PAGINATION =============
  totalPages: number
  setPage: (value: string) => void
  hydraPagination: hydraPagination

  //===================================

  //========== CALENDAR ===============
  currentDate: Date
  setCurrentDate: (currentDate: Date) => void
  showCalendar: boolean
  setShowCalendar: (bool: boolean) => void
  type: 'from' | 'to'
  handleCalendar: (value: 'from' | 'to', date: Date) => void
  //===================================

  //========== SEARCH FILTER ===============
  documentTypes: Array<{ value: IDocumentTypes; label: string }>
  selectedDocument: IDocumentTypes
  setSelectedDocument: (value: IDocumentTypes) => void
  searchValue: string
  setSearchValue: (value: string) => void
  //========================================

  //========== DATA ===============
  items: IDocument[]
  totalItems: number
  getItems: (
    documentType: string,
    dateFrom: Date,
    dateTo: Date,
    page: string
  ) => Promise<void>
  //===============================
}

export const useDocuments = create<DocumentsStore>((set, get) => ({
  loading: false,

  //========== PAGINATION =============
  totalPages: 0,
  hydraPagination: {
    totalPages: '1',
    page: '1',
    lastPage: '1',
    nextPage: '1',
    previous: '1',
  },
  setPage: (page: string) => {
    set((state) => ({
      hydraPagination: {
        ...state.hydraPagination,
        page: page,
      },
    }))
  },
  //===================================

  //========== CALENDAR ===============
  currentDate: new Date(),
  setCurrentDate: (value) => set({ currentDate: value }),
  showCalendar: false,
  setShowCalendar: (bool: boolean) => set({ showCalendar: bool }),
  type: 'from',
  handleCalendar: (type: 'from' | 'to', date) => {
    set({
      currentDate: date,
      type,
      showCalendar: !get().showCalendar,
    })
  },
  //===================================

  //========== SEARCH FILTER ===============
  documentTypes: [
    { value: 'order', label: 'הזמנות' },
    { value: 'priceOffer', label: 'הצעות מחיר' },
    { value: 'deliveryOrder', label: 'תעודות משלוח' },
    { value: 'aiInvoice', label: 'חשבוניות מס' },
    { value: 'ciInvoice', label: 'חשבוניות מס מרכזות' },
    { value: 'returnOrder', label: 'החזרות' },
    { value: 'draft', label: 'טיוטות' },
    { value: 'history', label: 'מסמכי WEB' },
  ],

  selectedDocument: 'order',
  setSelectedDocument: (value: IDocumentTypes) => {
    set({ selectedDocument: value })
  },
  searchValue: '',
  setSearchValue: (value: string) => set({ searchValue: value }),
  //========================================

  //========== DATA ===============
  items: [],
  totalItems: 0,
  getItems: async (
    documentType: string,
    dateFrom: Date,
    dateTo: Date,
    page: string
  ) => {
    set({ loading: true })
    try {
      const response = await DocumentsService.GetDocuments(
        getClientId(),
        documentType,
        dateFrom,
        dateTo,
        page
      )
      set({
        items: response['hydra:member'],
        totalItems: response['hydra:totalItems'],
      })
      const hydraPagination = HydraHandler.paginationHandler(response)
      set({ hydraPagination: hydraPagination })
    } catch (e) {
      console.error('[ERROR] fetch documents', e)
    } finally {
      set({ loading: false })
    }
  },
  //========== DATA ===============
}))
