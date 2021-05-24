import { makeVar } from '@apollo/client';
import { FirebaseError } from 'lib/types/auth';
import { ReactiveVar } from '@apollo/react-hooks';
import { InMemoryCache } from '@apollo/client';

export const layoutTitleVar: ReactiveVar<string> = makeVar('');

export const layoutHeadingVar: ReactiveVar<string> = makeVar('');

export const layoutErrorVar: ReactiveVar<FirebaseError | null> = makeVar(
  null as FirebaseError | null,
);

const cache = new InMemoryCache();

export default cache;
