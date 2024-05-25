import { create } from 'zustand'

interface NotificationStoreState {
  choosedItem: INotification | null
  setChoosedItem: (value: INotification | null) => void
}

export const useAdminNotification = create<NotificationStoreState>(
  (set, get) => ({
    choosedItem: null,
    setChoosedItem: (value: INotification | null) =>
      set({ choosedItem: value }),
  })
)
