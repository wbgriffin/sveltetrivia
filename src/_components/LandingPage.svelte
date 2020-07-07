<script>
  import { showPage } from '../_utils';
  import { QUIZ_PAGE } from '../../config/constants.js';
</script>

<div class="page">
  <h1>Welcome to SvelteTrivia.com</h1>
  <button on:click={() => showPage(QUIZ_PAGE)}>Start Quiz</button>
</div>
