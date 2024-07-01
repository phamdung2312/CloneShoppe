import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from '~/constant/httpStatusCode.enum'
import { AuthRespone, refreshTokenRespone } from '~/types/auth.type'
import {
  setAccessTokenAndNameUser,
  getAccessToken,
  setAccessToken,
  setUserLocal,
  setRefreshToken,
  getRefreshToken
} from './auth'
import { config } from './config'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from '~/Apis/auth.api'
import { isAxiosExpiredError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponseAPI } from '~/types/utils.type'

export class Http {
  instance: AxiosInstance
  private access_token: string
  private refresh_token: string
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.access_token = getAccessToken()
    this.refresh_token = getRefreshToken()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 10 * 60 * 60 * 24, // 1 ngày
        'expire-refresh-token': 10 * 60 * 60 * 24 * 160 // 160 ngày
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_token && config.headers) {
          config.headers.authorization = this.access_token
        }
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const dataRess = response.data as AuthRespone
          this.access_token = dataRess.data.access_token
          this.refresh_token = dataRess.data.refresh_token
          setUserLocal(dataRess.data.user)
          setAccessToken(this.access_token)
          setRefreshToken(this.refresh_token)
        } else if (url === URL_LOGOUT) {
          this.access_token = ''
          setAccessTokenAndNameUser()
        }
        return response
      },
      (error: AxiosError) => {
        // chỉ toast những lỗi không phải 422 và 401
        if (
          error?.response?.status !== HttpStatusCode.UnprocessableEntity &&
          error?.response?.status !== HttpStatusCode.Unauthorized
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        // lỗi 401 (lỗi token)
        if (isAxiosUnauthorizedError<ErrorResponseAPI<{ name: string; message: string }>>(error)) {
          const url = error.response?.config.url
          const config = error.response?.config
          // Trường hợp Token hết hạn và request đó không phải là request refresh token
          // thì chúng ta mới tiến hành gọi refesh token
          if (isAxiosExpiredError(error) && url !== URL_REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // giữ refresh_token trong 10s để cho những request tiếp theo nếu có 401 thì dùng
                  // để tránh trường trường hợp gọi lại refresh_token nhiều lần
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })

            //
            return this.refreshTokenRequest.then((access_token) => {
              if (config?.headers) {
                config.headers.authorization = access_token
                return this.instance(config)
              }
            })
          }
          setAccessTokenAndNameUser()
          this.access_token = ''
          this.refresh_token = ''
          // Toast những lỗi về token
          toast.error(error.response?.data.data?.message || error.response?.data.message)
          console.log('error Token ', error)
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    return this.instance
      .post<refreshTokenRespone>(URL_REFRESH_TOKEN, { refresh_token: this.refresh_token })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessToken(access_token)
        this.access_token = access_token
        return access_token
      })
      .catch((err) => {
        setAccessTokenAndNameUser()
        this.access_token = ''
        this.refresh_token = ''
        throw err
      })
  }
}

const http = new Http().instance
export default http
