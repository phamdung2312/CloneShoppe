import type { StoryObj } from '@storybook/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from '~/Context/app.context'
import ErrorBoundary from '~/page/ErrorBoundary/ErrorBoundary'
import { HelmetProvider } from 'react-helmet-async'
import MainLayout from './MainLayout'
import ProductDetail from '~/componet/ProductDetail/ProductDetail'
import { reactRouterParameters, withRouter } from 'storybook-addon-remix-react-router'

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
  title: 'componet/MainLayout',
  component: MainLayout,

  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      description: 'Body của mainLayout',
      table: { type: { summary: 'React.ReactNode' } }
    }
  },
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

export const ProductDetailTest: Story = {
  decorators: [withRouter],
  args: {
    children: <ProductDetail></ProductDetail>
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { nameId: 'Điện-thoại-Apple-Iphone-12-64GB--Hàng-chính-hãng-VNA-i.60afb1c56ef5b902180aacb8' }
      },
      routing: { path: ':nameId' }
    })
  }
}
