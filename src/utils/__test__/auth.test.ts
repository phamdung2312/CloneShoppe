import { expect, describe, it, beforeEach } from 'vitest'
import {
  getAccessToken,
  getRefreshToken,
  getUserLocal,
  setAccessToken,
  setAccessTokenAndNameUser,
  setRefreshToken,
  setUserLocal
} from '../auth'
import { User } from '~/types/user.type'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTkzODQ5YmI2NTk3MDMzNjYxMDBjYyIsImVtYWlsIjoiMjA1MTEyMDEwMUB1dC5lZHUudm4iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDI0LTA2LTI0VDE2OjEwOjQ4Ljg4OFoiLCJpYXQiOjE3MTkyNDU0NDgsImV4cCI6MTcyMDEwOTQ0OH0.tiiAf_KjrYVP9o6EFePjCnUd_DjpgKU8UV8QKF9AZk4'
const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTkzODQ5YmI2NTk3MDMzNjYxMDBjYyIsImVtYWlsIjoiMjA1MTEyMDEwMUB1dC5lZHUudm4iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDI0LTA2LTI0VDE2OjExOjQ1LjUwOVoiLCJpYXQiOjE3MTkyNDU1MDUsImV4cCI6MTg1NzQ4NTUwNX0.lpHHQl3y-DJ_6-35RzcL0efogcUNWq1CntuQxV4LgKk'

const profile = {
  address: 'Việt Nam',
  avatar: '75e17d56-4026-45b2-a63f-1591295a084d.png',
  createdAt: '2024-05-31T02:39:05.293Z',
  date_of_birth: '2010-12-09T17:00:00.000Z',
  email: '2051120101@ut.edu.vn',
  name: 'Phạm Dũng 123',
  phone: '0123456789',
  roles: ['User'],
  updatedAt: '2024-06-22T12:55:25.303Z',
  _id: '66593849bb659703366100cc'
}
beforeEach(() => {
  console.log('gọi before')
})
describe('setAccessToken', () => {
  it('kiểm tra xem AccessToken đã set vào local chưa và lấy AccessToken từ localStorage', () => {
    setAccessToken(access_token)
    expect(getAccessToken()).toBe(access_token)
  })
})
describe('setRefreshToken', () => {
  it('kiểm tra xem RefreshToken đã set vào local chưa và lấy RefreshToken từ localStorage', () => {
    setRefreshToken(refresh_token)
    expect(getRefreshToken()).toBe(refresh_token)
  })
})
describe('clearLocalStorage', () => {
  it('xóa access_token, refresh_token, profile từ localStorage', () => {
    //set trước khi xóa
    setAccessToken(access_token)
    setRefreshToken(refresh_token)
    setUserLocal(profile as User)

    setAccessTokenAndNameUser()
    expect(getAccessToken()).toBe('')
    expect(getRefreshToken()).toBe('')
    expect(getUserLocal()).toBe(null)
  })
})
