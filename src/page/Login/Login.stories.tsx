import type { StoryObj } from '@storybook/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from '~/Context/app.context'
import ErrorBoundary from '~/page/ErrorBoundary/ErrorBoundary'
import { HelmetProvider } from 'react-helmet-async'
import { reactRouterParameters, withRouter } from 'storybook-addon-remix-react-router'
import Login from './Login'
import RegisterLayout from '~/Layout/RegisterLayout'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 0
    }
  }
})

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'componet/Login',
  component: Login,

  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Story: any) => (
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <HelmetProvider>
            <ErrorBoundary>
              <Story />
            </ErrorBoundary>
          </HelmetProvider>
        </AppProvider>
      </QueryClientProvider>
    )
  ]
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
}

export default meta
type Story = StoryObj<typeof meta>

export const LoginPage: Story = {
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: 'login' }
    })
  }
}

export const LoginPageLayout: Story = () => (
  <RegisterLayout>
    <Login></Login>
  </RegisterLayout>
)
LoginPageLayout.decorators = [withRouter]
LoginPageLayout.parameters = {
  reactRouter: reactRouterParameters({
    routing: { path: 'login' }
  })
}
