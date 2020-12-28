import { models } from '../db';
import {
  UserInput,
  User,
  Talent,
  Organization,
  TalentUpdate,
} from '../lib/types';

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
    console.error(err);
  }
  return updatedTalent;
};
