<script>
  export let index, text;

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const chooseAnswer = (event) => {
    dispatch('answer', {
      index: index
    });
  };
</script>

<style>
  .answer {
    font-size: 24px;
    padding: 10px 20px;
    border: 1px solid #888;
    background-color: #eee;
  }
</style>

<div class="answer" on:click="{chooseAnswer}">
  {text}
</div>
