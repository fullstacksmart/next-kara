import { models } from '../db';
import { NewUser, User } from '../lib/types';

export const getAllTalentIds = (): string[] =>
  models.Talent.findMany().map((talent: User) => talent.id);

export const getAllEmployerIds = (): string[] =>
  models.Employer.findMany().map((employer: User) => employer.id);

export const getAllUserIds = (): string[] => {
  const talents = getAllTalentIds.call(null);
  const employers = getAllEmployerIds();
  return talents.concat(employers);
};

export const addUser = async (input: NewUser): Promise<User> => {
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
