import {
  User,
  Organization,
  ExperienceEntry,
  QualificationEntry,
  Talent,
  TalentAssetEntry,
  UserInput,
  TalentUpdate,
  BasicInfo,
  Experience,
  BaseEntity,
  Qualification,
  TalentInput,
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
    percentageComplete(talent: Talent): number {
      return helpers.percentageComplete(talent);
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
    async talent(qualification: QualificationEntry): Promise<Talent> {
      return helpers.getTalentById(qualification.talent);
    },
    async institution(
      qualification: QualificationEntry,
    ): Promise<Organization> {
      return await helpers.getOrganizationById(qualification.institution);
    },
    async isComplete(qualification: Qualification): Promise<boolean> {
      return await helpers.isQualificationComplete(qualification);
    },
  },

  Query: {
    async getAllTalentIds(): Promise<string[]> {
      return (await helpers.getAllTalentIds()) || [];
    },
    getAllEmployerIds(): string[] {
      return helpers.getAllEmployerIds();
    },
    getAllUserIds(): Promise<string[]> {
      return helpers.getAllUserIds();
    },
    async getTalentById(_: unknown, { id }: { id: string }): Promise<Talent> {
      return await helpers.getTalentById(id);
    },
  },
  Mutation: {
    async addTalent(
      _: unknown,
      { input }: { input: TalentInput },
    ): Promise<Talent> {
      return await helpers.addTalent(input);
    },
    // TODO @all create correct resolver and helper once types are there
    async addEmployer(
      _: unknown,
      { input }: { input: UserInput },
    ): Promise<User> {
      return await helpers.addUser(input);
    },

    async updateTalent(
      _: unknown,
      { input }: { input: TalentUpdate },
    ): Promise<Talent> {
      return await helpers.updateTalent(input);
    },
    async addExperience(
      _: unknown,
      { input }: { input: Partial<Experience> & TalentAssetEntry },
    ): Promise<Talent | null> {
      return await helpers.addItem('EXPERIENCES', input);
    },
    async updateExperience(
      _: unknown,
      { input }: { input: Partial<Experience> & TalentAssetEntry & BaseEntity },
    ): Promise<Talent | null> {
      return await helpers.updateExperience(input);
    },
    async deleteExperience(
      _: unknown,
      { input }: { input: { talent: string; id: string } },
    ): Promise<Talent | null> {
      return await helpers.deleteItem('EXPERIENCES', input);
    },
    async addQualification(
      _: unknown,
      { input }: { input: Partial<Qualification> & TalentAssetEntry },
    ): Promise<Talent | null> {
      return await helpers.addItem('QUALIFICATIONS', input);
    },
    async updateQualification(
      _: unknown,
      {
        input,
      }: { input: Partial<Qualification> & TalentAssetEntry & BaseEntity },
    ): Promise<Talent | null> {
      return await helpers.updateQualification(input);
    },
    async deleteQualification(
      _: unknown,
      { input }: { input: { talent: string; id: string } },
    ): Promise<Talent | null> {
      return await helpers.deleteItem('QUALIFICATIONS', input);
    },
  },
};

export default resolvers;
