<script>
  import { showPage } from '../_utils';
  import { quizStore } from '../_stores';
  import { LANDING_PAGE, EXIT_PAGE } from '../../config/constants';
  import { SyncLoader } from 'svelte-loading-spinners';
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

<style>
  .quizpage-container {
    margin: 20px;
    text-align: center;
  }
  .loader {
    width: 200px;
    margin: 0 auto;
    text-align: center;
  }
</style>

<div class="quizpage-container">
  {#await loadQuiz()}
    <div class="loader">
      <SyncLoader size="200" unit="px" />
    </div>
  {:then quiz}
    <Question question={quiz.question(questionIndex)} id={questionIndex} on:next={next} />
  {:catch error}
    <span>Error loading quiz!</span>
  {/await}
</div>
