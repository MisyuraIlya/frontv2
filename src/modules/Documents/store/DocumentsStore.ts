import { create } from 'zustand'
import { HydraHandler } from '../../../helpers/hydraHandler'
import { DocumentsService } from '../services/document.service'
import { getClientExtId } from '../../Auth/helpers/auth.helper'
import moment from 'moment'

interface DocumentsStore {
  loading: boolean

  //========== PAGINATION =============
  totalPages: number
  //   page: number;
  setPage: (value: string) => void
  //   lastPage: number;
  //   nextPage: number;
  //   previousPage: number;
  hydraPagination: hydraPagination
  //===================================

  //========== CALENDAR ===============
  // showCalendar: boolean
  // setShowCalendar: (bool: boolean) => void
  // type: string
  // setType: (value: string) => void
  // dateFrom: Date
  // dateTo: Date
  // choosedDate: Date
  // setDateFrom: (date: Date) => void
  // setDateTo: (date: Date) => void
  //===================================

  //========== SEARCH FILTER ===============
  documentTypes: Array<{ value: string; label: string }>
  selectedDocument: string
  // setSelectedDocument: (value: string) => void
  documentType: string
  setDocumentType: (value: string) => void
  documentId: string
  setDocumentId: (value: string) => void
  documentItemType: DocumentItemTypes
  setDocumentItemType: (value: DocumentItemTypes) => void
  selectedPriceMode: IPriceMode
  setSelectedPriceMode: (value: IPriceMode) => void
  searchValue: string
  setSearchValue: (value: string) => void
  downloadDocument: (value: string, documentNumber: string) => Promise<void>
  handleRestoreCartFunction: () => Promise<ICart[] | null>
  //========================================

  //========== DATA ===============
  items: Array<IDocument | IHistory | ICartessetLine>
  clearItems: () => void
  getItems: (dateFrom: Date, dateTo: Date) => Promise<void>
  //===============================

  //========== ITEM DATA ===============
  orderItems: Array<IDocumentItem | IHistoryDetailed>
  filesOrder: IDocumentItemsFile[]
  loadingItemsPage: boolean
  clerOrderItems: () => void
  totalTax: number
  totalPriceAfterTax: number
  totalAfterDiscount: number
  totalPrecent: number
  itemsLength: number
  getOrderItems: (id: string) => Promise<void>
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
  //===================================

  //========== CALENDAR ===============
  // showCalendar: false,
  // setShowCalendar: (bool: boolean) => set({ showCalendar: bool }),
  // type: '',
  // setType: (value: string) => set({ type: value, showCalendar: true }),
  // dateFrom: new Date(),
  // dateTo: new Date(),
  // choosedDate: new Date(),
  // setDateFrom: (date: Date) => set({ dateFrom: date }),
  // setDateTo: (date: Date) => set({ dateTo: date }),
  //===================================

  //========== SEARCH FILTER ===============
  documentTypes: [
    { value: 'orders', label: 'הזמנות' },
    { value: 'priceOffer', label: 'הצעות מחיר' },
    { value: 'deliveryOrder', label: 'תעודות משלוח' },
    { value: 'aiInvoice', label: 'חשבוניות מס' },
    { value: 'ciInvoice', label: 'חשבוניות מס מרכזות' },
    { value: 'returnOrders', label: 'החזרות' },
    { value: 'quotes', label: 'טיוטות' },
  ],

  selectedDocument: 'orders',
  // setSelectedDocument: (value: string) => {
  //   set({ selectedDocument: value })
  //   get().getItems()
  // },
  documentType: '',
  setDocumentType: (value: string) => set({ documentType: value }),
  documentItemType: 'orders',
  setDocumentItemType: (value: DocumentItemTypes) =>
    set({ documentItemType: value }),
  documentId: '',
  setDocumentId: (value: string) => set({ documentId: value }),
  selectedPriceMode: 'updatedPrice',
  setSelectedPriceMode: (value: IPriceMode) =>
    set({ selectedPriceMode: value }),
  searchValue: '',
  setSearchValue: (value: string) => set({ searchValue: value }),
  downloadDocument: async (value: string, documentNumber: string) => {
    // try {
    //     set({loading:true})
    //     let data = null;
    //     if(get().documentType == 'document' || get().documentType == 'documentItem') {
    //         let documents = []
    //         get().orderItems.map((item) => {
    //             let obj = {
    //                 sku: item.sku,
    //                 barcode: 'TODO',
    //                 title: item.title,
    //                 price: item.priceByOne,
    //                 quantity: item.quantity,
    //                 discount: item.discount,
    //                 totalBeforeTax:  item.total * 0.17,
    //                 totalPrice: item.total,
    //                 image: 'TODO',
    //             }
    //             documents.push(obj)
    //         })
    //         let objectData = {
    //             documentNumber:documentNumber,
    //             userExtId: getClientExtId(),
    //             documentType:'הזמנה',
    //             erpData:{
    //                 totalPrice: get().totalAfterDiscount,
    //                 totalPriceBeforeTax: get().totalAfterDiscount * 0.17,
    //                 documents
    //             }
    //         }
    //         data = objectData;
    //     } else if(get().documentType == 'history' || get().documentType == 'historyItem') {
    //         let documents = []
    //         get().orderItems.map((item) => {
    //             let obj = {
    //                 sku: item?.product?.sku,
    //                 barcode: 'TODO',
    //                 title: item?.product?.title,
    //                 price: item.singlePrice,
    //                 quantity: item.quantity,
    //                 discount: item.discount,
    //                 totalBeforeTax:  item.total * 0.17,
    //                 totalPrice: item.total,
    //                 image: process.env.REACT_APP_MEDIA + item?.product?.defaultImagePath ,
    //             }
    //             documents.push(obj)
    //         })
    //         let objectData = {
    //             documentNumber:documentNumber,
    //             userExtId: getClientExtId(),
    //             documentType:'הזמנה',
    //             erpData:{
    //                 totalPrice: get().totalAfterDiscount,
    //                 totalPriceBeforeTax: get().totalAfterDiscount * 0.17,
    //                 documents
    //             }
    //         }
    //         data = objectData;
    //     } else if(get().documentType === 'kartesset') {
    //     }
    //     // console.log('data',data)
    //     if(value === 'pdf') {
    //         const response = await DocumentsService.createPdf(data);
    //         return response
    //     }
    //     // if(value === 'xls'){
    //     //     const response = await DocumentsService.createXl(data);
    //     //     return response?.url
    //     // }
    // } catch(e) {
    //     console.log('[ERROR] error get document xlsx')
    // } finally {
    //     set({loading:false})
    // }
  },
  handleRestoreCartFunction: async (): Promise<ICart[] | null> => {
    try {
      set({ loading: true })
      let response: ICart[] | null = null

      if (
        get().documentType === 'document' ||
        get().documentType === 'documentItem'
      ) {
        response = await DocumentsService.RestoreCart(
          'online',
          get().selectedDocument,
          getClientExtId(),
          get().documentId,
          get().selectedPriceMode
        )
      }

      if (
        get().documentType === 'history' ||
        get().documentType === 'historyItem'
      ) {
        response = await DocumentsService.RestoreCart(
          'history',
          get().selectedDocument,
          getClientExtId(),
          get().documentId,
          get().selectedPriceMode
        )
      }

      return response
    } catch (e) {
      console.error('[ERROR] fetch restored cart', e)
      return null
    } finally {
      set({ loading: false })
    }
  },
  //========================================

  //========== DATA ===============

  items: [],

  clearItems: () => set({ items: [] }),
  getItems: async (dateFrom: Date, dateTo: Date) => {
    set({ loading: true })
    try {
      let response = null
      if (get().documentType === 'document') {
        if (get().selectedDocument == 'quotes') {
          response = await DocumentsService.GetHistory(
            getClientExtId(),
            moment(dateFrom).format('YYYY-MM-DD'),
            moment(dateTo).format('YYYY-MM-DD')
          )
          // console.log('response',response)
          response['hydra:member'].map((element) => {
            element.user_name = element.user.name
            element.userExId = element.user.extId
            element.type = 'טיוטה'
            element.document_number = element.id
            element.status = 'טיוטה'
          })
        } else {
          response = await DocumentsService.GetDocuments(
            getClientExtId(),
            get().selectedDocument,
            moment(dateFrom).format('YYYY-MM-DD'),
            moment(dateTo).format('YYYY-MM-DD'),
            get().hydraPagination.page
          )
        }

        set({ items: response['hydra:member'] })
        const hydraPagination = HydraHandler.paginationHandler(response)
        set({ hydraPagination: hydraPagination })
      } else if (get().documentType === 'history') {
        response = await DocumentsService.GetHistory(
          getClientExtId(),
          moment(dateFrom).format('YYYY-MM-DD'),
          moment(dateTo).format('YYYY-MM-DD')
        )
        set({ items: response['hydra:member'] })
        const hydraPagination = HydraHandler.paginationHandler(response)
        set({ hydraPagination: hydraPagination })
      } else if (get().documentType === 'kartesset') {
        response = await DocumentsService.GetKartesset(
          getClientExtId(),
          moment(dateFrom).format('YYYY-MM-DD'),
          moment(dateTo).format('YYYY-MM-DD')
        )
        set({ items: response?.lines['hydra:member'] })
      }
    } catch (e) {
      console.error('[ERROR] fetch documents', e)
    } finally {
      set({ loading: false })
    }
  },

  //===============================

  //========== ITEM DATA ===============
  loadingItemsPage: false,
  orderItems: [],
  filesOrder: [],
  clerOrderItems: () => set({ orderItems: [] }),
  totalTax: 0,
  totalPriceAfterTax: 0,
  totalAfterDiscount: 0,
  totalPrecent: 0,
  itemsLength: 0,
  getOrderItems: async (id: number | string) => {
    set({
      loadingItemsPage: true,
      totalTax: 0,
      totalPriceAfterTax: 0,
      totalAfterDiscount: 0,
      totalPrecent: 0,
      itemsLength: 0,
      orderItems: [],
    })
    try {
      let response = null
      if (get().documentType === 'documentItem') {
        response = await DocumentsService.GetDocumentsItem(
          id,
          get().documentItemType
        )
        set({
          orderItems: response.products['hydra:member'],
          itemsLength: response.products['hydra:totalItems'],
          filesOrder: response.files['hydra:member'],
        })
        set({
          totalTax: response.totalTax,
          totalPriceAfterTax: response.totalPriceAfterTax,
          totalAfterDiscount: response.totalAfterDiscount,
          totalPrecent: response.totalPrecent,
        })
      } else if (get().documentType === 'historyItem') {
        response = await DocumentsService.GetHistoryItem(id)
        set({ orderItems: response.historyDetaileds })
        set({
          totalTax: response?.total * 0.17,
          itemsLength: response.historyDetaileds?.length,
          totalPriceAfterTax: response?.total,
          totalAfterDiscount: response?.total,
          totalPrecent: response?.discount ? response?.discount : 0,
        })
      }
    } catch (e) {
      console.error('[ERROR] fetch documents', e)
    } finally {
      set({ loadingItemsPage: false })
    }
  },

  //===============================
  setPage: (page: string) => {
    set((state) => ({
      hydraPagination: {
        ...state.hydraPagination,
        page: page,
      },
    }))
  },
}))
