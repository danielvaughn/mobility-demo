import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import AppProvider from './context/AppProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
)
