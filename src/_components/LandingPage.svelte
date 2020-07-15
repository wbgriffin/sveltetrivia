<script>
  import { showPage } from '../_utils';
  import { QUIZ_PAGE } from '../../config/constants.js';
</script>

<style>
  .page {
    text-align: center;
  }

  button {
    padding: 5px 8px;
    margin-top:10px;
    font-size: 18px;
  }

  h1 {
    margin: 15px 0;
    font-weight: 700;
  }
</style>

<div class="page">
  <h1>Test Your Svelte Knowledge!</h1>
  <button on:click={() => showPage(QUIZ_PAGE)}>Start Quiz</button>

</div>
