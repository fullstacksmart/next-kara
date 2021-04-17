import { ApolloServer } from 'apollo-server-micro';
import { getUserFromToken } from '../../lib/auth/firebaseAdmin';
import typeDefs from '../../apollo/typedefs';
import resolvers from '../../apollo/resolvers';
import { getTalentById } from '../../apollo/helpers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  async context({ req }) {
    if (process.env.DEV_USER_UID) {
      const user = await getTalentById(process.env.DEV_USER_UID);
      return { user };
    } else {
      const auth = req.headers.authorization;
      const token = auth.replace('Bearer ', '');
      try {
        const user = getUserFromToken(token);
        return { user };
      } catch (error) {
        console.error('error in server', error); //eslint-disable-line no-console
      }
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
