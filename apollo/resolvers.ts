import { models } from '../db';
import { Talent, User } from '../lib/types';

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
      return models.Talent.findMany().map((talent: Talent) => talent.id);
    },
  },
};

export default resolvers;
