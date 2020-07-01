<script>
  import { showPage } from '../_utils';
  import { LANDING_PAGE } from '../../config/constants';
  import Question from './Question.svelte';

  let quiz;
  let questionIndex;
  $: questionIndex = 0;

  async function loadQuiz() {
    return fetch('/quiz')
      .then((response) => response.json())
      .then((json) => (quiz = initQuiz(json)))
      .catch((e) => console.log(e));
  }

  function initQuiz(json) {
    json.stats = {
      played: 0,
      correct: 0
    };
    return json;
  }

  function next(event) {
    quiz.stats.played += 1;
    if (event.detail.correct === true) {
      quiz.stats.correct += 1;
    }
    if (questionIndex === quiz.questions.length - 1) {
      return;
    }
    questionIndex += 1;
  }
</script>

<h1>Quiz Page</h1>
<button on:click={() => showPage(LANDING_PAGE)}>GO BACK</button>
<hr />
{#await loadQuiz()}
  <span>Loading quiz . . . .</span>
{:then quiz}
  <Question question={quiz.questions[questionIndex]} on:next={next} />
{:catch error}
  <span>Error loading quiz!</span>
{/await}
