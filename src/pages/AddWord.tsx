import React, { useEffect, useState } from 'react'
import { postWord } from '../api/fetchClient';
import { Word } from '../types';

interface Props {
  words: Word[]
}

const AddWord: React.FC<Props> = ({ words }) => {
  const [newWord, setNewWord] = useState('');
  const [trabslateWord, setTranslateWord] = useState('');
  const [isAddWord, setIsAddWord] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const duplicate = () => {
    return (words.some(word => word.word === newWord)) ? setIsDuplicate(true) : addNewWord()
  }

  const addNewWord = () => {
    const newData = {
      id: newWord,
      word: newWord,
      translateWord: trabslateWord
    };

    postWord(newData).then(() => setIsAddWord(true));
    setNewWord('');
    setTranslateWord('')
  };

  useEffect(() => {
    setTimeout(() => {
      setIsDuplicate(false);
      setIsAddWord(false) 
    }, 2000)
}, [isAddWord, isDuplicate]);

return (
  <div>
    <h1 className="title">Додайте нове слово в словник</h1>
    <form
      onSubmit={event => {
        event.preventDefault();
        duplicate();
      }}
    >
      <div className="field">
        <label className="label">Слово</label>
        <div className="control">
          <input
            className="input"
            type="text" placeholder="Ввведіть слово"
            required
            value={newWord}
            onChange={event => setNewWord(event.target.value.toLowerCase())}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Переклад</label>
        <div className="control">
          <input
            className="input"
            type="text" placeholder="Ввведіть переклад"
            required
            value={trabslateWord}
            onChange={event => setTranslateWord(event.target.value.toLowerCase())}
          />
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link">Submit</button>
        </div>
        <div className="control">
          <button
            className="button is-link is-light"
            onClick={() => {
              setNewWord('');
              setTranslateWord('');
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
    <br />
    {isAddWord && (
      <article className="message is-success">
        <div className="message-header">
          <p>Success</p>
          <button
            className="delete"
            aria-label="delete"
            onClick={() => {
              setIsAddWord(false)
            }}
          ></button>
        </div>
        <div className="message-body">
          Слово було добавлене в словник
        </div>
      </article>
    )}
    {isDuplicate && (
      <article className="message is-danger">
      <div className="message-header">
        <p>Danger</p>
        <button
          className="delete"
          aria-label="delete"
          onClick={() => {
            setIsDuplicate(false)
          }}
        ></button>
      </div>
      <div className="message-body">
        Таке слово вже існує!
      </div>
    </article>
    )}
  </div>
)
}

export default AddWord;