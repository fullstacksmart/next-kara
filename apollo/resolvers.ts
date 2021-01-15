import {
  User,
  Organization,
  ExperienceEntry,
  QualificationEntry,
  Talent,
  Employer,
  TalentAssetEntry,
  UserInput,
  TalentUpdate,
  EmployerUpdate,
  BasicInfo,
  BasicInfoEmployer,
  Experience,
  BaseEntity,
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
  Employer: {
    type(): string {
      return 'EMPLOYER';
    },
    basicInfoEmployer(employer: Employer): BasicInfoEmployer {
      return {
        id: employer.id,
        name: employer.name,
        companyName: employer.companyName,
        fullName: helpers.getFullNameEmployer(employer),
        gender: employer.gender,
        profilePic: employer.profilePic,
        address: employer.address,
        description: employer.description,
        website: employer.website,
        // add type and sector
        isBasicInfoComplete: helpers.isBasicInfoEmployerComplete(employer),
      };
    },
    fullName(employer: Employer): string {
      return `${employer.name.firstName} ${
        employer.name.middleName ? employer.name.middleName + ' ' : ''
      }${employer.name.lastName}`;
    },
  },
  Experience: {
    async talent(experience: ExperienceEntry): Promise<Talent> {
      return helpers.getTalentById(experience.talent);
    },
    async employer(experience: ExperienceEntry): Promise<Organization | null> {
      if (!experience.employer) return null;
      return await helpers.getOrganizationById(experience.employer);
    },
    async isComplete(experience: Experience): Promise<boolean> {
      return await helpers.isExperienceComplete(experience);
    },
  },
  Qualification: {
    async institution(
      qualification: QualificationEntry,
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
    async getEmployerById(
      _: unknown,
      { id }: { id: string },
    ): Promise<Employer> {
      return await helpers.getEmployerById(id);
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
    async updateEmployer(
      _: unknown,
      { input }: { input: EmployerUpdate },
    ): Promise<Employer> {
      return await helpers.updateEmployer(input);
    },
    async addExperience(
      _: unknown,
      { input }: { input: Partial<Experience> & TalentAssetEntry },
    ): Promise<ExperienceEntry | null> {
      return await helpers.addExperience(input);
    },
    async updateExperience(
      _: unknown,
      { input }: { input: Partial<Experience> & TalentAssetEntry & BaseEntity },
    ): Promise<ExperienceEntry | null> {
      return await helpers.updateExperience(input);
    },
  },
};

export default resolvers;
