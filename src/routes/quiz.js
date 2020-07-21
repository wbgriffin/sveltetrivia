import dotenv from 'dotenv';
import Quiz from '../_models/Quiz';
import Question from '../_models/Question';
const { GoogleSpreadsheet } = require('google-spreadsheet');

dotenv.config();

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

const makeQuiz = async () => {
  const quiz = new Quiz();

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
  });
  await doc.loadInfo();

  let sheet = await doc.sheetsByIndex[0];
  let rows = await sheet.getRows();

  rows.forEach((row) => {
    const question = new Question(row.QUESTION);
    question.addCorrectAnswer(row.CORRECT);
    question.addIncorrectAnswers([row.INCORRECT_1, row.INCORRECT_2, row.INCORRECT_3]);
    quiz.addQuestion(question);
  });

  sheet = await doc.sheetsByIndex[1];
  rows = await sheet.getRows();

  rows.forEach((row) => {
    const isCorrect = row.IS_CORRECT == 'TRUE' ? true : false;
    quiz.addFeedbackGif(isCorrect, row.IMAGE_URL);
  });

  return quiz;
};

export function get(req, res) {
  makeQuiz()
    .then((quiz) => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(quiz.toJSON()));
    })
    .catch((e) => {
      console.log(e);
      res.end('{test: false}');
    });
}
