export default class Question {
  constructor(text) {
    this._text = text;
    this._answers = [];
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

  addCorrectAnswer(text) {
    this.addAnswer(text, true);
  }

  addAnswer(text, isCorrect) {
    this._answers.push(this._makeAnswer(text, isCorrect));
  }

  _makeAnswer(text, isCorrect) {
    return {
      text,
      isCorrect
    };
  }

  toString() {
    return JSON.stringify({
      text: this._text,
      answers: this._answers
    });
  }
}
