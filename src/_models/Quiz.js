export default class Quiz {
  constructor() {
    this._questions = Array();
  }

  get questions() {
    return this._questions;
  }

  addQuestion(question) {
    this._questions.push(question);
  }

  length() {
    return this._questions.length;
  }

  toJSON() {
    return {
      questions: this._questions.map((q) => q.toJSON())
    };
  }
}
