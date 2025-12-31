import './css/testCases.css'
import {  motion } from 'motion/react'
import TestCasesView from './test-cases/TestCaseView'
import TestResultView from './test-cases/TestResultView'

export default function RunCodeView({controller} :{controller:any}) {
    
    return (
        <>
            <main className='run-main-container'>
                <nav className='buttons-group'>
                    <motion.button
                        className='btn-test'
                        id='testcases'
                        whileHover={{ y: -3 }}
                        onClick={() => controller.setActiveTestView('testcases')}
                    > Test Cases</motion.button>
                    <motion.button
                        className={`btn-test ${controller.statusColor}`}
                        whileHover={{ y: -3 }}
                        onClick={() => controller.setActiveTestView('results')}
                    > Test Results</motion.button>
                </nav>
                <div className='view-content'>
                    {controller.activeTestView === 'testcases' ? (
                        <TestCasesView
                        controller={controller}/>
                    ) : (
                       <TestResultView controller={controller} />
                    )}

                </div>
            </main>
        </>
    )
}