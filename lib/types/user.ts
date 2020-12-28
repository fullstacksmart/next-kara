export type UserType = 'TALENT' | 'EMPLOYER' | 'AGENCY';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface FullName {
  firstName?: string;
  middleName?: string;
  lastName: string;
}

export interface User {
  id: string;
  name: FullName;
  gender: Gender;
  email: string;
  password: string;
  type: UserType;
}

export interface UserInput {
  name: FullName;
  company?: string;
  email: string;
  password: string;
  type: UserType;
}
