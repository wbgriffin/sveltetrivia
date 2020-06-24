<script>
  import { showPage } from '../utils';
  import { QUIZ_PAGE} from '../../config/constants.js';
</script>

<h1>Welcome to SvelteTrivia.com</h1>
<button on:click={() => showPage(QUIZ_PAGE)}>Start Quiz</button>
