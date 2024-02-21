import axios from 'axios'
import { getClientExtId } from '../../Auth/helpers/auth.helper'

interface DocumentsResponse extends Hydra {
  'hydra:member': IDocument[]
}
interface HistoriesResponse extends Hydra {
  'hydra:member': IHistory[]
}
interface HistoryDetailedResponse extends Hydra {
  'hydra:member': IHistoryDetailed[]
}
interface RestoreCartResponse extends Hydra {
  'hydra:member': ICart[]
}
export const DocumentsService = {
  async GetDocuments(
    userExId: string,
    documentType: string,
    fromDate: string,
    toDate: string,
    page: string | number
  ): Promise<DocumentsResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/documents?userExId=${userExId}&from=${fromDate}&to=${toDate}&documentType=${documentType}&page=${page}`
    )
    return response.data
  },

  async GetDocumentsItem(
    documentNumber: number | string,
    documentItemType: DocumentItemTypes
  ): Promise<IDocumentItems> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/documents/${documentNumber}?documentItemType=${documentItemType}&userExId=${getClientExtId()}`
    )
    return response.data
  },

  async GetKartesset(
    userExId: string,
    fromDate: string,
    toDate: string
  ): Promise<ICartesset> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/cartessets/${userExId}?from=${fromDate}&to=${toDate}`
    )
    return response.data
  },

  async GetHistory(
    userExId: string,
    fromDate: string,
    toDate: string
  ): Promise<HistoriesResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/histories?createdAt[before]=${toDate}&createdAt[after]=${fromDate}&user.extId=${userExId}`
    )
    return response.data
  },
  async GetHistoryItem(documentId: string | number): Promise<IHistory> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/histories/${documentId}`
    )
    return response.data
  },

  async RestoreCart(
    documentType: string,
    table: string,
    userExtId: string,
    documentNumber: string,
    PriceMode: IPriceMode
  ): Promise<ICart[] | null> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/restoreCart/${documentType}/${table}/${PriceMode}/${userExtId}/${documentNumber}`
    )
    if (response.data) {
      return response.data['hydra:member']
    } else {
      return null
    }
  },

  async createPdf(data: IPdfDocument) {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/pdf`,
      data
    )
    return response.data
  },
  async createXl(data: IPdfDocument) {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/xl`,
      data
    )
    return response.data
  },
}
