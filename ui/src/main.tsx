import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProblemView from './ProblemView'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProblemView />
  </StrictMode>,
)
