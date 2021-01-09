import { User, FullName, BaseEntity, Address, Gender } from './index';

export interface Employer extends User {
  address: Address;
  profilePic: string;
  description: string;
  company: string;
  website?: string;
  //search preferences
  isBasicInfoComplete: boolean;
}

export interface BasicEmployerInfoInput {
  name?: FullName;
  gender?: Gender;
  address?: Address;
  profilePic?: string;
  description?: string;
}

export type EmployerUpdate = BaseEntity & BasicEmployerInfoInput;
