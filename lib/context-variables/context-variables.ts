import { makeVar } from '@apollo/client';
import { FirebaseError } from 'lib/types/auth';
import { ReactiveVar } from '@apollo/react-hooks';

// ignoring because reactive variable needs initial state
// eslint-disable-next-line
// @ts-ignore
export const layoutError: ReactiveVar<FirebaseError | null> = makeVar(null);
