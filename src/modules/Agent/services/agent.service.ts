import axios from 'axios'

interface agentServiceResponse extends Hydra {
  'hydra:member': IUser[]
}

export const agentService = {
  async getClients(
    page: string | number,
    search: string
  ): Promise<agentServiceResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/users?page=${page}&extId=${search}`
    )
    return response.data
  },
}
