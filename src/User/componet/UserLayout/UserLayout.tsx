import { Outlet } from 'react-router-dom'
import UserSideNav from '../UserSideNav'
export default function UserLayout() {
  return (
    <div className='bg-neutral-100 py-16 text-sm text-gray-600'>
      <div className='container'>
        <div className='grid gird-cols-1 gap-6 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav></UserSideNav>
          </div>
          <div className='md:col-span-9 lg:col-span-10 overflow-auto scrollbar-thumb-red-300 scrollbar-track-gray-100 scrollbar-thin'>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  )
}
