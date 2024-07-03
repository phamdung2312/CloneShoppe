import { Link } from 'react-router-dom'
import { path } from '~/constant/app.path'
import { useContext, useEffect, useRef } from 'react'
import { AppContext } from '~/Context/app.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authAPI from '~/Apis/auth.api'
import { purchasesStatus } from '~/constant/purchases'

export default function NavUser() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hoverMenu = useRef<any | null>(null)
  const targetHoverMenu = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const backHoverMenu = useRef<any | null>(null)
  useEffect(() => {
    const handleMouseEnter = () => {
      if (targetHoverMenu.current) {
        targetHoverMenu.current.classList.add('animate-slideUpFadeIn')
      }
    }

    const handleMouseLeave = () => {
      if (targetHoverMenu.current) {
        targetHoverMenu.current.classList.remove('animate-slideUpFadeIn')
      }
    }

    const hoverSpan = hoverMenu.current
    const targetHoverMenuDiv = targetHoverMenu.current
    if (targetHoverMenuDiv) {
      hoverSpan.addEventListener('click', handleMouseEnter)

      targetHoverMenuDiv.addEventListener('click', handleMouseLeave)
    }

    return () => {
      if (targetHoverMenuDiv) {
        hoverSpan.removeEventListener('click', handleMouseEnter)
        targetHoverMenuDiv.removeEventListener('click', handleMouseLeave)
      }
    }
  }, [])

  const { isAuthenticated, setIsauthenticated } = useContext(AppContext)
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: () => {
      return authAPI.logoutUser()
    },
    onSuccess() {
      setIsauthenticated(false)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })
  const handleLogOut = () => {
    logoutMutation.mutate()
  }
  return (
    <div className=''>
      <div className='sm:pb-2 shadow-2xl border bg-white text-white sm:hidden fixed z-20 w-full h-[60px] bottom-[-2px] left-0'>
        <div className='flex h-[60px] justify-between top-0 right-0 px-5'>
          <Link to='/' className='flex flex-col justify-center items-center capitalize'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='#666769'
              className='size-8'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
              />
            </svg>

            <span className='text-gray-500 mt-[1px]'>Home</span>
          </Link>
          <Link to='/' className='flex flex-col justify-center items-center capitalize' ref={hoverMenu}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='#666769'
              className='size-8'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
            </svg>

            <span className='text-gray-500 mt-[1px] animate-slideUpFadeIn'>Menu</span>
          </Link>
          <Link to={path.profile} className='flex flex-col justify-center items-center capitalize'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='#666769'
              className='size-8'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
              />
            </svg>
            <span className='text-gray-500 mt-[1px] '>tôi</span>
          </Link>
        </div>
        <div
          ref={targetHoverMenu}
          className='w-full h-[60px] z-10 bg-[#00bfa5] shadow-2xl animate-[animation] absolute top-[60px] right-0 flex justify-around items-center'
        >
          {isAuthenticated && (
            <>
              <Link to='/login' className='flex flex-col justify-center items-center capitalize' ref={backHoverMenu}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='white'
                  className='size-8'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18' />
                </svg>

                <span className='text-white mt-[1px] '>back</span>
              </Link>
              <Link to='/' className='flex flex-col justify-center items-center capitalize bg' onClick={handleLogOut}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='white'
                  className='size-8'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15'
                  />
                </svg>

                <span className='text-white mt-[1px]'>Đăng xuất</span>
              </Link>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link
                to={path.login}
                className='flex flex-col justify-center items-center capitalize'
                ref={backHoverMenu}
              >
                <button className='text-white mt-[1px] '>Đăng nhập</button>
              </Link>
              <div className='w-[1px] h-8 bg-gray-500'></div>
              <Link
                to={path.register}
                className='flex flex-col justify-center items-center capitalize bg'
                onClick={handleLogOut}
              >
                <button className='text-white mt-[1px]'>Đăng ký</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
