
import ProblemView from './ProblemView'
import CodeEditor from './CodeEditor'
import RunCodeView from './RunCodeView'
import '../css/app.css'
import { useProblemController } from '../controllers/UseProblemController'
import { mockProblems, type ProblemDTO } from '../services/ProblemService'
import { useState, useRef } from 'react'

export interface ProblemViewProps{
  currentIndex: number
  currentProblem: ProblemDTO
  setCurrentIndex: (index:number) => void
}

function ProblemWorkspace({ currentIndex, currentProblem, setCurrentIndex }: ProblemViewProps) {
  const controller = useProblemController(currentProblem.id)
  const [leftWidth, setLeftWidth] = useState(35)
  const [topHeight, setTopHeight] = useState(65)
  const [dragCursor, setDragCursor] = useState<'col-resize' | 'row-resize' | null>(null)

  const containerRef = useRef<HTMLElement>(null)
  const rightPanelRef = useRef<HTMLElement>(null)

  const startHDrag = (e: React.MouseEvent) => {
    e.preventDefault()
    setDragCursor('col-resize')
    document.body.style.userSelect = 'none'

    const onMove = (ev: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const pct = ((ev.clientX - rect.left) / rect.width) * 100
      setLeftWidth(Math.min(Math.max(pct, 18), 62))
    }

    const onUp = () => {
      setDragCursor(null)
      document.body.style.userSelect = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const startVDrag = (e: React.MouseEvent) => {
    e.preventDefault()
    setDragCursor('row-resize')
    document.body.style.userSelect = 'none'

    const onMove = (ev: MouseEvent) => {
      if (!rightPanelRef.current) return
      const rect = rightPanelRef.current.getBoundingClientRect()
      const pct = ((ev.clientY - rect.top) / rect.height) * 100
      setTopHeight(Math.min(Math.max(pct, 22), 82))
    }

    const onUp = () => {
      setDragCursor(null)
      document.body.style.userSelect = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return (
    <main className='main-app' ref={containerRef}>
      {dragCursor && <div className='resize-overlay' style={{ cursor: dragCursor }} />}

      <div className='app-problem-view' style={{ width: `${leftWidth}%` }}>
        <ProblemView currentIndex={currentIndex} currentProblem={currentProblem} setCurrentIndex={setCurrentIndex}/>
      </div>

      <div className='resize-handle-h' onMouseDown={startHDrag} />

      <aside className='code-run' ref={rightPanelRef}>
        <div className='app-code-editor' style={{ flex: `0 0 ${topHeight}%`, minHeight: 0, overflow: 'hidden' }}>
          <CodeEditor controller={controller} />
        </div>

        <div className='resize-handle-v' onMouseDown={startVDrag} />

        <div className='run-code-area'>
          <RunCodeView controller={controller} />
        </div>
      </aside>
    </main>
  )
}

export default function ProblemPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentProblem = mockProblems[currentIndex]

  return (
    <ProblemWorkspace
      key={currentProblem.id}
      currentIndex={currentIndex}
      currentProblem={currentProblem}
      setCurrentIndex={setCurrentIndex}
    />
  )
}


