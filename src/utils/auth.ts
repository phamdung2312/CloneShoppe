import { User } from '~/types/user.type'

export const localStorageEventTarget = new EventTarget()

export const setAccessToken = (access_token: string) => localStorage.setItem('access_token', access_token)
export const setRefreshToken = (refresh_token: string) => localStorage.setItem('refresh_token', refresh_token)
export const setAccessTokenAndNameUser = () => {
  localStorage.removeItem('profile')
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  const clearAccessTokenLS = new Event('clearAccessTokenLS')
  localStorageEventTarget.dispatchEvent(clearAccessTokenLS)
}
export const clearAccessError = () => {
  const clearAccessTokenLS = new Event('clearAccessTokenLS')
  localStorageEventTarget.dispatchEvent(clearAccessTokenLS)
}
export const getAccessToken = () => localStorage.getItem('access_token') || ''
export const getRefreshToken = () => localStorage.getItem('refresh_token') || ''

export const setUserLocal = (user: User) => localStorage.setItem('profile', JSON.stringify(user))
export const getUserLocal = () => {
  const data: string | null = localStorage.getItem('profile')
  return data ? JSON.parse(data) : null
}
