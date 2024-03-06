type IDocumentTypes =
  | 'history'
  | 'draft'
  | 'order'
  | 'priceOffer'
  | 'deliveryOrder'
  | 'aiInvoice'
  | 'ciInvoice'
  | 'returnOrder'
  | 'kartesset'

interface IDocument {
  documentNumber: string
  documentType: IDocumentTypes
  userName: string
  userExId: string
  status: string
  createdAt: string
  updatedAt: string
  total: number
}

interface IDocumentItem {
  '@type': string
  '@id': string
  sku: string
  title: string
  quantity: number
  priceByOne: number
  total: number
  discount: number
}

// DocumentItemsDto interface definition
interface IDocumentItems {
  products: {
    'hydra:totalItems': number
    'hydra:member': DocumentItemDto[]
  }
  totalTax: number
  totalPriceAfterTax: number
  totalAfterDiscount: number
  totalPrecent: number
  documentType: string
}

interface IPdfDocumentItem {
  sku: string
  barcode: string
  title: string
  price: number
  quantity?: number
  discount?: number
  image: string
  totalBeforeTax: number
  totalPrice: number
}

// DocumentData interface definition
interface IPdfDocument {
  documentNumber: string
  documentType: string
  erpData: {
    totalPrice: number
    totalPriceBeforeTax: number
    // Add other properties as needed
  }
  documents: IPdfDocumentItem[]
  totalPrice: number
  totalPriceBeforeTax: number
  userExtId: string
}

type OrderStatus = 'paid' | 'draft' | 'pending' | 'faild'

// interface IHistory {
//   id: ?(number | null)
//   orderExtId?: string
//   user: IUser
//   deliveryDate?: string
//   discount?: number
//   total: number
//   orderComment?: string
//   orderStatus: OrderStatus
//   createdAt: string
//   updatedAt: string
//   deliveryPrice?: number
//   historyDetaileds?: IHistoryDetailed[]
//   documentType: IDocumentType
//   agent?: IUser | null
//   isBuyByCredirCard?: boolean
//   isSendErp?: boolean
//   sendErpAt?: string
// }

// interface IHistoryDetailed {
//   id: number
//   history: IHistory
//   product: IProduct
//   singlePrice: number
//   quantity: number
//   discount: number
//   total: number
// }

//CHECK IF NEED
// interface ICartessetLine {
//   Balance: number
//   Description: string
//   DueDate: string
//   ID: string
//   Referance: string
//   Show: boolean
//   TransID: string
//   TransType: string
//   ValueDate: string
//   suF: number
// }

// interface ICartesset {
//   lines: {
//     'hydra:totalItems': number
//     'hydra:member': ICartessetLine[]
//   }
// }
