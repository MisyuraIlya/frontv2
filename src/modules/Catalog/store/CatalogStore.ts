import { create } from 'zustand'

type typeMode = 'list' | 'grid'

interface useCatalogState {
  listView: typeMode
  setListView: (value: typeMode) => void

  prodsPerPage: string
  setProdsPerPage: (value: string) => void

  sortProdSetting: { value: string; label: string }
  setSortProdSetting: (value: string, label: string) => void
}

export const useCatalog = create<useCatalogState>((set, get) => ({
  listView: 'grid',
  setListView: (value: typeMode) => set({ listView: value }),

  prodsPerPage: '24',
  setProdsPerPage: (prodsPerPage) => set({ prodsPerPage }),

  sortProdSetting: { value: '1', label: 'שם' },
  setSortProdSetting: (value: string, label: string) =>
    set({ sortProdSetting: { value: value, label: label } }),
}))
