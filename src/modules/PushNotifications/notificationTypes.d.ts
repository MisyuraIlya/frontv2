interface INotification {
  '@id'?: string
  id?: number
  title: string | null
  description: string | null
  link: string | null
  createdAt: string | null
  isSend: boolean | null
  isPublic: boolean | null
  isPublished: boolean | null
  image: IMediaObject | null
}

interface ISendNotification {
  id: string | number
  values: Array<string>
}

interface IOneSignalServerNotification {
  id: number
  user_ex_id: string
  title: string
  description: string
  link: string | null
  date: string
  send_to: string | null
  img: string | null
  video: string | null
  public: boolean | null
  unpublished: boolean | null
  type: string | null
  is_read: number
  is_flag: number
}
