import { Navigate, Outlet, useRoutes } from 'react-router-dom'
// import ProductList from './page/ProductList'
// import Login from './page/Login'
// import Register from './page/Register'
import RegisterLayout from './Layout/RegisterLayout'
import MainLayout from './Layout/MainLayout/MainLayout'
// import Profile from './componet/Profile'
import { lazy, useContext, Suspense, useMemo } from 'react'
import { AppContext } from './Context/app.context'
import { path } from './constant/app.path'
// import ProductDetail from './componet/ProductDetail/ProductDetail'
// import Cart from './componet/Cart'
import CartLayout from './Layout/CartLayout'
import UserLayout from './User/componet/UserLayout'
// import Profile from './User/pages/Profile'
// import ChangePassword from './User/pages/ChangePassword'
// import HistoryPurchase from './User/pages/HistoryPurchase'
// import NotFound from './page/NotFound/NotFound'

export default function useRouteElement() {
  const Login = lazy(() => import('./page/Login'))
  const ProductList = lazy(() => import('./page/ProductList'))
  const Register = lazy(() => import('./page/Register'))
  const ProductDetail = lazy(() => import('./componet/ProductDetail/ProductDetail'))
  const Cart = lazy(() => import('./componet/Cart'))
  const Profile = lazy(() => import('./User/pages/Profile'))
  const ChangePassword = lazy(() => import('./User/pages/ChangePassword'))
  const HistoryPurchase = lazy(() => import('./User/pages/HistoryPurchase'))
  const NotFound = lazy(() => import('./page/NotFound/NotFound'))
  const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet></Outlet> : <Navigate to='login' />
  }
  const RejectedRoute = () => {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet></Outlet> : <Navigate to='' />
  }

  const element = useMemo(
    () => [
      {
        path: '',
        element: (
          <MainLayout>
            <Suspense fallback={<div>Loading...</div>}>
              <ProductList />
            </Suspense>
          </MainLayout>
        ),
        index: true
      },
      {
        path: path.productDetail,
        element: (
          <MainLayout>
            <Suspense fallback={<div>Loading...</div>}>
              <ProductDetail />
            </Suspense>
          </MainLayout>
        )
      },
      {
        path: '',
        element: <ProtectedRoute />,
        children: [
          {
            path: path.cart,
            element: (
              <CartLayout>
                <Suspense fallback={<div>Loading...</div>}>
                  <Cart />
                </Suspense>
              </CartLayout>
            )
          },
          {
            path: path.user,
            element: (
              <MainLayout>
                <UserLayout />
              </MainLayout>
            ),
            children: [
              {
                path: path.profile,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Profile />
                  </Suspense>
                )
              },
              {
                path: path.changePassword,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <ChangePassword />
                  </Suspense>
                )
              },
              {
                path: path.historyPurchase,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <HistoryPurchase />
                  </Suspense>
                )
              }
            ]
          }
        ]
      },
      {
        path: '',
        element: <RejectedRoute />,
        children: [
          {
            path: '',
            element: <RegisterLayout />,
            children: [
              {
                path: path.login,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Login />
                  </Suspense>
                )
              },
              {
                path: path.register,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Register />
                  </Suspense>
                )
              }
            ]
          }
        ]
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return useRoutes(element)
}
