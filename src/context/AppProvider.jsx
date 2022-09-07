import React, { useEffect, useMemo } from 'react'
import { any } from 'prop-types'
import { useFlow } from '../utils/useFlow'

export const appContext = React.createContext()

const AppProvider = ({ children }) => {
  const [appState, setAppState] = useFlow({
    isLoadingApp: true,
    isAuthenticated: false,
  })

  const value = useMemo(() => ({
    appState,
    setAppState,
  }))

  useEffect(() => {
    const token = window.localStorage.getItem('t')

    setAppState({
      isAuthenticated: Boolean(token),
      isLoading: false,
    })
  }, [])

  return (
    <appContext.Provider
      value={value}
    >
      {children}
    </appContext.Provider>
  )
}

AppProvider.propTypes = {
  children: any.isRequired,
}

export default AppProvider
