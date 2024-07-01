import { expect, describe, it } from 'vitest'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import { logScreen, renderWithRender } from '~/utils/__test__/TestUtils'
import { path } from '~/constant/app.path'

// expect.extend(matchers)
describe('validate form login', () => {
  let submit: Element
  let inputEmail: HTMLInputElement
  let inputPassword: HTMLInputElement
  beforeEach(async () => {
    renderWithRender({ route: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })
    submit = document.querySelector('form button[type="submit"]') as Element
    inputEmail = document.querySelector('form input[type="email"]') as HTMLInputElement
    inputPassword = document.querySelector('form input[type="password"]') as HTMLInputElement
  })

  it('Hiển thị lỗi khi không nhập', async () => {
    const submit = document.querySelector('form button[type="submit"]') as Element
    fireEvent.click(submit)
    await waitFor(() => {
      expect(screen.queryByText('Email bắt buộc nhập')).toBeTruthy()
      expect(screen.queryByText('Mật khẩu bắt buộc nhập')).toBeTruthy()
    })
  })
  it('Hiển thị lỗi khi không nhập đúng định dạng', async () => {
    fireEvent.change(inputEmail, {
      target: {
        value: 'dung123'
      }
    })
    fireEvent.change(inputPassword, {
      target: {
        value: '123'
      }
    })
    fireEvent.submit(submit)
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeTruthy()
      expect(screen.queryByText('Mật khẩu nằm trong khoảng 6 - 160 ký tự')).toBeTruthy()
    })
  })
  it('Khi nhập đúng định dạng', async () => {
    fireEvent.change(inputEmail, {
      target: {
        value: '2051120101@ut.edu.vn'
      }
    })
    fireEvent.change(inputPassword, {
      target: {
        value: '4556789'
      }
    })
    // Những trường hợp chứng minh rằng tìm không ra text hay là element
    // Thì nên dùng query hơn là find hay get
    fireEvent.submit(submit)
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shoppe clone')
      expect(screen.queryByText('Email không đúng định dạng')).toBeFalsy()
      expect(screen.queryByText('Mật khẩu nằm trong khoảng 6 - 160 ký tự')).toBeFalsy()
    })
    await logScreen()
  })
})
