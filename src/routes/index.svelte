<script>
  import LandingPage from '../_components/LandingPage.svelte';
  import QuizPage from '../_components/QuizPage.svelte';
  import ExitPage from '../_components/ExitPage.svelte';
  import { QUIZ_PAGE, EXIT_PAGE } from '../../config/constants';
  import { pageStore } from '../_stores';
</script>

<svelte:head>
  <title>SvelteTrivia</title>
</svelte:head>

{#if $pageStore === QUIZ_PAGE}
  <QuizPage />
{:else if $pageStore === EXIT_PAGE}
  <ExitPage />
{:else}
  <LandingPage />
{/if}
