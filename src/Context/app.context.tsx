import React, { createContext, useState } from 'react'
import { extendedPurchasesType } from '~/componet/Cart/Cart'
import { User } from '~/types/user.type'
import { getAccessToken, getUserLocal } from '~/utils/auth'
interface AppContextInterface {
  isAuthenticated: boolean
  setIsauthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isUserAuthenticated: User | null
  setIsUserAuthenticated: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: extendedPurchasesType[]
  setExTendedPurchases: React.Dispatch<React.SetStateAction<extendedPurchasesType[]>>
  reset: () => void
}

// const initialContext = {
//   isAuthenticated: Boolean(getAccessToken()),
//   setIsauthenticated: () => null,
//   isUserAuthenticated: getUserLocal(),
//   setIsUserAuthenticated: () => null,
//   extendedPurchases: [],
//   setExTendedPurchases: () => null,
//   reset: () => null
// }
export const getInitialContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessToken()),
  setIsauthenticated: () => null,
  isUserAuthenticated: getUserLocal(),
  setIsUserAuthenticated: () => null,
  extendedPurchases: [],
  setExTendedPurchases: () => null,
  reset: () => null
})

const initialContext = getInitialContext()

export const AppContext = createContext<AppContextInterface>(initialContext)
export const AppProvider = ({
  children,
  defaultValue = initialContext
}: {
  children: React.ReactNode
  defaultValue?: AppContextInterface
}) => {
  const [isAuthenticated, setIsauthenticated] = useState<boolean>(defaultValue.isAuthenticated)
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<User | null>(defaultValue.isUserAuthenticated)
  const [extendedPurchases, setExTendedPurchases] = useState<extendedPurchasesType[]>(defaultValue.extendedPurchases)

  const reset = () => {
    setIsauthenticated(false)
    setIsUserAuthenticated(null)
    setExTendedPurchases([])
  }
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsauthenticated,
        isUserAuthenticated,
        setIsUserAuthenticated,
        extendedPurchases,
        setExTendedPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
