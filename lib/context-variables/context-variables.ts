import { makeVar } from '@apollo/client';

export const layoutVar = makeVar({
  title: '',
  heading: '',
  error: null,
});
