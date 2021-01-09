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

export const computeNestedValue = (
  object: Record<string, unknown>,
  nestings: string[],
  newValue: unknown,
  //eslint-disable-next-line @typescript-eslint/ban-types
): object | undefined => {
  if (!nestings.length)
    throw new Error('invalid nesting. Supply a non-empty array of strings');
  if (nestings.length === 1) return { ...object, [nestings[0]]: newValue };
  return {
    [nestings[0]]: computeNestedValue(
      object[nestings[0]] as Record<string, unknown>,
      nestings.slice(1),
      newValue,
    ),
  };
};
