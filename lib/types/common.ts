import { I18n, TFunction } from 'next-i18next';

export type SupportedLanguage = 'de' | 'en';

export type AssetType = 'EXPERIENCES' | 'QUALIFICATIONS';

export type IsoCode = 'SRB' | 'GER' | 'CRO' | 'POL' | 'AUT';

export enum Gender {
  OTHER = 'OTHER',
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

export enum UserType {
  TALENT = 'TALENT',
  EMPLOYER = 'EMPLOYER',
  AGENCY = 'AGENCY',
}

export interface FullName {
  firstName?: string;
  middleName?: string;
  lastName: string;
}

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

export interface BaseUser {
  gender: Gender;
  name: FullName;
  email: string;
}

interface NewBaseUser extends BaseUser {
  password: string;
}

export type NewTalent = NewBaseUser;

export interface NewEmployer extends NewBaseUser {
  company: string;
}

export type SignupFormValues = (NewTalent | NewEmployer) & {
  type: UserType;
};
