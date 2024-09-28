import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/Data';

const Quiz = () => {
    let [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index])
    const [lock, setLock] = useState(false)
    let [score, setScore]= useState(0)
    let [result, setResult] = useState(false)

    const option1 = useRef(null)
    const option2 = useRef(null)
    const option3 = useRef(null)
    const option4 = useRef(null)

    const option_array = [option1, option2, option3, option4]


    const checkAnswer = (e, ans) =>{ // two params 1. element 2. ans
        if (lock === false) { 
            if(question.ans === ans){
                e.target.classList.add("correct");
                setLock(true)
                setScore(prev=> prev +1);
                console.log(score)
            }else{
                e.target.classList.add("wrong");
                setLock(true)
                option_array[question.ans-1].current.classList.add("correct")
            }
        }
       
    }

    const next = () =>{
        if(lock === true){
            if( index === data.length -1){
                setResult(true)
                return 0;
            }
            setIndex(++index) // Constants cannot be reassigned after their initial declaration. To fix this, you should declare index with let instead of const if you need to modify its value. Here’s how you can update your code:
            setQuestion(data[index])
            setLock(false)
            option_array.map((option)=>{
                option.current.classList.remove("wrong")
                option.current.classList.remove("correct")
                return null;
            })
        }
    }

    const reset = () => {
        setIndex(0)
        setQuestion(data[0])
        setResult(false)
        setScore(0)
        setLock(false)
    }
  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr />
        { result ? <></> : <>
            <h2>{index+1}. {question.question}</h2>
        <ul>
            <li ref={option1} onClick={(e)=> checkAnswer(e,1)}>{question.option1}</li>
            <li ref={option2} onClick={(e)=> checkAnswer(e,2)}>{question.option2}</li>
            <li ref={option3} onClick={(e)=> checkAnswer(e,3)}>{question.option3}</li>
            <li ref={option4} onClick={(e)=> checkAnswer(e,4)}>{question.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className='index'>{index+1} out of {data.length} questions</div>
        </>}
        {result ? <>
            <h2>You scored {score} out of {data.length} </h2>
            <button onClick={reset}>Reset</button>
        </>: <></>
        }   
    </div>
  )
}

export default Quiz