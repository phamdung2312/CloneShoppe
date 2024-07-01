import { useContext } from 'react'
import Popover from '../Popover'
import { AppContext } from '~/Context/app.context'
import { Link } from 'react-router-dom'
import { path } from '~/constant/app.path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { purchasesStatus } from '~/constant/purchases'
import authAPI from '~/Apis/auth.api'

// import { queryClient } from '~/main'

export default function HeaderNav() {
  const { isAuthenticated, setIsauthenticated, isUserAuthenticated } = useContext(AppContext)
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
    <div className='flex h-[32px] justify-end'>
      <Popover
        placementPopover='bottom-end'
        className={'flex items-center py-1 hover:text-gray-300 cursor-pointer'}
        listPopover={
          <div className='flex flex-col justify-start min-w-40'>
            <button className='text-left py-3 px-2 hover:text-orangeHeaderTop'>Tiếng Việt</button>
            <button className='text-left py-3 px-2 hover:text-orangeHeaderTop mt2'>Tiếng Anh</button>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1 text-sm'>Tiếng Việt</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>
      {!isAuthenticated && (
        <div className='flex text-sm items-center ml-4 cursor-pointer'>
          <Link to={path.login} className='pr-2 hover:text-gray-300'>
            Đăng nhập
          </Link>
          <Link to={path.register} className='pl-2 border-l-[1px]  border-[#fb9182] hover:text-gray-300'>
            Đăng ký
          </Link>
        </div>
      )}
      {isAuthenticated && (
        <Popover
          placementPopover='bottom-end'
          as='span'
          listPopover={
            <div className='flex flex-col justify-start min-w-40'>
              <Link
                to='/'
                className='rounded-t-sm rounded-b-sm py-2 px-2 width-full hover:text-[#00bfa5] hover:bg-[#fafafa]'
              >
                Tài khoản của tôi
              </Link>
              <Link to='/' className='py-2 px-2 width-full hover:text-[#00bfa5] hover:bg-[#fafafa]'>
                Đơn mua
              </Link>
              <Link
                onClick={handleLogOut}
                to='/'
                className='rounded-t-sm rounded-b-sm py-2 px-2 width-full hover:text-[#00bfa5] hover:bg-[#fafafa]'
              >
                Đăng xuất
              </Link>
            </div>
          }
          className={'flex items-center py-1 hover:text-gray-300 cursor-pointer ml-4'}
        >
          <img
            src='https://photo.znews.vn/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg'
            alt='avatar'
            className='w-6 h-6 m-2 object-cover rounded-full'
          ></img>
          <div className='text-sm'>{isUserAuthenticated ? `${isUserAuthenticated.email}` : 'User'}</div>
        </Popover>
      )}
    </div>
  )
}
