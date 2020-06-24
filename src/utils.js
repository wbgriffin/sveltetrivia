import { pageStore } from './stores';

export const showPage = (page) => {
  pageStore.set(page);
};
