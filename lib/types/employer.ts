import { User, FullName, BaseEntity, Address, Gender } from './index';

export interface Employer extends User {
  address: Address;
  profilePic: string;
  description: string;
  companyName: string;
  website?: string;
  //search preferences
  isBasicInfoComplete: boolean;
}

export interface EmployerEntry {
  id: string;
  profilePic: string;
  companyName: string;
  address: Address;
  description: string;
  website: string;
  isBasicInfoComplete: boolean;
}

export interface BasicInfoEmployer {
  id: string;
  name: FullName;
  companyName: string;
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
  website?: string;
  gender?: Gender;
  address?: Address;
  profilePic?: string;
  description?: string;
}

export type EmployerUpdate = BaseEntity & BasicInfoEntryEmployer;
