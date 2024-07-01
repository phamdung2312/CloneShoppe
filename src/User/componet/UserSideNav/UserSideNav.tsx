import classNames from 'classnames'
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AppContext } from '~/Context/app.context'
import { path } from '~/constant/app.path'
// import no_avatar from '~/assets/no_avatar.jpg'
import { createURL } from '~/utils/utils'

export default function UserSideNav() {
  const { isUserAuthenticated } = useContext(AppContext)

  return (
    <div>
      <div className='flex items-center border-b  border-b-gray-400 py-4'>
        <Link to={path.profile} className='h-12 w-12 rounded-full flex-shrink-0 border border-black/10'>
          <img
            src={isUserAuthenticated?.avatar && createURL(isUserAuthenticated?.avatar)}
            className='h-12 w-12 rounded-full object-cover'
            alt=''
          ></img>
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate md:w-[138px] font-semibold text-gray-600'>{isUserAuthenticated?.email}</div>
          <Link to={path.profile} className='flex items-center capitalize'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('flex items-center capitalize transition-colors', {
              'text-orangeHeaderTop': isActive,
              'text-gray-800': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              className='w-full h-full'
            ></img>
          </div>
          <span className='text-[16px] '> Tài khoản của tôi</span>
        </NavLink>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames('flex items-center capitalize transition-colors mt-4', {
              'text-orangeHeaderTop': isActive,
              'text-gray-800': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              className='w-full h-full'
            ></img>
          </div>
          <span className='text-[16px] '> Đổi mật khẩu</span>
        </NavLink>
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            classNames('flex items-center capitalize transition-colors mt-4', {
              'text-orangeHeaderTop': isActive,
              'text-gray-800': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
              className='w-full h-full'
            ></img>
          </div>
          <span className='text-[16px] '> Đơn mua</span>
        </NavLink>
      </div>
    </div>
  )
}
