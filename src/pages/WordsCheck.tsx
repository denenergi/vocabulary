import React, { useEffect, useState } from 'react';
import shuffle from '../helpers/shuffle';
import { Word, WordCheck } from '../types';
import Test from './Test';

interface Props {
  words: Word[];
}

const WordsCheck: React.FC<Props> = ({ words }) => {
  const [shuffleWords, setShuffleWords] = useState<WordCheck[] | []>([])
  const [page, setPage] = useState(0);

  useEffect(() => {
    setShuffleWords(shuffle(words));
  }, [words])

  const handlerAnsver = () => {
    setPage(state => state + 1)
  }

  return (
    <div className='words-check'>
      <h1 className="title">Перевірка слів</h1>
      {shuffleWords.length > 0 && <Test word={shuffleWords[page]} setPage={handlerAnsver} />}
    </div>
  )
}

export default WordsCheck;