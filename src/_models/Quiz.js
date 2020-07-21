import Question from './Question';

function nop() {}

export default class Quiz {
  constructor() {
    this.init();
  }

  init() {
    this._currentQuestion = 0;
    this._feedbackGifs = [];
    this._questions = [];
    this._stats = {
      played: 0,
      correct: 0
    };
  }

  hydrate(json) {
    this.init();
    try {
      json.questions.forEach((q) => {
        const question = new Question(q.text);
        q.answers.forEach((a) => {
          if (a.isCorrect === true) {
            question.addCorrectAnswer(a.text);
          } else {
            question.addIncorrectAnswer(a.text);
          }
        });
        this.addQuestion(question);
      });

      json.feedbackGifs.forEach(({ isCorrect, url }) => {
        this.addFeedbackGif(isCorrect, url);
      });
    } catch (e) {
      console.error('Could not hydrate Quiz: ' + e);
    }
  }

  get questions() {
    return this._questions;
  }

  get progress() {
    return Math.round(((this._currentQuestion + 1) / this.length()) * 100);
  }

  _correct() {
    this._stats.correct += 1;
  }

  _played() {
    this._stats.played += 1;
  }

  _next() {
    if (this._currentQuestion === this.length() - 1) {
      return false;
    }
    this._currentQuestion += 1;
    return this.question();
  }

  addFeedbackGif(isCorrect, url) {
    this._feedbackGifs.push({
      isCorrect,
      url
    });
  }

  getRandomFeedbackGif(isCorrect) {
    const gifs = this._feedbackGifs.filter((gif) => gif.isCorrect === isCorrect);
    return gifs[Math.floor(Math.random() * gifs.length)];
  }

  addQuestion(question) {
    this._questions.push(question);
  }

  question(key) {
    if (key) {
      return this._questions[key];
    }
    return this._questions[this._currentQuestion];
  }

  next(correct) {
    correct === true ? this._correct() : nop();
    this._played();
    return this._next();
  }

  score() {
    return {
      ...this._stats,
      score: parseFloat(this._stats.correct / this._stats.played).toFixed(2) * 100 + '%'
    };
  }

  length() {
    return this._questions.length;
  }

  toJSON() {
    return {
      questions: this._questions.map((q) => q.toJSON()),
      stats: this._stats,
      feedbackGifs: this._feedbackGifs
    };
  }
}
