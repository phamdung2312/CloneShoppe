import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import ErrorBoundary from './page/ErrorBoundary/ErrorBoundary.tsx'
import { HelmetProvider } from 'react-helmet-async'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRouteElement()
  console.log('re-render')
  return (
    <HelmetProvider>
      <ErrorBoundary>
        {routeElements}
        <ToastContainer />
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  )
}

export default App
