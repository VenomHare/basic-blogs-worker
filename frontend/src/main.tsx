import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// export const BACKEND_URL = 'https://mediumclonebackend.venomhare.space'
export const BACKEND_URL = 'http://localhost:8787'

createRoot(document.getElementById('root')!).render(
  <App />
)
