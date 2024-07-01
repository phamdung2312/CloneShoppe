import axios, { AxiosError } from 'axios'
import HttpStatusCode from '~/constant/httpStatusCode.enum'
import { config } from './config'
import no_avatar from '~/assets/no_avatar.jpg'
import { SuccessResponseAPI } from '~/types/utils.type'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
export function isAxiosUnprocessableEntity<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

// khai báo kiểu dữ liệu cho lỗi 401 (lỗi token)
export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}
// tạo funtion check lỗi
export function isAxiosExpiredError<AuthorizedError>(error: unknown): error is AxiosError<AuthorizedError> {
  return (
    isAxiosUnauthorizedError<SuccessResponseAPI<{ name: string; message: string }>>(error) &&
    error.response?.data.data.name === 'EXPIRED_TOKEN'
  )
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}
export function formatToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumSignificantDigits: 2 })
    .format(value)
    .replace('.', ',')
}

export function discountPrice(originalPrice: number, sale: number) {
  return Math.floor(((originalPrice - sale) / originalPrice) * 100) + '%'
}

// Code xóa các ký tự đặc biệt trên bàn phím
const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i.${id}`
}

// Dùng split chia nameId thành mảng gồm 2 phần tử các nhau bởi kí tự "-i." và lấy id
export const getIdFormNameId = (nameId: string) => {
  const arr = nameId.split('-i.')
  return arr[arr.length - 1]
}

// test unit test

export const test = (value: number) => {
  let count = 0
  if (value < 10) {
    count++
  }
  if (value % 2 == 0) {
    count++
  }
  return count
}
// Tạo URL ảnh
export const createURL = (urlName?: string) => (urlName ? `${config.baseURL}images/${urlName}` : no_avatar)
