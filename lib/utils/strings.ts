import { Duration } from '../../lib/types';
import { TFunction } from 'next-i18next';
import { Address, FullName } from '../types';

export const getTitleString = (
  title: string | string[] | undefined,
): string => {
  let titleString = 'Kara';
  if (title) {
    titleString += ' | ';
    if (Array.isArray(title)) {
      titleString += title.join(' | ');
    } else {
      titleString += title;
    }
  }
  return titleString;
};

export const getDisplayAddress = (address?: Address, t?: TFunction): string => {
  if (!address) return '';
  if (!t) return `${address.city}, ${address.isoCode}`;
  const translatedIso = address.isoCode ? t(`iso.${address.isoCode}`) : '';
  if (address.city && translatedIso) return `${address.city}, ${translatedIso}`;
  if (address.city) return address.city;
  return translatedIso;
};

// TODO decide whether to use helper function or resolver
export const getFullName = (name: FullName): string => {
  let fullName = '';
  if (name.firstName) fullName += name.firstName + ' ';
  if (name.middleName) fullName += name.middleName + ' ';
  if (name.lastName) fullName += name.lastName;
  return fullName;
};

const fromTo = (from: string, to: string): string => {
  return `${from} – ${to}`;
};

export const getFormatedDuration = (
  now: string,
  duration?: Duration,
): string | undefined => {
  if (!duration) return;
  const fromDate = new Date(duration.from.timeStamp);
  const fromMonth = fromDate.getMonth();
  const fromYear = fromDate.getFullYear();
  if (duration.to === undefined) return fromTo(`${fromMonth} ${fromYear}`, now);
  const toDate = new Date(duration.to.timeStamp);
  const toMonth = toDate.getMonth();
  const toYear = toDate.getFullYear();
  const fromString = fromMonth + fromYear !== toYear ? ` ${fromYear}` : '';
  const toString = `${toMonth} ${toYear}`;
  return fromTo(fromString, toString);
};
