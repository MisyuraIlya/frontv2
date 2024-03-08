import useSWR from 'swr'
import { CatalogServices } from '../services/catalog.service'
import { getClientId } from '../../Auth/helpers/auth.helper'

const fetchData = async (): Promise<GetCategoriesResponse> => {
  return await CatalogServices.GetCategories(getClientId())
}

const useDataCategories = () => {
  const { data, error, isValidating, mutate } = useSWR(
    `/api/categoriesApp`,
    fetchData
  )
  return {
    data,
    isLoading: !data && !error,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataCategories
