import Footer from '~/componet/Footer'
import Header from '~/componet/Header'

interface childrenProps {
  children: React.ReactNode
}
console.log('MainLayouts')

export default function MainLayout({ children }: childrenProps) {
  return (
    <div className='overflow-hidden'>
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  )
}
