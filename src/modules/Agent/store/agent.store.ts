import { create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface AgentStoreState {
  selectedClient: IUser | null
  setSelectedClient: (client: any) => void
}

export const useAgentStore = create(
  persist(
    (set, get) => ({
      selectedClient: null,
      setSelectedClient: (client: IUser) => {
        set({ selectedClient: client })
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<AgentStoreState, AgentStoreState>
  )
)
