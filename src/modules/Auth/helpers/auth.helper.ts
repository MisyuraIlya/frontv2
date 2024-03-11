import Cookies from 'js-cookie'

export const getRefreshToken = () => {
  const accessToken = Cookies.get('accessToken')
  return accessToken || null
}

export const getAccessToken = () => {
  const accessToken = Cookies.get('accessToken')
  return accessToken || null
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
}

export const saveToStorage = (data: IAuthResponse): void => {
  saveTokensStorage(data)
}

export const getRole = () => {
  let user = null
  if (getAgentFromStorage()) {
    user = getAgentFromStorage()
  } else {
    user = getUserFromStorage()
  }
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

export const getUserFromStorage = () => {
  const data = localStorage.getItem('user-storage')
  if (data) {
    const res = JSON.parse(data)
    return res.state.user
  } else {
    return null
  }
}

export const getAgentFromStorage = () => {
  const data = localStorage.getItem('user-storage')
  if (data) {
    const res = JSON.parse(data)
    return res.state.agent
  } else {
    return null
  }
}
