import { expect, describe, test } from 'vitest'
import { delay, renderWithRender } from '~/utils/__test__/TestUtils'
describe('ProductDetail', () => {
  test('chuyển đến trang productDetail', async () => {
    renderWithRender({ route: '/Điện-thoại-Apple-Iphone-12-64GB--Hàng-chính-hãng-VNA-i.60afb1c56ef5b902180aacb8' })
    await delay(3000)
    expect(document.body).toMatchSnapshot()
  })
})
