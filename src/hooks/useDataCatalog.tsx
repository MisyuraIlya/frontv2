import useSWR, { SWRConfiguration } from 'swr'
import { useLocation, useParams } from 'react-router-dom'
import { HydraHandler } from '../helpers/hydraHandler'
import { useAuth } from '../store/auth.store'
import services from '../services'

const fetchData = async (
  lvl1: string | number,
  lvl2: string | number,
  lvl3: string | number,
  searchParams: string,
  documentType: CatalogDocumentType,
  user: IUser
): Promise<GetCatalogResponse> => {
  return await services.CatalogService.GetCatalog(
    lvl1,
    lvl2,
    lvl3,
    searchParams,
    documentType,
    user
  )
}

const useDataCatalog = (
  search: string = '',
  document: null | CatalogDocumentType = null
) => {
  const { lvl1, lvl2, lvl3, documentType } = useParams()
  const location = useLocation()
  const { user } = useAuth()
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<GetCatalogResponse>(
      `/api/catalog/${document ?? documentType}/${lvl1}/${lvl2}/${lvl3}${search ?? location.search}&userId=${user?.id}`,
      () =>
        fetchData(
          lvl1 ?? '0',
          lvl2 ?? '0',
          lvl3 ?? '0',
          `?search=${search}` ?? location.search,
          document ?? (documentType as CatalogDocumentType),
          user!
        )
    )
  let hydraPagination
  if (data) {
    hydraPagination = HydraHandler.paginationHandler(data)
  }
  return {
    data,
    hydraPagination,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataCatalog
