import React from 'react'
import classNames from 'classnames';
import { AllAnswer } from '../types';

interface Props {
  answer: AllAnswer;
}

const ResultItem: React.FC<Props> = ({ answer }) => {
  const progress = answer.answers.filter(element => element.rightAnswer === true);
  return (
    <div className="content is-large">
      <h6 className='result-title'>{`Відповіді за ${answer.time}`}</h6>
      <ul>
        {answer.answers.map((answer, index) => (
          <li
            key={index}
            className={classNames('false-answer',
              { 'right-answer': answer.rightAnswer })}
          >{answer.word}</li>
        ))}
      </ul>
      <div>
        <p>{`Правильних відповідей ${progress.length * 100 / answer.answers.length} %`} </p>
        <progress className="progress is-primary" value={progress.length * 100 / answer.answers.length} max="100">
        </progress>
      </div>
    </div>
  )
}

export default ResultItem;