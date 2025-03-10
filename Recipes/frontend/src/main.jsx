import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes/index.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'

import './index.css'




ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider><Routes/></AuthContextProvider>
)
