import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

// const uri = '/api';

const httpLink = createHttpLink({
  uri: '/api',
});

// link needed?
// const link = ApolloLink.from([http]);

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,
  cache
});

export default client;
