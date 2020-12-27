import {
  User,
  Organization,
  ExperienceInput,
  QualificationInput,
  Talent,
} from '../lib/types';
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
    fullName(talent: Talent): string {
      return `${talent.name.firstName} ${
        talent.name.middleName ? talent.name.middleName + ' ' : ''
      }${talent.name.lastName}`;
    },
  },
  Experience: {
    async employer(parent: ExperienceInput): Promise<Organization> {
      return await helpers.getOrganizationById(parent.employer);
    },
  },
  Qualification: {
    async institution(parent: QualificationInput): Promise<Organization> {
      return await helpers.getOrganizationById(parent.institution);
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
    async getTalentById(_: unknown, { id }: { id: string }) {
      return await helpers.getTalentById(id);
    },
  },
};

export default resolvers;
