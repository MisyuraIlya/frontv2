import { create } from 'zustand'
import { agentService } from '../services/agent.service'
import { HydraHandler } from '../../../helpers/hydraHandler'
import { removeClientStorage, setClientStorage } from '../helpers/localstorage'

interface AgentStoreState {
  loading: boolean
  clients: IUser[]
  searchedClient: []
  searchValue: string
  selectedClient: IUser | null

  setClients: (arr: Array<any>) => void
  setSelectedClient: (client: any) => void
  clearSelectedClient: () => void
  setSearchValue: (value: string) => void

  getClients: (all?: boolean) => Promise<void>

  totalClients: number
  hydraPagination: hydraPagination
  setPage: (page: string) => void
}

export const useAgentStore = create<AgentStoreState>((set, get) => ({
  loading: false,
  clients: [],
  searchedClient: [],
  searchValue: '',
  selectedClient: null,

  setClients: (arr) => set({ clients: arr }),
  setSelectedClient: (client: IUser) => {
    set({ selectedClient: client })
    setClientStorage(client)
  },
  clearSelectedClient: () => {
    set({ selectedClient: null })
    // Assuming removeClientStorage is a function that you've defined elsewhere
  },
  setSearchValue: (value: string) => set({ searchValue: value }),

  getClients: async () => {
    try {
      set({ loading: true })
      const response = await agentService.getClients(
        get().hydraPagination.page,
        get().searchValue
      )
      set({
        clients: response['hydra:member'],
        totalClients: +response['hydra:totalItems'],
      })
      const hydraPagination = HydraHandler.paginationHandler(response)
      set({ hydraPagination: hydraPagination })
    } catch (e) {
      console.log('[error]', e)
    } finally {
      set({ loading: false })
    }
  },

  //pagination
  totalClients: 0,
  hydraPagination: {
    totalPages: '1',
    page: '1',
    lastPage: '1',
    nextPage: '1',
    previous: '1',
  },
  setPage: (page: string) => {
    set((state) => ({
      hydraPagination: {
        ...state.hydraPagination,
        page: page,
      },
    }))
  },
}))
