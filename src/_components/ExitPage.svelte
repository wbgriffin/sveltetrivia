<script>
  import { showPage } from '../_utils';
  import { quizStore} from '../_stores'
  import { LANDING_PAGE } from '../../config/constants.js';

  const {correct, played, score} = $quizStore.score();
</script>

<h1>Quiz Results:</h1>
<button on:click={() => showPage(LANDING_PAGE)}>Back to Start</button>

<p>You answered <strong>{correct}</strong> out of <strong>{played}</strong> questions correctly.</p>
<p>Your Score is <strong>{score}</strong>!</p>