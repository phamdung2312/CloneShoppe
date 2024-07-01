import { User } from './user.type'
import { SuccessResponseAPI } from './utils.type'

export type AuthRespone = SuccessResponseAPI<{
  access_token: string
  refresh_token: string
  expires: number
  expires_refresh_token: number
  user: User
}>
export type refreshTokenRespone = SuccessResponseAPI<{ access_token: string }>
