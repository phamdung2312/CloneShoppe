import { expect, describe, test } from 'vitest'
import { waitFor } from '@testing-library/react'
import { path } from '~/constant/app.path'
import { logScreen, renderWithRender } from '~/utils/__test__/TestUtils'
import { setAccessToken } from '~/utils/auth'
const access_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTkzODQ5YmI2NTk3MDMzNjYxMDBjYyIsImVtYWlsIjoiMjA1MTEyMDEwMUB1dC5lZHUudm4iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDI0LTA2LTI2VDE1OjE5OjE3LjI1N1oiLCJpYXQiOjE3MTk0MTUxNTcsImV4cCI6MTcyOTQxNTE1Nn0.I2VF1bprjpE0PgCKndLZWFPCORXcrRrDOkA9Dd4b0y'
describe('Profile', () => {
  test('Chuyển đến trang profile', async () => {
    setAccessToken(access_token)
    //container chính là tất cả các Dom mà nó render ra được
    const { container } = renderWithRender({ route: path.profile })
    await waitFor(() => {
      expect((container.querySelector('form input[placeholder="Tên"]') as HTMLInputElement).value).toBe('Phạm Dũng 123')
    })
    await logScreen()
  })
})
