import { User, FullName, BaseEntity, Address, Gender } from './index';

export type Profession =
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

interface TalentAsset extends BaseEntity {
  talent: string;
}

interface Date {
  timeStamp: string;
}

interface Duration {
  from: Date;
  to: Date;
}

export interface Organization extends BaseEntity {
  name: string;
  address: Address;
}

export interface Talent extends User {
  profilePic: string;
  profession: Profession;
  address: Address;
  description: string;
  experiences: Experience[];
  qualifications: Qualification[];
  approbations: Approbation[];
  documents: Document[];
  languages: LanguageSkill[];
  otherSkills: OtherSkill[];
  isBasicInfoComplete: boolean;
}

interface Experience extends TalentAsset {
  title: string;
  lineOfWork: Profession;
  employer?: Organization;
  duration?: Duration;
  description?: string;
}

export interface ExperienceInput extends TalentAsset {
  title: string;
  lineOfWork: Profession;
  employer: string;
  duration?: Duration;
  description?: string;
}

interface Qualification extends TalentAsset {
  fieldOfEducation: string;
  degree: string;
  institution: Organization;
  duration: Duration;
  description: string;
}

export interface QualificationInput extends TalentAsset {
  fieldOfEducation: string;
  degree: string;
  institution: string;
  duration: Duration;
  description: string;
}

interface Approbation extends TalentAsset {
  status: ApprobationStatus;
  state: FederalState;
}

interface Document extends TalentAsset {
  name: string;
  description: string;
  url: string;
}

interface LanguageSkill extends TalentAsset {
  language: string;
  level: LanguageSkillLevel;
}

interface OtherSkill extends TalentAsset {
  name: string;
  level: OtherSKillLevel;
  description: string;
}

export interface BasicInfoInput {
  name?: FullName;
  gender?: Gender;
  address?: Address;
  profilePic?: string;
  profession?: Profession;
  description?: string;
}

export type TalentUpdate = BaseEntity & BasicInfoInput;
