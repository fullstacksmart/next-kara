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

export const getShortName = (name: FullName): string => {
  let shortName = '';
  if (name.firstName) shortName += name.firstName.trim().charAt(0) + '. ';
  if (name.middleName) shortName += name.middleName.trim().charAt(0) + '. ';
  if (name.lastName) shortName += name.lastName;
  return shortName;
};

const fromTo = (from: string, to: string): string => {
  if (from === '') return to;
  return `${from} – ${to}`;
};

// TODO use correct month names
const getLocalMonth = (date: Date, locale?: string, spec = 'short'): string => {
  return date.toLocaleString(locale, { month: spec });
};
export const getFormatedDuration = (
  now: string,
  duration?: Duration,
): string | undefined => {
  if (!duration) return;
  const fromDate = new Date(parseInt(duration.from.timeStamp));
  const fromMonth = getLocalMonth(fromDate);
  const fromYear = fromDate.getFullYear();
  if (!duration.to.timeStamp) return fromTo(`${fromMonth} ${fromYear}`, now);
  const toDate = new Date(parseInt(duration.to.timeStamp));
  const toMonth = getLocalMonth(toDate);
  const toYear = toDate.getFullYear();
  const fromString =
    fromYear === toYear
      ? fromMonth === toMonth
        ? ''
        : fromMonth
      : `${fromMonth} ${fromYear}`;
  const toString = `${toMonth} ${toYear}`;
  return fromTo(fromString, toString);
};
