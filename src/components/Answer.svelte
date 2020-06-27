<script>
  export let index, text;

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function chooseAnswer() {
    dispatch('answer', {
      index: index
    });
  }
</script>

<style>
  .answer {
    font-size: 24px;
    padding: 10px 20px;
    border: 1px solid #888;
    background-color: #eee;
  }
  .answer:hover {
    background-color: #aaa;
    cursor: pointer;
  }
</style>

<div class="answer" on:click="{chooseAnswer}">
  {text}
</div>
