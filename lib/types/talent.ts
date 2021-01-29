import { User, FullName, BaseEntity, Address, Gender } from './index';

export enum Profession {
  NURSE,
  DOCTOR,
  OTHER_MEDICAL,
  OTHER_NON_MEDICAL,
}

export enum ApprobationStatus {
  IN_PREPARATION,
  ONGOING,
  DENIED,
  APPROVED,
}

export enum SkillLevel {
  BASIC,
  PROFICIENT,
  EXPERT,
  MASTER,
}

export enum FederalState {
  'BW',
  'BY',
  'BE',
  'BB',
  'HB',
  'HH',
  'HE',
  'NI',
  'MV',
  'NW',
  'RP',
  'SL',
  'SN',
  'ST',
  'SH',
  'TH',
}

interface TalentAsset extends BaseEntity {
  talent: Talent;
  isComplete: boolean;
}

export interface TalentAssetEntry {
  talent: string;
}

interface Date {
  timeStamp: string;
}

export interface Duration {
  from: Date;
  to: Date;
}

export interface Organization extends BaseEntity {
  name: string;
  address: Address;
}

export interface OrganizationEntry {
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
  languages: Skill[];
  otherSkills: Skill[];
  isBasicInfoComplete: boolean;
}

export interface TalentEntry {
  id: string;
  profilePic: string;
  profession: Profession;
  address: Address;
  description: string;
  experiences: (ExperienceEntry & BaseEntity)[];
  qualifications: QualificationEntry[];
  approbations: Approbation[];
  documents: Document[];
  languages: Skill[];
  otherSkills: Skill[];
  isBasicInfoComplete: boolean;
}

export interface BasicInfo {
  id: string;
  name: FullName;
  fullName: string;
  gender: Gender;
  profilePic: string;
  profession: Profession;
  address: Address;
  description: string;
  isBasicInfoComplete: boolean;
}

export interface DbBasicInfo extends BaseEntity {
  name: FullName;
  fullName: string;
  gender: Gender;
  profilePic: string;
  profession: keyof typeof Profession;
  address: Address;
  isBasicInfocomplete: boolean;
}

export interface Experience extends TalentAsset {
  lineOfWork: Profession;
  employer?: Organization;
  duration?: Duration;
  description?: string;
}

export interface ExperienceEntry extends TalentAssetEntry {
  lineOfWork?: Profession;
  employer?: string;
  duration?: Duration;
  description?: string;
}

export interface Qualification extends TalentAsset {
  fieldOfEducation: string;
  degree: string;
  institution: Organization;
  duration: Duration;
  description: string;
}

export interface QualificationEntry extends TalentAssetEntry {
  fieldOfEducation: string;
  degree: string;
  institution: string;
  duration: Duration;
  description: string;
}

export interface Approbation extends BaseEntity {
  status: ApprobationStatus;
  state: FederalState;
}

export interface DbApprobation extends BaseEntity {
  status: keyof typeof ApprobationStatus;
  state: keyof typeof FederalState;
}

interface Document extends TalentAsset {
  name: string;
  description: string;
  url: string;
}

export interface Skill extends BaseEntity {
  name: string;
  level: SkillLevel;
  description?: string;
}

export interface DbSkill extends BaseEntity {
  name: string;
  level: keyof typeof SkillLevel;
  description?: string;
}

export interface BasicInfoEntry {
  name?: FullName;
  gender?: Gender;
  address?: Address;
  profilePic?: string;
  profession?: Profession;
  description?: string;
}

export type TalentUpdate = BaseEntity & BasicInfoEntry;
