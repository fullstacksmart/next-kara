import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

const uri = '/api/graphql';


// link needed?
// const link = ApolloLink.from([http]);

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri,
});

export default client;
