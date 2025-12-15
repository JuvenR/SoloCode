import ProblemExample from "./ProblemExample"
import './problemView.css'
import btnBack from './assets/backButton.png'
import btnNext from './assets/nextButton.png'

export default function problemDescription() {

    return (
        <>
            <div className="problem-container">
                <div className="problem-container-header"></div>
                <main className="problem-main">
                    {// it is supposed to get the problem information (such as title, difficulty, examples, etc) from a DTO or another data structure
                    }
                    
                    <strong className="problem-title">
                        Find Minimum Operations to Make All Elements Divisible by Three
                    </strong>

                    <div className="problem-difficulty">
                        {// TODO: how to manage different difficulties
                        }
                        Easy
                    </div>
                    <article className="problem-description">
                        <strong> Description: </strong>
                        <p className="problem-description-content">
                            You are given an integer array nums. In one operation, you can add or subtract 1 from any element of nums.
                        </p>
                        <p className="problem-description-content">
                            Return the minimum number of operations to make all elements of nums divisible by 3.
                        </p>
                    </article>
                    <article className="problem-examples-container">
                        {// add a for loop to add the examples per problem. The examples amount may change
                        }
                        <ProblemExample />
                    </article>
                </main>
                <footer className="problem-footer">
                    <button className="problem-pagination-button" id="btnBack">
                        <img src={btnBack}></img>
                    </button>
                    <p className="problem-number">3190</p>
                    <button className="problem-pagination-button" id="btnNext">
                        <img src={btnNext}></img>
                    </button>
                </footer>
            </div>
        </>
    )
}

