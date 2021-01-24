import { ApolloServer } from 'apollo-server-micro';
import { getUserFromToken } from '../../lib/auth/firebaseAdmin';
import typeDefs from '../../apollo/typedefs';
import resolvers from '../../apollo/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  async context({ req }) {
    const auth = req.headers.authorization;
    const token = auth.replace('Bearer ', '');
    console.log('token received in server: ', token);
    try {
      const user = getUserFromToken(token);
      return { user };
    } catch (error) {
      console.error('error in server', error);
    }
  },
  playground: true,
  introspection: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
