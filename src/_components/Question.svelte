<script>
  export let question, id;

  import Answer from './Answer.svelte';
  import { shuffle } from '../_utils';
  import { createEventDispatcher } from 'svelte';
  import { afterUpdate } from 'svelte';
  import { onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  const STATES = {
    INITIAL: 1,
    CHECKING: 2,
    FINAL: 3
  };
  let state = STATES.INITIAL;
  let correct = false;
  let questionId;

  let answers;

  function setState(s) {
    if (Object.values(STATES).includes(s)) {
      state = s;
      return state;
    }
    throw new Error('Invalid state: ' + s);
  }

  function next(correct) {
    dispatch('next', {
      correct: correct
    });
  }

  function checkAnswer(event) {
    setState(STATES.CHECKING);
    const chosenAnswerIndex = event.detail.index;
    if (question.answers[chosenAnswerIndex].isCorrect === true) {
      correct = true;
    }
    setTimeout(() => {
      setState(STATES.FINAL);
    }, 2000);
  }

  function refresh() {
    answers = shuffle(question.answers);
    setState(STATES.INITIAL);
    correct = false;
    questionId = id;
  }

  afterUpdate(() => {
    if (id !== questionId) {
      refresh();
    }
  });

  onMount(() => {
    questionId = id;
    refresh();
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
    {#if answers}
      {#each answers as answer, index}
        <Answer text={answer} {index} on:answer={checkAnswer} />
      {/each}
    {/if}
  </div>
{:else if state === STATES.CHECKING}
  <h3>checking answer. . .</h3>
{:else}
  <h2>answered</h2>
  <button on:click={() => next(correct)}>Next</button>
{/if}
