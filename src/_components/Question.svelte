<script>
  export let question, id;

  import Answer from './Answer.svelte';
  import { createEventDispatcher } from 'svelte';
  import { afterUpdate } from 'svelte';

  const dispatch = createEventDispatcher();

  const STATES = {
    INITIAL: 1,
    CHECKING: 2,
    FINAL: 3
  };
  let state = STATES.INITIAL;
  let correct = false;
  let questionId;

  function setState(s) {
    if (Object.values(STATES).includes(s)) {
      state = s;
      return state;
    }
    throw new Error('Invalid state: ' + s);
  }

  function refreshState() {
    setState(STATES.INITIAL);
    correct = false;
    questionId = id;
  }

  function next(correct) {
    dispatch('next', {
      correct: correct
    });
  }

  function checkAnswer(event) {
    setState(STATES.CHECKING);
    const chosenAnswerIndex = event.detail.index;
    if (question.isCorrectAnswer(chosenAnswerIndex)) {
      correct = true;
    }
    setTimeout(() => {
      setState(STATES.FINAL);
    }, 2000);
  }

  afterUpdate(() => {
    if (id !== questionId) {
      refreshState();
    }
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

{#if state === STATES.INITIAL}
  <div class="question">
    <div class="question-text">{question.text}</div>
    {#each question.answers as answer, index}
      <Answer text={answer} {index} on:answer={checkAnswer} />
    {/each}
  </div>
{:else if state === STATES.CHECKING}
  <h3>checking answer. . .</h3>
{:else}
  <h2>answered</h2>
  <button on:click={() => next(correct)}>Next</button>
{/if}
