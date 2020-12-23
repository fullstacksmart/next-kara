import { FullName } from './index';

export type UserType = 'TALENT' | 'EMPLOYER' | 'AGENCY';

export interface User {
  id: string;
  name: FullName;
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
