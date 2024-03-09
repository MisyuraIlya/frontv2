import useSWR from 'swr'
import { useLocation } from 'react-router-dom'
import { AdminClinetsService } from '../services/clients.service'
import { HydraHandler } from '../../../helpers/hydraHandler'

const fetchData = async (page: string, search: string) => {
  return await AdminClinetsService.getClients(page, search)
}

const useDataClients = () => {
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const page = urlSearchParams.get('page')
  const search = urlSearchParams.get('search')

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `api/users?page=${page}`,
    () => fetchData(page!, search!)
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

export default useDataClients
