import { makeVar } from '@apollo/client';
import { FirebaseError } from 'lib/types/auth';
import { ReactiveVar } from '@apollo/react-hooks';
import { InMemoryCache } from '@apollo/client';

export const layoutVar: ReactiveVar<{
  title: string;
  heading: string;
  error: FirebaseError | null;
}> = makeVar({ title: '', heading: '', error: null as FirebaseError | null });

const cache = new InMemoryCache();

export default cache;
