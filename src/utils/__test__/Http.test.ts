import { beforeEach, describe, expect, it } from 'vitest'
import { Http } from '../Http'
import HttpStatusCode from '~/constant/httpStatusCode.enum'
import { setAccessToken, setRefreshToken } from '../auth'
import { access_token_5s, refresh_token_160day } from '~/test/Mock/handler'

describe('getProduct', () => {
  let http = new Http().instance
  beforeEach(() => {
    // setAccessTokenAndNameUser()
    http = new Http().instance
  })

  // it dùng để ghi chú các trường hợp cần test
  it('lấy sản phẩm', async () => {
    // không nên đụng đến thư mục API
    // vì chúng ta test riêng file http thì chỉ nên dùng
    // http thôi, vì nếu lỡ thay đổi thư mục API thì cũng không
    // thay đổi file test này
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('lấy profile', async () => {
    await http.post('login', { email: '2051120101@ut.edu.vn', password: '456789' })
    // console.log(ress)
    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('refreshToken', async () => {
    setAccessToken(access_token_5s)
    setRefreshToken(refresh_token_160day)
    const res = await http.get('me')
    // console.log(res)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
