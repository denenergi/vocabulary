export interface Word {
  "id": string,
  "word": string,
  "translateWord": string
}

export interface WordCheck {
  "id": string,
  "word": string,
  "translateWord": string
  "check1": string,
  "check2": string,
  "check3": string,
  "check4": string
}

export interface Answer {
  "word": string,
  "rightAnswer": boolean
}

export interface AllAnswer {
  answers: Answer[],
  time: string,
}