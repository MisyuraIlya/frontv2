import { create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface useAdminStore {
  searchProducts: string
  setSearchProducts: (search: string) => void
  searchCategories: string
  setSearchCategories: (search: string) => void
}

export const useAdminStore = create(
  persist(
    (set, get) => ({
      searchProducts: '',
      setSearchProducts: (searchProducts) => set({ searchProducts }),
      searchCategories: '',
      setSearchCategories: (searchCategories) => set({ searchCategories }),
    }),
    {
      name: 'admin-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useAdminStore, useAdminStore>
  )
)
