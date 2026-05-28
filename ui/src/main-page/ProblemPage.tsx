
import ProblemView from './ProblemView'
import CodeEditor from './CodeEditor'
import RunCodeView from './RunCodeView'
import '../css/app.css'
import { useProblemController } from '../controllers/UseProblemController'
import { mockProblems, type ProblemDTO } from '../services/ProblemService'
import { useState } from 'react'

export interface ProblemViewProps{
  currentIndex: number
  currentProblem: ProblemDTO
  setCurrentIndex: (index:number) => void
}

export default function ProblemPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentProblem = mockProblems[currentIndex]
  const controller = useProblemController(currentProblem.id)

  return (

    <main className='main-app'>
      <div className='app-problem-view'>
        <ProblemView currentIndex={currentIndex} currentProblem={currentProblem} setCurrentIndex={setCurrentIndex}/>
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



