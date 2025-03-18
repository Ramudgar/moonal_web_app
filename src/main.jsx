import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'remixicon/fonts/remixicon.css'

import './index.css'

// import App from './App.jsx'
import AdminLayout from './Pages/Admin/AdminLayout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <AdminLayout />
  </StrictMode>,
)
