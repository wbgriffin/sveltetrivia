<script>
  export let question;

  import Answer from './Answer.svelte';
  import { shuffle } from '../utils';

  const answers = [
    question.CORRECT,
    question.INCORRECT_1,
    question.INCORRECT_2,
    question.INCORRECT_3
  ];
  shuffle(answers);

  const checkAnswer = event => {
    const chosenAnswerIndex = event.detail.index;
    if (question.CORRECT == answers[chosenAnswerIndex]) {
      console.log('CORRECT');
    } else {
      console.log('INCORRECT');
    }
  };
</script>

<style>
  .question {
    border: 1px solid #333;
    min-width: 320px;
    max-width: 600px;
    margin: 0 auto;
  }
  .question-text {
    padding: 20px;
    background-color: #333;
    color: #fff;
    font-size: 28px;
  }
</style>

<div class="question">
  <div class="question-text">
    {question.QUESTION}
  </div>
  {#each answers as answer, index}
    <Answer text={answer} {index} on:answer={checkAnswer} />
  {/each}
</div>
