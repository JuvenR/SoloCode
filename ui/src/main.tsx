import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProblemPage from './main-page/ProblemPage'

import './css/app.css'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <ProblemPage />
  </StrictMode>,
)
