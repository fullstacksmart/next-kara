import { I18n, TFunction } from 'next-i18next';

export type SupportedLanguage = 'de' | 'en';

export type AssetType = 'EXPERIENCES' | 'QUALIFICATIONS';

export type IsoCode = 'SRB' | 'DEU' | 'CRO' | 'POL' | 'AUT';

export interface ComponentWithT {
  t: TFunction;
}

export interface PageProps extends ComponentWithT {
  i18n: I18n;
}

export enum ModalType {
  NONE,
  BASIC_INFO,
  EXPERIENCE,
  QUALIFICATION,
  LANGUAGE,
  OTHERSKILL,
  APPROBATION,
}

export interface BaseEntity {
  id: string;
}
export interface Address {
  street?: string;
  streetNo?: string;
  city?: string;
  postalCode?: string;
  isoCode?: IsoCode | '';
}
