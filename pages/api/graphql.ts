import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '../../apollo/typedefs';

const server = new ApolloServer({
  typeDefs,
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
