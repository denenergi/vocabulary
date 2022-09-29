import 'bulma/css/bulma.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { NavLink, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import AddWord from './pages/AddWord';
import WordsCheck from './pages/WordsCheck';
import Result from './pages/Result';
import { Word } from './types';
import { getWords } from './api/fetchClient';

const App = () => {
  const [words, setWords] = useState<Word[] | []>([]);
  const [error, setError] = useState('');

  useEffect(() => {
      getWords()
      .then(res => setWords(res))
      .catch(() => setError('Something went wrong'))
  }, []);

  return (
    <div className='app'>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <NavLink
              to="/"
              replace
              className={({ isActive }) => classNames('navbar-item',
                { 'is-active': isActive })}
            >
              Словник
            </NavLink>

            <NavLink
              to="addWord"
              className={({ isActive }) => classNames('navbar-item',
                { 'is-active': isActive })}
              replace
            >
              Додати слова
            </NavLink>

            <NavLink
              to="wordsCheck"
              className={({ isActive }) => classNames('navbar-item',
                { 'is-active': isActive })}
              replace
            >
              Перевірка слів
            </NavLink>
            <NavLink
              to="result"
              className={({ isActive }) => classNames('navbar-item',
                { 'is-active': isActive })}
              replace
            >
              Результат
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="*"
              element={
                <NotFound />
              }
            />
            <Route
              path="/"
              element={
                <Home words={words} setWords={setWords} setError={setError}/>
              }

            />
            <Route
              path="addWord"
              element={
                <AddWord words={words} />
              }
            />
            <Route
              path="wordsCheck"
              element={<WordsCheck words={words} />}
            />
            <Route
              path="result"
              element={<Result />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
