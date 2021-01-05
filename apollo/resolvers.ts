import {
  User,
  Organization,
  ExperienceInput,
  QualificationInput,
  Talent,
  UserInput,
  TalentUpdate,
  BasicInfo,
  Experience,
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
    basicInfo(talent: Talent): BasicInfo {
      return {
        id: talent.id,
        name: talent.name,
        fullName: helpers.getFullName(talent),
        gender: talent.gender,
        profilePic: talent.profilePic,
        profession: talent.profession,
        address: talent.address,
        description: talent.description,
        isBasicInfoComplete: helpers.isBasicInfoComplete(talent),
      };
    },
  },
  Experience: {
    async talent(experience: Experience): Promise<Talent> {
      return helpers.getTalentById(experience.talent);
    },
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
    async addUser(_: unknown, { input }: { input: UserInput }): Promise<User> {
      return await helpers.addUser(input);
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
