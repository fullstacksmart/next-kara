import {
  User,
  Organization,
  ExperienceInput,
  QualificationInput,
  Talent,
  UserInput,
  TalentUpdate,
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
    isBasicInfoComplete(talent: Talent): boolean {
      return Boolean(
        talent.name?.lastName &&
          talent.name?.lastName !== '' &&
          talent.address?.city !== '' &&
          talent.address?.city &&
          talent.address?.isoCode &&
          talent.address?.isoCode !== null &&
          talent.description &&
          talent.description !== '' &&
          talent.profilePic &&
          talent.profilePic !== '',
      );
    },
  },
  Experience: {
    async employer(experience: ExperienceInput): Promise<Organization> {
      return await helpers.getOrganizationById(experience.employer);
    },
  },
  Qualification: {
    async institution(
      qualification: QualificationInput,
    ): Promise<Organization> {
      return await helpers.getOrganizationById(qualification.institution);
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
    async getTalentById(_: unknown, { id }: { id: string }): Promise<Talent> {
      return await helpers.getTalentById(id);
    },
  },
  Mutation: {
    async signup(_: unknown, { input }: { input: UserInput }, {createToken}): Promise<User> {
      console.log('hi from mutation')
      return await helpers.signup(input, createToken);
    },
    async updateTalent(
      _: unknown,
      { input }: { input: TalentUpdate },
    ): Promise<Talent> {
      return await helpers.updateTalent(input);
    },
  },
};

export default resolvers;
