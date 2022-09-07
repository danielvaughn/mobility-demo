import { useEffect } from 'react'
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom'
import { useFlow } from '../../utils/useFlow'
import Dashboard from '../Dashboard'
import Login from '../Login'

/**
 *
 * The sole purpose of the <App /> component is to decide whether to render the authenticated or public routes.
 * Depending on the size of the app, this might be encapsulated into an <AppRouter /> component or a context provider.
 *
 */
const App = () => {
  const [state, setState] = useFlow({
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    const token = window.localStorage.getItem('t')

    setState({
      isAuthenticated: Boolean(token),
      isLoading: false,
    })
  }, [])

  return (
    <Router>
      {state.isAuthenticated && (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>
      )}

      {!state.isAuthenticated && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      )}
    </Router>
  )
}

export default App
