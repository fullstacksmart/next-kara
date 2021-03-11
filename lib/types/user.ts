import { BaseEntity, Gender, FullName, UserType } from '.';

export interface User extends BaseEntity {
  name: FullName;
  fullName: string;
  gender: Gender;
  email: string;
  type: UserType;
}

export interface UserInput {
  id: string;
  name: FullName;
  gender: Gender;
  company?: string;
  email: string;
  password: string;
  type: UserType;
}
