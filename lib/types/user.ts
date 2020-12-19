export type UserType = 'TALENT' | 'EMPLOYER' | 'AGENCY';

export interface FullName {
  firstName?: string;
  middleName?: string;
  lastName: string;
}

export interface User {
  id: string;
  name: FullName;
  email: string;
  password: string;
  type: UserType;
}

export interface UserInput {
  name: FullName;
  email: string;
  password: string;
  type: UserType;
}
