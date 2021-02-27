import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { auth } from '../lib/auth/firebase';

const getIdToken = async (): Promise<string | void> => {
  if (auth.currentUser) {
    return await auth.currentUser
      .getIdToken(true)
      .catch((error) => console.error(error)); //eslint-disable-line no-console
  } else {
    return Promise.resolve('no token');
  }
};

const httpLink = createHttpLink({
  uri: '/api/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const idToken = await getIdToken();
  return {
    headers: {
      ...headers,
      authorization: idToken ? `Bearer ${idToken}` : '',
    },
  };
});

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
