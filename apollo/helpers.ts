import { models } from '../db';
import {
  UserInput,
  User,
  Talent,
  Employer,
  Organization,
  TalentUpdate,
  EmployerUpdate,
  Experience,
  TalentAssetEntry,
  BaseEntity,
  Qualification,
  AssetType,
} from '../lib/types';
import { nanoid } from 'nanoid';
import { filterById } from '../lib/utils/arrays';
import { ApolloError } from '@apollo/client';

const handleError = (e: Error): Error => {
  console.error(e); //eslint-disable-line no-console
  return e;
};

//eslint-disable-next-line @typescript-eslint/ban-types
const updateObject = (object: object, update: object | undefined): object => {
  if (!update) return object;
  return { ...object, ...update };
};

const getExperienceById = (
  talent: Talent | undefined,
  id: string,
): Experience | null => {
  if (!talent) return null;
  if (!talent.experiences.length) return null;
  return (filterById(talent.experiences, id) as Experience | undefined) || null;
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
  let talent: Talent | null = null;
  try {
    talent = await models.Talent.findOne({ id });
  } catch (e) {
    handleError(e);
  }
  if (!talent)
    throw new ApolloError({
      errorMessage: `404: No user with id ${id} found in db`,
    });
  return talent;
};

export const getEmployerById = async (id: string): Promise<Employer> => {
  return await models.Employer.findOne({ id });
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

const getOrCreateOrganizationId = async (
  organization: Organization | undefined,
): Promise<string | undefined> => {
  try {
    const existingEntry = await models.Organization.findOne(organization);
    if (existingEntry) return existingEntry.id;
    const newOrganization = await models.Organization.createOne(organization);
    return newOrganization.id;
  } catch (e) {
    handleError(e);
  }
};

export const addItem = async (
  type: AssetType,
  input: TalentAssetEntry & (Partial<Experience> | Partial<Qualification>),
): Promise<Talent | null> => {
  const talent = await models.Talent.findOne({ id: input.talent });
  if (!talent) throw new Error(`no user with id ${input.talent}`);
  const id = nanoid();
  const organizationString =
    type === 'EXPERIENCES' ? 'employer' : 'institution';
  const organization =
    'employer' in input
      ? input.employer
      : 'institution' in input
      ? input.institution
      : undefined;
  const newExperience = {
    id,
    ...input,
    [organizationString]: await getOrCreateOrganizationId(organization),
  };
  let updatedTalent: Talent | undefined;
  try {
    updatedTalent = await models.Talent.updateOne(
      { id: talent.id },
      { [type.toLowerCase()]: [...talent[type.toLowerCase()], newExperience] },
    );
  } catch (e) {
    handleError(e);
  }
  return updatedTalent || null;
};

export const updateQualification = async (
  input: Partial<Qualification> & TalentAssetEntry & BaseEntity,
): Promise<Talent | null> => {
  let talent: Talent | undefined;
  try {
    talent = await models.Talent.findOne({ id: input.talent });
  } catch (e) {
    handleError(e);
  }
  if (!talent) return null;
  const oldQualification: BaseEntity | undefined = filterById(
    talent.qualifications,
    input.id,
  );
  if (!oldQualification) return null;
  const updatedQualification = {
    ...oldQualification,
    degree: input.degree,
    fieldOfEducation: input.fieldOfEducation,
    institution: await getOrCreateOrganizationId(input.institution),
    duration: input.duration,
    description: input.description,
  };
  const otherQualifications =
    talent?.qualifications.filter(
      (qualification) => qualification.id !== input.id,
    ) || [];
  const updatedQualifications = [
    ...otherQualifications,
    updatedQualification,
  ] as Qualification[];
  try {
    talent = await models.Talent.updateOne(
      { id: input.talent },
      { ...talent, qualifications: updatedQualifications },
    );
  } catch (e) {
    handleError(e);
  }
  return talent || null;
};

export const updateExperience = async (
  input: Partial<Experience> & TalentAssetEntry & BaseEntity,
): Promise<Talent | null> => {
  let talent: Talent | undefined;
  try {
    talent = await models.Talent.findOne({ id: input.talent });
  } catch (e) {
    handleError(e);
  }
  const oldExperience: Experience | null = getExperienceById(talent, input.id);
  if (!oldExperience) return null;
  const updatedExperience = {
    ...oldExperience,
    lineOfWork: input.lineOfWork,
    employer: await getOrCreateOrganizationId(input.employer),
    duration: input.duration,
    description: input.description,
  };
  const otherExperiences =
    talent?.experiences.filter((experience) => experience.id !== input.id) ||
    [];
  const updatedExperiences = [
    ...otherExperiences,
    updatedExperience,
  ] as Experience[];
  try {
    talent = await models.Talent.updateOne(
      { id: input.talent },
      { ...talent, experiences: updatedExperiences },
    );
  } catch (e) {
    handleError(e);
  }
  return talent || null;
};

export const updateTalent = async (input: TalentUpdate): Promise<Talent> => {
  const existingTalent = models.Talent.findOne({
    id: input.id,
  });
  if (!existingTalent)
    throw new Error(`no user with id ${input.id} in database`);
  let updatedTalent;
  // const updatedAddress = { ...existingTalent.address, ...input.address };
  // const updatedName = { ...existingTalent.name, ...input.name };
  const enrichedInput = {
    ...input,
    address: updateObject(existingTalent.address, input.address),
    name: updateObject(existingTalent.name, input.name),
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

export const updateEmployer = async (
  input: EmployerUpdate,
): Promise<Employer> => {
  const existingEmployer = models.Employer.findOne({
    id: input.id,
  });
  if (!existingEmployer)
    throw new Error(`no user with id ${input.id} in database`);
  let updatedEmployer;
  // const updatedAddress = { ...existingTalent.address, ...input.address };
  // const updatedName = { ...existingTalent.name, ...input.name };
  const enrichedInput = {
    ...input,
    address: updateObject(existingEmployer.address, input.address),
    name: updateObject(existingEmployer.name, input.name),
  };
  try {
    updatedEmployer = await models.Employer.updateOne(
      { id: input.id },
      enrichedInput,
    );
  } catch (err) {
    handleError(err);
  }
  return updatedEmployer;
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

export const isBasicInfoEmployerComplete = (employer: Employer): boolean => {
  return Boolean(
    employer.companyName &&
      employer.companyName !== '' &&
      employer.name?.lastName &&
      employer.name?.lastName !== '' &&
      employer.address?.city !== '' &&
      employer.address?.city &&
      employer.address?.isoCode &&
      employer.address?.isoCode !== null &&
      employer.description &&
      employer.description !== '' &&
      employer.profilePic &&
      employer.profilePic !== '',
  );
};

export const getFullName = (user: Talent | Employer): string => {
  return `${user.name.firstName} ${
    user.name.middleName ? user.name.middleName + ' ' : ''
  }${user.name.lastName}`;
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

export const isQualificationComplete = (
  qualification: Qualification,
): boolean => {
  return Boolean(
    qualification.description &&
      qualification.duration &&
      qualification.institution &&
      qualification.fieldOfEducation,
  );
};

export const deleteItem = async (
  type: AssetType,
  {
    talent: talentId,
    id,
  }: {
    talent: string;
    id: string;
  },
): Promise<Talent | null> => {
  let talent: Talent | null = null;
  try {
    const oldTalent: Talent = await models.Talent.findOne({ id: talentId });
    const newItems = (oldTalent?.[
      type.toLowerCase() as keyof Talent
    ] as BaseEntity[]).filter((item) => item.id !== id);
    talent = await models.Talent.updateOne(
      { id: talentId },
      { [type.toLowerCase()]: newItems },
    );
  } catch (e) {
    handleError(e);
  }
  return talent;
};
