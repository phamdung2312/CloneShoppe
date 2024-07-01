import { expect, describe, test } from 'vitest'
import { screen, waitFor } from '@testing-library/react'

// import * as matchers from '@testing-library/jest-dom/matchers' // Đảm bảo đúng đường dẫn

// import { logScreen } from './utils/__test__/TestUtils'
import { path } from './constant/app.path'
import { renderWithRender } from './utils/__test__/TestUtils'

// expect.extend(matchers)
describe('App', () => {
  test('App render và chuyển trang', async () => {
    const { user } = renderWithRender()
    /**
     * waitFor sẽ run callback 1 vài lần cho đến khi hết time out
     * số lần run phụ thuộc vào timeout và interval
     * mặc định: timeout: 1000ms và interval = 50ms
     */
    // verify và đúng trang chủ
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shoppe clone')
    })

    // verify chuyển trang đăng nhập
    await user.click(screen.getByText(/Đăng nhập/i))

    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản/i)).toBeInTheDocument()
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Clone Shoppe')
    })
  })
  test('Chuyển trang not Found', async () => {
    const badRoute = '/some/test/bad'
    renderWithRender({ route: badRoute })
    await waitFor(() => {
      expect(screen.getByText(/Sorry, we couldn't find this page/i)).toBeInTheDocument()
      expect(document.querySelector('title')?.textContent).toBe(`Sorry, we couldn't find this page | Shoppe Clone`)
    })
    screen.debug(document.body.parentElement as HTMLElement, 99999999)

    // hàm log để debug unit test
    // await logScreen()
  })
  test('Chuyển trang Đăng ký', async () => {
    renderWithRender({ route: path.register as string })
    // window.history.pushState({}, 'Test page', path.register)
    // render(<App></App>, { wrapper: BrowserRouter })

    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản/i)).toBeInTheDocument()
    })
    screen.debug(document.body.parentElement as HTMLElement, 99999999)
    // hàm log để debug unit test
    // await logScreen()
  })
})
