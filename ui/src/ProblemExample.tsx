import './problemView.css'

export default function ProblemExample() {
    return (
        <>
            {// get the information from each problem example
            }
            <div className="problem-example">

                <strong className="example-title">
                    Example 1:
                </strong>

                <div className='example-container'>
                    <div className="example-sidebar"></div>
                    <div className='example-main'>
                        <p className="example-content">
                            <strong> Input: </strong>
                            nums = [1,2,3,4]
                        </p>
                        <p className="example-content">
                            <strong> Output: </strong>
                            3
                        </p>
                        <p className="example-content">
                            <strong> Explanation: </strong>
                            All array elements can be made divisible by 3 using 3 operations:
                            <ul className="example-explanation">
                                <li>Subtract 1 from 1.</li>
                                <li>Add 1 to 2.</li>
                                <li>Subtract 1 from 4.</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}