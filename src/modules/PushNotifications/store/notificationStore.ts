import moment from 'moment'
import { create } from 'zustand'
import { NotificationsServices } from '../services/notifications.service'
import { onAsk } from '../../../shared/MySweetAlert'

interface NotificationStoreState {
  loading: boolean
  createItem: (object: INotification | null) => Promise<void>
  items: INotification[]
  fetchItems: () => Promise<void>
  updateItem: (item: any) => void
  deleteItem: (id: string | number) => Promise<void>
  choosedClients: any[]
  setChooseClient: (arr: [string]) => void
  selectRadio: string | number
  setSelectRadio: (value: string | number) => void
  choosedItem: INotification | null
  setChoosedItem: (value: INotification | null) => void
  itemToSend: any
  setItemToSend: (value: string) => void
  sendNotification: () => Promise<void>
}

export const useNotificationStore = create<NotificationStoreState>(
  (set, get) => ({
    loading: false,
    createItem: async (object: INotification | null) => {
      try {
        set({ loading: true })
        const newObject: INotification = {
          title: null,
          description: null,
          link: null,
          createdAt: moment().format('YYYY-MM-DD'),
          isSend: false,
          image: null,
          isPublic: false,
          isPublished: false,
        }
        if (object?.id) {
          newObject.title = object?.title
          newObject.description = object?.description
          newObject.link = object?.link
          if (object?.image) {
            //@ts-ignore
            newObject.image = object?.image['@id']
          }
        }
        console.log('newObject', newObject)
        const response = await NotificationsServices.createItem(newObject)
        set({ choosedItem: response })
        get().fetchItems()
      } catch (e) {
      } finally {
        set({ loading: false })
      }
    },
    items: [],
    fetchItems: async () => {
      try {
        set({ loading: true })
        const newObject = {
          title: null,
          description: null,
          link: null,
          createdAt: moment().format('YYYY-MM-DD'),
          isSend: false,
          image: null,
          isPublic: false,
          isPublished: false,
        }
        const response = await NotificationsServices.fetchNotifications()
        set({ items: response['hydra:member'] })
      } catch (e) {
      } finally {
        set({ loading: false })
      }
    },

    updateItem: async (item: any) => {
      try {
        set({ loading: true })
        const response = await NotificationsServices.updateItem(item)
        set({ choosedItem: response })
        get().fetchItems()
        return response
      } catch (e) {
      } finally {
        set({ loading: false })
      }
    },

    deleteItem: async (id: string | number) => {
      try {
        set({ loading: true })
        const ask = await onAsk('למחוק שורה זו?', '')
        if (ask) {
          await NotificationsServices.deleteItem(id)
          set({ choosedItem: null })
          get().fetchItems()
        }
      } catch (e) {
      } finally {
        set({ loading: false })
      }
    },

    choosedClients: [],
    setChooseClient: (arr: [string]) => set({ choosedClients: arr }),
    selectRadio: '',
    setSelectRadio: (value: string | number) => set({ selectRadio: value }),
    choosedItem: null,
    setChoosedItem: (value: INotification | null) =>
      set({ choosedItem: value }),
    itemToSend: null,
    setItemToSend: (value: string) => set({ itemToSend: value }),
    sendNotification: async () => {
      try {
        set({ loading: true })
        const object = {
          id: get().selectRadio,
          values: get().choosedClients,
        }
        const response = await NotificationsServices.sendNotification(object)
      } catch (e) {
      } finally {
        set({ loading: false })
      }
    },
  })
)
