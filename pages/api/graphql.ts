import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '../../apollo/typedefs';
import resolvers from '../../apollo/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context(ctx) {
    return ctx;
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
