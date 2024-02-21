declare module '*.png'
declare module '*.svg'

interface hydraPagination {
  totalPages: number | string
  page: number | string
  lastPage: number | string
  nextPage: number | string
  previous: number | string
}

interface HydraView {
  '@id': string
  'hydra:first': string
  'hydra:last': string
  'hydra:next': string
  'hydra:previous': string
}

interface Hydra {
  'hydra:totalItems': number
  'hydra:view': HydraView
}

interface IMediaObject {
  '@id': string
  id: number
  file: File
  source: 'product' | 'category' | 'notification'
  filePath: string
  createdAt: string
}
