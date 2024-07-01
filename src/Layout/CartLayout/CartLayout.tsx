import Footer from '~/componet/Footer'
import HeaderCart from '~/componet/HeaderCart/HeaderCart'

interface childrenProps {
  children: React.ReactNode
}
export default function CartLayout({ children }: childrenProps) {
  return (
    <div>
      <HeaderCart></HeaderCart>
      {children}
      <Footer></Footer>
    </div>
  )
}
