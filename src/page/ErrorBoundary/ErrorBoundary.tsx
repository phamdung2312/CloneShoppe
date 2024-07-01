// import { Component, ErrorInfo, ReactNode } from 'react'
// interface PropsType {
//   children?: ReactNode
// }

// interface StateType {
//   hasError: boolean
// }

// export default class ErrorBoundary extends Component<PropsType, StateType> {
//   public state: StateType = {
//     hasError: false
//   }
//   public static getDerivedStateFromError(error: Error): StateType {
//     console.log('error', error)
//     return { hasError: true }
//   }
//   public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     // You can also log the error to an error reporting service
//     console.log('Error', error, errorInfo)
//   }
//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return (
//         <section className='flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800'>
//           <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
//             <div className='max-w-md text-center'>
//               <h2 className='mb-8 font-extrabold text-9xl dark:text-gray-400'>
//                 <span className='sr-only'>Error</span>500
//               </h2>
//               <p className='text-2xl font-semibold md:text-3xl'>Sorry, we couldn't find this page.</p>
//               <p className='mt-4 mb-8 dark:text-gray-600'>
//                 But dont worry, you can find plenty of other things on our homepage.
//               </p>
//               <a href='/' className='px-8 py-3 font-semibold rounded text-white bg-orangeHeaderTop'>
//                 Back to homepage
//               </a>
//             </div>
//           </div>
//         </section>
//       )
//     }
//     return this.props.children
//   }
// }
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <section className='flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800'>
          <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
            <div className='max-w-md text-center'>
              <h2 className='mb-8 font-extrabold text-9xl dark:text-gray-400'>
                <span className='sr-only'>Error</span>404
              </h2>
              <p className='text-2xl font-semibold md:text-3xl'>Sorry, we couldn't find this page.</p>
              <p className='mt-4 mb-8 dark:text-gray-600'>
                But dont worry, you can find plenty of other things on our homepage.
              </p>
              <a href='/' className='px-8 py-3 font-semibold rounded text-white bg-orangeHeaderTop'>
                Back to homepage
              </a>
            </div>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
