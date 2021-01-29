import { BaseEntity } from '.';

export type UserType = 'TALENT' | 'EMPLOYER' | 'AGENCY';

export enum Gender {
  'OTHER',
  'FEMALE',
  'MALE',
}

export interface FullName {
  firstName?: string;
  middleName?: string;
  lastName: string;
}

export interface User extends BaseEntity {
  name: FullName;
  fullName: string;
  gender: Gender;
  email: string;
  password: string;
  type: UserType;
}

export interface UserInput {
  name: FullName;
  gender: Gender;
  company?: string;
  email: string;
  password: string;
  type: UserType;
}
