import { writable } from 'svelte/store';
import { LANDING_PAGE } from '../config/constants';

export const pageStore = writable(LANDING_PAGE);
export const quizStore = writable(null);
