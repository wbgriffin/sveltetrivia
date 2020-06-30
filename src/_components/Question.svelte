<script>
  export let question;

  import Answer from './Answer.svelte';
  import { shuffle } from '../_utils';
  import { createEventDispatcher } from 'svelte';
  import { afterUpdate } from 'svelte';
  import { onMount } from 'svelte';

  const dispatch = createEventDispatcher();
  let answers;

  function next(correct) {
    dispatch('next', {
      correct: correct
    });
  }

  function checkAnswer(event) {
    const chosenAnswerIndex = event.detail.index;
    let correct = false;
    if (question.answers[chosenAnswerIndex].isCorrect === true) {
      correct = true;
    }
    next(correct);
  }

  function updateAnswers() {
    answers = question.answers;
    shuffle(answers);
  }

  afterUpdate(() => {
    updateAnswers();
  });

  onMount(() => {
    updateAnswers();
  });
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
  <div class="question-text">{question.text}</div>
  {#each answers as answer, index}
    <Answer text={answer.text} {index} on:answer={checkAnswer} />
  {/each}
</div>
