import type { ExecutionResult } from '../UseProblemController'
import { easeIn, motion } from 'motion/react';

interface TestResultViewProps {
    controller: {
        isRunning: boolean;
        results: ExecutionResult | null;
    }
}

function ResultOLE_TLE_MLE({ controller,  }: TestResultViewProps) {
    const results = controller.results

    if (results) {
        const status = results.status
        let statusTitle = ''

        if (status === 'output_limit_exceeded') statusTitle = 'Output Limit Exceeded'
        if (status === 'time_limit_exceeded') statusTitle = 'Time Limit Exceeded'
        if (status === 'memory_limit_exceeded') statusTitle = 'Memory Limit Exceeded'

        return (
            <>
                 <motion.article 
                className='result-container'
                initial={{opacity:0.6, y:3}}
                animate={{opacity:1, scale:1, y:0}}
                transition={{duration:0.3, ease:easeIn}}
                >
                    <p className='result-title' id='red'>{statusTitle}</p>
                    <div className='details-container'>
                        <div className='last-excecuted-input-container'>
                            Last Excecuted Input
                            <div className='detail-container'>
                                {results.lastExecutedInput}
                            </div>
                        </div>

                    </div>
                </motion.article>
            </>
        )
    }

}

function ResultCE({ controller }: TestResultViewProps) {
    const results = controller.results

    if (results) {
        return (
            <>
                <motion.article 
                className='result-container'
                initial={{opacity:0.6, y:3}}
                animate={{opacity:1, scale:1, y:0}}
                transition={{duration:0.3, ease:easeIn}}
                >
                    <p className='result-title' id='red'>Compile Error</p>
                    <div className='details-container'>
                        <div className='individual-container-error-message'>
                            {results.errorMessage}
                        </div>

                    </div>
                </motion.article>
            </>
        )
    }
}

function ResultRE({ controller }: TestResultViewProps) {
    const results = controller.results

    if (results) {
        return (
            <>
               <motion.article 
                className='result-container'
                initial={{opacity:0.6, y:3}}
                animate={{opacity:1, scale:1, y:0}}
                transition={{duration:0.3, ease:easeIn}}
                >
                    <p className='result-title' id='red'>Runtime Error</p>
                    <div className='details-container'>
                        <div className='individual-container-error-message'>
                            {results.errorMessage}
                        </div>
                        <div className='last-excecuted-input-container' id='input-re'>
                            Last Excecuted Input
                            <div className='detail-container'>
                                {results.lastExecutedInput}
                            </div>
                        </div>
                    </div>
                </motion.article>
            </>
        )
    }
}

function ResultWA({ controller }: TestResultViewProps) {
    const results = controller.results

    if (results) {
        return (
            <>
                <motion.article 
                className='result-container'
                initial={{opacity:0.6, y:3}}
                animate={{opacity:1, scale:1, y:0}}
                transition={{duration:0.3, ease:easeIn}}
                >
                    <p className='result-title' id='red'>Wrong Answer</p>
                    <div className='details-container'>
                        <div className='individual-container-wrong-answer'>
                            Input
                            <div className='detail-container'>
                                {results.input}
                            </div>
                        </div>
                        <div className='individual-container-wrong-answer'>
                            Output
                            <div className='detail-container'>
                                {results.output}
                            </div>
                        </div>
                        <div className='individual-container-wrong-answer'>
                            Expected
                            <div className='detail-container'>
                                {results.expected}
                            </div>
                        </div>
                    </div>
                </motion.article>
            </>
        )
    }
}


function ResultACC({ controller }: TestResultViewProps) {
    const results = controller.results

    if (results) {
        return (
            <>
                <motion.article 
                className='result-container'
                initial={{opacity:0.6, y:3}}
                animate={{opacity:1, scale:1, y:0}}
                transition={{duration:0.3, ease:easeIn}}
                >
                    <p className='result-title' id='green'>Accepted</p>
                    <div className='details-container-accepted'>
                        <div className='individual-container-accepted'>
                            Runtime
                            <div className='detail-container-accepted'>
                                {results.runtime} ms
                            </div>
                        </div>
                        <div className='individual-container-accepted'>
                            Memory
                            <div className='detail-container-accepted'>
                                {results.memory} MB
                            </div>
                        </div>
                    </div>
                </motion.article>
            </>
        )
    }
}
export default function TestResultView({ controller }: TestResultViewProps) {

    const { isRunning, results } = controller

    if (isRunning) {
        return (
            <div className='results-loading'>
                <div className='results-view'>
                    <p> Running your code...</p>
                </div>
            </div>
        )
    }

    if (!results) {
        return (
            <div className='results-view'>
                <p>Without results. Run your code to see them.</p>
            </div>
        )
    }

    if (results.status === 'time_limit_exceeded' ||
        results.status === 'memory_limit_exceeded' ||
        results.status === 'output_limit_exceeded') {
        return (
            <ResultOLE_TLE_MLE controller={controller} />
        )


    }

    if (results.status === 'compile_error') return (<ResultCE controller={controller} />)

    if (results.status === 'runtime_error') return (<ResultRE controller={controller} />)

    if (results.status === 'wrong_answer') return (<ResultWA controller={controller} />)

    return (
        <>
            <ResultACC controller={controller} />
        </>
    )
}