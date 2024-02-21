import axios from 'axios'

interface UsersResponse extends Hydra {
  'hydra:member': IUser[]
}

interface updateAuthResponse {
  data: null
  message: string
  status: 'success' | 'error'
}

export const AdminClinetsService = {
  async getClients(
    page: string | number,
    all = false,
    search: string
  ): Promise<UsersResponse> {
    if (all) {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/users?itemsPerPage=10000&role=ROLE_USER&extId=${search}`
      )
      return response.data
    } else {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/users?page=${page}&extId=${search}`
      )
      return response.data
    }
  },
  async getAgents(): Promise<UsersResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/users?itemsPerPage=10000&role[]=ROLE_AGENT&role[]=ROLE_SUPER_AGENT`
    )
    return response.data
  },

  async getClientItem(userId: string | number): Promise<IUser> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/users/${userId}`
    )
    return response.data
  },

  async createClient(user: IUser): Promise<IUser> {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/auth/createAgent`,
      user
    )
    return response.data
  },

  async updateClient(user: IUser): Promise<IUser> {
    delete user.roles
    const response = await axios.post(
      `${process.env.REACT_APP_API}/auth/updateUser`,
      user
    )
    return response.data
  },
}
