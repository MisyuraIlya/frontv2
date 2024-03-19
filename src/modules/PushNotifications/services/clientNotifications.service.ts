import axios from 'axios'

export const clientNotifications = {
  async getNotificationByUserId(
    userId: string | number
  ): Promise<INotificationUser[]> {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/notification_users?user.id=${userId}&isRead=true`
    )
    return response.data
  },

  async updateNotification(obj: INotificationUser): Promise<INotificationUser> {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/api/notification_users/${obj.id}`,
      obj,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )
    return response.data
  },
}
