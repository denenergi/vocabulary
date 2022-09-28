import { useEffect } from 'react';
import { deleteWord, getWords } from '../api/fetchClient';
import { Word } from '../types';

interface Props {
  words: Word[];
  setWords: (word: Word[]) => void;
  setError: (error: string) => void;
}

const Home: React.FC<Props> = ({words, setWords, setError}) => {

  const handlerDeleteWord = (id: string) => {
    deleteWord(id)
      .then(() => words.filter(word => word.id !== id))
      .then(res => {
        setWords(res);
      }).catch(() => setError('Unable to delete a todo'));
  }

  useEffect(() => {
    getWords()
    .then(res => setWords(res))
    .catch(() => setError('Something went wrong'))
}, []);

  return (
    <>
      <h1 className="title">Словник</h1>
        <table className="table">
        <thead>
          <tr className="list">
            <th className="list__item"><abbr title="Position">№</abbr></th>
            <th className="list__item">Слово</th>
            <th className="list__item">Переклад</th>
            <th className="list__item">Видалити</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word, index) => (
            <tr key={word.id} className="list">
              <th className="list__item">{index + 1}</th>
              <td className="list__item">{word.word}</td>
              <td className="list__item">{word.translateWord}</td>
              <td className="list__item">
                <button className="delete" onClick={() => handlerDeleteWord(word.id)}>
              </button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Home;