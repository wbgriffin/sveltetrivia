import { shuffle } from '../_utils';

export default class Question {
  constructor(text) {
    this._text = text;
    this._answers = [];
  }

  get text() {
    return this._text;
  }

  get answers() {
    return this._answers.map((answer) => answer.text);
  }

  setText(text) {
    if (!text || text == '') {
      throw new Error('Question text cannot be empty!');
    }
    this._text = text;
  }

  addIncorrectAnswer(text) {
    this.addAnswer(text, false);
  }

  addIncorrectAnswers(texts) {
    texts.forEach((text) => this.addAnswer(text, false));
  }

  addCorrectAnswer(text) {
    this.addAnswer(text, true);
  }

  addAnswer(text, isCorrect) {
    this._answers.push(this._makeAnswer(text, isCorrect));
    this._answers = shuffle(this._answers);
  }

  _makeAnswer(text, isCorrect) {
    return {
      text,
      isCorrect
    };
  }

  isCorrectAnswer(key) {
    if (this._answers[key].isCorrect === true) {
      return true;
    }
    return false;
  }

  toJSON() {
    return {
      text: this._text,
      answers: this._answers
    };
  }
}
