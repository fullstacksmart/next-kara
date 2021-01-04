import { BaseEntity } from '.';

export type UserType = 'TALENT' | 'EMPLOYER' | 'AGENCY';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

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
  company?: string;
  gender: string;
  email: string;
  password: string;
  type: UserType;
}
