import { I18n, TFunction } from 'next-i18next';

export type SupportedLanguage = 'GERMAN' | 'ENGLISH';

export type IsoCode = 'SRB' | 'DEU' | 'CRO' | 'POL' | 'AUT';

export interface PageProps {
  t: TFunction;
  i18n: I18n;
}

export enum ModalType {
  NONE,
  BASIC_INFO,
  EXPERIENCE,
  QUALIFICATION,
  LANGUAGE,
}

export interface BaseEntity {
  id: string;
}
export interface Address {
  street?: string;
  streetNo?: string;
  city?: string;
  postalCode?: string;
  isoCode?: IsoCode;
}
