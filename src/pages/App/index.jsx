import { useContext } from 'react'
import {
  BrowserRouter as Router,
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

  return (
    <Router>
      {appState.isAuthenticated && (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>
      )}

      {!appState.isAuthenticated && (
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
