import useSWR from 'swr'
import { CatalogServices } from '../services/catalog.service'
import { useAuth } from '../../Auth/store/useAuthStore'

const fetchData = async (
  lvl1: string | number,
  lvl2: string | number,
  lvl3: string | number,
  searchParams: string,
  documentType: CatalogDocumentType,
  user: IUser
): Promise<GetCatalogResponse> => {
  return await CatalogServices.GetCatalog(
    lvl1,
    lvl2,
    lvl3,
    searchParams,
    documentType,
    user
  )
}

const useDataRecommended = () => {
  const { user } = useAuth()
  const { data, error, isLoading, mutate } = useSWR<GetCatalogResponse>(
    `/api/catalog/recommended/0/0/0?userId=${user?.id}`,
    () => fetchData('0', '0', '0', '', 'recommended', user!)
  )

  return {
    data,
    isLoading: isLoading,
    isError: error,
    mutate,
  }
}

export default useDataRecommended
