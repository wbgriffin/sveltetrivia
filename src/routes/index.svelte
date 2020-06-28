<script>
  import LandingPage from '../_components/LandingPage.svelte';
  import QuizPage from '../_components/QuizPage.svelte';
  import { QUIZ_PAGE } from '../../config/constants';
  import { pageStore } from '../_stores';
</script>

<svelte:head>
  <title>SvelteTrivia</title>
</svelte:head>

{#if $pageStore === QUIZ_PAGE}
  <QuizPage/>
{:else}
  <LandingPage/>
{/if}
