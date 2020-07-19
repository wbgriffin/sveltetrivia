<script>
  import { showPage } from '../_utils';
  import { quizStore } from '../_stores';
  import { LANDING_PAGE, EXIT_PAGE } from '../../config/constants';
  import { SyncLoader } from 'svelte-loading-spinners';
  import Question from './Question.svelte';
  import Quiz from '../_models/Quiz';
  import ProgressBar from '@okrad/svelte-progressbar';

  let quiz;
  let questionIndex;
  $: questionIndex = 0;

  let bar;

  function updateProgress() {
    bar.updatePerc(quiz.progress);
  }

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
    updateProgress();
  }
</script>

<style>
  .loader {
    width: 200px;
    margin: 0 auto;
    text-align: center;
  }
  .spacer-20 {
    height: 20px;
  }
</style>

<div class="quiz-page">
  {#await loadQuiz()}
    <div class="loader">
      <SyncLoader size="200" unit="px" />
    </div>
  {:then quiz}
    <ProgressBar series={[quiz.progress]} bind:this={bar} width="250px" height="14" />
    <div class="spacer-20" />
    <Question question={quiz.question(questionIndex)} id={questionIndex} on:next={next} />
  {:catch error}
    <span>Error loading quiz!</span>
  {/await}
</div>
