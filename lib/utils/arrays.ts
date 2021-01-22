import { Experience, Qualification, Skill } from '../types';
import { BaseEntity } from '../types/common';

export const filterById = (
  arr: BaseEntity[],
  id?: string,
): BaseEntity | undefined => {
  if (!id) return;
  const itemsWithId = arr.filter((item) => item.id === id);
  if (itemsWithId.length > 0) return itemsWithId[0];
  throw new Error(`no array element with id ${id}`);
};

export const computeNestedValue = (
  object: Record<string, unknown>,
  nestings: string[],
  newValue: unknown,
  //eslint-disable-next-line @typescript-eslint/ban-types
): Record<string, unknown> => {
  if (!nestings.length)
    throw new Error('invalid nesting. Supply a non-empty array of strings');
  if (nestings.length === 1) {
    return { ...object, [nestings[0]]: newValue };
  }
  if (!object[nestings[0]]) throw new Error('no object');
  return {
    ...object,
    [nestings[0]]: computeNestedValue(
      object[nestings[0]] as Record<string, unknown>,
      nestings.slice(1),
      newValue,
    ),
  };
};

export const sortByFrom = (
  a: Experience | Qualification,
  b: Experience | Qualification,
): number => {
  const fromTimestampA = parseInt(a.duration?.from.timeStamp || '');
  const fromTimestampB = parseInt(b.duration?.from.timeStamp || '');
  if (Number.isNaN(fromTimestampA)) return -1;
  if (Number.isNaN(fromTimestampB)) return 1;
  return fromTimestampB - fromTimestampA;
};

export const sortSkill = (a: Skill, b: Skill): number => {
  if (a.level > b.level) return -1;
  if (a.level < b.level) return 1;
  return a.name < b.name ? -1 : 1;
};
