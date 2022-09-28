import React, { useEffect, useState } from 'react'
import { getResult } from '../api/fetchClient'
import { AllAnswer } from '../types';
import ResultItem from './ResultItem';

export default function Result() {
  const [answers, setAnswers] = useState<AllAnswer[] | []>([]);
  const [chooseAnswer, setChooseAnswer] = useState('');
  const [showAnser, setShowAnswer] = useState<AllAnswer | null>(null)

  useEffect(() => {
    setTimeout(() => {
      getResult().then(res => setAnswers(res));
    }, 500)
  }, [])

  useEffect(() => {
    const findAnswer = answers.find(answer => answer.time === chooseAnswer);
    if (findAnswer) {
      setShowAnswer(findAnswer);
    }
  }, [chooseAnswer])

  return (
    <>
      <h1 className="title">Результат</h1>
      <div className="select">
        <select value={chooseAnswer} onChange={event => setChooseAnswer(event.target.value)} >
          <option>Історія перевірок</option>
          {answers.length > 0 &&
            (answers.map(answer => (
              <option key={answer.time} value={answer.time} >
                {answer.time}
              </option>
            ))
            )
          }
        </select>
      </div>
      {showAnser !== null && <ResultItem answer={showAnser} />}

    </>


  )
}
