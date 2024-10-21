import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'

import 'normalize.css/normalize.css'
import '@/assets/css/public/index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)