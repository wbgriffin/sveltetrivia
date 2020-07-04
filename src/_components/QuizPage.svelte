<script>
  import { showPage } from '../_utils';
  import { quizStore } from '../_stores'
  import { LANDING_PAGE, EXIT_PAGE } from '../../config/constants';
  import Question from './Question.svelte';
  import Quiz from '../_models/Quiz';

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
    const QuizInstance = new Quiz();
    QuizInstance.hydrate(json);
    return QuizInstance;
  }

  function next(event) {
    // end of quiz
    if (quiz.next(event.detail.correct) === false) {
      quizStore.set(quiz);
      showPage(EXIT_PAGE);
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
  <Question question={quiz.question(questionIndex)} on:next={next} />
{:catch error}
  <span>Error loading quiz!</span>
{/await}
