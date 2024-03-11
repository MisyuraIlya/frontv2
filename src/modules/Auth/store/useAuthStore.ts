import { create } from 'zustand'
import { AuthService } from '../services/auth.service'
import {
  getAgentLocalStorage,
  getChoosedAtar,
  getRefreshToken,
  getRole,
  getUserLocalStorage,
  removeFromStorage,
  saveToStorage,
  setChoosedAtar,
  updateAccessToken,
} from '../helpers/auth.helper'
import { onErrorAlert, onSuccessAlert } from '../../../shared/MySweetAlert'

interface AuthState {
  loading: boolean
  docLoading: boolean
  isClient: boolean
  isAdmin: boolean
  isAgent: boolean
  isSuperAgent: boolean
  isUserBlocked: boolean
  user: IUser | null
  atarSelected: IAtarim | null
  setAtarSelected: (value: IAtarim) => void
  client: IUser | null
  setSelectClient: (client: IUser | null) => void
  action: ActionType
  setAction: (value: ActionType) => void
  userExtId: string
  phone: string
  email: string
  setEmail: (value: string) => void
  setUserExtId: (value: string) => void
  setPhone: (value: string) => void
  login: (username: string, password: string) => void
  registration: (
    userExId: string,
    username: string,
    password: string,
    phone: string,
    token: string
  ) => void
  validation: (userExId: string, phone: string) => void
  getAccessToken: () => void
  restorePasswordStepOne: (email: string) => void
  restorePasswordStepTwo: (
    email: string,
    token: string,
    password: string
  ) => void
  logOut: () => void
  registerClient: (data: formNewB2bForm) => void
  userDocs: UserDocs[]
  getUserDocs: () => void
}

type ActionType =
  | 'login'
  | 'register'
  | 'validation'
  | 'forgotPassordStepOne'
  | 'forgotPassordStepTwo'
  | 'registerNewClient'

export const useAuth = create<AuthState>((set, get) => ({
  // STATES
  loading: false,
  docLoading: false,
  isClient: getRole() === 'USER',
  isAdmin: getRole() === 'ADMIN',
  isAgent: getRole() === 'AGENT' || getRole() === 'SUPER_AGENT',
  isSuperAgent: getRole() === 'SUPER_AGENT',
  isUserBlocked: getUserLocalStorage()?.isBlocked ?? false,
  user: getUserLocalStorage(),
  atarSelected: getChoosedAtar(),
  setAtarSelected: (value: IAtarim) => {
    set({ atarSelected: value })
    setChoosedAtar(value)
  },
  client: null,
  setSelectClient: (client: IUser | null) => {
    set({ client: client })
    if (client) {
    } else {
    }
  },
  // states for auth modals
  action: 'login',
  setAction: (value: ActionType) => set({ action: value }),
  userExtId: '',
  setUserExtId: (value) => set({ userExtId: value }),
  phone: '',
  setPhone: (value: string) => set({ phone: value }),
  email: '',
  setEmail: (value: string) => set({ email: value }),

  // METHODS

  login: async (username: string, password: string) => {
    try {
      set({ loading: true })
      const response = await AuthService.login(username, password)
      if (response.status === 'success') {
        saveToStorage(response)
        // const find = response.user?.atarim?.find((item) => item.extId == extId)
        // get().setAtarSelected(response.user.atarim[0])
        onSuccessAlert('ברוכים הבאים', '')
        setTimeout(() => {
          location.reload()
        }, 1000)
      } else {
        onErrorAlert('שגיאה', '')
      }
    } catch (e) {
      console.error('[ERROR AUTH SERIVEC]', e)
    } finally {
      set({ loading: false })
    }
  },

  registration: async (
    userExtId: string,
    username: string,
    password: string,
    phone: string,
    token: string
  ) => {
    try {
      set({ loading: true })
      const response = await AuthService.registration(
        userExtId,
        username,
        password,
        phone,
        token
      )
      if (response.status === 'success') {
        get().login(username, password)
      } else {
        onErrorAlert('שגיאה', response.message)
      }
    } catch (e) {
      console.error('[ERROR AUTH SERIVEC]', e)
    } finally {
      set({ loading: false })
    }
  },

  validation: async (userExId: string, phone: string) => {
    try {
      set({ loading: true })
      const response = await AuthService.validation(userExId, phone)
      if (response.status === 'success') {
        get().setUserExtId(response.data.exId)
        get().setPhone(phone)
        get().setAction('register')
      } else {
        onErrorAlert('שגיאה', response.message)
        return false
      }
    } catch (e) {
      console.error('[ERROR AUTH SERIVEC]', e)
    } finally {
      set({ loading: false })
    }
  },

  getAccessToken: async () => {
    try {
      set({ loading: true })
      const refreshToken = getRefreshToken()
      if (refreshToken) {
        const response = await AuthService.getAccessToken(refreshToken)
        if (response.status === 'success') {
          updateAccessToken(response)
        } else {
          get().logOut()
        }
      }
    } catch (e) {
      console.error('[ERROR AUTH SERIVEC]', e)
    } finally {
      set({ loading: false })
    }
  },

  restorePasswordStepOne: async (email: string) => {
    try {
      set({ loading: true })
      const response = await AuthService.restorePasswordStepOne(email)
      if (response.status === 'success') {
        onSuccessAlert(response.message, '')
      } else {
        onErrorAlert('שגיאה', response.message)
      }
    } catch (e) {
      console.error('[ERROR AUTH SERIVEC]', e)
    } finally {
      set({ loading: false })
    }
  },

  restorePasswordStepTwo: async (
    email: string,
    token: string,
    password: string
  ) => {
    try {
      set({ loading: true })
      const response = await AuthService.restorePasswordStepTwo(
        email,
        token,
        password
      )
      if (response.status === 'success') {
        onSuccessAlert(response.message, '')
      } else {
        onErrorAlert('שגיאה', response.message)
      }
    } catch (e) {
      console.error('[ERROR AUTH SERIVEC]', e)
    } finally {
      set({ loading: false })
    }
  },

  logOut: () => {
    removeFromStorage()
    window.location.href = '/'
  },

  registerClient: async (data: formNewB2bForm) => {
    try {
      set({ loading: true })
      console.log(data)
      const response = await AuthService.createNewCustomer(data)
    } catch (e) {
      console.error('[ERROR AUTH SERIVEC]', e)
    } finally {
      set({ loading: false })
    }
  },
  userDocs: [],
  getUserDocs: async () => {
    try {
      set({ docLoading: true })
      const userExtId = get().user?.extId
      if (userExtId) {
        const response = await AuthService.getUserDocs(userExtId)
        if (response.status == 'success') {
          set({ userDocs: response.data })
        }
      }
    } catch (e) {
      console.error('[ERROR AUTH getUserDocs]', e)
    } finally {
      set({ docLoading: false })
    }
  },
}))
