import { User, FullName } from './index';

type ProfessionType =
  | 'NURSE'
  | 'DOCTOR'
  | 'OTHER_MEDICAL'
  | 'OTHER_NON_MEDICAL';

type ApprobationStatus = 'ONGOING' | 'APPROVED' | 'DENIED';

type LanguageSkillLevel =
  | 'BASIC'
  | 'PROFICIENT'
  | 'BUSINESS_LEVEL'
  | 'MOTHER_TONGUE';

type OtherSKillLevel = 'BASIC' | 'PROFICIENT' | 'EXPERT' | 'MASTER';

type FederalState =
  | 'BW'
  | 'BY'
  | 'BE'
  | 'BB'
  | 'HB'
  | 'HH'
  | 'HE'
  | 'NI'
  | 'MV'
  | 'NW'
  | 'RP'
  | 'SL'
  | 'SN'
  | 'ST'
  | 'SH'
  | 'TH'
  | 'OTHER';

interface Address {
  street?: string;
  streetNo?: string;
  city?: string;
  postalCode?: string;
  isoCode?: string;
}

interface Date {
  timeStamp: string;
}

interface Duration {
  from: Date;
  to: Date;
}

export interface Organization {
  id: string;
  name: string;
  address: Address;
}

export interface Talent extends User {
  id: string;
  email: string;
  password: string;
  name: FullName;
  profession: ProfessionType;
  address: Address;
  description: string;
  experiences: Experience[];
  qualifications: Qualification[];
  approbations: Approbation[];
  documents: Document[];
  languages: LanguageSkill[];
  otherSkills: OtherSkill[];
}

type Experience = {
  id: string;
  talent: string;
  title: string;
  lineOfWork: ProfessionType;
  employer?: Organization;
  duration?: Duration;
  description?: string;
};

export type ExperienceInput = {
  id: string;
  talent: string;
  title: string;
  lineOfWork: ProfessionType;
  employer: string;
  duration?: Duration;
  description?: string;
};

type Qualification = {
  id: string;
  talent: string;
  fieldOfEducation: string;
  degree: string;
  institution: Organization;
  duration: Duration;
  description: string;
};

export type QualificationInput = {
  id: string;
  talent: string;
  fieldOfEducation: string;
  degree: string;
  institution: string;
  duration: Duration;
  description: string;
};

type Approbation = {
  id: string;
  talent: string;
  status: ApprobationStatus;
  state: FederalState;
};

type Document = {
  id: string;
  talent: string;
  name: string;
  description: string;
  url: string;
};

type LanguageSkill = {
  talent: string;
  language: string;
  level: LanguageSkillLevel;
};

type OtherSkill = {
  id: string;
  talent: string;
  name: string;
  level: OtherSKillLevel;
  description: string;
};
