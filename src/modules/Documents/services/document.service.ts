import axios from 'axios'
import { getClientExtId } from '../../Auth/helpers/auth.helper'
import moment from 'moment'

interface DocumentsResponse extends Hydra {
  'hydra:member': IDocument[]
}

interface RestoreCartResponse extends Hydra {
  'hydra:member': ICart[]
}
export const DocumentsService = {
  async GetDocuments(
    userId: string | null | undefined,
    documentType: string,
    fromDate: Date,
    toDate: Date,
    page: string | number
  ): Promise<DocumentsResponse> {
    const fromConverted = moment(fromDate).format('YYYY-MM-DD')
    const toDateConverted = moment(toDate).format('YYYY-MM-DD')
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/documents/${documentType}/${fromConverted}/${toDateConverted}?page=${page}&userId=${userId}`
    )
    return response.data
  },

  async GetDocumentsItem(
    documentItemType: IDocumentTypes,
    documentNumber: number | string
  ): Promise<IDocumentItems> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/documentItems/${documentItemType}/${documentNumber}/?userExId=${getClientExtId()}`
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
