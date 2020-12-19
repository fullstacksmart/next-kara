import { User, UserInput } from '../lib/types';
import * as helpers from './helpers';

const resolvers = {
  User: {
    __resolveType(user: User): string {
      return user.type === 'TALENT' ? 'Talent' : 'Employer';
    },
  },
  Talent: {
    type(): string {
      return 'TALENT';
    },
  },
  Query: {
    getAllTalentIds(): string[] {
      return helpers.getAllTalentIds();
    },
    getAllEmployerIds(): string[] {
      return helpers.getAllEmployerIds();
    },
    getAllUserIds(): string[] {
      return helpers.getAllUserIds();
    },
  },
  Mutation: {
    async addUser(_: unknown, { input }: { input: UserInput }): Promise<User> {
      return await helpers.addUser(input);
    },
  },
};

export default resolvers;
