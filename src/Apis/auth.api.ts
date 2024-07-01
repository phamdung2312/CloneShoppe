import { AuthRespone } from '~/types/auth.type'
import http from '~/utils/Http'
// import { schemeType } from '~/utils/validateForm'

export const URL_LOGIN = 'login'
export const URL_LOGOUT = 'logout'
export const URL_REGISTER = 'register'
export const URL_REFRESH_TOKEN = 'refresh-access-token'

const authAPI = {
  registerUser(body: { email: string; password: string }) {
    return http.post<AuthRespone>('register', body)
  },
  loginUser(body: { email: string; password: string }) {
    return http.post<AuthRespone>('login', body)
  },
  logoutUser() {
    return http.post('logout')
  }
}

export default authAPI
