import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '~/componet/Footer'
import HeaderRegiter from '~/componet/HeaderRegister'

interface ChildrenProps {
  children?: React.ReactNode
}

console.log('RegisterLayout')

export default memo(function RegisterLayout({ children }: ChildrenProps) {
  return (
    <div>
      <HeaderRegiter />
      {children}
      <Outlet />
      <Footer />
    </div>
  )
})
