import { Link } from 'react-router-dom'
import { path } from '~/constant/app.path'

export default function NavUser() {
  return (
    <div className='sm:pb-2 shadow-2xl border bg-white text-white sm:hidden fixed z-10 w-full h-[60px] bottom-[-1px] left-0 '>
      <div className='container flex h-[60px] justify-between'>
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
              d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0'
            />
          </svg>

          <span className='text-gray-500 mt-[1px]'>Thông báo</span>
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
          <span className='text-gray-500 mt-[1px]'>tôi</span>
        </Link>
      </div>
    </div>
  )
}
