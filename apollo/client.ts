import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  makeVar,
} from '@apollo/client';
import { SupportedLanguage } from '../lib/types';

const uri = '/api/graphql';
export const currentLanguageVar = makeVar<SupportedLanguage>('GERMAN');

// link needed?
// const link = ApolloLink.from([http]);

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri,
});

export default client;
