<script>
  import LandingPage from '../_components/LandingPage.svelte';
  import QuizPage from '../_components/QuizPage.svelte';
  import ExitPage from '../_components/ExitPage.svelte';
  import { QUIZ_PAGE, EXIT_PAGE } from '../../config/constants';
  import { pageStore } from '../_stores';
</script>

<style>
  :global(body) {
    font-family: Overpass, 'Open Sans', Arial;
    color: #4a4b55;
  }
  header {
    background-color: #ff3f02;
    color: #fff;
    font-size: 34px;
    font-weight: 900;
    letter-spacing: -2px;
    text-align: center;
  }
</style>

<svelte:head>
  <title>SvelteTrivia</title>
</svelte:head>

<header>
  <nav>SVELTETRIVIA</nav>
</header>

{#if $pageStore === QUIZ_PAGE}
  <QuizPage />
{:else if $pageStore === EXIT_PAGE}
  <ExitPage />
{:else}
  <LandingPage />
{/if}
