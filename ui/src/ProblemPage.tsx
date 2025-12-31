
import ProblemView from './ProblemView'
import CodeEditor from './CodeEditor'
import RunCodeView from './RunCodeView'
import './css/app.css'
import { useProblemController } from './UseProblemController'

export default function ProblemPage() {
  const controller = useProblemController()

  return (

    <main className='main-app'>
      <div className='app-problem-view'>
        <ProblemView />
      </div>
      <aside className='code-run'>
        <div className='app-code-editor'>
          <CodeEditor
            controller={controller} />
        </div>
        <div className='run-code-area'>
          <RunCodeView 
          controller={controller}/>
        </div>
      </aside>
    </main>
  )
}



