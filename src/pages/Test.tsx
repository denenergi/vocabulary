import React, { useState } from 'react'
import { Navigate } from 'react-router';
import { postResult } from '../api/fetchClient';
import { Answer, WordCheck } from '../types';

interface Props {
  word: WordCheck
  setPage: () => void
}

const Test: React.FC<Props> = ({ word, setPage }) => {
  const [answer, setAnswer] = useState<Answer[] | []>([]);
  const [radio, setRadio] = useState('');

  const addAnswer = () => {
    const data = {
      word: word.translateWord,
      rightAnswer: radio === word.word
    }

    setAnswer(state => ([...state, data]))
    console.log(data, radio)
  }

  const timeAnswer = new Date().toLocaleString();

  if (answer.length === 10) {
    const result = {
      answers: answer,
      time: timeAnswer
    }
    postResult(result)
  }

  return (
    <>
      <div className='test-header'>
        <h2 className='test-title'>{`слово - ${word.translateWord}`}</h2>
        <p className='test-counter'>{`${answer.length + 1}/10`}</p>
      </div>
      <form className='test-form' onSubmit={event => {
        event.preventDefault();
      }}>
        <p className='test-text'>Виберіть правильний переклад</p>
        <div className="buttons">
          <input
            className="button is-primary is-light"
            type={"button"}
            value={word.check1}
            onClick={() => setRadio(word.check1)}
          />
          <input
            className="button is-primary is-light"
            type={"button"}
            value={word.check2}
            onClick={() => setRadio(word.check2)}
          />
          <input
            className="button is-primary is-light"
            type={"button"}
            value={word.check3}
            onClick={() => setRadio(word.check3)}
          />
          <input
            className="button is-primary is-light"
            type={"button"}
            value={word.check4}
            onClick={() => setRadio(word.check4)}
          />
        </div>

        {answer.length === 10 && <Navigate replace to="/result" />}
        <button
          disabled={radio === ''}
          className="button is-info submit-button"
          type="submit"
          onClick={() => {
            setPage();
            addAnswer();
            setRadio('')
          }}
        >
          {answer.length !== 9 ? 'Відповісти' : 'Закінчити тест'}
        </button>
      </form>
    </>
  )
}

export default Test;