import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { agentProfileService } from '../services/agentProfile.service'

const fetchData = async (agentId: string, year: string) => {
  return await agentProfileService.getAgentTargets(agentId, year)
}

type RouteParams = {
  id: string
}

const useDataAgentTargets = (year: string) => {
  const { id } = useParams<RouteParams>()

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `api/agent_targets/${id}?year=${year}`,
    () => fetchData(id!, year)
  )

  return {
    data,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataAgentTargets
