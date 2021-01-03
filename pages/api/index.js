import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '../../apollo/typedefs';
import resolvers from '../../apollo/resolvers';
import { createToken, getUserFromToken } from './auth';
import db from '../../db';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    const token = req.headers.authorization;
    const user = getUserFromToken(token);
    return { ...db, user, createToken };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api' });
