import Cookies from 'js-cookie'

export const getRefreshToken = () => {
  const accessToken = Cookies.get('accessToken')
  return accessToken || null
}

export const getAccessToken = () => {
  const accessToken = Cookies.get('accessToken')
  return accessToken || null
}

export const getUserFromStorage = (): IUser => {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

export const updateAccessToken = (data: ITokens) => {
  Cookies.set('accessToken', data.token)
}

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set('accessToken', data.token)
  Cookies.set('refreshToken', data.refresh_token)
}

export const removeFromStorage = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
  localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse): void => {
  saveTokensStorage(data)
  setUserLocalStorage(data.user)
}

export const getUserLocalStorage = (): IUser | null => {
  return localStorage.user ? JSON.parse(localStorage.user) : null
}

export const setUserLocalStorage = (user: IUser): void => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const getAgentLocalStorage = (): IUser | null => {
  return localStorage.agent ? JSON.parse(localStorage.agent) : null
}

export const setAgentLocalStorage = (agent: IUser): void => {
  localStorage.setItem('agent', JSON.stringify(agent))
}

export const getRole = () => {
  const user = getUserLocalStorage()

  if (user) {
    const role = user?.role

    if (role == 'ROLE_ADMIN') {
      return 'ADMIN'
    } else if (role == 'ROLE_SUPER_AGENT') {
      return 'SUPER_AGENT'
    } else if (role == 'ROLE_AGENT') {
      return 'AGENT'
    } else if (role == 'ROLE_USER') {
      return 'USER'
    } else {
      return null
    }
  }
}

export const getClientExtId = () => {
  if (localStorage.client) {
    const user = JSON.parse(localStorage.client)
    return user.extId
  } else {
    if (localStorage.user) {
      const user = JSON.parse(localStorage.user)
      return user.extId
    }
    return null
  }
}

export const getClientId = () => {
  if (localStorage.client) {
    const user = JSON.parse(localStorage.client)
    return user.id
  } else {
    if (localStorage.user) {
      const user = JSON.parse(localStorage.user)
      return user.id
    }
    return null
  }
}

export const getClientName = () => {
  if (localStorage.client) {
    const user = JSON.parse(localStorage.client)
    return user.name
  } else {
    if (localStorage.user) {
      const user = JSON.parse(localStorage.user)
      return user.name
    }
    return null
  }
}

export const getAgentExtId = () => {
  if (localStorage.user) {
    const user = JSON.parse(localStorage.client)
    if (user.role == 'ROLE_AGENT') {
      return user.extId
    } else {
      return null
    }
  } else {
    return null
  }
}

export const getAgentId = () => {
  if (localStorage.user) {
    const user = JSON.parse(localStorage.user)
    if (user.role == 'ROLE_AGENT' || user.role == 'ROLE_SUPER_AGENT') {
      return user.id
    } else {
      return null
    }
  } else {
    return null
  }
}

export const setChoosedAgentId = (agentId: string) => {
  localStorage.setItem('choosedAgent', agentId)
}

export const getChoosedAgentId = () => {
  return localStorage.getItem('choosedAgent') ?? null
}

export const setChoosedAtar = (atar: IAtarim) => {
  localStorage.setItem('atar', JSON.stringify(atar))
}

export const getChoosedAtar = () => {
  return localStorage.getItem('atar') ? JSON.parse(localStorage.atar) : null
}
