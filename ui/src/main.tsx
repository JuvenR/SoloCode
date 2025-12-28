import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProblemView from './ProblemView'
import CodeEditor from './CodeEditor'
import './css/app.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className='main-app'>
      <div className='app-problem-view'>
        <ProblemView />
      </div>
      <div className='app-code-editor'>
        <CodeEditor  />
      </div>
    </main>

  </StrictMode>,
)
