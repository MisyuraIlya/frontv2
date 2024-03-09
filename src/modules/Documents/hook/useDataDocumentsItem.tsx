import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { DocumentsService } from '../services/document.service'

type RouteParams = {
  documentItemType: IDocumentTypes
  id: string
}

const fetchData = async (documentItemType: IDocumentTypes, id: string) => {
  return await DocumentsService.GetDocumentsItem(
    documentItemType as IDocumentTypes,
    id
  )
}

const useDataDocumentsItem = () => {
  const { documentItemType, id } = useParams<RouteParams>()
  const { data, error, isValidating, mutate } = useSWR<IDocumentItems>(
    `api/documents/${documentItemType}/${id}`,
    () => fetchData(documentItemType!, id!)
  )

  return {
    data,
    isLoading: !data && !error,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataDocumentsItem
