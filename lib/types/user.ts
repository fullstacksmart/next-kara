export type UserType = 'TALENT' | 'EMPLOYER' | 'AGENCY';

export interface User {
  id: string;
  email: string;
  password: string;
  type: UserType;
}

export interface NewUser {
  email: string;
  password: string;
  type: UserType;
}
