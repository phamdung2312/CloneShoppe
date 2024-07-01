import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { waitFor, waitForOptions, screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { expect } from 'vitest'
import App from '~/App'
import { AppProvider, getInitialContext } from '~/Context/app.context'
export const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })

export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  const { timeout = 1000 } = options || {}
  await waitFor(
    async () => {
      expect(await delay(timeout - 100)).toBe(true)
    },
    {
      ...options,
      timeout
    }
  )
  screen.debug(body, 99999999)
}

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0
      },
      mutations: {
        retry: 0
      }
    }
  })
  const Provider = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return Provider
}
// eslint-disable-next-line react-refresh/only-export-components
const Provider = createWrapper()

export const renderWithRender = ({ route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  const defaultvalueAppContext = getInitialContext()
  return {
    user: userEvent.setup(),
    ...render(
      <Provider>
        <AppProvider defaultValue={defaultvalueAppContext}>
          <App></App>
        </AppProvider>
      </Provider>,
      { wrapper: BrowserRouter }
    )
  }
}
