import { create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface useAdminCategoriesState {
  categories: ICategory[]
  setCategories: (categories: ICategory[]) => void
}

export const useAdminCategories = create(
  persist(
    (set, get) => ({
      categories: [],
      setCategories: (categories: ICategory[]) => set({ categories }),
    }),
    {
      name: 'categories-admin-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useAdminCategoriesState, useAdminCategoriesState>
  )
)
