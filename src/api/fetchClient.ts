import { AllAnswer, Answer, Word } from "../types";

const BASE_URL = 'http://localhost:3001';

// a promise resolved after a given delay
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null, // we can send any data to the server
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    // We add body and Content-Type only for the requests with data
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  // we wait for testing purpose to see loaders
  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const fetchRequest = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  delete: (url: string) => request(url, 'DELETE'),
};

export const getWords = () => {
  return fetchRequest.get<Word[]>(`/words`);
};

export const postWord = (word: Word) => {
  return fetchRequest.post('/words', word);
};

export const deleteWord = (wordId: string) => {
  return fetchRequest.delete(`/words/${wordId}`);
};

export const getResult = () => {
  return fetchRequest.get<AllAnswer[]>(`/results`);
};

export const postResult = (result: AllAnswer) => {
  return fetchRequest.post('/results', result);
};