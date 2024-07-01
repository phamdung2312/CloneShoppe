import { User } from '~/types/user.type'
import { SuccessResponseAPI } from '~/types/utils.type'
import http from '~/utils/Http'
interface bodyTypeUpdateUser extends Omit<User, '_id' | 'roles' | 'email' | 'createdAt' | 'updatedAt'> {
  password?: string
  newPassword?: string
}

const userAPI = {
  getUser() {
    return http.get<SuccessResponseAPI<User>>('me')
  },
  updateUser(body: bodyTypeUpdateUser) {
    return http.put<SuccessResponseAPI<User>>('user', body)
  },

  updateAvatar(body: FormData) {
    return http.post<SuccessResponseAPI<string>>('user/upload-avatar', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}
export default userAPI
