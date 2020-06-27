<script>
  import { showPage } from '../utils';
  import { LANDING_PAGE} from '../../config/constants';
  import Question from '../components/Question.svelte';

  const question = {
    QUESTION: 'what is the question?',
    CORRECT: 'this',
    INCORRECT_1: 'asdfasdf',
    INCORRECT_2: 'adferyetqe',
    INCORRECT_3: 'fasdfsad'
  };
</script>

<h1>Quiz Page</h1>
<button on:click={() => showPage(LANDING_PAGE)}>GO BACK</button>
<hr>
<Question question={question} />