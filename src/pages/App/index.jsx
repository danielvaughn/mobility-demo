import { useContext } from 'react'
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { appContext } from '../../context/AppProvider'
import Dashboard from '../Dashboard'
import Login from '../Login'

const App = () => {
  const {
    appState,
  } = useContext(appContext)

  if (appState.isLoading) {
    return null
  }

  return (
    <Routes>
      {appState.isAuthenticated && (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
        </>
      )}

      {!appState.isAuthenticated && (
        <>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </>
      )}
    </Routes>
  )
}

export default App
