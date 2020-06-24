<script>
  import LandingPage from '../pages/LandingPage.svelte';
  import QuizPage from '../pages/QuizPage.svelte';
  import {QUIZ_PAGE} from '../../config/constants';
  import { pageStore } from '../stores';
</script>

<svelte:head>
  <title>SvelteTrivia</title>
</svelte:head>

{#if $pageStore === QUIZ_PAGE}
  <QuizPage/>
{:else}
  <LandingPage/>
{/if}
