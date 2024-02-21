import { create } from 'zustand'
import { CatalogServices } from '../services/catalog.service'
import { getClientExtId } from '../../Auth/helpers/auth.helper'
import { HydraHandler } from '../../../helpers/hydraHandler'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface useSearchStoreState {
  loading: boolean
  categoriesAll: ICategory[]
  categories: ICategory[]
  categoriesLvl1: ICategory[]
  setCategoriesLvl1: (arr: ICategory[]) => void
  categoriesLvl2: ICategory[]
  setCategoriesLvl2: (arr: ICategory[]) => void
  categoriesLvl3: ICategory[]
  setCategoriesLvl3: (arr: ICategory[]) => void
  setCategories: (arr: ICategory[]) => void
  getCategories: () => void
  getAllCategories: () => void

  lvls: { lvl1: string; lvl2: string; lvl3: string }
  setLvls: (lvl1: string, lvl2: string, lvl3: string) => void
  currecntCategories: ICategory[]
  setCurrentCategories: (cat: ICategory[]) => void
  getDynamicCategories: () => void
}

export const useCategories = create(
  persist(
    (set, get) => ({
      // STATES
      loading: false,
      categoriesAll: [],
      categories: [],
      categoriesLvl1: [],
      setCategoriesLvl1: (categoriesLvl1) => set({ categoriesLvl1 }),
      categoriesLvl2: [],
      setCategoriesLvl2: (categoriesLvl2) => set({ categoriesLvl2 }),
      categoriesLvl3: [],
      setCategoriesLvl3: (categoriesLvl3) => set({ categoriesLvl3 }),
      setCategories: (arr) => set({ categories: arr }),
      getCategories: async () => {
        try {
          set({ loading: true })
          const response = await CatalogServices.GetCategories(getClientExtId())
          console.log('response', response)
          set({
            categories: response['hydra:member'],
            categoriesLvl1: response['hydra:member'].filter(
              (item) => item.lvlNumber === 1
            ),
            // categoriesLvl2: response['hydra:member'].filter(
            //   (item) => item.lvlNumber === 2
            // ),
            // categoriesLvl3: response['hydra:member'].filter(
            //   (item) => item.lvlNumber === 3
            // ),
          })
        } catch (e) {
          console.log('[ERROR]', e)
        } finally {
          set({ loading: false })
        }
      },

      getAllCategories: async () => {
        try {
          set({ loading: true })
          const response = await CatalogServices.GetCategoriesAll()
          set({
            categoriesAll: response['hydra:member'],
          })
        } catch (e) {
          console.log('[ERROR]', e)
        } finally {
          set({ loading: false })
        }
      },

      // DYNAMIC CATEGORIES
      lvls: { lvl1: '0', lvl2: '0', lvl3: '0' },
      setLvls: (lvl1: string, lvl2: string, lvl3: string) =>
        set({ lvls: { lvl1, lvl2, lvl3 } }),
      currecntCategories: [],
      setCurrentCategories: (cat: ICategory[]) =>
        set({ currecntCategories: cat }),
      getDynamicCategories: async () => {
        try {
          set({ loading: true })
          const response = await CatalogServices.GetDynamicCategories(
            get().lvls.lvl1,
            get().lvls.lvl2,
            get().lvls.lvl3
          )
          if (
            get().lvls.lvl1 == '0' &&
            get().lvls.lvl2 == '0' &&
            get().lvls.lvl3 == '0'
          ) {
            set({ currecntCategories: response['hydra:member'] })
          } else {
            set({
              currecntCategories: response['hydra:member'][0]!.categories!,
            })
          }
        } catch (e) {
        } finally {
          set({ loading: false })
        }
      },
    }),
    {
      name: 'categories-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useSearchStoreState, useSearchStoreState>
  )
)
