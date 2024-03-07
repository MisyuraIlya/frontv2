import { create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface useAdminCategoriesState {
  categories: ICategory[]
  rezervedCategrories: ICategory[]
  setCategories: (categories: ICategory[]) => void
  search: string
  setSearch: (search: string) => void
}

export const useAdminCategories = create(
  persist(
    (set, get) => ({
      categories: [],
      rezervedCategrories: [],
      setCategories: (categories: ICategory[]) =>
        set({ categories, rezervedCategrories: categories }),
      search: '',
      setSearch: (search: string) => {
        if (search) {
          const filter = get().categories.filter((item) =>
            item.title.includes(search)
          )
          set({ categories: filter })
        } else {
          set({ categories: get().rezervedCategrories })
        }
        set({ search })
      },
    }),
    {
      name: 'categories-admin-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useAdminCategoriesState, useAdminCategoriesState>
  )
)
