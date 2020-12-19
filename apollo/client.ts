import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  NormalizedCacheObject,
} from '@apollo/client';

const http = new HttpLink({ uri: 'http://localhost:4000/' });

// link needed?
const link = ApolloLink.from([http]);

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link,
  cache,
});

export default client;
