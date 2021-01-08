import { models } from '../db';
import {
  UserInput,
  User,
  Talent,
  Organization,
  TalentUpdate,
  Experience,
  TalentAssetEntry,
  BaseEntity,
  ExperienceEntry,
  TalentEntry,
} from '../lib/types';
import { nanoid } from 'nanoid';

const handleError = (e: Error): Error => {
  console.error(e); //eslint-disable-line no-console
  return e;
};

const getExperienceById = (
  talent: TalentEntry | undefined,
  id: string,
): ExperienceEntry | null => {
  if (!talent) return null;
  if (!talent.experiences.length) return null;
  const experiences = talent.experiences.filter(
    (experience) => experience.id === id,
  );
  if (!experiences.length) return null;
  return experiences[0];
};

export const getAllTalentIds = (): string[] =>
  models.Talent.findMany().map((talent: User) => talent.id);

export const getAllEmployerIds = (): string[] =>
  models.Employer.findMany().map((employer: User) => employer.id);

export const getAllUserIds = (): string[] => {
  const talents = getAllTalentIds.call(null);
  const employers = getAllEmployerIds();
  return talents.concat(employers);
};

export const getTalentById = async (id: string): Promise<Talent> => {
  return await models.Talent.findOne({ id });
};

export const getOrganizationById = async (
  id: string,
): Promise<Organization> => {
  return await models.Organization.findOne({ id });
};

export const addUser = async (input: UserInput): Promise<User> => {
  const type =
    input.type === 'TALENT'
      ? 'Talent'
      : input.type === 'EMPLOYER'
      ? 'Employer'
      : 'Agency';
  const oldUser = models[type].findOne({
    email: input.email,
  });
  if (oldUser) throw new Error('user already exists');
  return await models[type].createOne(input);
};

export const addExperience = async (
  input: Partial<ExperienceEntry> & TalentAssetEntry,
): Promise<ExperienceEntry | null> => {
  const talent = await models.Talent.findOne({ id: input.talent });
  if (!talent) throw new Error(`no user with id ${input.talent}`);
  const id = nanoid();
  const newExperience = { id, ...input };
  let updatedTalent: TalentEntry | undefined;
  try {
    updatedTalent = await models.Talent.updateOne(
      { id: talent.id },
      { experiences: [...talent.experiences, newExperience] },
    );
  } catch (e) {
    handleError(e);
  }
  return getExperienceById(updatedTalent, id);
};

export const updateExperience = async (
  input: Partial<ExperienceEntry> & TalentAssetEntry & BaseEntity,
): Promise<ExperienceEntry | null> => {
  let talent: TalentEntry | undefined;
  try {
    talent = await models.Talent.findOne({ id: input.talent });
  } catch (e) {
    handleError(e);
  }
  const oldExperience: ExperienceEntry | null = getExperienceById(
    talent,
    input.id,
  );
  if (!oldExperience) return null;
  const updatedExperience = {
    ...oldExperience,
    lineOfWork: input.lineOfWork,
    employer: input.employer,
    duration: input.duration,
    description: input.description,
  };
  const otherExperiences =
    talent?.experiences.filter((experience) => experience.id !== input.id) ||
    [];
  const updatedExperiences = [...otherExperiences, updatedExperience];
  try {
    await models.Talent.updateOne(
      { id: input.talent },
      { ...talent, experiences: updatedExperiences },
    );
  } catch (e) {
    handleError(e);
  }
  return updatedExperience;
};

export const updateTalent = async (input: TalentUpdate): Promise<Talent> => {
  const existingTalent = models.Talent.findOne({
    id: input.id,
  });
  if (!existingTalent)
    throw new Error(`no user with id ${input.id} in database`);
  let updatedTalent;
  const updatedAddress = { ...existingTalent.address, ...input.address };
  const updatedName = { ...existingTalent.name, ...input.name };
  const enrichedInput = {
    ...input,
    address: updatedAddress,
    name: updatedName,
  };
  try {
    updatedTalent = await models.Talent.updateOne(
      { id: input.id },
      enrichedInput,
    );
  } catch (err) {
    handleError(err);
  }
  return updatedTalent;
};

export const isBasicInfoComplete = (talent: Talent): boolean => {
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
};

export const getFullName = (talent: Talent): string => {
  return `${talent.name.firstName} ${
    talent.name.middleName ? talent.name.middleName + ' ' : ''
  }${talent.name.lastName}`;
};

export const isExperienceComplete = async (
  experience: Experience,
): Promise<boolean> => {
  return Boolean(
    experience.description &&
      experience.duration &&
      experience.employer &&
      experience.lineOfWork,
  );
};
