import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { useAuth } from '../store/useAuthStore'
import { DocumentsService } from '../services/document.service'
import moment from 'moment'

type RouteParams = {
  dateFrom: string
  dateTo: string
}

const fetchData = async (
  fromDate: Date,
  toDate: Date,
  user: IUser
): Promise<CartessetResponse> => {
  return await DocumentsService.GetCartesset(user, fromDate, toDate)
}

const useDataCartesset = () => {
  const { dateFrom, dateTo } = useParams<RouteParams>()
  const { user } = useAuth()
  const fromConverted = moment(dateFrom).format('YYYY-MM-DD')
  const toDateConverted = moment(dateTo).format('YYYY-MM-DD')
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<CartessetResponse>(
      `/api/cartesset/${fromConverted}/${toDateConverted}?userId=${user?.id}`,
      () =>
        fetchData(new Date(fromConverted!), new Date(toDateConverted!), user!)
    )

  return {
    data,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataCartesset
