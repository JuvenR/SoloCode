import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProblemView from './ProblemView'
import CodeEditor from './CodeEditor'
import RunCodeView from './RunCodeView'
import './css/app.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className='main-app'>
      <div className='app-problem-view'>
        <ProblemView />
      </div>
      <aside className='code-run'>
        <div className='app-code-editor'>
          <CodeEditor />
        </div>
        <div className='run-code-area'>
          <RunCodeView />
        </div>
      </aside>
    </main>

  </StrictMode>,
)
