export const setClientStorage = (user: IUser): void => {
  localStorage.setItem('client', JSON.stringify(user))
}

export const getClientStorage = (): IUser => {
  return localStorage.client ? JSON.parse(localStorage.client) : null
}

export const removeClientStorage = (): void => {
  localStorage.removeItem('client')
}

export const getClientExtId = (): string => {
  const userExId = localStorage.client
    ? JSON.parse(localStorage.client).id
    : null
  return userExId.toString()
}
