import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import firebase from '../components/firebase'

const firebaseAuth = firebase.auth();

const getIdToken = async (): Promise<any> => {
  if (firebaseAuth.currentUser) {
    return await firebaseAuth.currentUser.getIdToken(true).then((idToken) => idToken).catch((err) => console.error(err))
  } else {
    return await Promise.resolve('no token')
  }
}

const httpLink = createHttpLink({
  uri: '/api/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const idToken = await getIdToken();
  console.log(idToken);
  return {
    headers: {
      ...headers,
      authorization: idToken ? `Bearer ${idToken}` : "",
    }
  }
});

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

export default client;