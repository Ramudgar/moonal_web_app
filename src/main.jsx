import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'remixicon/fonts/remixicon.css'

import './index.css'

import AdminLayout from './Pages/Admin/AdminLayout.jsx'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <AdminLayout />
  </StrictMode>,
)
