<script>
  import { showPage } from '../_utils';
  import { quizStore} from '../_stores'
  import { LANDING_PAGE } from '../../config/constants.js';
</script>

<h1>Quiz Results:</h1>
<button on:click={() => showPage(LANDING_PAGE)}>Back to Start</button>
