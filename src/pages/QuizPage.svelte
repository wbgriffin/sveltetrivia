<script>
  import { showPage } from '../utils';
  import { LANDING_PAGE} from '../../config/constants';
  import Question from '../components/Question.svelte';

  const questions = [
    {
      QUESTION: 'what is the question?',
      CORRECT: 'this',
      INCORRECT_1: 'asdfasdf',
      INCORRECT_2: 'adferyetqe',
      INCORRECT_3: 'fasdfsad'
    },
    {
      QUESTION: 'and what about this question?',
      CORRECT: 'this',
      INCORRECT_1: 'shertyege',
      INCORRECT_2: 'asd asdgqeryqqmasadf adsf',
      INCORRECT_3: 'asdf asd',
    },
    {
      QUESTION: 'what is the question?',
      CORRECT: 'this',
      INCORRECT_1: 'asdfa sdf',
      INCORRECT_2: 'dkjd awet a sdfoj',
      INCORRECT_3: 'fassd sd fda edfsad'
    },
  ];

  let questionIndex;
  $: questionIndex = 0;

  function next() {
    if (questionIndex === (questions.length - 1)) {
      console.log('end of quiz');
      return;
    }
    questionIndex = questionIndex + 1;
  }
</script>

<h1>Quiz Page</h1>
<button on:click={() => showPage(LANDING_PAGE)}>GO BACK</button>
<hr>
<Question question={questions[questionIndex]} on:next={next} />