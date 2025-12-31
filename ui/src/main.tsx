import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProblemPage from './ProblemPage'

import './css/app.css'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <ProblemPage />
  </StrictMode>,
)
