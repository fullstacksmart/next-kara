import { User, FullName, BaseEntity, Address, Gender } from './index';

export type Industry =
  | 'CARE'
  | 'MEDICINE'
  | 'PERSONNEL_CONSULTING'
  | 'TECHNOLOGY';

export type Branch =
  | 'HOSPITAL'
  | 'NURSING_HOME'
  | 'AMBULATORY_CARE_SERVICE'
  | 'REHAB'
  | 'PRACTICE'
  | 'DOCTORS_OFFICE'
  | 'MEDICAL_RESEARCH_INSTITUTE'
  | 'RESEARCH_INSTITUTE'
  | 'SANATORIUM'
  | 'RECRUITMENT'
  | 'LANGUAGE_SCHOOL'
  | 'MIGRATION_LAW'
  | 'EMPLOYMENT_LAW'
  | 'OTHER';

export interface Employer extends User {
  address: Address;
  profilePic: string;
  description: string;
  companyName: string;
  industry: Industry;
  branch: Branch;
  website?: string;
  //search preferences
  isBasicInfoComplete: boolean;
}

export interface EmployerEntry {
  id: string;
  profilePic: string;
  companyName: string;
  industry: Industry;
  branch: Branch;
  address: Address;
  description: string;
  website: string;
  isBasicInfoComplete: boolean;
}

export interface BasicInfoEmployer {
  id: string;
  name: FullName;
  companyName: string;
  industry: Industry;
  branch: Branch;
  fullName: string;
  website?: string;
  gender: Gender;
  profilePic: string;
  address: Address;
  description: string;
  isBasicInfoComplete: boolean;
}

export interface BasicInfoEntryEmployer {
  name?: FullName;
  companyName: string;
  industry: Industry;
  branch: Branch;
  website?: string;
  gender?: Gender;
  address?: Address;
  profilePic?: string;
  description?: string;
}

export type EmployerUpdate = BaseEntity & BasicInfoEntryEmployer;
