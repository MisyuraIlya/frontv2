import { create } from 'zustand'
import { CatalogServices } from '../services/catalog.service'
import { getClientExtId } from '../../Auth/helpers/auth.helper'
import { HydraHandler } from '../../../helpers/hydraHandler'

interface useSearchStoreState {
  loading: boolean
  searchValue: string
  savedValue: string
  setSearchValue: (value: string) => void
  setSavedValue: (value: string) => void
  productsFilter: IProduct[]
  totalFound: number
  categoriesFilter: ICategory[]
  setCategoriesFilter: (arr: ICategory[]) => void
  findProductsByValue: (
    lvl1id: string,
    lvl2id: string,
    lvl3id: string,
    searchParams: string
  ) => void
  findCategoriesFilter: () => void
  clearPaginationSearch: () => void
  hydraPagination: hydraPagination
}

export const useSearchStore = create<useSearchStoreState>((set, get) => ({
  // STATES
  loading: false,
  searchValue: '',
  savedValue: '',
  setSearchValue: (value: string) => set({ searchValue: value }),
  setSavedValue: (value: string) => set({ savedValue: value }),
  productsFilter: [],
  totalFound: 0,
  categoriesFilter: [],
  setCategoriesFilter: (arr) => set({ categoriesFilter: arr }),
  findProductsByValue: async (
    lvl1id: string,
    lvl2id: string,
    lvl3id: string,
    searchParams: string
  ) => {
    set({ loading: true })
    try {
      const response = await CatalogServices.GetCatalog(
        lvl1id,
        lvl2id,
        lvl3id,
        searchParams
      )
      set({
        productsFilter: response['hydra:member'],
        totalFound: response['hydra:totalItems'],
      })
      const hydraPagination = HydraHandler.paginationHandler(response)
      set({ hydraPagination: hydraPagination })
    } catch (e) {
      console.log('[ERROR]', e)
    } finally {
      set({ loading: false })
    }
  },
  findCategoriesFilter: async () => {
    set({ loading: true })
    try {
      const data = await CatalogServices.GetCategoriesFilter(
        getClientExtId(),
        get().savedValue
      )
      set({ categoriesFilter: data['hydra:member'] })
    } catch (e) {
      console.log('[ERROR]', e)
    } finally {
      set({ loading: false })
    }
  },
  clearPaginationSearch: () => {
    set({
      hydraPagination: {
        totalPages: '1',
        page: '1',
        lastPage: '1',
        nextPage: '1',
        previous: '1',
      },
    })
  },
  hydraPagination: {
    totalPages: '1',
    page: '1',
    lastPage: '1',
    nextPage: '1',
    previous: '1',
  },
}))
