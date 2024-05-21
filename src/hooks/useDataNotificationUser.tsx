import useSWR from 'swr'
import { NotificationsServices } from '../modules/PushNotifications/services/notifications.service'
import moment from 'moment'
import { onAsk } from '../shared/MySweetAlert'
import { clientNotifications } from '../modules/PushNotifications/services/clientNotifications.service'
import { useAuth } from '../modules/Auth/store/useAuthStore'

const fetchData = async (userId: number | string) => {
  return await clientNotifications.getNotificationByUserId(userId)
}

const useDataNotificationUser = () => {
  const { user } = useAuth()
  const { data, isLoading, mutate } = useSWR(`api/notifications`, () =>
    fetchData(user?.id!)
  )

  const updateNotificationUser = async (obj: {
    id: number
    isRead: boolean
  }) => {
    await clientNotifications.updateNotification(obj)
    mutate()
  }

  return {
    data,
    isLoading,
    updateNotificationUser,
  }
}

export default useDataNotificationUser
