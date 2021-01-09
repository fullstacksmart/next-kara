import { BaseEntity } from '../types/common';

export const filterById = (
  arr: BaseEntity[],
  id?: string,
): BaseEntity | undefined => {
  if (!id) return;
  const itemsWithId = arr.filter((experience) => experience.id === id);
  if (itemsWithId.length > 0) return itemsWithId[0];
  throw new Error(`no array element with id ${id}`);
};
